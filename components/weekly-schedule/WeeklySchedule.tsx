"use client";

import { DragDropContext } from "@hello-pangea/dnd";
import { useEffect, useState, useMemo, useCallback } from "react";
import { toast } from "sonner";
import { format, startOfWeek, addWeeks, subWeeks } from "date-fns";

import { Button } from "@/components/ui/button";
import { ColumnTitles, type Item, ItemStatus } from "@/typings/types";
import { ConfirmCompletionDialog } from "./ConfirmCompletionDialog";
import { AddItemDialog } from "./AddItemDialog";
import { DayColumn } from "./DayColumn";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useBoardOperations } from "@/hooks/useBoardOperations";

type DaySchedule = Record<string, string[]>;
type WeeklySchedules = Record<string, DaySchedule>;

interface WeeklyScheduleProps {
  items: Item[];
  boardId: string;
}

export function WeeklySchedule({ items, boardId }: WeeklyScheduleProps) {
  const { updateBoardInDb, updateItem } = useBoardOperations();
  const [weeklySchedules, setWeeklySchedules] = useState<WeeklySchedules>({});
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(() =>
    startOfWeek(new Date(), { weekStartsOn: 0 })
  );
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [currentDay, setCurrentDay] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDesign, setFilterDesign] = useState("all");
  const [filterSize, setFilterSize] = useState("all");
  const [confirmCompleteItem, setConfirmCompleteItem] = useState<Item | null>(
    null
  );

  const loadSchedules = useCallback(async () => {
    try {
      const response = await fetch(`/api/weekly-schedules/${boardId}`);
      if (!response.ok) throw new Error("Failed to load weekly schedules");
      const schedules = await response.json();

      setWeeklySchedules((prev) => {
        const currentWeekKey = format(currentWeekStart, "yyyy-MM-dd");
        if (schedules.weeklySchedules) {
          // Only create new week if it doesn't exist in the fetched data
          if (!schedules.weeklySchedules[currentWeekKey]) {
            return {
              ...schedules.weeklySchedules,
              [currentWeekKey]: {
                Sunday: [],
                Monday: [],
                Tuesday: [],
                Wednesday: [],
                Thursday: [],
                Friday: [],
                Saturday: [],
              },
            };
          }
          return schedules.weeklySchedules;
        }

        // If no schedules exist, create new week
        return {
          [currentWeekKey]: {
            Sunday: [],
            Monday: [],
            Tuesday: [],
            Wednesday: [],
            Thursday: [],
            Friday: [],
            Saturday: [],
          },
        };
      });
    } catch (err) {
      console.error("Failed to load weekly schedules", err);
      toast.error("Failed to load weekly schedules. Please refresh the page.");
    }
  }, [boardId]); // Remove currentWeekStart from dependencies

  useEffect(() => {
    loadSchedules();
  }, [loadSchedules, currentWeekStart]); // Add currentWeekStart here instead

  const createNewWeek = useCallback((weekStart: Date) => {
    const adjustedWeekStart = startOfWeek(weekStart, { weekStartsOn: 0 });
    const weekKey = format(adjustedWeekStart, "yyyy-MM-dd");
    setWeeklySchedules((prev) => ({
      ...prev,
      [weekKey]: {
        Sunday: [],
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
      },
    }));
    setCurrentWeekStart(adjustedWeekStart);
  }, []);

  const saveSchedules = useCallback(
    async (newSchedules: WeeklySchedules) => {
      try {
        await updateBoardInDb(boardId, {
          $set: { weeklySchedules: newSchedules },
        });
        console.log("Weekly schedules saved successfully");
      } catch (err) {
        console.error("Failed to save weekly schedules", err);
        toast.error("Failed to save weekly schedules. Please try again.");
      }
    },
    [boardId, updateBoardInDb]
  );

  const handleAddItem = useCallback((day: string) => {
    setCurrentDay(day);
    setIsAddingItem(true);
  }, []);

  const handleQuickAdd = useCallback(
    async (day: string, item: Item) => {
      const weekKey = format(currentWeekStart, "yyyy-MM-dd");
      const newSchedules = {
        ...weeklySchedules,
        [weekKey]: {
          ...weeklySchedules[weekKey],
          [day]: [...(weeklySchedules[weekKey]?.[day] || []), item.id],
        },
      };
      setWeeklySchedules(newSchedules);
      await saveSchedules(newSchedules);

      // Update item's isScheduled status
      const updatedItem = { ...item, isScheduled: true };
      await updateItem(updatedItem, null);
    },
    [weeklySchedules, currentWeekStart, saveSchedules, updateItem]
  );

  const handleRemoveItem = useCallback(
    async (day: string, itemId: string) => {
      const weekKey = format(currentWeekStart, "yyyy-MM-dd");
      const newSchedules = {
        ...weeklySchedules,
        [weekKey]: {
          ...weeklySchedules[weekKey],
          [day]: weeklySchedules[weekKey]![day]!.filter((id) => id !== itemId),
        },
      };
      setWeeklySchedules(newSchedules);
      await saveSchedules(newSchedules);

      // Find the item and update its isScheduled status
      const item = items.find((i) => i.id === itemId);
      if (item) {
        const updatedItem = { ...item, isScheduled: false };
        await updateItem(updatedItem, null);
      }
    },
    [weeklySchedules, currentWeekStart, saveSchedules, updateItem, items]
  );

  const handleDragEnd = useCallback(
    async (result: any) => {
      if (!result.destination) return;

      const { source, destination } = result;
      const sourceDay = source.droppableId;
      const destDay = destination.droppableId;

      const weekKey = format(currentWeekStart, "yyyy-MM-dd");
      const newSchedules = { ...weeklySchedules };
      const [movedItemId] = newSchedules[weekKey]![sourceDay]!.splice(
        source.index,
        1
      );
      newSchedules[weekKey]![destDay]!.splice(
        destination.index,
        0,
        movedItemId!
      );

      setWeeklySchedules(newSchedules);
      await saveSchedules(newSchedules);
    },
    [weeklySchedules, currentWeekStart, saveSchedules]
  );

  const handleMarkAsCompleted = useCallback(
    async (item: Item) => {
      try {
        const updatedItem = {
          ...item,
          status: ItemStatus.Done,
          completedAt: Date.now(),
        };

        await updateItem(updatedItem, null);
        toast.success("Item marked as completed");
      } catch (err) {
        console.error("Failed to mark item as completed", err);
        toast.error("Failed to mark item as completed. Please try again.");
      } finally {
        setConfirmCompleteItem(null);
      }
    },
    [updateItem]
  );

  const getItemValue = useCallback(
    (item: Item, columnName: ColumnTitles): string => {
      return item.values.find((v) => v.columnName === columnName)?.text || "";
    },
    []
  );

  const designs = useMemo(
    () => [
      ...new Set(items.map((item) => getItemValue(item, ColumnTitles.Design))),
    ],
    [items, getItemValue]
  );
  const sizes = useMemo(
    () => [
      ...new Set(items.map((item) => getItemValue(item, ColumnTitles.Size))),
    ],
    [items, getItemValue]
  );

  const weekKey = format(currentWeekStart, "yyyy-MM-dd");
  const filteredItems = useMemo(
    () =>
      items.filter(
        (item) =>
          !item.isScheduled &&
          !Object.values(weeklySchedules[weekKey] || {})
            .flat()
            .includes(item.id) &&
          getItemValue(item, ColumnTitles.Customer_Name)
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) &&
          (filterDesign === "all" ||
            getItemValue(item, ColumnTitles.Design) === filterDesign) &&
          (filterSize === "all" ||
            getItemValue(item, ColumnTitles.Size) === filterSize) &&
          item.status !== ItemStatus.Done
      ),
    [
      items,
      weeklySchedules,
      weekKey,
      searchTerm,
      filterDesign,
      filterSize,
      getItemValue,
    ]
  );

  const changeWeek = useCallback(
    (direction: "prev" | "next") => {
      const newWeekStart =
        direction === "prev"
          ? subWeeks(currentWeekStart, 1)
          : addWeeks(currentWeekStart, 1);
      setCurrentWeekStart(newWeekStart);
      if (!weeklySchedules[format(newWeekStart, "yyyy-MM-dd")]) {
        createNewWeek(newWeekStart);
      }
    },
    [currentWeekStart, weeklySchedules, createNewWeek]
  );

  const calculateTotalSquares = useCallback(
    (dayItemIds: string[]) => {
      return dayItemIds.reduce((total, itemId) => {
        const item = items.find((i) => i.id === itemId);
        if (item) {
          const size = getItemValue(item, ColumnTitles.Size);
          const [width, height] = size.split("x").map(Number);
          return total + width! * height!;
        }
        return total;
      }, 0);
    },
    [items, getItemValue]
  );

  return (
    <div className="h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 sticky top-30">
      <div className="p-4 bg-white dark:bg-gray-800 shadow-md">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={() => changeWeek("prev")}
          >
            <ChevronLeft className="mr-1 h-4 w-4" /> Previous
          </Button>
          <span className="text-lg font-semibold">
            {format(currentWeekStart, "MMM d")} -{" "}
            {format(addWeeks(currentWeekStart, 1), "MMM d, yyyy")}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => changeWeek("next")}
          >
            Next <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex-grow overflow-hidden">
          <div className="flex h-full">
            {Object.entries(weeklySchedules[weekKey] || {}).map(
              ([day, dayItemIds]) => (
                <DayColumn
                  key={day}
                  day={day}
                  dayItemIds={dayItemIds}
                  items={items}
                  calculateTotalSquares={calculateTotalSquares}
                  handleAddItem={handleAddItem}
                  handleRemoveItem={handleRemoveItem}
                  setConfirmCompleteItem={setConfirmCompleteItem}
                  getItemValue={getItemValue}
                />
              )
            )}
          </div>
        </div>
      </DragDropContext>

      <AddItemDialog
        isOpen={isAddingItem}
        onClose={() => setIsAddingItem(false)}
        currentDay={currentDay}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterDesign={filterDesign}
        setFilterDesign={setFilterDesign}
        filterSize={filterSize}
        setFilterSize={setFilterSize}
        designs={designs}
        sizes={sizes}
        filteredItems={filteredItems}
        handleQuickAdd={handleQuickAdd}
        getItemValue={getItemValue}
      />

      <ConfirmCompletionDialog
        isOpen={!!confirmCompleteItem}
        onClose={() => setConfirmCompleteItem(null)}
        item={confirmCompleteItem}
        handleMarkAsCompleted={handleMarkAsCompleted}
        getItemValue={getItemValue}
      />
    </div>
  );
}
