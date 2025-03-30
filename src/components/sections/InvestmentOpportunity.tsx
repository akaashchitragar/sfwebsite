"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const InvestmentOpportunity = () => {
  const [currencySymbols, setCurrencySymbols] = useState<Array<{
    symbol: string;
    left: string;
    top: string;
    rotation: number;
    duration: number;
    delay: number;
    fontSize: string;
    yOffset: number;
  }>>([]);

  // Initialize client-side only random values
  useEffect(() => {
    // Generate currency symbols
    const symbols = Array.from({ length: 8 }).map((_, i) => {
      return {
        symbol: Math.random() > 0.5 ? '₹' : '$',
        left: `${Math.random() * 90 + 5}%`,
        top: `${Math.random() * 50 + 40}%`,
        rotation: Math.random() * 30 - 15,
        duration: 10 + Math.random() * 10,
        delay: i * 2,
        fontSize: `${Math.random() * 16 + 12}px`,
        yOffset: -100 - Math.random() * 100
      };
    });
    
    setCurrencySymbols(symbols);
  }, []);

  return (
    <section id="investment" className="py-20 overflow-hidden relative">
      {/* Interesting textured background */}
      <div className="absolute inset-0 bg-[#f4f7f2] z-0">
        <div className="absolute inset-0 opacity-10" 
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23308044' fill-opacity='0.25' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '150px'
          }}>
        </div>
      </div>
      
      {/* Earthy decorative elements */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
        className="absolute top-0 right-0 w-96 h-96 bg-green-500 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 z-0"
      ></motion.div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 1.8, delay: 0.3, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-0 left-0 w-80 h-80 bg-amber-400 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 z-0"
      ></motion.div>

      {/* Plant illustrations */}
      <div className="absolute left-0 top-1/4 w-32 h-32 opacity-20 z-0">
        <Image
          src="/images/plant-illustration-1.svg"
          alt="Plant decoration"
          width={130}
          height={130}
          className="object-contain"
        />
      </div>
      
      <div className="absolute right-0 bottom-1/4 w-40 h-40 opacity-20 z-0">
        <Image
          src="/images/plant-illustration-2.svg"
          alt="Plant decoration"
          width={160}
          height={160}
          className="object-contain"
        />
      </div>
      
      {/* Animated dollar/rupee symbols that float upward */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {currencySymbols.map((symbol, i) => (
          <motion.div
            key={i}
            className="absolute text-green-600 opacity-10 font-semibold"
            style={{
              fontSize: symbol.fontSize,
              left: symbol.left,
              top: symbol.top,
            }}
            animate={{
              y: [0, symbol.yOffset],
              opacity: [0, 0.15, 0],
              rotate: [0, symbol.rotation]
            }}
            transition={{
              duration: symbol.duration,
              repeat: Infinity,
              delay: symbol.delay,
              ease: "easeOut"
            }}
          >
            {symbol.symbol}
          </motion.div>
        ))}
      </div>
      
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12">
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-block px-4 py-1.5 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4"
          >
            Investment Opportunity
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold text-gray-900">
            A <span className="text-green-600 relative inline-block px-1">
              $200B
              <motion.span 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute -bottom-1 left-0 right-0 h-2 bg-green-200 opacity-40 rounded"
              ></motion.span>
            </span> Opportunity
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-gray-600 mt-2 max-w-2xl mx-auto"
          >
            Empower Rural India, Elevate Your Investments!
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main content card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-8 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-green-100 hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            <div className="p-6 md:p-8 flex-grow relative">
              {/* Small leaf decoration */}
              <div className="absolute top-1 right-1 opacity-10 w-24 h-24 rotate-45">
                <Image
                  src="/images/leaf-decoration.svg"
                  alt="Leaf decoration"
                  width={96}
                  height={96}
                  className="object-contain"
                />
              </div>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-gray-700 leading-relaxed"
              >
                India's Agri-preneurship revolution is unfolding! By 2035, 1 million entrepreneurs will each leverage ₹20 lakh ($23,375.56), creating a $200B investment market. This is just the beginning—a golden era to fuel growth, empower farmers, and prosper together.
              </motion.p>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-gray-700 font-medium mt-4"
              >
                Join us in reinventing India's prosperity—invest, mentor, and be part of history!
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/investment-details"
                  className="inline-flex items-center px-6 py-3 mt-6 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300"
                >
                  <span>Become an Investor</span>
                  <svg className="ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </Link>
              </motion.div>
            </div>
            
            <div className="bg-green-50/80 p-4 border-t border-green-100">
              <div className="grid grid-cols-3 gap-4">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                  className="text-center group cursor-pointer transform transition hover:scale-105"
                >
                  <div className="text-green-600 font-bold text-2xl md:text-3xl group-hover:text-green-700 transition-colors">$200B</div>
                  <div className="text-gray-600 text-sm">Total Market</div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.9 }}
                  className="text-center group cursor-pointer transform transition hover:scale-105"
                >
                  <div className="text-green-600 font-bold text-2xl md:text-3xl group-hover:text-green-700 transition-colors">1M</div>
                  <div className="text-gray-600 text-sm">Entrepreneurs</div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 1 }}
                  className="text-center group cursor-pointer transform transition hover:scale-105"
                >
                  <div className="text-green-600 font-bold text-2xl md:text-3xl group-hover:text-green-700 transition-colors">₹20L</div>
                  <div className="text-gray-600 text-sm">Avg. Investment</div>
                </motion.div>
              </div>
            </div>
          </motion.div>
          
          {/* Image card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ y: -5 }}
            className="lg:col-span-4 relative rounded-xl overflow-hidden shadow-lg min-h-[280px] group"
          >
            <Image
              src="/images/investment-image.jpg"
              alt="Investment opportunity"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 via-green-800/50 to-transparent"></div>
            
            <motion.div 
              initial={{ y: 20, opacity: 0.8 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-300 group-hover:translate-y-0"
            >
              <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border-t border-green-200">
                <p className="text-green-700 font-semibold">ROI Opportunity</p>
                <h3 className="text-gray-900 font-bold">Sustainable investments with social impact</h3>
                
                <div className="mt-3 pt-3 border-t border-green-100 flex justify-between items-center">
                  <div className="text-gray-700 font-medium">Expected ROI</div>
                  <div className="text-green-600 font-bold">15-20%</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InvestmentOpportunity; 