"use client"

import { useEffect, useState } from "react"
import { Button } from "@/src/components/ui/button"
import { Card } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from 'sonner'

const temple_result = '../res-json/standard-res.json'

interface TravelResult {
  id: string
  departureTime: string
  arrivalTime: string
  duration: string
  standardPrice: number
  firstClassPrice: number
  secondClassPrice: number
  thirdClassPrice: number
  advancedDiscountPrice: number
  cheapestPrice: number
  route: string
  classNum: number
}

interface WaybeTravelResultsProps {
  from?: string
  to?: string
  departDate?: string
  returnDate?: string
  passengers?: string
  results?: TravelResult[]
}

interface SelectedResultInfo {
  departureRoute: string
  returnRoute: string
  departureDate: string
  returnDate: string
  outboundClass: string
  inboundClass: string
  outboundPrice: string
  inboundPrice: string
  outboundDuration: string
  inboundDuration: string
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
    let secondClassPrice = null;
    let thirdClassPrice = null;
    let advancedDiscountPrice = null;
    let classNum = 0;

    const cheapestPrice = attrs.cheapest_total_adult_price / 100;

    fares.forEach((fare: any) => {
      if (fare.fare_class?.code === "FARE-1") {
        standardPrice = fare.price / 100; // Assuming price is in cents
        classNum++
      }
      if (fare.fare_class?.code === "FARE-2") {
        secondClassPrice = fare.price / 100; // Assuming price is in cents
        classNum++
      }
      if (fare.fare_class?.code === "FARE-3") {
        firstClassPrice = fare.price / 100; // Assuming price is in cents
        classNum++
      }
      if (fare.fare_class?.code === "FARE-4") {
        thirdClassPrice = fare.price / 100;
        classNum++
      }
      if (fare.fare_class?.code === "FARE-5") {
        advancedDiscountPrice = fare.price / 100;
        classNum++
      }
    });
    return {
      id: item.id,
      departureTime: attrs.departure_time?.slice(-5) || "",
      arrivalTime: attrs.arrival_time?.slice(-5) || "",
      duration: attrs.duration ? `${Math.round(attrs.duration / 60)} min` : "",
      standardPrice: standardPrice,
      firstClassPrice: firstClassPrice,
      secondClassPrice: secondClassPrice,
      thirdClassPrice: thirdClassPrice,
      advancedDiscountPrice: advancedDiscountPrice,
      cheapestPrice: cheapestPrice,
      route: attrs.leg_type || "",
      classNum: classNum
    };
  });
}

function getDayName(dateString: string): string {
  const date = new Date(dateString);
  // Days start from Sunday = 0
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[date.getDay()].slice(0, 3);
}

