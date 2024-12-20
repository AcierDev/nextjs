"use client";

import { useCallback, useEffect, useState, useMemo } from "react";
import { Toaster, toast } from "sonner";
import { DropResult, ResponderProvided } from "@hello-pangea/dnd";
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react";

import { Header } from "@/components/orders/Header";
import { ItemList } from "@/components/orders/ItemList";
import { NewItemModal } from "@/components/orders/NewItemModal";
import { WeeklySchedule } from "@/components/weekly-schedule/WeeklySchedule";
import { SettingsPanel } from "@/components/setttings/SettingsPanel";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useOrderSettings } from "@/contexts/OrderSettingsContext";
import { Item, ItemStatus, ItemSizes, ItemDesigns } from "@/typings/types";
import { useBoardOperations } from "@/hooks/useBoardOperations";
import { ShippingDashboard } from "@/components/shipping/ShippingDashboard";
import { useDatabaseContext } from "@/contexts/DatabaseContext";

export default function OrderManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentMode, setCurrentMode] = useState("all");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isNewItemModalOpen, setIsNewItemModalOpen] = useState(false);
  const [isShippingDashboardOpen, setIsShippingDashboardOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isWeeklyPlannerOpen, setIsWeeklyPlannerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { isLoading } = useDatabaseContext();

  const orderSettingsContext = useOrderSettings();
  const settings = orderSettingsContext.settings || {};

  const { board, setBoard, updateItem, addNewItem, deleteItem } =
    useBoardOperations(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(globalThis.innerWidth < 768);
    checkMobile();
    globalThis.addEventListener("resize", checkMobile);
    return () => globalThis.removeEventListener("resize", checkMobile);
  }, []);

  const isItemDue = useCallback(
    (item: Item) => {
      const dueDate = item.values[item.values.length - 1]?.text;
      if (!dueDate) return false;

      const dueDateObj = new Date(dueDate);
      const currentDate = new Date();
      const daysDifference = Math.abs(
        Math.ceil(
          (dueDateObj.getTime() - currentDate.getTime()) / (1000 * 3600 * 24)
        )
      );

      return daysDifference <= settings.dueBadgeDays;
    },
    [settings.dueBadgeDays]
  );

  const getUniqueGroupValues = useCallback((items: Item[], field: string) => {
    const uniqueValues = new Set<string>();
    items.forEach((item) => {
      const value =
        item.values.find((v) => v.columnName === field)?.text || "Other";
      uniqueValues.add(value);
    });
    return Array.from(uniqueValues);
  }, []);

  const filteredGroups = useMemo(() => {
    if (!board) return [];

    let groupValues: string[];
    if (settings.groupingField === "Status") {
      groupValues = Object.values(ItemStatus);
    } else {
      groupValues = getUniqueGroupValues(
        board.items_page.items,
        settings.groupingField
      );
    }

    const groups = groupValues.map((value) => ({
      id: value,
      title: value,
      items: [] as Item[],
    }));

    board.items_page.items
      .filter((item) => !item.deleted && item.visible)
      .forEach((item) => {
        if (
          item.values.some((value) =>
            String(value.text || "")
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          )
        ) {
          const groupField =
            settings.groupingField === "Status"
              ? item.status
              : item.values.find((v) => v.columnName === settings.groupingField)
                  ?.text || "Other";

          const group = groups.find((g) => g.title === groupField);
          if (
            group &&
            (settings.groupingField !== "Status" ||
              settings.showCompletedOrders ||
              item.status !== ItemStatus.Done)
          ) {
            const design =
              item.values.find((v) => v.columnName === "Design")?.text || "";
            const size =
              item.values.find((v) => v.columnName === "Size")?.text || "";

            const isMini = size === ItemSizes.Fourteen_By_Seven;

            const shouldInclude = (() => {
              switch (currentMode) {
                case "all":
                  return true;
                case "striped":
                  return design.startsWith("Striped") && !isMini;
                case "tiled":
                  return design.startsWith("Tiled") && !isMini;
                case "geometric":
                  return (
                    !design.startsWith("Striped") &&
                    !design.startsWith("Tiled") &&
                    !isMini
                  );
                case "mini":
                  return isMini;
                case "custom":
                  return (
                    !Object.values(ItemDesigns).includes(
                      design as ItemDesigns
                    ) && !isMini
                  );
                default:
                  return false;
              }
            })();

            if (shouldInclude) {
              group.items.push(item);
            }
          }
        }
      });

    return groups;
  }, [
    board,
    settings.groupingField,
    settings.showCompletedOrders,
    searchTerm,
    getUniqueGroupValues,
    currentMode,
  ]);

  const sortedGroups = useMemo(() => {
    return [...filteredGroups].sort((a, b) => {
      if (settings.groupingField === "Status") {
        const aIndex = Object.values(ItemStatus).indexOf(a.title as ItemStatus);
        const bIndex = Object.values(ItemStatus).indexOf(b.title as ItemStatus);
        if (aIndex === -1 && bIndex === -1) return 0;
        if (aIndex === -1) return 1;
        if (bIndex === -1) return -1;
        return aIndex - bIndex;
      }
      return a.title.localeCompare(b.title);
    });
  }, [filteredGroups, settings.groupingField]);

  const dueCounts = useMemo(() => {
    if (!board) return {};

    const counts = {
      all: 0,
      geometric: 0,
      striped: 0,
      tiled: 0,
      mini: 0,
      custom: 0,
    };

    board.items_page.items.forEach((item) => {
      if (isItemDue(item)) {
        counts.all++;

        const design =
          item.values.find((v) => v.columnName === "Design")?.text || "";
        const size =
          item.values.find((v) => v.columnName === "Size")?.text || "";

        const isMini = size === ItemSizes.Fourteen_By_Seven;

        if (design.startsWith("Striped") && !isMini) counts.striped++;
        else if (design.startsWith("Tiled") && !isMini) counts.tiled++;
        else if (
          !design.startsWith("Striped") &&
          !isMini &&
          !design.startsWith("Tiled")
        )
          counts.geometric++;

        if (isMini) counts.mini++;
        if (!Object.values(ItemDesigns).includes(design as ItemDesigns))
          counts.custom++;
      }
    });

    return counts;
  }, [board, isItemDue]);

  const shipItem = useCallback(async (itemId: string) => {
    console.log(`Shipping item: ${itemId}`);
    toast.success("Item marked as shipped", {
      style: { background: "#10B981", color: "white" },
    });
  }, []);

  const markItemCompleted = useCallback(async (itemId: string) => {
    console.log(`Marking item as completed: ${itemId}`);
    toast.success("Item marked as completed", {
      style: { background: "#10B981", color: "white" },
    });
  }, []);

  const onGetLabel = useCallback((item: Item) => {
    console.log(`Getting label for item: ${item.id}`);
    setSelectedItem(item);
    setIsShippingDashboardOpen(true);
  }, []);

  const onDragEnd = useCallback(
    async (result: DropResult, provided: ResponderProvided) => {
      const { source, destination, draggableId } = result;

      if (!destination) return;

      if (
        source.droppableId === destination.droppableId &&
        source.index === destination.index
      ) {
        return;
      }

      if (!board) return;

      const movedItemIndex = board.items_page.items.findIndex(
        (item) => item.id === draggableId
      );
      if (movedItemIndex === -1) return;

      const movedItem = { ...board.items_page.items[movedItemIndex] };
      const newStatus = Object.values(ItemStatus).find(
        (status) => status === destination.droppableId
      );

      if (!newStatus) {
        console.warn(
          "Invalid destination droppableId:",
          destination.droppableId
        );
        return;
      }

      const updatedItems = [...board.items_page.items];
      updatedItems.splice(movedItemIndex, 1);

      const statusChanged = movedItem.status !== newStatus;
      if (statusChanged) {
        movedItem.status = newStatus;
        if (newStatus === ItemStatus.Done) {
          movedItem.completedAt = Date.now();
        } else {
          delete movedItem.completedAt;
        }
      }

      let insertionIndex = 0;
      for (const group of sortedGroups) {
        if (group.id === newStatus) break;
        insertionIndex += group.items.length;
      }

      insertionIndex += destination.index;
      updatedItems.splice(insertionIndex, 0, movedItem);

      try {
        await fetch("/api/board", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            boardId: board.id,
            updateData: {
              $set: { "items_page.items": updatedItems },
            },
          }),
        });

        setBoard((prevBoard) => ({
          ...prevBoard!,
          items_page: {
            ...prevBoard!.items_page,
            items: updatedItems,
          },
        }));

        toast.success(`Item moved to ${newStatus} and reordered successfully`, {
          style: { background: "#10B981", color: "white" },
        });

        if (newStatus === ItemStatus.Done) {
          toast.success("Item marked as completed!", {
            style: { background: "#10B981", color: "white" },
          });
        }
      } catch (error) {
        console.error("Failed to update item status and order:", error);
        toast.error(
          "Failed to update item status and order. Please try again.",
          {
            style: { background: "#EF4444", color: "white" },
          }
        );
      }
    },
    [board, sortedGroups]
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        <span className="ml-2 text-gray-500">Loading board data...</span>
      </div>
    );
  }

  if (!orderSettingsContext) {
    return (
      <div>Error: Order settings not available. Please refresh the page.</div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <Toaster position="top-center" />
      <Header
        isMobile={isMobile}
        searchTerm={searchTerm}
        onNewOrder={() => setIsNewItemModalOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onSearchChange={setSearchTerm}
        currentMode={currentMode}
        onModeChange={setCurrentMode}
        dueCounts={dueCounts}
      />
      <div className="relative">
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            isWeeklyPlannerOpen ? "h-64" : "h-0"
          }`}
        >
          {board && (
            <div className="h-full bg-white dark:bg-gray-800 shadow-lg overflow-hidden">
              <WeeklySchedule
                boardId={board.id}
                items={
                  board.items_page.items.filter(
                    (item) => !item.deleted && item.visible
                  ) || []
                }
              />
            </div>
          )}
        </div>
        <Button
          className="absolute left-1/2 transform -translate-x-1/2 -bottom-4 bg-white dark:bg-gray-800 shadow-md rounded-full p-2 z-10"
          variant="ghost"
          onClick={() => setIsWeeklyPlannerOpen(!isWeeklyPlannerOpen)}
          aria-label={
            isWeeklyPlannerOpen ? "Close weekly planner" : "Open weekly planner"
          }
        >
          {isWeeklyPlannerOpen ? (
            <ChevronUp className="h-6 w-6" />
          ) : (
            <ChevronDown className="h-6 w-6" />
          )}
        </Button>
      </div>
      <div className="flex-grow">
        <div className="h-full max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <ItemList
            board={board!}
            groups={sortedGroups}
            onDelete={deleteItem}
            onDragEnd={onDragEnd}
            onGetLabel={onGetLabel}
            onMarkCompleted={markItemCompleted}
            onShip={shipItem}
          />
        </div>
      </div>
      {isSettingsOpen && (
        <SettingsPanel onClose={() => setIsSettingsOpen(false)} />
      )}
      <NewItemModal
        isOpen={isNewItemModalOpen}
        onClose={() => setIsNewItemModalOpen(false)}
        onSubmit={addNewItem}
      />
      <Dialog
        open={isShippingDashboardOpen}
        onOpenChange={setIsShippingDashboardOpen}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedItem && (
            <ShippingDashboard
              item={selectedItem}
              onClose={() => {
                setIsShippingDashboardOpen(false);
                setSelectedItem(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
