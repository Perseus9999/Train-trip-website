'use client'

import PassengerDetails from "@/src/components/passenger-details";
import { useSearchParams } from "next/navigation";

export default function PassengerDetailsPage() {
  const searchParams = useSearchParams();
  const outResultId = searchParams.get("outResultId") || "";
  const departureRoute = searchParams.get("departureRoute") || "";
  const departureDate = searchParams.get("departureDate") || "";
  const outboundClass = searchParams.get("outboundClass") || "";
  const outboundDuration = searchParams.get("outboundDuration") || "";
  const inResultId = searchParams.get("inResultId") || "";
  const returnRoute = searchParams.get("returnRoute") || "";
  const returnDate = searchParams.get("returnDate") || "";
  const inboundClass = searchParams.get("inboundClass") || "";
  const inboundDuration = searchParams.get("inboundDuration") || "";
  const totalFare = searchParams.get("totalFare") || "";
  return (
    <div className="min-h-screen bg-gray-50">
      <PassengerDetails 
        outResultId = {outResultId}
        departureRoute = {departureRoute}
        departureDate = {departureDate}
        outboundClass = {outboundClass}
        outboundDuration = {outboundDuration}
        inResultId = {inResultId}
        returnRoute = {returnRoute}
        returnDate = {returnDate}
        inboundClass = {inboundClass}
        inboundDuration = {inboundDuration}
        totalFare= {totalFare}
      />
    </div>
  )
}