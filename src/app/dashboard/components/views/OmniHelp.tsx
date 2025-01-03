"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { MessageCircleQuestionIcon as QuestionMarkCircle, X } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface OmniHelpProps {
  viewName: string;
}

const OmniHelp: React.FC<OmniHelpProps> = ({ viewName }) => {
  const [isVisible, setIsVisible] = useState(true)

  const helpfulTips: Record<string, string[]> = {
    CardPool: [
      "Use the edit button to modify a card's content.",
      "Updating a card's category or subcategory will automatically re-organize it into the correct place",
      "Delete a card by clicking the ... icon on the card and selecting delete",
      "Categories, Subcategories, and Lanes are organized AlphaNumerically, consider using leading labels like '1 - ...' to help organize",
      "Cards are organized with an internal rank, drag and drop to reorganize them or change their lanes.",
    ],
    default: [
      "Organize with WillBrief!",
    ]
  }

  const tips = helpfulTips[viewName] || helpfulTips.default

  if (!isVisible) return null

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-4 right-4 rounded-full shadow-lg w-12 h-12 bg-white hover:bg-gray-100 border-2 border-gray-200"
        >
          <QuestionMarkCircle className="h-8 w-8 text-black" />
          <span className="sr-only">Help</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end" side="top">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg">Helpful Tips for {viewName}</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsVisible(false)}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Dismiss help</span>
            </Button>
          </div>
          <ul className="list-disc pl-4 space-y-2">
            {tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default OmniHelp

