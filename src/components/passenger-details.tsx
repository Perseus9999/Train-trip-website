"use client"

import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import { Card } from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Checkbox } from "@/src/components/ui/checkbox"
import { Plane, ArrowRight, Mail, User, CreditCard } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface PassengerDetailsProps {
  outResultId : string,
  departureRoute : string,
  departureDate : string,
  outboundClass : string,
  outboundDuration : string,
  inResultId : string,
  returnRoute : string,
  returnDate : string,
  inboundClass : string,
  inboundDuration : string,
  totalFare: string
}

export default function PassengerDetails({
  outResultId = "",
  departureRoute = "",
  departureDate = "",
  outboundClass = "",
  outboundDuration = "",
  inResultId = "",
  returnRoute = "",
  returnDate = "",
  inboundClass = "",
  inboundDuration = "",
  totalFare= ""
}: PassengerDetailsProps) {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    dateOfBirth: "",
    idType: "",
    idNumber: "",
    country: "United Kingdom",
    loyaltyCard: "",
    newsletter: true,
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const router = useRouter();

  const handleMovePage = () => {
    const params = new URLSearchParams({
      loginFormData: JSON.stringify(formData),
    });
    router.push(`/review-page?${params.toString()}`);
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="text-white p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4 pl-6 pr-48">
            <Link href={'/'}>
              <img src={'./Main Logo.jpg'}/>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-semibold text-foreground mb-6">Passenger Details</h1>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
              ✓
            </div>
            <span className="text-purple-600 font-medium">Search</span>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
              ✓
            </div>
            <span className="text-purple-600 font-medium">Select</span>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
              3
            </div>
            <span className="text-purple-600 font-medium">Passenger</span>
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

        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-2">Passenger Details</h2>
          <p className="text-gray-600">Please provide your travel information to complete the booking</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Mail className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-medium text-foreground">Contact Information</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-foreground">
                    Email Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">We'll send your ticket and updates to this email</p>
                </div>
              </div>
            </Card>

            {/* Personal Information */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-medium text-foreground">Personal Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-sm font-medium text-foreground">
                    First Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="lastName" className="text-sm font-medium text-foreground">
                    Last Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    placeholder="Smith"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-foreground">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    placeholder="+44 7123 456789"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">Optional - for journey updates via SMS</p>
                </div>

                <div>
                  <Label htmlFor="dateOfBirth" className="text-sm font-medium text-foreground">
                    Date of Birth <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            </Card>

            {/* Identity & Travel Information */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-medium text-foreground">Identity & Travel Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="idType" className="text-sm font-medium text-foreground">
                    ID Type
                  </Label>
                  <Select value={formData.idType} onValueChange={(value) => handleInputChange("idType", value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select ID Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="passport">Passport</SelectItem>
                      <SelectItem value="driving-license">Driving License</SelectItem>
                      <SelectItem value="national-id">National ID Card</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="idNumber" className="text-sm font-medium text-foreground">
                    ID Number
                  </Label>
                  <Input
                    id="idNumber"
                    placeholder="Enter ID number"
                    value={formData.idNumber}
                    onChange={(e) => handleInputChange("idNumber", e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="country" className="text-sm font-medium text-foreground">
                    Country of Residence
                  </Label>
                  <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                      <SelectItem value="United States">United States</SelectItem>
                      <SelectItem value="France">France</SelectItem>
                      <SelectItem value="Germany">Germany</SelectItem>
                      <SelectItem value="Spain">Spain</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="loyaltyCard" className="text-sm font-medium text-foreground">
                    Loyalty Card Number
                  </Label>
                  <Input
                    id="loyaltyCard"
                    placeholder="Optional"
                    value={formData.loyaltyCard}
                    onChange={(e) => handleInputChange("loyaltyCard", e.target.value)}
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">Enter your rail loyalty card number if you have one</p>
                </div>
              </div>
            </Card>

            {/* Newsletter Checkbox */}
            <Card className="p-4">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="newsletter"
                  checked={formData.newsletter}
                  onCheckedChange={(checked) => handleInputChange("newsletter", checked as boolean)}
                />
                <div className="flex-1">
                  <label htmlFor="newsletter" className="text-sm text-foreground cursor-pointer">
                    Stay in the loop: get updates, special offers, and travel tips via email. You can unsubscribe at any
                    time.
                  </label>
                </div>
              </div>
            </Card>

            <Button 
              className="w-full bg-purple-600 hover:bg-purple-700 py-3"
              onClick={() => handleMovePage()}
            >
              Continue to Review Journey
            </Button>
          </div>

          {/* Journey Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-purple-100 rounded flex items-center justify-center">
                  <Plane className="w-4 h-4 text-purple-600" />
                </div>
                <h3 className="text-lg font-medium text-foreground">Journey Summary</h3>
              </div>

              {departureRoute && (
                <div>
                  <div className="bg-purple-600 text-white rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-center">
                        <div className="text-lg font-semibold">{departureRoute.split("→")[0]}</div>
                      </div>
                      <ArrowRight className="w-5 h-5" />
                      <div className="text-center">
                        <div className="text-lg font-semibold">{departureRoute.split("→")[1]}</div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm opacity-90">{outboundDuration}</div>
                      <div className="text-xs opacity-75 mt-1">{departureDate}</div>
                    </div>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Class</span>
                      <span className="font-medium">
                        {
                          outboundClass == "FARE1" ? "Standard" :
                          outboundClass == "FARE2" ? "Second Class" :
                          outboundClass == "FARE3" ? "First Class" :
                          outboundClass == "FARE4" ? "Third Class" :
                          outboundClass == "FARE5" ? "Advanced Discounted Single" : ""
                        }
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Passengers</span>
                      <span className="font-medium">1 Adult</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Ticket Type</span>
                      <span className="font-medium">Digital Ticket</span>
                    </div>
                  </div>
                </div>
              )}
              {returnRoute && (
                <div>
                  <div className="bg-purple-600 text-white rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-center">
                        <div className="text-lg font-semibold">{returnRoute.split("→")[0]}</div>
                      </div>
                      <ArrowRight className="w-5 h-5" />
                      <div className="text-center">
                        <div className="text-lg font-semibold">{returnRoute.split("→")[1]}</div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm opacity-90">{inboundDuration}</div>
                      <div className="text-xs opacity-75 mt-1">{returnDate}</div>
                    </div>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Class</span>
                      <span className="font-medium">
                        {
                          inboundClass == "FARE1" ? "Standard" :
                          inboundClass == "FARE2" ? "Second Class" :
                          inboundClass == "FARE3" ? "First Class" :
                          inboundClass == "FARE4" ? "Third Class" :
                          inboundClass == "FARE5" ? "Advanced Discounted Single" : ""
                        }
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Passengers</span>
                      <span className="font-medium">1 Adult</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Ticket Type</span>
                      <span className="font-medium">Digital Ticket</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total Fare</span>
                  <span>€{Number(totalFare).toFixed(2)}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
