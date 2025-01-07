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

const Card: React.FC<CustomCardProps> = ({
  title,
  content,
  onEdit,
  onDelete,
}) => {
  const [cardColor] = useState("bg-blue-200")

  return (
    <ShadcnCard className={`flex flex-col w-full ${cardColor} relative border rounded-[--radius]`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle>{title}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 absolute top-2 right-2" aria-label="More options" data-testid="more-options-button">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Card Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {onDelete && (
                <DropdownMenuItem onClick={onDelete} data-testid="delete-option">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        {content && <CardDescription>{content}</CardDescription>}
      </CardContent>
      <CardFooter className="flex justify-end">
        {onEdit && (
          <Button variant="outline" size="sm" onClick={onEdit} data-testid="edit-button">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        )}
      </CardFooter>
    </ShadcnCard>
  )
}

export default Card