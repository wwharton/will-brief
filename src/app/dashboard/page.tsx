'use client'

import { useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
// import { Card, CardContent } from "@/components/ui/card"
import { CardBoard } from "@/app/dashboard/CardBoard"

export default function HomePage() {
  const [activeContent, setActiveContent] = useState('Welcome')

  const menuItems = [
    {
      category: "Category 1",
      items: ["Item 1", "Item 2", "Item 3"]
    },
    {
      category: "Category 2",
      items: ["Item 4", "Item 5", "Item 6"]
    },
    {
      category: "Category 3",
      items: ["Item 7", "Item 8", "Item 9"]
    }
  ]

  return (
    <div className="flex min-h-screen bg-background">
      {/* Menu Bar (20% width) */}
      <div className="w-1/5 p-4 border-r bg-[hsl(222.2,84%,4.9%)] text-[hsl(210,40%,98%)]">
        <Accordion type="single" collapsible className="w-full">
          {menuItems.map((category, index) => (
            <AccordionItem value={`item-${index}`} key={index} className="border-[hsl(217.2,32.6%,17.5%)]">
              <AccordionTrigger className="hover:no-underline">
                {category.category}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="py-2">
                  {category.items.map((item, itemIndex) => (
                    <li 
                      key={itemIndex}
                      className="py-2 px-4 hover:bg-[hsl(217.2,32.6%,17.5%)] hover:text-[hsl(210,40%,98%)] rounded-md cursor-pointer"
                      onClick={() => setActiveContent(item)}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Active Window (80% width) */}
      <div className="w-4/5 p-4">
        <CardBoard />
      </div>
    </div>
  )
}

