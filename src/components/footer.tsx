'use client'

import { useState } from "react"

export default function Footer() {

    return (
        <footer className={`text-white px-4 md:px-8 py-12 md:py-16 bg-footerbg`}>
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
                    {/* Logo and Description */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className={`flex col-span-1 items-center space-x-3 rounded-xl overflow-hidden`}>
                                <img src={"./Main Logo.jpg"} className="w-full" />
                            </div>
                        </div>
                        <p className="text-sm opacity-90 leading-relaxed">
                            Waybe Travel offers all travellers a multi-mode split ticketing option to find the fastest cheap way to
                            get to your destination.
                        </p>
                    </div>

                    {/* Customer Information */}
                    <div>
                        <h3 className="font-semibold mb-6 text-lg">Customer Information</h3>
                        <ul className="space-y-3 text-sm opacity-90">
                            <li className="hover:opacity-100 cursor-pointer transition-opacity">Cookies</li>
                            <li className="hover:opacity-100 cursor-pointer transition-opacity">Privacy</li>
                            <li className="hover:opacity-100 cursor-pointer transition-opacity">Terms & Conditions</li>
                            <li className="hover:opacity-100 cursor-pointer transition-opacity">Corporate Info</li>
                        </ul>
                    </div>

                    {/* Popular Cities */}
                    <div>
                        <h3 className="font-semibold mb-6 text-lg">Popular Cities</h3>
                        <ul className="space-y-3 text-sm opacity-90">
                            <li className="hover:opacity-100 cursor-pointer transition-opacity">NYC</li>
                            <li className="hover:opacity-100 cursor-pointer transition-opacity">Tampa</li>
                            <li className="hover:opacity-100 cursor-pointer transition-opacity">Austin</li>
                            <li className="hover:opacity-100 cursor-pointer transition-opacity">San Diego</li>
                        </ul>
                    </div>

                    {/* Popular Regions */}
                    <div>
                        <h3 className="font-semibold mb-6 text-lg">Popular Regions</h3>
                        <ul className="space-y-3 text-sm opacity-90">
                            <li className="hover:opacity-100 cursor-pointer transition-opacity">USA</li>
                            <li className="hover:opacity-100 cursor-pointer transition-opacity">UK/Europe</li>
                            <li className="hover:opacity-100 cursor-pointer transition-opacity">South America</li>
                        </ul>
                    </div>
                </div>

                <div className={`border-t pt-8 md:pt-10 border-purple-600`}>
                    <p className="text-center text-sm opacity-80 mb-8">Copyright 2024 – Waybe Travel – All Rights Reserved</p>

                    <div>
                        <h4 className="font-semibold mb-6 text-lg">International Sites</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3 hover:opacity-100 opacity-90 cursor-pointer transition-opacity">
                                    <span className="fi fi-es shadow-md"></span>
                                    <span>España - Viajes Baratos</span>
                                </div>
                                <div className="flex items-center space-x-3 hover:opacity-100 opacity-90 cursor-pointer transition-opacity">
                                    <span className="fi fi-de shadow-md"></span>
                                    <span>Deutschland - Günstige Reisen</span>
                                </div>
                                <div className="flex items-center space-x-3 hover:opacity-100 opacity-90 cursor-pointer transition-opacity">
                                    <span className="fi fi-jp shadow-md"></span>
                                    <span>日本 - 格安旅行</span>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3 hover:opacity-100 opacity-90 cursor-pointer transition-opacity">
                                    <span className="fi fi-fr shadow-md"></span>
                                    <span>France - Voyage Pas Cher</span>
                                </div>
                                <div className="flex items-center space-x-3 hover:opacity-100 opacity-90 cursor-pointer transition-opacity">
                                    <span className="fi fi-nl shadow-md"></span>
                                    <span>Nederland - Goedkope Reizen</span>
                                </div>
                                <div className="flex items-center space-x-3 hover:opacity-100 opacity-90 cursor-pointer transition-opacity">
                                    <span className="fi fi-in shadow-md"></span>
                                    <span>भारत - सस्ती यात्रा</span>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3 hover:opacity-100 opacity-90 cursor-pointer transition-opacity">
                                    <span className="fi fi-it shadow-md"></span>
                                    <span>Italia - Viaggi Economici</span>
                                </div>
                                <div className="flex items-center space-x-3 hover:opacity-100 opacity-90 cursor-pointer transition-opacity">
                                    <span className="fi fi-us shadow-md"></span>
                                    <span>USA - Cheap Travel</span>
                                </div>
                                <div className="flex items-center space-x-3 hover:opacity-100 opacity-90 cursor-pointer transition-opacity">
                                    <span className="fi fi-pt shadow-md"></span>
                                    <span>Portugal - Viagem Barata</span>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3 hover:opacity-100 opacity-90 cursor-pointer transition-opacity">
                                    <span className="fi fi-br shadow-md"></span>
                                    <span>Brasil - Viagem Barata</span>
                                </div>
                                <div className="flex items-center space-x-3 hover:opacity-100 opacity-90 cursor-pointer transition-opacity">
                                    <span className="fi fi-tr shadow-md"></span>
                                    <span>Türkiye - Ucuz Seyahat</span>
                                </div>
                                <div className="flex items-center space-x-3 hover:opacity-100 opacity-90 cursor-pointer transition-opacity">
                                    <span className="fi fi-pl shadow-md"></span>
                                    <span>Polska - Tanie Podróże</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}