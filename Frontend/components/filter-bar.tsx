"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export function FilterBar() {
  const [activeFilter, setActiveFilter] = useState("all")

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex gap-2">
        <Button
          variant={activeFilter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveFilter("all")}
        >
          All
        </Button>
        <Button
          variant={activeFilter === "open" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveFilter("open")}
        >
          Open
        </Button>
        <Button
          variant={activeFilter === "closed" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveFilter("closed")}
        >
          Closed
        </Button>
        <Button
          variant={activeFilter === "mine" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveFilter("mine")}
        >
          My Markets
        </Button>
      </div>

      <div className="flex-1">
        <Input placeholder="Search markets..." />
      </div>
    </div>
  )
}

