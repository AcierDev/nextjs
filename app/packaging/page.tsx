"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { format, addDays } from "date-fns";
import { toast } from "sonner";

import { useRealmApp } from "@/hooks/useRealmApp";
import { useWeeklySchedule } from "@/components/weekly-schedule/UseWeeklySchedule";
import { useIsMobile } from "@/components/shared/UseIsMobile";
import { SchedulePageLayout } from "@/components/shared/SchedulePageLayout";
import { Filters } from "@/components/shared/Filters";
import { OverviewTab } from "@/components/packaging/OverviewTab";
import { DetailsTab } from "@/components/packaging/DetailsTab";
import { useBoardOperations } from "@/hooks/useBoardOperations";
import { calculateBoxRequirements } from "@/components/packaging/BoxCalculations";
import { Board, Group, Item, ItemStatus } from "@/typings/types";
import { BoxRequirement } from "@/typings/interfaces";

export default function BoxSchedulePage() {
  const { boardCollection: collection, isLoading } = useRealmApp();
  const [items, setItems] = useState<Item[]>([]);
  const [board, setBoard] = useState<Board | null>(null);
  const [boxRequirements, setBoxRequirements] = useState<
    Record<string, BoxRequirement>
  >({});
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [filterSize, setFilterSize] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("overview");
  const isMobile = useIsMobile();
  const {
    weeklySchedules,
    currentWeekStart,
    hasDataInPreviousWeek,
    hasDataInNextWeek,
    changeWeek,
    resetToCurrentWeek,
    isCurrentWeek,
  } = useWeeklySchedule({ weekStartsOn: 0 });
  const [updateItem, setUpdateItem] =
    useState<(updatedItem: Item) => Promise<void>>();

  const loadItems = useCallback(async () => {
    if (!collection) return;

    try {
      const loadedBoard = await collection.findOne({});
      setBoard(loadedBoard);
      setItems(loadedBoard?.items_page.items || []);
      console.log("Board loaded:", loadedBoard);
    } catch (err) {
      console.error("Failed to load board", err);
      toast.error("Failed to load board. Please refresh the page.", {
        style: { background: "#EF4444", color: "white" },
      });
    }
  }, [collection, setBoard, setItems]);

  useEffect(() => {
    if (!isLoading && collection) {
      loadItems();
    }
  }, [isLoading, collection, loadItems]);

  const boardOperations = useBoardOperations(board, collection, {});

  useEffect(() => {
    if (board && collection) {
      setUpdateItem(() => boardOperations.updateItem);
    } else {
      setUpdateItem(undefined);
    }
  }, [board, collection, boardOperations]);

  const toggleDateSelection = (date: Date) => {
    setSelectedDates((prev) => {
      const dateString = format(date, "yyyy-MM-dd");
      if (prev.some((d) => format(d, "yyyy-MM-dd") === dateString)) {
        return prev.filter((d) => format(d, "yyyy-MM-dd") !== dateString);
      }
      return [...prev, date];
    });
  };

  const itemsNeedingBoxes = useMemo(() => {
    const selectedDateStrings = selectedDates.map((date) =>
      format(date, "yyyy-MM-dd")
    );
    const weekKey = format(currentWeekStart, "yyyy-MM-dd");
    const currentWeekSchedule = weeklySchedules[weekKey] || {};

    const scheduledItems = new Set<string>();
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    dayNames.forEach((dayName, index) => {
      const dayDate = format(addDays(currentWeekStart, index), "yyyy-MM-dd");
      if (
        selectedDateStrings.includes(dayDate) &&
        currentWeekSchedule[dayName]
      ) {
        currentWeekSchedule[dayName]!.forEach((id) => scheduledItems.add(id));
      }
    });

    return items.filter((item) => scheduledItems.has(item.id));
  }, [items, selectedDates, weeklySchedules, currentWeekStart]);

  const filteredItemsNeedingBoxes = useMemo(() => {
    return itemsNeedingBoxes.filter((item) => {
      const sizeValue =
        item.values.find((value) => value.columnName === "Size")?.text || "";
      const matchesSize = filterSize === "all" || sizeValue === filterSize;
      const matchesSearch = item.values.some((value) =>
        String(value.text || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      return matchesSize && matchesSearch;
    });
  }, [itemsNeedingBoxes, filterSize, searchTerm]);

  const filteredBoxGroup: Group = useMemo(
    () => ({
      id: "box-group",
      title: ItemStatus.Packaging,
      items: filteredItemsNeedingBoxes,
    }),
    [filteredItemsNeedingBoxes]
  );

  useEffect(() => {
    const requirements = calculateBoxRequirements(filteredBoxGroup);
    setBoxRequirements(requirements);
  }, [filteredBoxGroup]);

  const filteredRequirements = Object.entries(boxRequirements);

  const totalBoxes = useMemo(() => {
    return filteredRequirements.reduce((total, [_, requirement]) => {
      return total + requirement.count!;
    }, 0);
  }, [filteredRequirements]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <SchedulePageLayout
        title="Box Schedule"
        isMobile={isMobile}
        currentWeekStart={currentWeekStart}
        changeWeek={changeWeek}
        resetToCurrentWeek={resetToCurrentWeek}
        renderFilters={() => (
          <Filters
            filterValue={filterSize}
            onFilterChange={setFilterSize}
            searchTerm={searchTerm}
            onSearchTermChange={setSearchTerm}
            filterOptions={Object.keys(boxRequirements)}
            isMobile={isMobile}
          />
        )}
        tabs={[
          {
            value: "overview",
            label: "Overview",
            content: (
              <OverviewTab
                isMobile={isMobile}
                totalBoxes={totalBoxes}
                filteredRequirements={filteredRequirements}
                selectedDates={selectedDates}
              />
            ),
          },
          {
            value: "details",
            label: "Details",
            content: (
              <DetailsTab
                isMobile={isMobile}
                filteredRequirements={filteredRequirements}
              />
            ),
          },
        ]}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        hasDataInPreviousWeek={hasDataInPreviousWeek()}
        hasDataInNextWeek={hasDataInNextWeek()}
        weekStartsOn={0}
        isCurrentWeek={isCurrentWeek()}
        group={filteredBoxGroup}
        board={board!}
        updateItem={updateItem!}
        selectedDates={selectedDates}
        schedule={weeklySchedules[format(currentWeekStart, "yyyy-MM-dd")] || {}}
        toggleDateSelection={toggleDateSelection}
      />
    </div>
  );
}
