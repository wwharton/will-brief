"use client"

import React, { useState } from "react"
import {
  Card as ShadcnCard,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Edit, Trash2, MoreVertical } from 'lucide-react'

interface CustomCardProps {
  title?: string
  content: string
  onEdit?: () => void
  onDelete?: () => void
}

const colorOptions = [
  { name: "Default", class: "bg-card" },
  { name: "Blue", class: "bg-blue-200" },
  { name: "Green", class: "bg-green-200" },
  { name: "Yellow", class: "bg-yellow-200" },
  { name: "Red", class: "bg-pink-200" },
  { name: "Purple", class: "bg-purple-200" },
]

const Card: React.FC<CustomCardProps> = ({
  title,
  content,
  onEdit,
  onDelete,
}) => {
  const [cardColor, setCardColor] = useState("bg-blue-200")

  return (
    <ShadcnCard className={`w-full ${cardColor} relative`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle>{title}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 absolute top-2 right-2">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Card Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Change Color</DropdownMenuLabel>
              {colorOptions.map((color) => (
                <DropdownMenuItem key={color.class} onClick={() => setCardColor(color.class)}>
                  <div className={`w-4 h-4 rounded-full ${color.class} mr-2`} />
                  {color.name}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              {onDelete && (
                <DropdownMenuItem onClick={onDelete}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        {content && <CardDescription>{content}</CardDescription>}
      </CardContent>
      <CardFooter className="flex justify-end">
        {onEdit && (
          <Button variant="outline" size="sm" onClick={onEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        )}
      </CardFooter>
    </ShadcnCard>
  )
}

export default Card

