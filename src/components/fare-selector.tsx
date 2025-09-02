"use client"

import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import { Card } from "@/src/components/ui/card"
import { Checkbox } from "@/src/components/ui/checkbox"
import { Plane, ArrowRight, Check, X, AlertTriangle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function FareSelector() {
  const [selectedFare, setSelectedFare] = useState("standard")
  const [cancellationProtection, setCancellationProtection] = useState(false)
  const [seatReservation, setSeatReservation] = useState(true)

  const fares = [
    {
      id: "standard",
      name: "Standard",
      price: 37.06,
      features: [
        { text: "Digital ticket", included: true },
        { text: "Standard seating", included: true },
        { text: "Non-refundable", included: false },
        { text: "Changes not permitted", included: false },
      ],
    },
    {
      id: "standard-flex",
      name: "Standard Flex",
      price: 42.06,
      features: [
        { text: "Digital ticket", included: true },
        { text: "Standard seating", included: true },
        { text: "Refundable up to 24h before", included: true },
        { text: "One free change permitted", included: true },
      ],
      warning: "Only 5 seats left at this price",
    },
    {
      id: "first-class",
      name: "First Class",
      price: 52.06,
      features: [
        { text: "Digital ticket", included: true },
        { text: "First class seating", included: true },
        { text: "Complimentary refreshments", included: true },
        { text: "Fully refundable", included: true },
        { text: "Unlimited changes", included: true },
      ],
      warning: "Only 2 seats left at this price",
    },
  ]

  const calculateTotal = () => {
    const baseFare = fares.find((f) => f.id === selectedFare)?.price || 0
    const cancellation = cancellationProtection ? 4.98 : 0
    const seat = seatReservation ? 0 : 0 // Free in this case
    return baseFare + cancellation + seat
  }

  const router = useRouter();

  const handleContinueResult = () => {
    const params = new URLSearchParams({
    });
    router.push(`/passengerDetails-page?${params.toString()}`);
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="text-white p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4 pl-6 pr-48">
            <img src={'./Main Logo.jpg'}/>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-semibold text-foreground mb-6">Select Fare</h1>

        {/* Progress Steps */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
              1
            </div>
            <span className="text-purple-600 font-medium">Search</span>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
              2
            </div>
            <span className="text-purple-600 font-medium">Select</span>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-sm font-medium">
              3
            </div>
            <span className="text-gray-500">Passenger</span>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-sm font-medium">
              4
            </div>
            <span className="text-gray-500">Review</span>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-sm font-medium">
              5
            </div>
            <span className="text-gray-500">Payment</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Fare Selection */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-lg font-medium text-foreground mb-4">Select your fare</h2>
              <div className="space-y-4">
                {fares.map((fare) => (
                  <Card
                    key={fare.id}
                    className={`p-4 cursor-pointer transition-all ${
                      selectedFare === fare.id
                        ? "ring-2 ring-purple-600 border-purple-600"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedFare(fare.id)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-medium text-foreground">{fare.name}</h3>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-purple-600">€{fare.price.toFixed(2)}</div>
                        <div className="text-sm text-gray-500">per person</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-3">
                      {fare.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          {feature.included ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <X className="w-4 h-4 text-red-500" />
                          )}
                          <span className={feature.included ? "text-green-700" : "text-red-700"}>{feature.text}</span>
                        </div>
                      ))}
                    </div>

                    {fare.warning && (
                      <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded p-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm text-yellow-800">{fare.warning}</span>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>

            {/* Add Protection */}
            <div>
              <h2 className="text-lg font-medium text-foreground mb-4">Add protection to your journey</h2>
              <div className="space-y-4">
                <Card className="p-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                        id="cancellation"
                        checked={cancellationProtection}
                        onCheckedChange={() => setCancellationProtection}
                    />
                    <div className="flex-1">
                      <label htmlFor="cancellation" className="font-medium text-foreground cursor-pointer">
                        Cancellation Protection
                      </label>
                      <p className="text-sm text-gray-600 mt-1">
                        Cancel up to 2 hours before departure and get 70% back
                      </p>
                      <div className="text-purple-600 font-medium mt-1">+€4.98</div>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-start gap-3">
                    <Checkbox 
                        id="seat" 
                        checked={seatReservation} 
                        onCheckedChange={() => setSeatReservation} 
                    />
                    <div className="flex-1">
                      <label htmlFor="seat" className="font-medium text-foreground cursor-pointer">
                        Seat Reservation
                      </label>
                      <p className="text-sm text-gray-600 mt-1">Reserve your preferred seat - window or aisle</p>
                      <div className="text-purple-600 font-medium mt-1">+€0.00</div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* Journey Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-6">
              <h3 className="text-lg font-medium text-foreground mb-4">Journey Summary</h3>

              <div className="bg-purple-600 text-white rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <div className="text-lg font-semibold">LPB</div>
                    <div className="text-sm opacity-90">London Paddington</div>
                  </div>
                  <ArrowRight className="w-5 h-5" />
                  <div className="text-center">
                    <div className="text-lg font-semibold">LHB</div>
                    <div className="text-sm opacity-90">London Heathrow (T5)</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div>
                  <div className="font-medium text-foreground">Wed, 3 Sep 2025</div>
                  <div className="text-gray-600">04:34 - 04:59 (25 min)</div>
                </div>

                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">First class Fare</span>
                    <span className="font-medium">€148.22</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">4 passengers • €37.06 each</div>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Passengers:</span>
                  <span>1 Adult, 3 Youths</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Seat Reservation</span>
                  <span>€0.00</span>
                </div>

                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>€{calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Button
               className="w-full mt-6 bg-purple-600 hover:bg-purple-700"
               onClick={() => handleContinueResult()}
              >
                Continue to passenger details
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
