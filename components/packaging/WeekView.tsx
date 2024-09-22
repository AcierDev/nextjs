// components/packaging/WeekView.tsx
'use client'

import { addDays, format } from "date-fns"
import { useMemo } from 'react'

import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BoxRequirement, type DaySchedule } from '@/typings/interfaces'
import { type Item } from "@/typings/types"
import { DAYS_OF_WEEK } from '@/utils/constants'
import { cn } from "@/utils/functions"

interface WeekViewProps {
  schedule: DaySchedule
  items: Item[]
  selectedDates: Date[]
  toggleDateSelection: (date: Date) => void
  isMobile: boolean
  currentWeekStart: Date
}

const WeekView: React.FC<WeekViewProps> = ({
  schedule,
  items,
  selectedDates,
  toggleDateSelection,
  isMobile,
  currentWeekStart
}) => {
  const renderCards = () => {
    if (isMobile) {
      return (
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
                    "flex-shrink-0 w-20 cursor-pointer transition-all",
                    isSelected ? "ring-2 ring-primary" : "hover:bg-gray-50"
                  )}
                  onClick={() => toggleDateSelection(date)}
                >
                  <CardContent className="p-2 text-center">
                    <p className="font-semibold text-sm">{day.slice(0, 3)}</p>
                    <p className="text-xs text-gray-600">{format(date, "MMM d")}</p>
                    <p className="mt-1 text-lg font-bold">{itemCount}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </ScrollArea>
      )
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
                "cursor-pointer transition-all",
                isSelected ? "ring-2 ring-primary" : "hover:bg-gray-50"
              )}
              onClick={() => toggleDateSelection(date)}
            >
              <CardContent className="p-4">
                <p className="font-semibold">{day}</p>
                <p className="text-sm text-gray-600">{format(date, "MMM d")}</p>
                <p className="mt-2 text-lg font-bold">{itemCount}</p>
                <p className="text-xs text-gray-600">items</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    )
  }

  return renderCards()
}

export default WeekView