function parseResultId(resultId: string): { date: string; travelClass: string; marketplace: string } {
  const parts = resultId.split("-");

  const marketplace = parts[0];
  const departureISO = parts[3] + "-" + parts[4] + "-" + parts[5];
  const arrivalISO = parts[6] + "-" + parts[7] + "-" + parts[8];
  const travelClass = parts[9] + parts[10];

  const departureDate = new Date(departureISO);
  const arrivalDate = new Date(arrivalISO);

  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                  "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

  const pad = (n: number) => n.toString().padStart(2, "0");

  const dayName = days[departureDate.getDay()];
  const depDay = departureDate.getDate();
  const depMonth = months[departureDate.getMonth()];
  const arrDay = arrivalDate.getDate();
  const arrMonth = months[arrivalDate.getMonth()];

  const depTime = `${pad(departureDate.getHours())}:${pad(departureDate.getMinutes())}`;
  const arrTime = `${pad(arrivalDate.getHours())}:${pad(arrivalDate.getMinutes())}`;

  // Example: "THU, 4 Sept • 05:12 → 4 Sept • 05:33"
  const dateStr = `${dayName}, ${depDay} ${depMonth} • ${depTime} → ${arrDay} ${arrMonth} • ${arrTime}`;

  return { date: dateStr, travelClass, marketplace };
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
  const [outResultId, setOutResultId] = useState("");
  const [inResultId, setInResultId] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [sortBy, setSortBy] = useState<"departure" | "price" | "duration">("departure");
  const [routeType, setRouteType] = useState("out");
  const [displayedResults, setDisplayedResults] = useState<TravelResult[]>([]);
  const [selections, setSelections] =useState<SelectedResultInfo>({
    departureRoute: "",
    returnRoute: "",
    departureDate: "",
    returnDate: "",
    outboundClass: "",
    inboundClass: "",
    outboundPrice: "0",
    inboundPrice: "0",
    outboundDuration: "",
    inboundDuration: ""
  })

  let parsedResults: TravelResult[] = [];
  parsedResults = results && results.length > 0 ? results : parseResults(results);

  const router = useRouter();

  if (routeType == "out") parsedResults = parsedResults.filter((item) => item.route === "outbound")
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

  const handleResultSelect = (routeType: string, resultId: string, price: string, duration: string) => {
    const newSelected = new Set(selectedResults)
    if (newSelected.has(resultId)) {
      newSelected.delete(resultId)
    } else {
      newSelected.add(resultId)
    }
    setSelectedResults(newSelected)

    console.log("Selected Result Id=>", resultId)
    // const resultDate
    const{date, travelClass, marketplace} = parseResultId(resultId);
    console.log(`resultId => ${resultId}, date => ${date}, class => ${travelClass}`)
    if(routeType == "outbound") {
      setSelections(prev => ({...prev, departureRoute: `${from} → ${to}`}));
      setSelections(prev => ({...prev, departureDate: `${date}`}));
      setSelections(prev => ({...prev, outboundClass: `${travelClass}`}));
      setSelections(prev => ({...prev, outboundPrice: `${price}`}));
      setSelections(prev => ({...prev, outboundDuration: `${duration}`}));
      setOutResultId(resultId);
    } else if (routeType == "inbound") {
      setSelections(prev => ({...prev, returnRoute: `${to} → ${from}`}));
      setSelections(prev => ({...prev, returnDate: `${date}`}));
      setSelections(prev => ({...prev, inboundClass: `${travelClass}`}));
      setSelections(prev => ({...prev, inboundPrice: `${price}`}));
      setSelections(prev => ({...prev, inboundDuration: `${duration}`}));
      setInResultId(resultId);
    }
  }

  const continueBooking = (selectFareInfo: SelectedResultInfo) => {
    if (departDate && !selectFareInfo.departureRoute) {
      toast.error("Please select outbound journey.");
      return;
    } else if (returnDate && !selectFareInfo.returnDate) {
      toast.error("Please select return journey.");
      return;
    } else {
      const params = new URLSearchParams({
        outResultId: outResultId,
        departureRoute: selectFareInfo.departureRoute,
        departureDate: selectFareInfo.departureDate,
        outboundClass: selectFareInfo.outboundClass,
        outboundPrice: selectFareInfo.outboundPrice,
        outboundDuration: selectFareInfo.outboundDuration,
        inResultId: inResultId,
        returnRoute: selectFareInfo.returnRoute,
        returnDate: selectFareInfo.returnDate,
        inboundClass: selectFareInfo.inboundClass,
        inboundPrice: selectFareInfo.inboundPrice,
        inboundDuration: selectFareInfo.inboundDuration
      });
      router.push(`/selectFare-page?${params}`);
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-background">
      {/* Header */}
      <div className="mb-8">
        <div className="rounded-lg mb-6 text-center pr-36">
          <Link href={'/'}>
            <img src={'./Main Logo.jpg'} />
          </Link>
        </div>

        <h2 className="text-2xl font-bold text-foreground mb-4">Results</h2>

        {/* Journey Summary */}
        <div className="flex items-center flex-col sm:flex-row gap-4 text-sm text-muted-foreground mb-12 mx-2">
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
                className={`flex-shrink-0 flex flex-col items-center p-3 h-auto ${day.selected ? "bg-purple-600 text-white border-purple-600" : "border-border hover:border-purple-300"
                  }`}
              >
                <span className="text-xs">{day.day}</span>
                <span className="font-medium">{day.date}</span>
                <span className="text-xs">{day.price}</span>
              </Button>
            ))}
          </div>
        }

        {/* Your Selection */}
        <Card className=" mx-auto mt-8 border border-blue-200 rounded-lg shadow p-4 space-y-4 mb-12">
          <h2 className="text-2xl font-semibold text-foreground my-3">Your Selections</h2>

          {/* Outbound */}
          <div className="border border-l-8 border-purple-600 rounded-md p-4 flex justify-between items-start mt-4 text-foreground">
            <div>
              <p className="font-semibold mb-3">Outbound</p>
              <p className="font-medium mb-2">
                {selections.departureRoute}
              </p>
              <p className="text-sm">
                {selections.departureDate} | 
                {
                  selections.outboundClass == "FARE1" ? " Standard" :
                  selections.outboundClass == "FARE2" ? " Second class" :
                  selections.outboundClass == "FARE3" ? " First class" :
                  selections.outboundClass == "FARE4" ? " Third class" :
                  selections.outboundClass == "FARE5" ? " Advanced Discounted Single" : ""
                }
              </p>
            </div>
            <span className="font-semibold">€{selections.outboundPrice}</span>
          </div>

          {/* Return */}
          <div className="border border-l-8 border-purple-600 rounded-md p-4 flex justify-between items-start text-foreground">
            <div>
              <p className="font-semibold mb-3">Return</p>
              <p className="font-medium mb-2">
                {selections.returnRoute}
              </p>
              <p className="text-sm">
                {selections.returnDate} | 
                {
                  selections.inboundClass == "FARE1" ? " Standard" :
                  selections.inboundClass == "FARE2" ? " Second class" :
                  selections.inboundClass == "FARE3" ? " First class" :
                  selections.inboundClass == "FARE4" ? " Third class" : 
                  selections.inboundClass == "FARE5" ? " Advanced Discounted Single" : ""
                }
              </p>
            </div>
            <span className="font-semibold">€{selections.inboundPrice}</span>
          </div>
          <div className="grid grid-cols-3 bg-purple-600 rounded-md p-4 text-white font-semibold cursor-pointer hover:bg-purple-700 transition" onClick={() => continueBooking(selections)}>
            <span className="flex items-center justify-start"></span>
            <span className="flex items-center justify-center">Continue to Booking</span>
            <span className="flex items-center justify-end">Total: €{(Number(selections.outboundPrice) + Number(selections.inboundPrice)).toFixed(2).toString()}</span>
          </div>
        </Card>

        {/* Journey Type Tabs */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Button variant="outline" className={routeType == "out" ? "border-purple-600 text-purple-600 bg-transparent" : "border-border bg-transparent"} onClick={() => setRouteType("out")}>
            Outbound • {departDate} • {getDayName(departDate)}
          </Button>
          {
            returnDate && (
              <Button variant="outline" className={routeType == "in" ? "border-purple-600 text-purple-600 bg-transparent" : "border-border bg-transparent"} onClick={() => setRouteType("in")}>
                Return • {returnDate} • {getDayName(returnDate)}
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
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center justify-center gap-2 text-lg font-bold text-foreground">
                    {result.departureTime} - {result.arrivalTime}
                    <Badge variant="secondary" className="text-muted-foreground">
                      {result.duration}
                    </Badge>
                  </div>
                  <div className="ml-6 text-right flex item-center justify-end">
                    <div className="text-2xl font-bold text-purple-600">
                      <p className="flex items-center justify-end text-sm text-[#777777] ">From</p> 
                      £{result.cheapestPrice.toFixed(2)}
                    </div>
                  </div>
                </div>

                <div className="w-full h-[1px] bg-[#777777] mb-4"></div>

                <div className="mb-4">
                  <h3 className="font-medium text-foreground mb-2 text-xl">Select Fare Type:</h3>
                  <div className={
                    `grid ${
                      result.classNum == 5 ? "grid-cols-5" :
                      result.classNum == 4 ? "grid-cols-4" :
                      result.classNum == 3 ? "grid-cols-3" :
                      result.classNum == 2 ? "grid-cols-2" :
                      "grid-cols-1" 
                      }
                     gap-4`}
                    >
                    {result.advancedDiscountPrice && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1 h-12">Advanced Discounted Single</p>
                        <p className="font-bold text-foreground mb-2">£{result.advancedDiscountPrice.toFixed(2)}</p>
                        <Button
                          className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                          onClick={() => handleResultSelect(`${result.route}`, `${result.id}-FARE-5`, `${result.advancedDiscountPrice.toFixed(2)}`,  `${result.duration}`)}
                        >
                          Select
                        </Button>
                      </div>
                    )} 
                    {result.standardPrice && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1 h-12">Standard</p>
                        <p className="font-bold text-foreground mb-2">£{result.standardPrice.toFixed(2)}</p>
                        <Button
                          className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                          onClick={() => handleResultSelect(`${result.route}`, `${result.id}-FARE-1`, `${result.standardPrice.toFixed(2)}`,  `${result.duration}`)}
                        >
                          Select
                        </Button>
                      </div>
                    )}
                    {result.firstClassPrice && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1 h-12">First class</p>
                        <p className="font-bold text-foreground mb-2">£{result.firstClassPrice.toFixed(2)}</p>
                        <Button
                          className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                          onClick={() => handleResultSelect(`${result.route}`, `${result.id}-FARE-3`, `${result.firstClassPrice.toFixed(2)}`,  `${result.duration}`)}
                        >
                          Select
                        </Button>
                      </div>
                    )}
                    {result.secondClassPrice && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1 h-12">Second class</p>
                        <p className="font-bold text-foreground mb-2">£{result.secondClassPrice.toFixed(2)}</p>
                        <Button
                          className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                          onClick={() => handleResultSelect(`${result.route}`, `${result.id}-FARE-2`, `${result.secondClassPrice.toFixed(2)}`,  `${result.duration}`)}
                        >
                          Select
                        </Button>
                      </div>
                    )}
                    {result.thirdClassPrice && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1 h-12">Third class</p>
                        <p className="font-bold text-foreground mb-2">£{result.thirdClassPrice.toFixed(2)}</p>
                        <Button
                          className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                          onClick={() => handleResultSelect(`${result.route}`, `${result.id}-FARE-4`, `${result.thirdClassPrice.toFixed(2)}`,  `${result.duration}`)}
                        >
                          Select
                        </Button>
                      </div>
                    )}         
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{result.route}</p>
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
