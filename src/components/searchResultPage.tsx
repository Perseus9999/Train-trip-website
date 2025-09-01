"use client"

import { useEffect, useState } from "react"
import { Button } from "@/src/components/ui/button"
import { Card } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import Link from "next/link"
import { useRouter } from "next/navigation"

const temple_result = '../res-json/standard-res.json'

interface TravelResult {
  id: string
  departureTime: string
  arrivalTime: string
  duration: string
  standardPrice: number
  firstClassPrice: number
  route: string
}

interface WaybeTravelResultsProps {
  from?: string
  to?: string
  departDate?: string
  returnDate?: string
  passengers?: string
  results?: TravelResult[]
}

// Helper to transform API data to TravelResult[]
function parseResults(json: any): TravelResult[] {
  if (!json?.data) return [];
  return json.data.map((item: any) => {
    const attrs = item.attributes;
    // Find fares for standard and first class
    const fares = item.relationships?.fares?.data || [];
    let standardPrice = null;
    let firstClassPrice = null;
    fares.forEach((fare: any) => {
      if (fare.fare_class?.code === "FARE-15" || fare.fare_class?.code === "FARE-1") {
        standardPrice = fare.price / 100; // Assuming price is in cents
      }
      if (fare.fare_class?.code === "FARE-10") {
        firstClassPrice = fare.price / 100;
      }
    });
    return {
      id: item.id,
      departureTime: attrs.departure_time?.slice(-5) || "",
      arrivalTime: attrs.arrival_time?.slice(-5) || "",
      duration: attrs.duration ? `${Math.round(attrs.duration / 60)} min` : "",
      standardPrice: standardPrice ?? attrs.cheapest_total_adult_price / 100,
      firstClassPrice: firstClassPrice ?? attrs.cheapest_total_adult_price / 100,
      route: attrs.leg_type || "",
    };
  });
}

