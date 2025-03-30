'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Sparkles, ExternalLink, Rocket, X, Leaf, Award, Users, Info, ArrowRight } from 'lucide-react';

// Define a more detailed startup interface
interface Startup {
  id: number;
  name: string;
  logo: string;
  description: string;
  foundedYear?: number;
  category: string;
  impact?: string;
  teamSize?: string;
}

const Startups = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Client-side only effect
  useEffect(() => {
    setIsMounted(true);
    
    // Close modal on escape key press
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowModal(false);
    };
    
    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, []);
  
  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowModal(false);
      }
    };
    
    if (showModal) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showModal]);
  
  // Enhanced startups data
  const startups: Startup[] = [
    { 
      id: 1, 
      name: 'B2B Kirana Finance', 
      logo: '/images/startups/logo1.jpg',
      description: 'Pioneering smart financing solutions for kirana stores',
      foundedYear: 2020,
      category: 'Finance',
      impact: 'Enabled financing for over 2,000 small retailers',
      teamSize: '15-30'
    },
    { 
      id: 2, 
      name: 'Govardhan Organics', 
      logo: '/images/startups/logo2.jpg',
      description: 'Premium organic farming and sustainable agriculture solutions',
      foundedYear: 2018,
      category: 'Organic Farming',
      impact: 'Converted 5,000+ acres to organic farming practices',
      teamSize: '30-50'
    },
    { 
      id: 3, 
      name: 'Samvad Productions', 
      logo: '/images/startups/logo3.jpg',
      description: 'Agricultural media and educational content production',
      foundedYear: 2021,
      category: 'Media & Education',
      impact: 'Reached 1M+ farmers with educational content',
      teamSize: '10-15'
    },
    { 
      id: 4, 
      name: 'SBS Herbals', 
      logo: '/images/startups/logo4.jpg',
      description: 'Natural herbal products and remedies from traditional agriculture',
      foundedYear: 2017,
      category: 'Health Products',
      impact: 'Supports livelihood of 500+ medicinal herb farmers',
      teamSize: '20-35'
    },
    { 
      id: 5, 
      name: 'Agri + Technologies', 
      logo: '/images/startups/logo5.jpg',
      description: 'Innovative agricultural technology solutions for modern farming',
      foundedYear: 2019,
      category: 'AgriTech',
      impact: 'Improved yields by 30% for partner farms',
      teamSize: '25-40'
    },
    { 
      id: 6, 
      name: 'Zen Tech Foods', 
      logo: '/images/startups/logo6.jpg',
      description: 'Technology-enabled food processing and distribution platform',
      foundedYear: 2020,
      category: 'Food Tech',
      impact: 'Reduced post-harvest losses by 25% in supply chain',
      teamSize: '15-25'
    }
  ];
  
  // Variants for animations
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3
      }
    }
  };
  
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };
  
  // Function to open startup details modal
  const openStartupModal = (startup: Startup) => {
    setSelectedStartup(startup);
    setShowModal(true);
  };
  
  // Static startup card for SSR
  const staticStartupItem = (startup: Startup, index: number) => (
    <div key={`static-${startup.id}`} className="flex-shrink-0 w-full max-w-xs">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-full transform transition-all hover:shadow-md">
        <div className="p-6 flex flex-col h-full">
          <div className="mb-4 flex justify-between items-start">
            <div className="w-20 h-20 relative bg-white rounded-lg shadow-sm overflow-hidden flex-shrink-0">
              <div className="absolute inset-1 bg-white flex items-center justify-center">
                <Image
                  src={startup.logo}
                  alt={startup.name}
                  fill
                  className="object-contain p-1"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/placeholder-logo.jpg';
                  }}
                />
              </div>
            </div>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
              {startup.category}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{startup.name}</h3>
          <p className="text-sm text-gray-600 mb-4 flex-grow">{startup.description}</p>
          <div className="text-xs text-gray-500">Est. {startup.foundedYear}</div>
        </div>
      </div>
    </div>
  );
  
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Honeycomb pattern background */}
        <div className="absolute inset-0 opacity-5" 
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 50 43.3'%3E%3Cpath fill='%2316a34a' d='M25,0 L50,14.4 L50,43.3 L25,57.7 L0,43.3 L0,14.4 Z' opacity='0.5'/%3E%3C/svg%3E\")",
            backgroundSize: "100px 100px"
          }}>
        </div>
        
        {/* Gradient elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-gradient-radial from-green-100/30 to-transparent opacity-70 blur-[120px] transform rotate-12"></div>
        <div className="absolute bottom-0 left-1/4 w-1/3 h-1/2 bg-gradient-radial from-green-200/20 to-transparent opacity-60 blur-[150px] transform -rotate-12"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div 
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <motion.span 
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-green-100/90 backdrop-blur-sm text-green-800 text-sm font-medium mb-5 border border-green-200/50 shadow-sm"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(187, 247, 208, 0.9)" }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Rocket size={16} className="text-green-500" />
            Innovation Network
          </motion.span>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-6">
            Nurturing <span className="text-green-600 relative inline-block">
              Tomorrow's
              <motion.span 
                className="absolute -bottom-1 left-0 w-full h-1 bg-green-400 rounded-full"
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </span> Agri-Startups
          </h2>
          
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We're building an ecosystem of innovative agribusiness startups that are revolutionizing 
            farming practices and creating sustainable solutions for rural economies.
          </p>
        </motion.div>
        
        {/* Startup grid - reimagined as modern cards instead of hexagons */}
        <div className="max-w-6xl mx-auto">
          {isMounted ? (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {startups.map((startup, index) => (
                <motion.div
                  key={startup.id}
                  className="flex"
                  variants={itemVariants}
                  whileHover="hover"
                  onClick={() => openStartupModal(startup)}
                >
                  <div className="w-full bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-xl hover:border-green-200 group">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-5">
                        {/* Logo */}
                        <div className="w-20 h-20 bg-white rounded-xl shadow-sm border border-gray-50 overflow-hidden relative flex-shrink-0">
                          <div className="absolute inset-1 bg-white flex items-center justify-center">
                            <Image
                              src={startup.logo}
                              alt={startup.name}
                              fill
                              className="object-contain p-1"
                              priority={index < 4}
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = '/images/placeholder-logo.jpg';
                              }}
                            />
                          </div>
                        </div>
                        
                        {/* Category badge */}
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                          {startup.category}
                        </span>
                      </div>
                      
                      {/* Content */}
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                        {startup.name}
                      </h3>
                      
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {startup.description}
                      </p>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">Est. {startup.foundedYear}</span>
                        
                        <motion.div 
                          className="flex items-center text-green-600 text-sm font-medium"
                          whileHover={{ x: 3 }}
                        >
                          View Details
                          <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                        </motion.div>
                      </div>
                      
                      {/* Hover spotlight effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {startups.map((startup, index) => staticStartupItem(startup, index))}
            </div>
          )}
        </div>
      </div>
      
      {/* Redesigned modal with a modern look */}
      <AnimatePresence>
        {showModal && selectedStartup && (
          <motion.div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              ref={modalRef}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden relative"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Close button */}
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 text-gray-700 hover:bg-gray-100 shadow-md"
              >
                <X size={18} />
              </button>
              
              {/* Modal header with gradient */}
              <div className="bg-gradient-to-r from-green-50 to-green-100/50 border-b border-green-100/50 pt-10 pb-8 px-8">
                <div className="flex items-center gap-6">
                  {/* Logo */}
                  <div className="w-28 h-28 md:w-32 md:h-32 bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden relative p-2 flex-shrink-0">
                    <div className="absolute inset-1 bg-white flex items-center justify-center">
                      <Image
                        src={selectedStartup.logo}
                        alt={selectedStartup.name}
                        fill
                        className="object-contain p-1"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/images/placeholder-logo.jpg';
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    {/* Category badge */}
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mb-2">
                      {selectedStartup.category}
                    </span>
                    
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">{selectedStartup.name}</h2>
                    
                    <p className="text-green-700 font-medium text-sm flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Est. {selectedStartup.foundedYear}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Modal content */}
              <div className="p-8">
                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-sm uppercase text-gray-500 font-semibold mb-3 flex items-center">
                    <Info size={14} className="mr-2 text-green-500" />
                    About
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{selectedStartup.description}</p>
                </div>
                
                {/* Stats in a modern card layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {/* Impact */}
                  <div className="bg-green-50/50 p-5 rounded-xl border border-green-100/80">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-white rounded-full">
                        <Leaf size={18} className="text-green-500" />
                      </div>
                      <h4 className="font-semibold text-gray-900">Impact</h4>
                    </div>
                    <p className="text-gray-700">{selectedStartup.impact}</p>
                  </div>
                  
                  {/* Team size */}
                  <div className="bg-green-50/50 p-5 rounded-xl border border-green-100/80">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-white rounded-full">
                        <Users size={18} className="text-green-500" />
                      </div>
                      <h4 className="font-semibold text-gray-900">Team Size</h4>
                    </div>
                    <p className="text-gray-700">{selectedStartup.teamSize} members</p>
                  </div>
                </div>
                
                {/* CTA button */}
                <motion.button
                  className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-xl shadow-md transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-lg"
                  onClick={() => setShowModal(false)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Sparkles size={16} />
                  Connect & Collaborate
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Startups; 