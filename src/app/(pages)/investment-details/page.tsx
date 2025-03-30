'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  ChevronRight, 
  CheckCircle2, 
  TrendingUp, 
  Users, 
  PiggyBank, 
  Calendar, 
  X, 
  DollarSign, 
  Clock, 
  Target, 
  Sprout, 
  LineChart,
  BarChart3,
  Globe,
  Leaf,
  ShieldCheck,
  Lightbulb,
  BarChart4,
  Landmark,
  Info,
  Crown,
  UserPlus
} from 'lucide-react';
import Script from 'next/script';

export default function InvestmentDetails() {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('sectors');
  
  // Investment sectors
  const investmentSectors = [
    { id: 1, title: "Water-Based Enterprises", description: "Hydroponics, aquaponics, rainwater conservation", icon: <Sprout className="h-6 w-6" /> },
    { id: 2, title: "Soil & Input Services", description: "Organic fertilizers, biochar, sustainable practices", icon: <Leaf className="h-6 w-6" /> },
    { id: 3, title: "Seeds & Planting", description: "Quality seed production, indigenous conservation", icon: <Sprout className="h-6 w-6" /> },
    { id: 4, title: "Sustainable Farming", description: "Natural farming, precision & regenerative agriculture", icon: <Leaf className="h-6 w-6" /> },
    { id: 5, title: "Agri-Tech Solutions", description: "Drones, IoT sensors, AI-driven farm advisory", icon: <BarChart3 className="h-6 w-6" /> },
    { id: 6, title: "Agri Support Services", description: "Market linkages, logistics, last-mile connectivity", icon: <Globe className="h-6 w-6" /> },
    { id: 7, title: "Agri-Inputs & Advisory", description: "Bio-fertilizers, extension services, precision management", icon: <Leaf className="h-6 w-6" /> },
    { id: 8, title: "Agri-Financial Services", description: "Agri-banking, insurance, fintech-enabled credit", icon: <LineChart className="h-6 w-6" /> },
    { id: 9, title: "Value Addition", description: "Processing, cold storage, warehousing, agro-parks", icon: <TrendingUp className="h-6 w-6" /> },
    { id: 10, title: "Education & Training", description: "Skill development, incubation, cooperative enterprises", icon: <Users className="h-6 w-6" /> }
  ];

  // Key stats
  const keyStats = [
    { label: "Market Opportunity", value: "$200B", icon: <DollarSign className="h-5 w-5" /> },
    { label: "Timeline", value: "2025-2035", icon: <Calendar className="h-5 w-5" /> },
    { label: "Potential Agripreneurs", value: "1 Million+", icon: <Users className="h-5 w-5" /> },
    { label: "Avg. Investment/Enterprise", value: "$23,375", icon: <PiggyBank className="h-5 w-5" /> }
  ];

  const whyInvestReasons = [
    { 
      title: "Government Backing", 
      description: "High-priority sector with incentives for agribusiness financing",
      icon: <CheckCircle2 className="h-10 w-10 text-green-500" />
    },
    { 
      title: "Tech-Driven Growth", 
      description: "Digital transactions, AI-driven management, IoT automation",
      icon: <BarChart3 className="h-10 w-10 text-green-500" />
    },
    { 
      title: "Rising Demand", 
      description: "Growing market for safe food, eco-friendly solutions, sustainable farming",
      icon: <TrendingUp className="h-10 w-10 text-green-500" />
    },
    { 
      title: "Youth Engagement", 
      description: "Large pool of technically trained graduates eager to enter agripreneurship",
      icon: <Users className="h-10 w-10 text-green-500" />
    }
  ];
  
  const highlightStats = [
    { figure: "40%", description: "Average annual growth across agri-tech sectors" },
    { figure: "200M+", description: "Rural beneficiaries impacted by 2035" },
    { figure: "50%", description: "Potential carbon footprint reduction in farming" },
    { figure: "3x", description: "Average income increase for smallholder farmers" }
  ];

  // No random values used, all predetermined
  const predefinedBlobs = [
    { top: '10%', right: '5%', width: '35%', height: '40%' },
    { bottom: '15%', left: '5%', width: '30%', height: '35%' }
  ];
  
  // Cal.com is now handled directly by element-click, so these functions are no longer needed
  // but we'll keep them for potential future use
  const openCalendar = () => {
    setIsCalendarOpen(true);
  };
  
  const closeCalendar = () => {
    setIsCalendarOpen(false);
  };

  return (
    <>
      <Script id="cal-embed" strategy="afterInteractive">
        {`
          (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
          Cal("init", "30min", {origin:"https://cal.com"});
          Cal.ns["30min"]("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
        `}
      </Script>
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white relative overflow-hidden pt-20 pb-16">
        {/* Animated gradient blobs with subtle motion */}
      {predefinedBlobs.map((blob, index) => (
          <motion.div 
          key={index}
          className="absolute bg-gradient-radial from-green-200/20 to-transparent opacity-60 blur-[100px] z-0"
          style={{
            ...blob
          }}
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.5, 0.6, 0.5],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
        />
      ))}
      
      {/* Subtle background pattern with inline SVG */}
      <div className="absolute inset-0 opacity-[0.03] z-0" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2316a34a' fill-opacity='0.2' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3Ccircle cx='13' cy='13' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '20px 20px'
        }}
      ></div>
      
      {/* Hero section with image and text */}
      <div className="container mx-auto px-4 mb-12 relative z-10">
        <div className="flex items-center mb-8">
          <Link href="/#investment" className="group flex items-center space-x-3 px-4 py-2 bg-white/80 backdrop-blur-sm text-green-700 hover:text-green-800 rounded-full shadow-sm border border-green-100 hover:border-green-200 hover:bg-white/90 transition-all duration-300">
            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            </div>
            <span className="font-medium">Back to Home</span>
          </Link>
        </div>
        
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-2xl overflow-hidden shadow-lg border border-green-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative h-[350px] lg:h-auto overflow-hidden">
            <Image 
                src="/images/investment-image.jpg" 
              alt="Investment Opportunities" 
              fill
                className="object-cover transition-transform duration-4000 hover:scale-105"
              priority
            />
              <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-transparent flex items-center lg:hidden">
              <div className="p-6">
                  <h1 className="text-3xl font-bold text-white">Agri-Entrepreneurship Investment</h1>
                  <p className="text-white/90 mt-2">$200 Billion Opportunity (2025-2035)</p>
                </div>
            </div>
          </div>
          
            <div className="p-8 lg:p-10 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 hidden lg:block">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-800">
                    Unlocking India's $200 Billion
                  </span>
                  <div>Agri-Entrepreneurship Opportunity</div>
                </h1>
                <p className="text-lg text-gray-700 mb-4 font-semibold">(2025-2035)</p>
                <p className="text-base text-gray-600 mb-6 leading-relaxed">
                  India's agricultural transformation offers unprecedented investment opportunities with a growing population, increasing global demand for sustainable food production, and rapid technological advancements.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                  {keyStats.map((stat, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-center space-x-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 + (index * 0.1) }}
                    >
                      <div className="p-2 rounded-full bg-green-50 text-green-500 flex-shrink-0">
                        {stat.icon}
                </div>
                      <div>
                        <span className="text-gray-700 font-semibold block">{stat.value}</span>
                        <span className="text-gray-500 text-xs block">{stat.label}</span>
                </div>
                    </motion.div>
                  ))}
              </div>
              
              <button
                  data-cal-link="sanghachadwam-foundation/30min"
                  data-cal-namespace="30min"
                  data-cal-config='{"layout":"month_view"}'
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 shadow-md transition duration-300 transform hover:translate-y-[-2px] hover:shadow-lg"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Schedule a Consultation
              </button>
            </motion.div>
          </div>
          </motion.div>
        </div>
        
        {/* Highlight stats in a banner */}
        <div className="bg-gradient-to-r from-green-900 to-green-700 py-10 mb-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-white">
              {highlightStats.map((stat, index) => (
                <motion.div 
                  key={index} 
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-3xl md:text-4xl font-bold mb-2">{stat.figure}</div>
                  <div className="text-sm md:text-base text-white/80">{stat.description}</div>
                </motion.div>
              ))}
            </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
          {/* REDESIGNED: The Opportunity & Investment Landscape */}
        <motion.div 
            className="mb-16 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col items-center text-center mb-12">
              <div className="inline-flex items-center justify-center mb-3">
                <span className="h-[2px] w-8 bg-green-400"></span>
                <span className="mx-3 px-4 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-green-50 to-green-100 text-green-800 border border-green-200">
                  Agricultural Ecosystem
                </span>
                <span className="h-[2px] w-8 bg-green-400"></span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
                A Diverse Investment <span className="relative inline-block">
                  <span className="relative z-10 text-green-600">Landscape</span>
                  <span className="absolute bottom-1.5 left-0 w-full h-3 bg-green-100 -z-0"></span>
                </span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                The Indian agricultural ecosystem spans multiple high-growth sub-sectors offering significant returns while addressing key challenges in infrastructure, financing, and skill development.
              </p>
            </div>
            
            {/* REDESIGNED: Content Tabs Navigation */}
            <div className="flex justify-center mb-12">
              <div className="inline-flex bg-white shadow-md rounded-full p-1.5 border border-gray-100">
                {['sectors', 'market', 'why-now'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-2.5 px-6 rounded-full font-medium text-sm transition-all duration-300 ${
                      activeTab === tab 
                        ? 'bg-green-600 text-white shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {tab === 'sectors' && 'Investment Sectors'}
                    {tab === 'market' && 'Market Potential'}
                    {tab === 'why-now' && 'Why Invest Now'}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Investment sectors tab - ENHANCED */}
            {activeTab === 'sectors' && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-16"
              >
                {/* Introduction */}
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                    <div className="md:col-span-2">
                      <h3 className="text-2xl font-bold text-gray-800 mb-3">Investment Opportunity Categories</h3>
                      <p className="text-gray-600 leading-relaxed">
                        India's $200 billion agricultural investment landscape is divided into strategic categories, each addressing critical needs in the ecosystem. These sectors offer diverse entry points for investors depending on their focus, risk appetite, and impact goals.
                      </p>
                    </div>
                    <div className="hidden md:block">
                      <div className="relative h-32 w-full">
                        <div className="absolute top-0 right-0 w-28 h-28 rounded-full bg-green-100"></div>
                        <div className="absolute bottom-0 left-0 w-28 h-28 rounded-full bg-blue-100"></div>
                        <div className="absolute inset-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl flex items-center justify-center">
                          <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600">10+</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Farming & Production */}
                <div>
                  <div className="flex items-center mb-8">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white mr-4 shadow-md">
                      <Leaf className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Farming & Production</h3>
                      <p className="text-gray-500 text-sm">Core agricultural production technologies and methods</p>
              </div>
                    <div className="ml-auto h-px w-1/4 bg-gradient-to-r from-green-200 to-transparent"></div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      {title: investmentSectors[2].title, description: investmentSectors[2].description, icon: investmentSectors[2].icon},
                      {title: investmentSectors[3].title, description: investmentSectors[3].description, icon: investmentSectors[3].icon},
                      {title: investmentSectors[0].title, description: investmentSectors[0].description, icon: investmentSectors[0].icon}
                    ].map((sector, index) => (
                      <motion.div
                        key={index}
                        className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-green-50 overflow-hidden group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.05 * index }}
                        whileHover={{ y: -5 }}
                      >
                        <div className="h-2 bg-gradient-to-r from-green-400 to-green-500"></div>
                        <div className="p-6">
                          <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center text-green-600 mb-4 group-hover:bg-green-100 transition-colors">
                            {sector.icon}
                          </div>
                          <h4 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-green-700 transition-colors">{sector.title}</h4>
                          <p className="text-gray-600">{sector.description}</p>
                          
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <span className="inline-flex items-center text-xs font-medium text-green-700">
                              <span className="mr-2">High Growth Potential</span>
                              <TrendingUp className="h-3.5 w-3.5" />
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  </div>
                  
                {/* Technology & Innovation */}
                <div>
                  <div className="flex items-center mb-8">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white mr-4 shadow-md">
                      <BarChart3 className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Technology & Innovation</h3>
                      <p className="text-gray-500 text-sm">Digital solutions transforming traditional farming</p>
                    </div>
                    <div className="ml-auto h-px w-1/4 bg-gradient-to-r from-blue-200 to-transparent"></div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      {title: investmentSectors[4].title, description: investmentSectors[4].description, icon: investmentSectors[4].icon},
                      {title: investmentSectors[1].title, description: investmentSectors[1].description, icon: investmentSectors[1].icon},
                      {title: investmentSectors[6].title, description: investmentSectors[6].description, icon: investmentSectors[6].icon}
                    ].map((sector, index) => (
                      <motion.div
                        key={index}
                        className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-blue-50 overflow-hidden group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.05 * index }}
                        whileHover={{ y: -5 }}
                      >
                        <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-500"></div>
                        <div className="p-6">
                          <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-100 transition-colors">
                            {sector.icon}
                  </div>
                          <h4 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">{sector.title}</h4>
                          <p className="text-gray-600">{sector.description}</p>
                          
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <span className="inline-flex items-center text-xs font-medium text-blue-700">
                              <span className="mr-2">Innovation Leaders</span>
                              <CheckCircle2 className="h-3.5 w-3.5" />
                            </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
                </div>

                {/* Infrastructure & Services */}
                <div>
                  <div className="flex items-center mb-8">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white mr-4 shadow-md">
                      <Globe className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Infrastructure & Services</h3>
                      <p className="text-gray-500 text-sm">Market connectivity and logistics solutions</p>
                    </div>
                    <div className="ml-auto h-px w-1/4 bg-gradient-to-r from-purple-200 to-transparent"></div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      {title: investmentSectors[5].title, description: investmentSectors[5].description, icon: investmentSectors[5].icon},
                      {title: investmentSectors[8].title, description: investmentSectors[8].description, icon: investmentSectors[8].icon},
                      {title: investmentSectors[7].title, description: investmentSectors[7].description, icon: investmentSectors[7].icon}
                    ].map((sector, index) => (
        <motion.div 
                        key={index}
                        className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-purple-50 overflow-hidden group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.05 * index }}
                        whileHover={{ y: -5 }}
                      >
                        <div className="h-2 bg-gradient-to-r from-purple-400 to-purple-500"></div>
                        <div className="p-6">
                          <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 mb-4 group-hover:bg-purple-100 transition-colors">
                            {sector.icon}
                          </div>
                          <h4 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-purple-700 transition-colors">{sector.title}</h4>
                          <p className="text-gray-600">{sector.description}</p>
                          
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <span className="inline-flex items-center text-xs font-medium text-purple-700">
                              <span className="mr-2">Scalable Networks</span>
                              <Users className="h-3.5 w-3.5" />
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Education & Knowledge */}
                <div>
                  <div className="flex items-center mb-8">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white mr-4 shadow-md">
                      <Users className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Education & Knowledge</h3>
                      <p className="text-gray-500 text-sm">Human capital development and skill building</p>
                    </div>
                    <div className="ml-auto h-px w-1/4 bg-gradient-to-r from-amber-200 to-transparent"></div>
                  </div>
                  
                  <motion.div
                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-amber-50 overflow-hidden group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="h-2 bg-gradient-to-r from-amber-400 to-amber-500"></div>
                    <div className="p-6 md:p-8">
                      <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="w-16 h-16 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 group-hover:bg-amber-100 transition-colors">
                          {investmentSectors[9].icon}
                </div>
                <div className="flex-1">
                          <h4 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-amber-700 transition-colors">{investmentSectors[9].title}</h4>
                          <p className="text-gray-600 mb-4">{investmentSectors[9].description}</p>
                          
                          <div className="pt-4 border-t border-gray-100">
                            <span className="inline-flex items-center text-xs font-medium text-amber-700">
                              <span className="mr-2">Long-term Impact</span>
                              <Target className="h-3.5 w-3.5" />
                            </span>
                          </div>
                </div>
              </div>
          </div>
        </motion.div>
      </div>
              </motion.div>
            )}
      
            {/* Market potential tab - ENHANCED */}
            {activeTab === 'market' && (
          <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-12"
              >
                {/* Market Overview */}
                <div className="bg-gradient-to-br from-green-900 to-green-800 rounded-2xl overflow-hidden shadow-xl">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="p-8 md:p-10 text-white">
                      <span className="inline-block text-xs font-semibold tracking-wider text-green-300 uppercase mb-2">Market Overview</span>
                      <h2 className="text-3xl md:text-4xl font-bold mb-4">$200 Billion Opportunity</h2>
                      <div className="h-1 w-24 bg-green-500 rounded mb-6"></div>
                      <p className="text-green-100 leading-relaxed mb-6">
                        India's agricultural sector represents one of the largest untapped investment landscapes globally, with opportunities spanning the entire value chain from farm inputs to consumer products.
                      </p>
                      
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <div className="text-4xl font-bold text-white mb-1">10%</div>
                          <div className="text-green-300 text-sm">Annual Growth</div>
            </div>
                <div>
                          <div className="text-4xl font-bold text-white mb-1">2035</div>
                          <div className="text-green-300 text-sm">Target Year</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-green-800/50 to-green-900/50 p-8 md:p-10 flex flex-col justify-between border-l border-green-700/30">
                      <div className="mb-8">
                        <h3 className="text-xl font-bold text-white mb-4">Key Market Drivers</h3>
                        <ul className="space-y-4">
                          <li className="flex items-start text-green-100">
                            <CheckCircle2 className="h-5 w-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                            <span>Rising global food demand and supply constraints</span>
                          </li>
                          <li className="flex items-start text-green-100">
                            <CheckCircle2 className="h-5 w-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                            <span>Increasing focus on sustainable and climate-resilient agriculture</span>
                          </li>
                          <li className="flex items-start text-green-100">
                            <CheckCircle2 className="h-5 w-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                            <span>Technology adoption accelerating efficiency and productivity</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="pt-6 border-t border-green-700/30">
                        <div className="flex items-center text-green-300 text-sm">
                          <TrendingUp className="h-4 w-4 mr-2" />
                          <span>Projections based on current growth trajectories</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Financing Gap Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl overflow-hidden shadow-lg h-full">
                      <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 text-white">
                        <h2 className="text-2xl font-bold mb-2">The Financing Gap</h2>
                        <p className="text-white/90">
                          Despite agriculture being a priority lending sector, significant gaps exist in financing the agri-entrepreneurial ecosystem.
                        </p>
                      </div>
                      <div className="p-6 md:p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-6">
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                              <div className="p-2 rounded-full bg-green-50 text-green-600 mr-3">
                                <Target className="h-5 w-5" />
                              </div>
                              Current Challenges
                            </h3>
                            <ul className="space-y-2 text-gray-600">
                              <li className="flex items-start">
                                <span className="text-green-500 mr-2">•</span>
                                <span>Lack of last-mile financial connectivity</span>
                              </li>
                              <li className="flex items-start">
                                <span className="text-green-500 mr-2">•</span>
                                <span>Fragmented funding programs and difficult access</span>
                              </li>
                              <li className="flex items-start">
                                <span className="text-green-500 mr-2">•</span>
                                <span>Risk perception limiting institutional investment</span>
                              </li>
                            </ul>
                          </div>
                <div>
                            <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                              <div className="p-2 rounded-full bg-green-50 text-green-600 mr-3">
                                <LineChart className="h-5 w-5" />
                              </div>
                              Investment Opportunities
                            </h3>
                            <ul className="space-y-2 text-gray-600">
                              <li className="flex items-start">
                                <span className="text-green-500 mr-2">•</span>
                                <span>Specialized agri-financing platforms and institutions</span>
                              </li>
                              <li className="flex items-start">
                                <span className="text-green-500 mr-2">•</span>
                                <span>Innovative financing models with blended capital</span>
                              </li>
                              <li className="flex items-start">
                                <span className="text-green-500 mr-2">•</span>
                                <span>Fintech solutions for rural financial inclusion</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                        
                        <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                          <p className="text-gray-700 italic">
                            "Strategic investments in agricultural finance can help unlock the immense potential of India's farming sector while delivering attractive financial returns."
                          </p>
                        </div>
                      </div>
                    </div>
                </div>

                <div>
                    <div className="bg-white rounded-xl overflow-hidden shadow-lg h-full">
                      <div className="relative h-48 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-blue-800/60 flex flex-col items-center justify-center text-center px-4">
                          <h2 className="text-xl text-white font-bold mb-2">Phygital Delivery Model</h2>
                          <div className="h-1 w-16 bg-blue-400 rounded mb-3"></div>
                          <p className="text-blue-100 text-sm">Physical + Digital Hybrid Approach</p>
                        </div>
                        <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-blue-500/20 blur-2xl"></div>
                        <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-blue-300/20 blur-2xl"></div>
                      </div>
                      <div className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <div className="bg-blue-50 rounded-full p-2 text-blue-600 mr-3 flex-shrink-0">
                              <CheckCircle2 className="h-4 w-4" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">Lower Operational Costs</h4>
                              <p className="text-sm text-gray-600">60-80% reduction in delivery expenses</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="bg-blue-50 rounded-full p-2 text-blue-600 mr-3 flex-shrink-0">
                              <CheckCircle2 className="h-4 w-4" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">Wider Reach</h4>
                              <p className="text-sm text-gray-600">Expanded access to remote agricultural communities</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="bg-blue-50 rounded-full p-2 text-blue-600 mr-3 flex-shrink-0">
                              <CheckCircle2 className="h-4 w-4" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">Data-Driven Decisions</h4>
                              <p className="text-sm text-gray-600">Real-time insights for adaptive management</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key Opportunity Drivers */}
                <motion.div 
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="p-8 md:p-10">
                    <div className="flex flex-col md:flex-row justify-between md:items-end mb-8 pb-6 border-b border-gray-100">
                      <div className="mb-4 md:mb-0">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Key Opportunity Drivers</h3>
                        <p className="text-gray-500">Critical factors shaping India's agricultural investment landscape</p>
                      </div>
                      <div className="inline-flex items-center text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-full">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                        <span>Validated market insights</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="p-5 rounded-xl bg-gradient-to-br from-green-50 to-green-100/50 border border-green-100">
                        <div className="flex items-center mb-4">
                          <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                          <h4 className="font-semibold text-green-900">Growing Demand</h4>
                        </div>
                        <p className="text-gray-600 text-sm">Domestic and global demand for sustainable agricultural products continues to surge, creating diverse market opportunities.</p>
                      </div>
                      
                      <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-100">
                        <div className="flex items-center mb-4">
                          <CheckCircle2 className="h-5 w-5 text-blue-600 mr-2" />
                          <h4 className="font-semibold text-blue-900">Policy Support</h4>
                        </div>
                        <p className="text-gray-600 text-sm">Government initiatives like the Double Farmers' Income program create a favorable policy environment for agricultural investments.</p>
                      </div>
                      
                      <div className="p-5 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100/50 border border-purple-100">
                        <div className="flex items-center mb-4">
                          <CheckCircle2 className="h-5 w-5 text-purple-600 mr-2" />
                          <h4 className="font-semibold text-purple-900">Digital Revolution</h4>
                        </div>
                        <p className="text-gray-600 text-sm">Technological advancements are creating unprecedented supply chain efficiencies and new business models in agriculture.</p>
                      </div>
                      
                      <div className="p-5 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-100">
                        <div className="flex items-center mb-4">
                          <CheckCircle2 className="h-5 w-5 text-amber-600 mr-2" />
                          <h4 className="font-semibold text-amber-900">Climate-Smart Solutions</h4>
                        </div>
                        <p className="text-gray-600 text-sm">Innovations addressing sustainability challenges present significant opportunities for impact-focused investors.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
            
            {/* Why Invest Now tab - ENHANCED */}
            {activeTab === 'why-now' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-12"
              >
                {/* Hero Banner - Why Now */}
                <div className="relative overflow-hidden rounded-2xl">
                  <div className="bg-gradient-to-r from-amber-900 to-amber-700 p-8 md:p-12 lg:p-16 relative z-10 text-white">
                    <div className="max-w-4xl">
                      <span className="inline-block text-xs font-semibold tracking-wider text-amber-300 uppercase mb-2">Time-Sensitive Opportunity</span>
                      <h2 className="text-3xl md:text-4xl font-bold mb-6">Why the Time to Invest is Now</h2>
                      <div className="h-1 w-24 bg-amber-500 rounded mb-6"></div>
                      <p className="text-xl leading-relaxed text-amber-100 mb-4">
                        The confluence of market demand, technological innovation, and policy support creates a unique window of opportunity for investors in Indian agriculture.
                      </p>
                      <p className="text-white/80">
                        Early investors will benefit from first-mover advantages, strategic positioning, and the ability to shape emerging market segments.
                      </p>
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 w-1/3 h-full overflow-hidden">
                    <div className="absolute -right-20 top-1/2 transform -translate-y-1/2 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute -right-40 top-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl"></div>
                  </div>
                </div>

                {/* Key Drivers Grid */}
                <div>
                  <div className="text-center mb-10">
                    <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-700 to-amber-500 inline-block">Critical Market Inflection Points</h3>
                    <p className="text-gray-600 max-w-3xl mx-auto">
                      Several converging factors are creating unprecedented momentum in India's agricultural investment landscape
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white rounded-xl shadow-md overflow-hidden relative group hover:shadow-lg transition-all duration-300">
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-amber-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="p-8 relative z-10">
                        <div className="flex justify-between items-start mb-6">
                          <div className="bg-amber-100 text-amber-800 p-3 rounded-lg">
                            <TrendingUp className="h-8 w-8" />
                          </div>
                          <span className="text-amber-600 font-semibold">01</span>
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 mb-3">Accelerating Growth Trajectory</h4>
                        <p className="text-gray-600">
                          The agricultural sector is experiencing unprecedented growth, with potential to reach $200B by 2035, representing a 10% CAGR.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs rounded-full">10% CAGR</span>
                          <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs rounded-full">High-Growth Segments</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-xl shadow-md overflow-hidden relative group hover:shadow-lg transition-all duration-300">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="p-8 relative z-10">
                        <div className="flex justify-between items-start mb-6">
                          <div className="bg-blue-100 text-blue-800 p-3 rounded-lg">
                            <ShieldCheck className="h-8 w-8" />
                          </div>
                          <span className="text-blue-600 font-semibold">02</span>
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 mb-3">Supportive Policy Environment</h4>
                        <p className="text-gray-600">
                          Government initiatives like PLI schemes and funding programs create favorable conditions for agricultural investments.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">Tax Benefits</span>
                          <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">Regulatory Support</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-xl shadow-md overflow-hidden relative group hover:shadow-lg transition-all duration-300">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="p-8 relative z-10">
                        <div className="flex justify-between items-start mb-6">
                          <div className="bg-green-100 text-green-800 p-3 rounded-lg">
                            <Lightbulb className="h-8 w-8" />
                          </div>
                          <span className="text-green-600 font-semibold">03</span>
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 mb-3">Technological Transformation</h4>
                        <p className="text-gray-600">
                          Digital platforms, precision agriculture, and agritech innovations are revolutionizing traditional farming practices.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-green-50 text-green-700 text-xs rounded-full">AgriTech</span>
                          <span className="px-3 py-1 bg-green-50 text-green-700 text-xs rounded-full">Digital Integration</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Strategic Positioning Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-8">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                      <div className="bg-gray-900 p-6 text-white">
                        <h3 className="text-2xl font-bold mb-2">Strategic First-Mover Advantages</h3>
                        <p className="text-white/80">Early investors can secure key positions across the agricultural value chain</p>
                      </div>
                      <div className="p-6 md:p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-6">
                            <div className="flex gap-4">
                              <div className="flex-shrink-0 bg-amber-50 rounded-lg p-3 h-12 w-12 flex items-center justify-center">
                                <Crown className="h-6 w-6 text-amber-600" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-1">Market Leadership</h4>
                                <p className="text-gray-600 text-sm">Establish early position in high-growth segments to capture maximum market share.</p>
                              </div>
                            </div>
                            
                            <div className="flex gap-4">
                              <div className="flex-shrink-0 bg-amber-50 rounded-lg p-3 h-12 w-12 flex items-center justify-center">
                                <UserPlus className="h-6 w-6 text-amber-600" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-1">Partner Access</h4>
                                <p className="text-gray-600 text-sm">Secure relationships with premier implementation partners and farmer networks.</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-6">
                            <div className="flex gap-4">
                              <div className="flex-shrink-0 bg-amber-50 rounded-lg p-3 h-12 w-12 flex items-center justify-center">
                                <BarChart4 className="h-6 w-6 text-amber-600" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-1">Value Chain Integration</h4>
                                <p className="text-gray-600 text-sm">Develop integrated solutions across the agricultural value chain.</p>
                              </div>
                            </div>
                            
                            <div className="flex gap-4">
                              <div className="flex-shrink-0 bg-amber-50 rounded-lg p-3 h-12 w-12 flex items-center justify-center">
                                <Landmark className="h-6 w-6 text-amber-600" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-1">Institutional Support</h4>
                                <p className="text-gray-600 text-sm">Access government programs and incentives aimed at early innovators.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-8 pt-6 border-t border-gray-100">
                          <div className="flex items-center">
                            <Info className="h-5 w-5 text-blue-500 mr-3" />
                            <p className="text-sm text-gray-700">Industry analysts project that early entrants will capture up to 60% of market value in emerging agricultural segments.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-4">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full">
                      <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 p-6 text-white">
                        <Clock className="h-8 w-8 mb-4 text-emerald-300" />
                        <h3 className="text-xl font-bold mb-2">Timeline for Entry</h3>
                        <p className="text-white/80 text-sm">Agricultural market segments are reaching maturity at different rates</p>
                      </div>
                      <div className="p-6">
                        <div className="space-y-6">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium text-gray-700">Digital Agriculture</span>
                              <span className="text-xs text-red-600 font-semibold">Critical Window</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2">
                              <div className="bg-red-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Window closing in 12-18 months</p>
                          </div>
                          
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium text-gray-700">Sustainable Farming</span>
                              <span className="text-xs text-amber-600 font-semibold">Optimal Timing</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2">
                              <div className="bg-amber-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Prime entry window: 2-3 years</p>
                          </div>
                          
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium text-gray-700">Food Processing</span>
                              <span className="text-xs text-emerald-600 font-semibold">Emerging</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2">
                              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Developing opportunity: 3-5 years</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
    </main>
    </>
  );
} 