export default function SearchResultPage({
  from = "London Paddington",
  to = "London Heathrow (T1)",
  departDate = "Wed 27 Aug",
  returnDate = "Thu 28 Aug",
  passengers = "1 59",
  results,
}: WaybeTravelResultsProps) {
  const [selectedResults, setSelectedResults] = useState<Set<string>>(new Set());
  const [showMore, setShowMore] = useState(false);
  const [sortBy, setSortBy] = useState<"departure" | "price" | "duration">("departure");
  const [routeType, setRouteType] = useState("out");
  const [displayedResults, setDisplayedResults] = useState<TravelResult[]>([]);

  let parsedResults: TravelResult[] = [];
  parsedResults = results && results.length > 0 ? results : parseResults(results);
  // if (Array.isArray(results) && results.length > 0 && "departureTime" in results[0]) {
  //   parsedResults = results;
  // } else if (results) {
  //   parsedResults = parseResults(results);
  // }

  const router = useRouter();

  if(routeType == "out") parsedResults = parsedResults.filter((item) => item.route === "outbound")
  else if (routeType == "in") parsedResults = parsedResults.filter((item) => item.route === "inbound")
  else parsedResults = parsedResults.filter((item) => item.route === "outbound")
  console.log(`routeType = ${routeType}, parsedResults => ${parsedResults}`)

  const sortedResults = [...parsedResults].sort((a, b) => {
    switch (sortBy) {
      case "departure":
        return a.departureTime.localeCompare(b.departureTime)
      case "price":
        return a.standardPrice - b.standardPrice
      case "duration":
        const getDurationMinutes = (duration: string) => {
          const match = duration.match(/(\d+) min/)
          return match ? Number.parseInt(match[1]) : 0
        }
        return getDurationMinutes(a.duration) - getDurationMinutes(b.duration)
      default:
        return 0
    }
  })

  useEffect(() => {
    setDisplayedResults(showMore ? sortedResults : sortedResults.slice(0, 5))
  }, [routeType, sortBy, showMore])

  const handleResultSelect = (resultId: string) => {
    const newSelected = new Set(selectedResults)
    if (newSelected.has(resultId)) {
      newSelected.delete(resultId)
    } else {
      newSelected.add(resultId)
    }
    setSelectedResults(newSelected)

    console.log("Selected Result Id=>", selectedResults)

    const params = new URLSearchParams({
    });
    router.push(`/selectFare-page`);
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-background">
      {/* Header */}
      <div className="mb-8">
        <div className="rounded-lg mb-6 text-center">
          <img src={'./Main Logo.jpg'}/>
        </div>

        <h2 className="text-2xl font-bold text-foreground mb-4">Results</h2>

        {/* Journey Summary */}
        <div className="flex items-center flex-col sm:flex-row gap-4 text-sm text-muted-foreground mb-4 mx-2">
          <div className="flex items-center justify-center gap-1 w-100">
            <span className="font-medium">{from}</span>
            <span>→</span>
            <span className="font-medium">{to}</span>
          </div>
          <div className="flex overflow-x-auto items-center justify-start gap-2 max-w-md mx-3 text-lg custom-scrollbar">
            <span className="flex-shrink-0 flex flex-col items-center">Departure: {departDate}</span>
            <span>•</span>
            <span className="flex-shrink-0 flex flex-col items-center">Passenger: {passengers}</span>
            <span>•</span>
            <span className="flex-shrink-0 flex flex-col items-center">Return: {returnDate}</span>
          </div>
          <div className="flex items-center justify-center w-70">
            <Button
              variant="outline"
              size="sm"
              className="ml-auto bg-purple-600 text-white border-purple-600 hover:bg-purple-700"
            >
              <Link href={'/'}>
                Modify Search
              </Link>
            </Button>
          </div>
        </div>

        {/* Date Selector */}
        {parseResults.length == 0 && 
          <div className="flex gap-2 mb-6 overflow-x-auto custom-scrollbar">
            {[
              { date: "23 Aug", day: "Fri", price: "£28.89" },
              { date: "24 Aug", day: "Sat", price: "£28.89" },
              { date: "25 Aug", day: "Sun", price: "£28.89" },
              { date: "26 Aug", day: "Mon", price: "£28.89" },
              { date: "27 Aug", day: "Tue", price: "£28.89", selected: true },
              { date: "28 Aug", day: "Wed", price: "£28.89" },
              { date: "29 Aug", day: "Thu", price: "£28.89" },
              { date: "30 Aug", day: "Fri", price: "£28.89" },
              { date: "31 Aug", day: "Sat", price: "£28.89" },
            ].map((day, index) => (
              <Button
                key={index}
                variant={day.selected ? "default" : "outline"}
                className={`flex-shrink-0 flex flex-col items-center p-3 h-auto ${
                  day.selected ? "bg-purple-600 text-white border-purple-600" : "border-border hover:border-purple-300"
                }`}
              >
                <span className="text-xs">{day.day}</span>
                <span className="font-medium">{day.date}</span>
                <span className="text-xs">{day.price}</span>
              </Button>
            ))}
          </div>
        }

        {/* Journey Type Tabs */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Button variant="outline" className={routeType == "out" ? "border-purple-600 text-purple-600 bg-transparent" : "border-border bg-transparent"} onClick={()=>setRouteType("out")}>
            Outbound • {departDate}
          </Button>
          { 
            returnDate && (
              <Button variant="outline" className={routeType == "in" ? "border-purple-600 text-purple-600 bg-transparent" : "border-border bg-transparent"} onClick={()=>setRouteType("in")}>
                Return • {returnDate}
              </Button>
            )
          }
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-muted-foreground">{parsedResults.length} trains found</p>
          <div className="flex gap-2 flex-col sm:flex-row">
            <Button
              variant="outline"
              size="sm"
              className={sortBy === "departure" ? "bg-purple-600 text-white border-purple-600" : ""}
              onClick={() => setSortBy("departure")}
            >
              Departure Time
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={sortBy === "price" ? "bg-purple-600 text-white border-purple-600" : ""}
              onClick={() => setSortBy("price")}
            >
              Price
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={sortBy === "duration" ? "bg-purple-600 text-white border-purple-600" : ""}
              onClick={() => setSortBy("duration")}
            >
              Duration
            </Button>
          </div>
        </div>
      </div>

      {/* Results List */}
      <div className="space-y-4">
        {displayedResults.map((result) => (
          <Card key={result.id} className="p-6 border-border hover:border-purple-300 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-lg font-bold text-foreground">
                    {result.departureTime} - {result.arrivalTime}
                  </div>
                  <Badge variant="secondary" className="text-muted-foreground">
                    {result.duration}
                  </Badge>
                </div>

                <div className="mb-4">
                  <h3 className="font-medium text-foreground mb-2">Select Fare Type:</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Standard</p>
                      <p className="font-bold text-foreground mb-2">£{result.standardPrice.toFixed(2)}</p>
                      <Button
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                        onClick={() => handleResultSelect(`${result.id}-standard`)}
                      >
                        Select
                      </Button>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">First class</p>
                      <p className="font-bold text-foreground mb-2">£{result.firstClassPrice.toFixed(2)}</p>
                      <Button
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                        onClick={() => handleResultSelect(`${result.id}-first`)}
                      >
                        Select
                      </Button>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">{result.route}</p>
              </div>

              <div className="ml-6 text-right">
                <div className="text-2xl font-bold text-purple-600">£{result.standardPrice.toFixed(2)}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Show More Button */}
      {parsedResults.length > 5 && (
        <div className="text-center mt-6">
          <Button
            variant="outline"
            onClick={() => setShowMore(!showMore)}
            className="border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950"
          >
            {showMore ? "Show Less" : `Show ${parsedResults.length - 5} Later Trains`}
          </Button>
        </div>
      )}
    </div>
  )
}
