"use client"

import { ReactNode, useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface LayoutProps {
  children: ReactNode
}

interface MenuItem {
  category: string
  items: string[]
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [activeContent, setActiveContent] = useState<string>('Welcome')

  const menuItems: MenuItem[] = [
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
    },
    {
      category: "Mission Analysis",
      items: ["Team Dallas"]
    }
  ]

  return (
    <div className="flex min-h-screen bg-background">
      {/* Menu Bar (20% width) */}
      <div className="w-1/5 p-4 border-r">
      {/* shadcn accordion should be dark styled */}
        <Accordion type="single" collapsible className="w-full dark">
          {menuItems.map((category, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger>{category.category}</AccordionTrigger>
              <AccordionContent>
                <ul className="py-2">
                  {category.items.map((item, itemIndex) => (
                    <li 
                      key={itemIndex}
                      className="py-2 px-4 hover:bg-accent rounded-md cursor-pointer"
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
        {children}
      </div>
    </div>
  )
}

export default Layout