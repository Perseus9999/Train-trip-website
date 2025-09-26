"use client";

import SearchResultPage from "@/src/components/searchResultPage";
import { AlertTriangle, BatteryWarning, Loader2, LoaderCircle, MessageCircleWarningIcon, MessageSquareWarningIcon, QuoteIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const departure = searchParams.get("from") || "";
  const arrival = searchParams.get("to") || "";
  const departureName = searchParams.get("fromName") || "";
  const arrivalName = searchParams.get("toName") || "";
  const departureDate = searchParams.get("departDate") || "";
  const returnDate = searchParams.get("returnDate") || "";
  const travellers = searchParams.get("passengers") || "";

  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

async function fetchTrainResults() {
    const passengers_count = travellers.slice(0, travellers.indexOf(" ")) || "1";
    const request_passenger_type = travellers.slice(travellers.indexOf(" ") + 1, travellers.indexOf(",")) || "Adult";
    console.log("request_passenger_type => ", request_passenger_type);
    let passengers_max_age = "25";
    if (request_passenger_type == "Child" || request_passenger_type == "Children") passengers_max_age = "15"
    else if (request_passenger_type == "Youth") passengers_max_age = "25"
    else if (request_passenger_type == "Adult" || request_passenger_type == "Adults") passengers_max_age = "59"
    else if (request_passenger_type == "Senior") passengers_max_age = "80" 
    else passengers_max_age = "25";
    console.log("passengers_max_age => ", passengers_max_age);
    const params = new URLSearchParams({
      departure,
      arrival,
      departureDate,
      returnDate,
      passengers_count,
      passengers_max_age
    });

    const response = await fetch(
      `http://train-trip-backend.vercel.app/api/connections?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch train results");
    }
    return response.json();
  }

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchTrainResults()
      .then((data) => setResult(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [departure, arrival, departureName, arrivalName, departureDate, returnDate, travellers]);

  if (loading) {
    return (
      <div className="bg-footerbg flex flex-col gap-24 items-center justify-center py-48 text-2xl text-white">
        <p>
          Loading search result...
        </p>
        <LoaderCircle className="h-36 w-36 animate-spin text-[#00ffb3]" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-footerbg flex flex-col items-center justify-center py-48 text-2xl text-white">
        <div className="flex flex-row items-center justify-center text-pink-600">
          <AlertTriangle className="w-10 h-10 mx-4 "/>
          <p className="text-4xl mb-2 flex items-center pt-2">Not Found Result</p>
        </div>
        <p className="text-sm ">Error: {error}</p>
      </div>
    )
  }

  console.log("Search Result => ", result);

  return (
    <SearchResultPage
      from={departureName}
      to={arrivalName}
      departDate={departureDate}
      returnDate={returnDate}
      passengers={travellers}
      results={result}
    />
  );
}
