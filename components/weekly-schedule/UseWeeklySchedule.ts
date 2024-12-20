import { useState, useCallback, useEffect } from "react";
import {
  format,
  startOfWeek,
  addWeeks,
  subWeeks,
  isBefore,
  isAfter,
  endOfWeek,
  isSameWeek,
} from "date-fns";
import { toast } from "sonner";
import { useBoardOperations } from "@/hooks/useBoardOperations";
import { Board } from "@/typings/types";

export type DaySchedule = Record<string, string[]>;
export type WeeklySchedules = Record<string, DaySchedule>;

export interface UseWeeklyScheduleReturn {
  weeklySchedules: WeeklySchedules;
  currentWeekStart: Date;
  changeWeek: (direction: "prev" | "next") => void;
  addItemToDay: (day: string, itemId: string) => Promise<void>;
  removeItemFromDay: (day: string, itemId: string) => Promise<void>;
  moveItem: (
    sourceDay: string,
    destDay: string,
    itemId: string,
    newIndex: number
  ) => Promise<void>;
  hasDataInPreviousWeek: () => boolean;
  hasDataInNextWeek: () => boolean;
  resetToCurrentWeek: () => void;
  isCurrentWeek: () => boolean;
  isLoading: boolean;
  isError: boolean;
}

export const useWeeklySchedule = ({
  weekStartsOn = 0,
}: {
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}): UseWeeklyScheduleReturn => {
  const { board, updateBoardInDb, isLoading, isError } = useBoardOperations();
  const [weeklySchedules, setWeeklySchedules] = useState<WeeklySchedules>({});
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(() =>
    startOfWeek(new Date(), { weekStartsOn })
  );

  const loadSchedules = useCallback(async () => {
    if (!board) return;

    try {
      if (board.weeklySchedules) {
        setWeeklySchedules(board.weeklySchedules);
      }

      // Always set to the current week, regardless of database content
      const nowWeekStart = startOfWeek(new Date(), { weekStartsOn });
      setCurrentWeekStart(nowWeekStart);

      if (
        !board.weeklySchedules ||
        !board.weeklySchedules[format(nowWeekStart, "yyyy-MM-dd")]
      ) {
        createNewWeek(nowWeekStart);
      }
    } catch (err) {
      console.error("Failed to load weekly schedules", err);
      toast.error("Failed to load weekly schedules. Please refresh the page.", {
        style: { background: "#EF4444", color: "white" },
      });
    }
  }, [board, weekStartsOn]);

  useEffect(() => {
    loadSchedules();
  }, [loadSchedules]);

  const createNewWeek = (weekStart: Date) => {
    const weekKey = format(weekStart, "yyyy-MM-dd");
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
  };

  const saveSchedules = async (newSchedules: WeeklySchedules) => {
    if (!board) return;

    try {
      await updateBoardInDb(board.id, {
        $set: { weeklySchedules: newSchedules },
      });
      console.log("Weekly schedules saved successfully");
    } catch (err) {
      console.error("Failed to save weekly schedules", err);
      toast.error("Failed to save weekly schedules. Please try again.", {
        style: { background: "#EF4444", color: "white" },
      });
    }
  };

  const changeWeek = useCallback(
    (direction: "prev" | "next") => {
      setCurrentWeekStart((prevWeekStart) => {
        const newWeekStart =
          direction === "prev"
            ? subWeeks(prevWeekStart, 1)
            : addWeeks(prevWeekStart, 1);
        const adjustedWeekStart = startOfWeek(newWeekStart, { weekStartsOn });

        if (!weeklySchedules[format(adjustedWeekStart, "yyyy-MM-dd")]) {
          createNewWeek(adjustedWeekStart);
        }
        return adjustedWeekStart;
      });
    },
    [weekStartsOn, weeklySchedules]
  );

  const addItemToDay = useCallback(
    async (day: string, itemId: string) => {
      const weekKey = format(currentWeekStart, "yyyy-MM-dd");
      const newSchedules = {
        ...weeklySchedules,
        [weekKey]: {
          ...weeklySchedules[weekKey],
          [day]: [...(weeklySchedules[weekKey]?.[day] || []), itemId],
        },
      };
      setWeeklySchedules(newSchedules);
      await saveSchedules(newSchedules);

      // Update the isScheduled flag for the item
      if (board) {
        const updatedItems = board.items_page.items.map((item) =>
          item.id === itemId ? { ...item, isScheduled: true } : item
        );
        await updateBoardInDb(board.id, {
          $set: {
            "items_page.items": updatedItems,
          },
        });
      }
    },
    [weeklySchedules, currentWeekStart, board, updateBoardInDb]
  );

  const removeItemFromDay = useCallback(
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

      // Check if the item is scheduled in any other day/week before updating isScheduled flag
      const isScheduledElsewhere = Object.values(newSchedules).some(
        (weekSchedule) =>
          Object.values(weekSchedule).some((daySchedule) =>
            daySchedule.includes(itemId)
          )
      );

      if (!isScheduledElsewhere && board) {
        const updatedItems = board.items_page.items.map((item) =>
          item.id === itemId ? { ...item, isScheduled: false } : item
        );
        await updateBoardInDb(board.id, {
          $set: {
            "items_page.items": updatedItems,
          },
        });
      }
    },
    [weeklySchedules, currentWeekStart, board, updateBoardInDb]
  );

  const moveItem = useCallback(
    async (
      sourceDay: string,
      destDay: string,
      itemId: string,
      newIndex: number
    ) => {
      const weekKey = format(currentWeekStart, "yyyy-MM-dd");
      const newSchedules = { ...weeklySchedules };
      const sourceItems = newSchedules[weekKey]![sourceDay];
      const destItems = newSchedules[weekKey]![destDay];

      const itemIndex = sourceItems!.indexOf(itemId);
      if (itemIndex > -1) {
        sourceItems!.splice(itemIndex, 1);
        destItems!.splice(newIndex, 0, itemId);
      }

      setWeeklySchedules(newSchedules);
      await saveSchedules(newSchedules);
    },
    [weeklySchedules, currentWeekStart]
  );

  const hasDataInNextWeek = useCallback(() => {
    const nextWeekStart = addWeeks(currentWeekStart, 1);
    const nextWeekKey = format(nextWeekStart, "yyyy-MM-dd");
    const currentDate = new Date();
    const currentWeekEnd = endOfWeek(currentWeekStart, { weekStartsOn });

    // Check if the current week is in the past
    const isCurrentWeekPast = isBefore(currentWeekEnd, currentDate);

    // Check if there's data in the next week
    const hasData =
      !!weeklySchedules[nextWeekKey] &&
      Object.values(weeklySchedules[nextWeekKey]).some((day) => day.length > 0);

    return isCurrentWeekPast && hasData;
  }, [weeklySchedules, currentWeekStart, weekStartsOn]);

  const hasDataInPreviousWeek = useCallback(() => {
    const prevWeekStart = subWeeks(currentWeekStart, 1);
    const prevWeekKey = format(prevWeekStart, "yyyy-MM-dd");
    return (
      !!weeklySchedules[prevWeekKey] &&
      Object.values(weeklySchedules[prevWeekKey]).some((day) => day.length > 0)
    );
  }, [weeklySchedules, currentWeekStart]);

  const resetToCurrentWeek = useCallback(() => {
    const currentDate = new Date();
    const newWeekStart = startOfWeek(currentDate, { weekStartsOn });
    setCurrentWeekStart(newWeekStart);

    if (!weeklySchedules[format(newWeekStart, "yyyy-MM-dd")]) {
      createNewWeek(newWeekStart);
    }
  }, [weekStartsOn, weeklySchedules]);

  const isCurrentWeek = useCallback(() => {
    const today = new Date();
    return isSameWeek(currentWeekStart, today, { weekStartsOn });
  }, [currentWeekStart, weekStartsOn]);

  return {
    weeklySchedules,
    currentWeekStart,
    hasDataInPreviousWeek,
    hasDataInNextWeek,
    changeWeek,
    addItemToDay,
    removeItemFromDay,
    moveItem,
    resetToCurrentWeek,
    isCurrentWeek,
    isLoading,
    isError,
  };
};
