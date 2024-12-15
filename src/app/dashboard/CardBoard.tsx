'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
      <div className="mb-4 flex items-center">
        <Input
          type="text"
          placeholder="New Lane Title"
          value={newLaneTitle}
          onChange={(e) => setNewLaneTitle(e.target.value)}
          className="mr-2"
        />
        <Button onClick={addLane}>Add Lane</Button>
      </div>
      <div className="flex-grow overflow-auto">
        <div className="flex space-x-4 h-full">
          {lanes.map(lane => (
            <div key={lane.id} className="flex-shrink-0 w-64 h-full">
              <div className="bg-gray-200 p-4 shadow-md h-full flex flex-col">
                <h2 className="text-xl font-bold mb-2">{lane.title}</h2>
                <Button 
                  onClick={() => addCard(lane.id)} 
                  variant="outline" 
                  className="w-full mb-2"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Card
                </Button>
                <div className="flex-grow overflow-y-auto">
                  {lane.cards.map(card => (
                    <Card key={card.id} className="mb-2 bg-[hsl(217.2,32.6%,17.5%)] text-[hsl(210,40%,98%)]">
                      <CardContent className="p-2 flex justify-between items-center">
                        <span>{card.content}</span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => removeCard(lane.id, card.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}