"use client"

import { useWeb3 } from "./web3-provider"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Badge } from "./ui/badge"
import { ArrowDown, ArrowUp, Medal } from "lucide-react"
import { useState } from "react"

// Mock leaderboard data
const mockLeaderboardData = [
  {
    id: "1",
    address: "0x1234...5678",
    name: "Alex",
    accuracy: 85,
    totalBets: 20,
    amountEarned: 450,
    isPremium: true,
  },
  {
    id: "2",
    address: "0x5678...9012",
    name: "Taylor",
    accuracy: 78,
    totalBets: 18,
    amountEarned: 380,
    isPremium: true,
  },
  {
    id: "3",
    address: "0x9012...3456",
    name: "Jordan",
    accuracy: 72,
    totalBets: 25,
    amountEarned: 320,
    isPremium: false,
  },
  {
    id: "4",
    address: "0x3456...7890",
    name: "Morgan",
    accuracy: 68,
    totalBets: 15,
    amountEarned: 280,
    isPremium: false,
  },
  {
    id: "5",
    address: "0x7890...1234",
    name: "Casey",
    accuracy: 65,
    totalBets: 12,
    amountEarned: 220,
    isPremium: true,
  },
]

type SortField = "accuracy" | "totalBets" | "amountEarned"
type SortDirection = "asc" | "desc"

export function LeaderboardTable() {
  const { isConnected, address } = useWeb3()
  const [sortField, setSortField] = useState<SortField>("amountEarned")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")

  if (!isConnected) {
    return (
      <div className="text-center py-4">
        <p className="text-muted-foreground">Connect your wallet to view the leaderboard</p>
      </div>
    )
  }

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const sortedData = [...mockLeaderboardData].sort((a, b) => {
    const aValue = a[sortField]
    const bValue = b[sortField]

    if (sortDirection === "asc") {
      return aValue - bValue
    } else {
      return bValue - aValue
    }
  })

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12 text-center">Rank</TableHead>
            <TableHead>User</TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("accuracy")}>
              <div className="flex items-center">
                Accuracy
                {sortField === "accuracy" &&
                  (sortDirection === "asc" ? (
                    <ArrowUp className="ml-1 h-3 w-3" />
                  ) : (
                    <ArrowDown className="ml-1 h-3 w-3" />
                  ))}
              </div>
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("totalBets")}>
              <div className="flex items-center">
                Bets
                {sortField === "totalBets" &&
                  (sortDirection === "asc" ? (
                    <ArrowUp className="ml-1 h-3 w-3" />
                  ) : (
                    <ArrowDown className="ml-1 h-3 w-3" />
                  ))}
              </div>
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("amountEarned")}>
              <div className="flex items-center">
                Earned
                {sortField === "amountEarned" &&
                  (sortDirection === "asc" ? (
                    <ArrowUp className="ml-1 h-3 w-3" />
                  ) : (
                    <ArrowDown className="ml-1 h-3 w-3" />
                  ))}
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((user, index) => (
            <TableRow key={user.id} className={user.address.includes(address || "") ? "bg-muted/50" : ""}>
              <TableCell className="text-center font-medium">
                {index === 0 ? (
                  <Medal className="h-5 w-5 text-yellow-500 mx-auto" />
                ) : index === 1 ? (
                  <Medal className="h-5 w-5 text-gray-400 mx-auto" />
                ) : index === 2 ? (
                  <Medal className="h-5 w-5 text-amber-700 mx-auto" />
                ) : (
                  index + 1
                )}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span>{user.name}</span>
                  {user.isPremium && (
                    <Badge variant="outline" className="text-xs">
                      Premium
                    </Badge>
                  )}
                </div>
                <div className="text-xs text-muted-foreground">{user.address}</div>
              </TableCell>
              <TableCell>{user.accuracy}%</TableCell>
              <TableCell>{user.totalBets}</TableCell>
              <TableCell>{user.amountEarned} FB</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

