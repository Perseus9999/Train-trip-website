"use client"

import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent } from "@/src/components/ui/card"
import { ArrowRight, User, Shield, CreditCard, Lock } from "lucide-react"

export function ReviewBooking() {
  const [selectedProtection, setSelectedProtection] = useState("cancellation")
  const [selectedPayment, setSelectedPayment] = useState("bitcoin")

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
        <h2 className="text-2xl font-bold text-foreground mb-2">Review Booking</h2>

        {/* Progress Steps */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
              1
            </div>
            <span className="text-sm text-gray-600">Search</span>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400" />
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
              2
            </div>
            <span className="text-sm text-gray-600">Select</span>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400" />
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
              3
            </div>
            <span className="text-sm text-gray-600">Passenger</span>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400" />
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
              4
            </div>
            <span className="text-sm font-medium text-purple-600">Review</span>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400" />
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
              5
            </div>
            <span className="text-sm text-gray-400">Payment</span>
          </div>
        </div>

        <div className="text-center mb-8">
          <h3 className="text-xl font-semibold text-foreground mb-2">Review Your Booking</h3>
          <p className="text-gray-600">Please review your details before proceeding to payment</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Booking Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Passenger Details */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <User className="w-5 h-5 text-purple-600" />
                  <h4 className="font-semibold text-foreground">Passenger Details</h4>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">FULL NAME</p>
                    <p className="text-foreground">Not provided</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">DATE OF BIRTH</p>
                    <p className="text-foreground">Not provided</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">EMAIL ADDRESS</p>
                    <p className="text-foreground">Not provided</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">PHONE NUMBER</p>
                    <p className="text-foreground">Not provided</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Travel Protection */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-5 h-5 text-purple-600" />
                  <h4 className="font-semibold text-foreground">Travel Protection</h4>
                </div>
                <div className="space-y-3">
                  <label className="flex items-start gap-3 p-4 border hover:border-gray-300 transition-colors rounded-lg cursor-pointer">
                    <input
                      type="radio"
                      name="protection"
                      value="cancellation"
                      checked={selectedProtection === "cancellation"}
                      onChange={(e) => setSelectedProtection(e.target.value)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-foreground">Cancellation Protection</div>
                      <div className="text-sm text-gray-600">Cancel up to 24 hours before departure</div>
                      <div className="text-sm font-medium text-green-600 mt-1">+ €2.14</div>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer hover:border-gray-300">
                    <input
                      type="radio"
                      name="protection"
                      value="comprehensive"
                      checked={selectedProtection === "comprehensive"}
                      onChange={(e) => setSelectedProtection(e.target.value)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-foreground">Comprehensive Protection</div>
                      <div className="text-sm text-gray-600">Covers cancellation, delays and missed connections</div>
                      <div className="text-sm font-medium text-green-600 mt-1">+ €4.48</div>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer hover:border-gray-300">
                    <input
                      type="radio"
                      name="protection"
                      value="none"
                      checked={selectedProtection === "none"}
                      onChange={(e) => setSelectedProtection(e.target.value)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-foreground">No Protection</div>
                      <div className="text-sm text-gray-600">Travel without protection</div>
                      <div className="text-sm font-medium text-green-600 mt-1">€0.00</div>
                    </div>
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard className="w-5 h-5 text-purple-600" />
                  <h4 className="font-semibold text-foreground">Payment Method</h4>
                </div>
                <p className="text-gray-600 mb-4">Pay securely using cryptocurrency</p>
                <div className="flex gap-3 mb-6">
                  <button
                    onClick={() => setSelectedPayment("bitcoin")}
                    className={`px-4 py-2 rounded-lg border font-medium ${
                      selectedPayment === "bitcoin"
                        ? "border-purple-600 bg-purple-50 text-purple-600"
                        : "border-gray-300 text-foreground hover:border-gray-400"
                    }`}
                  >
                    ₿ Bitcoin
                  </button>
                  <button
                    onClick={() => setSelectedPayment("ethereum")}
                    className={`px-4 py-2 rounded-lg border font-medium ${
                      selectedPayment === "ethereum"
                        ? "border-purple-600 bg-purple-50 text-purple-600"
                        : "border-gray-300 text-foreground hover:border-gray-400"
                    }`}
                  >
                    Ξ Ethereum
                  </button>
                  <button
                    onClick={() => setSelectedPayment("usdt")}
                    className={`px-4 py-2 rounded-lg border font-medium ${
                      selectedPayment === "usdt"
                        ? "border-purple-600 bg-purple-50 text-purple-600"
                        : "border-gray-300 text-foreground hover:border-gray-400"
                    }`}
                  >
                    ₮ USDT
                  </button>
                </div>

                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3">
                  Continue to Payment
                </Button>

                <div className="flex items-center justify-center gap-2 mt-3 text-sm text-gray-500">
                  <Lock className="w-4 h-4" />
                  <span>Secured with 256-bit SSL encryption</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Trip Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-5 h-5 bg-purple-600 rounded flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded"></div>
                  </div>
                  <h4 className="font-semibold text-foreground">Trip Summary</h4>
                </div>

                {/* Route Card */}
                <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="text-center">
                      <div className="text-2xl font-bold">LON</div>
                      <div className="text-sm opacity-90">London</div>
                    </div>
                    <ArrowRight className="w-6 h-6" />
                    <div className="text-center">
                      <div className="text-2xl font-bold">PAR</div>
                      <div className="text-sm opacity-90">Paris</div>
                    </div>
                  </div>
                  <div className="text-center mt-2 text-sm opacity-90">Fri, Aug 1, 2025</div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">1 × Standard Ticket</span>
                    <span className="font-medium">€1.10</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service Fee</span>
                    <span className="font-medium">€1.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Protection (Selected)</span>
                    <span className="font-medium">€2.14</span>
                  </div>
                  <hr className="my-3" />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total Amount</span>
                    <span>€1.10 + €3.14</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
