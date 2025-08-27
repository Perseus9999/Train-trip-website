"use client"

import SearchResultPage from "@/src/components/searchResultPage"
import { useSearchParams } from "next/navigation";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const departure = searchParams.get("from") || "";
  const arrival = searchParams.get("to") || "";
  const departureDate = searchParams.get("departDate") || "";
  const returnDate = searchParams.get("returnDate") || "";
  const travellers = searchParams.get("passengers") || "";

  return (
    <SearchResultPage from={departure} to={arrival} departDate={departureDate} returnDate={returnDate} passengers={travellers}/>
  )
}
