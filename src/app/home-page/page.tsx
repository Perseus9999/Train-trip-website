"use client"

import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Card } from "@/src/components/ui/card"
import { Globe, User, Menu, Plane, Train, Bus, HelpCircle, Building, Users, Car, Sun, Moon } from "lucide-react"
import { useState, useEffect } from "react"
import TravellerSelector from "@/src/components/travellerSelector"
import { toast } from "@/src/components/ui/use-toast"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const [isDark, setIsDark] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [departure, setDeparture] = useState('')
  const [arrival, setArrival] = useState('')
  const [departureLabel, setDepartureLabel] = useState('')
  const [arrivalLabel, setArrivalLabel] = useState('')
  const stationOptions = [
    { value: 'GBLONLHB', label: 'London Heathrow T5' },
    { value: 'GBLONLPB', label: 'London Paddington' },
    { value: 'station3', label: 'Station 3' },
    { value: 'station4', label: 'Station 4' },
    { value: 'station5', label: 'Station 5' },
    { value: 'station6', label: 'Station 6' },
  ];
  // get time now
  function getCurrentDate(): string {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // months are 0-based
    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const [departureDate, setDepartureDate] = useState(getCurrentDate())
  const [returnDate, setReturnDate] = useState('')
  const [travellers, setTravellers] = useState("");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    setIsDark(savedTheme === "dark" || (!savedTheme && prefersDark))
  }, [])

  useEffect(() => {
    localStorage.setItem("theme", isDark ? "dark" : "light")
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  const router = useRouter();

  function searchTrains() {
    // Implement search functionality here
    if(!departure || !arrival || !departureDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before searching.",
        status: "warning",
        duration: 4000,
      });
      return;
    }
    toast({
      title: "Search Started",
      description: `Searching trains from ${departure} to ${arrival} on ${departureDate} returning on ${returnDate} for ${travellers}.`,
      status: "success",
      duration:4000
    });
    const params = new URLSearchParams({
      from: departure,
      to: arrival,
      fromName: departureLabel,
      toName: arrivalLabel,
      departDate: departureDate,
      returnDate: returnDate,
      passengers: travellers,
    });
    router.push(`/search-page?${params.toString()}`);
    console.log("Searching trains from", departure, "to", arrival, "on", departureDate, "returning on", returnDate, "for", travellers);
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 py-12 ${
        isDark
          // ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black"
          // : "bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800"
          ? "bg-[#00233a]"
          : "bg-[#6030f8]"     
      }`}
    >
      <style jsx>{`
          @keyframes glow {
            0% {
              box-shadow: 0 0 5px #0ff, 0 0 10px #0ff, 0 0 20px #0ff;
            }
            50% {
              box-shadow: 0 0 20px #0ff, 0 0 40px #0ff, 0 0 60px #0ff;
            }
            100% {
              box-shadow: 0 0 5px #0ff, 0 0 10px #0ff, 0 0 20px #0ff;
            }
          }
          .glow {
            animation: glow 2s infinite ease-in-out;
          }
        `}</style>
      {/* Header */}
      <header className="flex grid grid-cols-1 md:grid-cols-2 items-center justify-between px-4 md:px-12 py-6 mx-auto max-w-7xl">
        <div className={`${isDark ? "glow" : ""} flex col-span-1 items-center space-x-3 rounded-xl overflow-hidden`}>
          <img src={"./Main Logo.jpg"} className="w-full"/>
        </div>

        <div className="flex items-center space-x-3 md:space-x-4 text-white col-span-1 mt-12 mx-auto lg:mr-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDark(!isDark)}
            className="text-white hover:bg-white/10"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
          <Globe className="w-5 h-5 md:w-6 md:h-6 hidden sm:block" />
          <User className="w-5 h-5 md:w-6 md:h-6 hidden sm:block" />
          <User className="w-5 h-5 md:w-6 md:h-6 hidden md:block" />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white hover:bg-white/10 md:hidden"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <Menu className="w-6 h-6 hidden md:block" />
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/20 backdrop-blur-sm mx-4 mb-6 rounded-lg p-6">
          <div className="flex flex-col space-y-4 text-white">
            <div className="flex items-center space-x-3">
              <Globe className="w-5 h-5" />
              <span>Language</span>
            </div>
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5" />
              <span>Account</span>
            </div>
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5" />
              <span>Profile</span>
            </div>
          </div>
        </div>
      )}

      <div className="px-4 md:px-16 py-6 mx-auto max-w-7xl mb-12">
        <div className="flex items-center flex-wrap gap-3">
          <Button
            variant="outline"
            className={`text-sm md:text-base px-4 py-2 ${
              isDark
                ? "bg-gray-800 text-white border-gray-600 hover:bg-gray-700"
                : "bg-black text-white border-gray-600 hover:bg-gray-800"
            }`}
          >
            <Plane className="w-4 h-4 mr-2" />
            <span>Planes</span>
            {/* <span className="hidden sm:inline">Planes</span>
            <span className="sm:hidden">✈️</span> */}
          </Button>
          <Button
            className={`text-sm md:text-base px-4 py-2 ${
              isDark ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-purple-500 text-white hover:bg-purple-400"
            }`}
          >
            <Train className="w-4 h-4 mr-2" />
            <span>Trains</span>
            {/* <span className="hidden sm:inline">Trains</span>
            <span className="sm:hidden">🚂</span> */}
          </Button>
          <Button
            variant="outline"
            className="bg-transparent text-white border-white/30 hover:bg-white/10 text-sm md:text-base px-4 py-2"
          >
            <Bus className="w-4 h-4 mr-2" />
            <span>Autobus</span>
            {/* <span className="hidden sm:inline">Autobus</span>
            <span className="sm:hidden">🚌</span> */}
          </Button>
        </div>
      </div>

      <div className="px-4 md:px-8 mb-12 md:mb-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Book Train Travel With Crypto
          </h1>
          <p className="text-white/90 text-lg md:text-xl mb-8 md:mb-10 max-w-3xl leading-relaxed">
            Wherever you plan to go on your next train trip, scan the market globally, then find and book your train
            fare with crypto.
          </p>

          <div
            className={`rounded-xl flex items-center justify-center flex-col p-2 md:p-4 max-w-7xl shadow-2xl ${isDark ? "bg-gray-800 border border-gray-700" : "bg-white"}`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 items-end">
              <div className="sm:col-span-1">
                <label className={`block text-sm font-medium mb-3 ${isDark ? "text-gray-200" : "text-gray-700"}`}>
                  From
                </label>
                <Select
                  value={stationOptions.find(opt => opt.label === departure)?.value || ''}
                  onValueChange={value => {
                    const selected = stationOptions.find(opt => opt.value === value);
                    if (selected) {
                      setDeparture(selected.value);
                      setDepartureLabel(selected.label);
                    };
                  }}
                >
                  <SelectTrigger className={`w-full h-12 ${isDark ? "bg-gray-700 border-gray-600 text-white" : ""}`}>
                    <SelectValue placeholder={departureLabel || "Select Station"} />
                  </SelectTrigger>
                  <SelectContent>
                    {stationOptions.map(opt => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="sm:col-span-1">
                <label className={`block text-sm font-medium mb-3 ${isDark ? "text-gray-200" : "text-gray-700"}`}>
                  To
                </label>
                <Select
                  value={stationOptions.find(opt => opt.label === arrival)?.value || ''}
                  onValueChange={value => {
                    const selected = stationOptions.find(opt => opt.value === value);
                    if (selected) {
                      setArrival(selected.value);
                      setArrivalLabel(selected.label);
                    }
                  }}
                >
                  <SelectTrigger className={`w-full h-20 ${isDark ? "bg-gray-700 border-gray-600 text-white" : ""}`}>
                    <SelectValue placeholder={ arrivalLabel || "Select Station"} />
                  </SelectTrigger>
                  <SelectContent>
                    {stationOptions.map(opt => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="sm:col-span-1 lg:col-span-1">
                <label className={`block text-sm font-medium mb-3 ${isDark ? "text-gray-200" : "text-gray-700"}`}>
                  Depart
                </label>
                <Input
                  type="date"
                  defaultValue={getCurrentDate()}
                  className={`h-9 ${isDark ? "bg-gray-700 border-gray-600 text-white" : ""}`}
                  onChange={(e) => setDepartureDate((e.target as HTMLInputElement).value)}
                />
              </div>

              <div className="sm:col-span-1 lg:col-span-1">
                <label className={`block text-sm font-medium mb-3 ${isDark ? "text-gray-200" : "text-gray-700"}`}>
                  Return
                </label>
                <Input
                  type="date"
                  placeholder="mm/dd/yyyy"
                  className={`h-9 ${isDark ? "bg-gray-700 border-gray-600 text-white" : ""}`}
                  onChange={(e) => setReturnDate((e.target as HTMLInputElement).value)}
                />
              </div>

              <div className="sm:col-span-2 lg:col-span-1">
                <label className={`block text-sm font-medium mb-3 ${isDark ? "text-gray-200" : "text-gray-700"}`}>
                  <span className="hidden lg:inline">Travellers & Discount</span>
                  <span className="lg:hidden">Travellers</span>
                </label>
                <TravellerSelector theme={isDark} onChange={setTravellers}></TravellerSelector>
              </div>
            </div>
            <div className={`mt-8 rounded-lg ${!departure || !arrival || !departureDate ? "" : "glow"}`}>
              <Button
                className={`w-full sm:w-auto px-8 md:px-12 py-4 text-lg font-semibold ${
                  isDark ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-black text-white hover:bg-gray-800"
                }`}
                onClick={() => searchTrains()}
              >
                {
                  !departure || !arrival || !departureDate ? 
                  "Fill All Fields" :                 
                  // <Link href={'/search-page'}>
                      "Search"
                  // </Link>
                }
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 mb-12 md:mb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-12 md:gap-6">
            <Card
              className={`flex items-center justify-around flex-row p-2 md:p-4 hover:scale-105 transition-all cursor-pointer ${
                isDark ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-purple-500 text-white hover:bg-purple-400"
              }`}
            >
              <HelpCircle className="w-8 h-8 md:w-10 md:h-10" />
              <h3 className="font-semibold text-sm md:text-xl">How It Works</h3>
            </Card>

            <Card
              className={`flex items-center justify-around flex-row p-2 md:p-4 hover:scale-105 transition-all cursor-pointer ${
                isDark ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-purple-500 text-white hover:bg-purple-400"
              }`}
            >
              <Building className="w-8 h-8 md:w-10 md:h-10" />
              <h3 className="font-semibold text-sm md:text-xl">Hostels</h3>
            </Card>

            <Card
              className={`flex items-center justify-around flex-row p-2 md:p-4 hover:scale-105 transition-all cursor-pointer ${
                isDark ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-purple-500 text-white hover:bg-purple-400"
              }`}
            >
              <Users className="w-8 h-8 md:w-10 md:h-10" />
              <h3 className="font-semibold text-sm md:text-xl">Solo Trips</h3>
            </Card>

            <Card
              className={`flex items-center justify-around flex-row p-2 md:p-4 hover:scale-105 transition-all cursor-pointer ${
                isDark ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-purple-500 text-white hover:bg-purple-400"
              }`}
            >
              <Car className="w-8 h-8 md:w-10 md:h-10" />
              <h3 className="font-semibold text-sm md:text-xl">Car Hire</h3>
            </Card>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 mb-12 md:mb-16">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-xl overflow-hidden shadow-2xl">
            <img
              src="/person-with-backpack-looking-at-hot-air-balloons-i.png"
              alt="Solo traveler viewing hot air balloons"
              className="w-full h-72 md:h-96 lg:h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end">
              <div className="p-6 md:p-10 text-white">
                <h2 className="text-2xl md:text-4xl font-bold mb-3">Solo Travel Friendly Stays</h2>
                <p className="mb-6 opacity-90 text-base md:text-lg leading-relaxed">
                  Find the best places for solo travellers to stay
                </p>
                <Button
                  className={`px-6 py-3 text-base font-semibold ${
                    isDark ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-black text-white hover:bg-gray-800"
                  }`}
                >
                  Discover Stays
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
