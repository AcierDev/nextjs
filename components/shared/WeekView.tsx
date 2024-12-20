import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { addDays, format } from "date-fns"
import { WeeklySchedules } from "../weekly-schedule/UseWeeklySchedule"
import { cn } from "@/utils/functions"

type WeekViewProps = {
  currentWeekStart: Date
  selectedDates: Date[]
  schedule: WeeklySchedules
  toggleDateSelection: (date: Date) => void
  isMobile: boolean
}

export function WeekView({ currentWeekStart, selectedDates, schedule, toggleDateSelection, isMobile }: WeekViewProps) {
  const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  const WeekViewContent = () => (
    <ScrollArea className="w-full">
      <div className="flex space-x-2 p-2">
        {DAYS_OF_WEEK.map((day, index) => {
          const date = addDays(currentWeekStart, index)
          const isSelected = selectedDates.some(d => format(d, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'))
          const itemCount = schedule[day]?.length || 0
          return (
            <Card
              key={day}
              className={cn(
                "flex-shrink-0 w-20 cursor-pointer transition-all dark:bg-gray-800 dark:text-gray-200",
                isSelected ? "ring-2 ring-primary dark:ring-blue-400" : "hover:bg-gray-50 dark:hover:bg-gray-700"
              )}
              onClick={() => toggleDateSelection(date)}
            >
              <CardContent className="p-2 text-center">
                <p className="font-semibold text-sm">{day.slice(0, 3)}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{format(date, "MMM d")}</p>
                <p className="mt-1 text-lg font-bold">{itemCount}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </ScrollArea>
  )

  if (isMobile) {
    return <WeekViewContent />
  }

  return (
    <div className="grid grid-cols-7 gap-2 mb-6">
      {DAYS_OF_WEEK.map((day, index) => {
        const date = addDays(currentWeekStart, index)
        const isSelected = selectedDates.some(d => format(d, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'))
        const itemCount = schedule[day]?.length || 0
        return (
          <Card
            key={day}
            className={cn(
              "cursor-pointer transition-all dark:bg-gray-800 dark:text-gray-200",
              isSelected ? "ring-2 ring-primary dark:ring-blue-400" : "hover:bg-gray-50 dark:hover:bg-gray-700"
            )}
            onClick={() => toggleDateSelection(date)}
          >
            <CardContent className="p-4">
              <p className="font-semibold">{day}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{format(date, "MMM d")}</p>
              <p className="mt-2 text-lg font-bold">{itemCount}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">items</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}