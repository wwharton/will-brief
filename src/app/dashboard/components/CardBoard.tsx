'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, X } from 'lucide-react'

interface CardItem {
  id: string
  content: string
}

interface Lane {
  id: string
  title: string
  cards: CardItem[]
}

export function CardBoard() {
  const [lanes, setLanes] = useState<Lane[]>([])
  const [newLaneTitle, setNewLaneTitle] = useState('')

  const addLane = () => {
    if (newLaneTitle.trim() !== '') {
      setLanes([...lanes, { id: Date.now().toString(), title: newLaneTitle, cards: [] }])
      setNewLaneTitle('')
    }
  }

  const addCard = (laneId: string) => {
    setLanes(lanes.map(lane => {
      if (lane.id === laneId) {
        return {
          ...lane,
          cards: [...lane.cards, { id: Date.now().toString(), content: 'New Card' }]
        }
      }
      return lane
    }))
  }

  const removeCard = (laneId: string, cardId: string) => {
    setLanes(lanes.map(lane => {
      if (lane.id === laneId) {
        return {
          ...lane,
          cards: lane.cards.filter(card => card.id !== cardId)
        }
      }
      return lane
    }))
  }

  return (
    <div className="p-4 h-screen flex flex-col">
      <Card className="mb-4">
        <CardContent className="flex items-center space-x-2 pt-6">
          <Input
            type="text"
            placeholder="New Lane Title"
            value={newLaneTitle}
            onChange={(e) => setNewLaneTitle(e.target.value)}
          />
          <Button onClick={addLane}>Add Lane</Button>
        </CardContent>
      </Card>
      <ScrollArea className="flex-grow">
        <div className="flex space-x-4 pb-4">
          {lanes.map(lane => (
            <Card key={lane.id} className="flex-shrink-0 w-80">
              <CardHeader>
                <CardTitle>{lane.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  onClick={() => addCard(lane.id)} 
                  variant="outline" 
                  className="w-full"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Card
                </Button>
                <ScrollArea className="h-[calc(100vh-300px)]">
                  {lane.cards.map(card => (
                    <Card key={card.id} className="mb-2">
                      <CardContent className="p-2 flex justify-between items-center">
                        <span>{card.content}</span>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => removeCard(lane.id, card.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

