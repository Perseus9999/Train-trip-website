'use client'

import FareSelector from "@/src/components/fare-selector"
import { useSearchParams } from "next/navigation";

export default function SelectFare() {
  const searchParams = useSearchParams();
  const outResultId = searchParams.get("outResultId") || "";
  const departureRoute = searchParams.get("departureRoute") || "";
  const departureDate = searchParams.get("departureDate") || "";
  const outboundClass = searchParams.get("outboundClass") || "";
  const outboundPrice = searchParams.get("outboundPrice") || "";
  const outboundDuration = searchParams.get("outboundDuration") || "";
  const inResultId = searchParams.get("inResultId") || "";
  const returnRoute = searchParams.get("returnRoute") || "";
  const returnDate = searchParams.get("returnDate") || "";
  const inboundClass = searchParams.get("inboundClass") || "";
  const inboundPrice = searchParams.get("inboundPrice") || "";
  const inboundDuration = searchParams.get("inboundDuration") || "";

  return (
    <div className="min-h-screen bg-gray-50">
      <FareSelector
        outResultId ={outResultId}
        departureRoute = {departureRoute}
        departureDate = {departureDate}
        outboundClass = {outboundClass}
        outboundPrice = {outboundPrice}
        outboundDuration = {outboundDuration}
        inResultId = {inResultId}
        returnRoute = {returnRoute}
        returnDate = {returnDate}
        inboundClass = {inboundClass}
        inboundPrice = {inboundPrice}
        inboundDuration = {inboundDuration}
      />
    </div>
  )
}
