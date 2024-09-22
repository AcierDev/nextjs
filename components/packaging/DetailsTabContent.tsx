// components/packaging/DetailsTabContent.tsx
'use client'

import { format } from "date-fns"

import { Card, CardContent } from "@/components/ui/card"
import { type BoxRequirement } from '@/typings/interfaces'
import { ColumnTitles, type Item } from "@/typings/types"
import { BOX_COLORS } from '@/utils/constants'
import { cn } from "@/utils/functions"

interface DetailsTabContentProps {
  boxRequirements: BoxRequirement
  filteredRequirements: [string, number][]
  selectedItems: Item[]
  isMobile: boolean
}

const DetailsTabContent: React.FC<DetailsTabContentProps> = ({
  boxRequirements,
  filteredRequirements,
  selectedItems,
  isMobile
}) => {
  return (
    <div className={cn("space-y-6", isMobile ? "p-4" : "p-6")}>
      <Card>
        <CardContent className={cn(isMobile ? "p-4" : "p-6")}>
          <h3 className={cn("font-semibold mb-4", isMobile ? "text-lg" : "text-xl")}>Box Color Details</h3>
          <div className={cn(
            "grid gap-4",
            isMobile ? "grid-cols-1" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          )}>
            {filteredRequirements.map(([color, count]) => {
              const { hardwareBag, mountingRail } = Object.values(BOX_COLORS).find(box => box.color === color) || {}
              return (
                <div 
                  key={`detail-${color}`}
                  className="bg-gray-100 p-4 rounded-lg"
                >
                  <div 
                    style={{ backgroundColor: color === "Custom" ? "black" : color.toLowerCase().split(" ").at(0) }}
                    className={cn(
                      "rounded-md flex items-center justify-center text-white font-semibold mb-2",
                      isMobile ? "w-8 h-8 text-sm" : "w-16 h-16 text-lg"
                    )}
                  >
                    <span>{count}</span>
                  </div>
                  <h4 className={cn("font-semibold mb-2", isMobile ? "text-xs" : "text-sm")}>{color}</h4>
                  {hardwareBag ? <p className={cn("text-gray-600 mb-1", isMobile ? "text-xs" : "text-sm")}>Hardware: {hardwareBag}</p> : null}
                  {mountingRail ? <p className={cn("text-gray-600", isMobile ? "text-xs" : "text-sm")}>Rail: {mountingRail}</p> : null}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className={cn(isMobile ? "p-4" : "p-6")}>
          <h3 className={cn("font-semibold mb-4", isMobile ? "text-sm" : "text-lg")}>Items Requiring Boxes</h3>
          <div className="space-y-4">
            {selectedItems.map((item) => {
              const name = item.values.find(v => v.columnName === ColumnTitles.Customer_Name)?.text || 'Unnamed Item'
              const size = item.values.find(v => v.columnName === ColumnTitles.Size)?.text
              const boxColor = size && (size in BOX_COLORS) ? BOX_COLORS[size as keyof typeof BOX_COLORS].color : 'Unknown Color'
              const mountingRail = size && (size in BOX_COLORS) ? BOX_COLORS[size as keyof typeof BOX_COLORS].mountingRail : 'Unknown Rail'
              return (
                <div key={item.id} className={cn(
                  "flex justify-between items-center p-2 bg-gray-100 rounded",
                  isMobile ? "flex-col items-start" : ""
                )}>
                  <span className={cn("font-medium", isMobile ? "text-xs mb-1" : "")}>{name}</span>
                  <div className={cn("text-gray-600", isMobile ? "text-xs" : "text-sm")}>
                    <span className="mr-2">{size || 'Unknown Size'}</span>
                    <span className="font-semibold mr-2">{boxColor}</span>
                    <span className={isMobile ? "block mt-1" : ""}>Rail: {mountingRail}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className={cn(isMobile ? "p-4" : "p-6")}>
          <h3 className={cn("font-semibold mb-4", isMobile ? "text-sm" : "text-lg")}>Box Sizes Guide</h3>
          <div className={cn(
            "grid gap-4",
            isMobile ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
          )}>
            {Object.entries(BOX_COLORS).map(([size, { color, count, hardwareBag, mountingRail }]) => (
              <div key={`size-guide-${size}`} className={cn(
                "p-2 bg-gray-100 rounded",
                isMobile ? "text-xs" : ""
              )}>
                <span className="font-semibold block">{size}</span>
                <span>{`${color} (${count}x)`}</span>
                <span className="block text-gray-600">Hardware: {hardwareBag}</span>
                <span className="block text-gray-600">Rail: {mountingRail}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default DetailsTabContent