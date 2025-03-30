'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronRight, CheckCircle2, TrendingUp, Users, PiggyBank, Calendar, X, DollarSign, Clock } from 'lucide-react';

export default function InvestmentDetails() {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  
  const investmentOpportunities = [
    {
      id: 1,
      title: "Natural Farming Cooperative",
      description: "Support a network of farmers transitioning to natural farming practices with higher margins and carbon credits revenue potential.",
      investment: "₹25-50 Lakhs",
      returns: "18-22% annually",
      duration: "5-7 years",
      impact: "Soil regeneration + Farmer income increase",
      image: "/images/natural-farming.jpg"
    },
    {
      id: 2,
      title: "AgriTech Incubation Fund",
      description: "Invest in promising agritech startups focused on solving critical challenges in India's agricultural ecosystem.",
      investment: "₹1-5 Crores",
      returns: "3-4x over investment period",
      duration: "5-8 years",
      impact: "Innovation + Rural employment",
      image: "/images/agritech.jpg"
    },
    {
      id: 3,
      title: "Rural Food Processing Unit",
      description: "Establish food processing facilities in rural areas to create value-added products from local agricultural produce.",
      investment: "₹75 Lakhs - 2 Crores",
      returns: "15-20% annually",
      duration: "3-5 years",
      impact: "Supply chain efficiency + Rural jobs",
      image: "/images/food-processing.jpg"
    }
  ];

  // No random values used, all predetermined
  const predefinedBlobs = [
    { top: '10%', right: '5%', width: '35%', height: '40%' },
    { bottom: '15%', left: '5%', width: '30%', height: '35%' }
  ];
  
  const openCalendar = () => {
    setIsCalendarOpen(true);
  };
  
  const closeCalendar = () => {
    setIsCalendarOpen(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white relative overflow-hidden pt-20 pb-16">
      {/* Gradient blobs - using predefined values instead of random */}
      {predefinedBlobs.map((blob, index) => (
        <div 
          key={index}
          className="absolute bg-gradient-radial from-green-200/20 to-transparent opacity-60 blur-[100px] z-0"
          style={{
            ...blob
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
          <Link href="/#investment" className="inline-flex items-center text-green-600 hover:text-green-700 font-medium transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-2xl overflow-hidden shadow-lg border border-green-100">
          <div className="relative h-[300px] lg:h-auto overflow-hidden">
            <Image 
              src="/images/investment-hero.jpg" 
              alt="Investment Opportunities" 
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 to-transparent flex items-center lg:hidden">
              <div className="p-6">
                <h1 className="text-3xl font-bold text-white">Investment Opportunities</h1>
                <p className="text-white/90 mt-2">Strategic investments with social impact</p>
              </div>
            </div>
          </div>
          
          <div className="p-8 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold text-gray-900 mb-4 hidden lg:block">Investment Opportunities</h1>
              <p className="text-lg text-gray-600 mb-6">
                Join us in transforming India's agricultural landscape through strategic, impactful investments that deliver both financial returns and social impact.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">15-20% ROI</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">3-7 years</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Social Impact</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Sustainable</span>
                </div>
              </div>
              
              <button
                onClick={openCalendar}
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 shadow-sm transition duration-300"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Schedule a Consultation
              </button>
            </motion.div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="mb-12 max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Current Investment Opportunities</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We offer various ways to invest in India's agricultural future. Each opportunity has been carefully vetted for both profit potential and positive impact.
          </p>
        </motion.div>
        
        {/* Investment opportunities */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {investmentOpportunities.map((opportunity, index) => (
            <motion.div
              key={opportunity.id}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-green-100 hover:shadow-xl transition-all duration-300 h-full flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -5 }}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={opportunity.image}
                  alt={opportunity.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-xl font-bold text-white">{opportunity.title}</h3>
                </div>
              </div>
              
              <div className="p-6 flex-grow">
                <p className="text-gray-600 mb-6">{opportunity.description}</p>
                
                <div className="space-y-4">
                  <div className="flex items-center text-gray-700">
                    <PiggyBank className="h-5 w-5 text-green-500 mr-2" />
                    <span className="font-medium mr-2">Investment:</span>
                    <span>{opportunity.investment}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-700">
                    <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                    <span className="font-medium mr-2">Expected returns:</span>
                    <span>{opportunity.returns}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-700">
                    <Clock className="h-5 w-5 text-green-500 mr-2" />
                    <span className="font-medium mr-2">Duration:</span>
                    <span>{opportunity.duration}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-700">
                    <Users className="h-5 w-5 text-green-500 mr-2" />
                    <span className="font-medium mr-2">Impact:</span>
                    <span>{opportunity.impact}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Investment process */}
        <motion.div 
          className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8 border border-green-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Investment Process</h2>
          
          <div className="space-y-4">
            {[
              { step: 1, title: "Initial Consultation", description: "We'll discuss your investment goals, preferences, and impact priorities." },
              { step: 2, title: "Opportunity Matching", description: "We'll identify investment opportunities aligned with your objectives and risk appetite." },
              { step: 3, title: "Due Diligence", description: "Complete transparency with comprehensive documentation and site visits." },
              { step: 4, title: "Investment Agreement", description: "Clear terms with impact metrics and financial return expectations." },
              { step: 5, title: "Ongoing Reporting", description: "Regular updates on both financial performance and social impact." }
            ].map((step) => (
              <div key={step.step} className="flex items-start">
                <div className="flex-shrink-0 mr-4 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">
                  {step.step}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Cal.com Modal */}
      {isCalendarOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div 
            className="bg-white rounded-xl shadow-xl overflow-hidden max-w-xl w-full max-h-[90vh] flex flex-col"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="flex items-center justify-between border-b border-gray-200 p-4">
              <h3 className="text-xl font-semibold text-gray-900">Schedule a Consultation</h3>
              <button 
                onClick={closeCalendar}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-6">
                Please fill out the form below and our investment team will contact you to arrange a consultation.
              </p>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div>
                  <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-1">
                    Interested In
                  </label>
                  <select
                    id="interest"
                    name="interest"
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Select an investment option</option>
                    <option value="natural-farming">Natural Farming Cooperative</option>
                    <option value="agritech">AgriTech Incubation Fund</option>
                    <option value="food-processing">Rural Food Processing Unit</option>
                    <option value="other">Other/General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Information
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="Please share any specific questions or requirements"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Request Consultation
                    <Calendar className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
} 