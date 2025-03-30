'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Sparkles, ExternalLink, Rocket, X, Leaf, Award, Users, Info } from 'lucide-react';

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
  const [activeStartup, setActiveStartup] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);
  const [filter, setFilter] = useState<string | null>(null);
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

  // Get unique categories for filtering
  const categories = Array.from(new Set(startups.map(startup => startup.category)));
  
  // Filter startups based on selected category
  const filteredStartups = filter 
    ? startups.filter(startup => startup.category === filter) 
    : startups;
  
  // Hexagon SVG path
  const hexagonPath = "M50,0 L93.3,25 L93.3,75 L50,100 L6.7,75 L6.7,25 Z";
  
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
  
  const staticStartupItem = (startup: Startup, index: number) => (
    <div
      key={`static-${startup.id}`}
      className="flex-shrink-0 relative bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
      style={{ height: "160px", clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
    >
      <div className="absolute inset-2 flex items-center justify-center">
        <Image
          src={startup.logo}
          alt={startup.name}
          fill
          className="object-contain p-4"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/images/placeholder-logo.jpg';
          }}
        />
      </div>
    </div>
  );
  
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle honeycomb pattern */}
        <div className="absolute inset-0 opacity-5" 
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 50 43.3'%3E%3Cpath fill='%2316a34a' d='M25,0 L50,14.4 L50,43.3 L25,57.7 L0,43.3 L0,14.4 Z' opacity='0.5'/%3E%3C/svg%3E\")",
            backgroundSize: "100px 100px"
          }}>
        </div>
        
        {/* Gradient orbs */}
        <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-gradient-radial from-green-100/30 to-transparent opacity-70 blur-[120px] transform rotate-12"></div>
        <div className="absolute bottom-0 left-1/4 w-1/3 h-1/2 bg-gradient-radial from-green-200/20 to-transparent opacity-60 blur-[150px] transform -rotate-12"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-20"
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
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
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
          
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We're building an ecosystem of innovative agribusiness startups that are revolutionizing 
            farming practices and creating sustainable solutions for rural economies.
          </p>
        </motion.div>
        
        {/* Category Filter */}
        {isMounted && (
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <motion.button
              onClick={() => setFilter(null)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                filter === null 
                  ? 'bg-green-100 border-green-300 text-green-800' 
                  : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              All
            </motion.button>
            
            {categories.map((category, index) => (
              <motion.button
                key={`category-${index}`}
                onClick={() => setFilter(category)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                  filter === category 
                    ? 'bg-green-100 border-green-300 text-green-800' 
                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        )}
        
        {/* Innovative hexagon grid layout */}
        <div className="max-w-6xl mx-auto">
          {isMounted ? (
            <motion.div 
              className="flex flex-col items-center space-y-14 md:space-y-20"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* Grid layout - responsive with different rows based on screen size */}
              <div className="flex flex-wrap justify-center gap-8 sm:gap-12 md:gap-16 lg:gap-24">
                {filteredStartups.map((startup, index) => (
                  <motion.div
                    key={`${startup.id}`}
                    className="relative flex flex-col items-center"
                    variants={itemVariants}
                    whileHover="hover"
                    onMouseEnter={() => setActiveStartup(startup.id)}
                    onMouseLeave={() => setActiveStartup(null)}
                    onClick={() => openStartupModal(startup)}
                  >
                    {/* Hexagon container - responsive sizing */}
                    <div className="relative h-40 w-40 sm:h-48 sm:w-48 mb-4 group cursor-pointer">
                      {/* Badge for indicating category */}
                      <div className="absolute -top-2 -right-2 z-20 px-2 py-1 bg-green-50 border border-green-200 rounded-full text-[10px] font-medium text-green-700 shadow-sm">
                        {startup.category}
                      </div>
                      
                      {/* Shadow and glow effects */}
                      <div 
                        className="absolute top-0 left-0 w-full h-full transform scale-95 opacity-30 blur-md transition-all duration-300 group-hover:scale-110 group-hover:opacity-50"
                        style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600"></div>
                      </div>
                      
                      {/* Main hexagon */}
                      <div 
                        className="absolute top-0 left-0 w-full h-full bg-white border border-gray-200 overflow-hidden transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-xl group-hover:border-green-200 z-10"
                        style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
                      >
                        {/* Logo */}
                        <div className="absolute inset-0 flex items-center justify-center p-8 transition-transform duration-500 group-hover:scale-110">
                          <Image
                            src={startup.logo}
                            alt={startup.name}
                            fill
                            className="object-contain p-4"
                            priority={index < 4}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/images/placeholder-logo.jpg';
                            }}
                          />
                        </div>
                        
                        {/* Hover overlay */}
                        <div 
                          className="absolute inset-0 bg-gradient-to-br from-green-600/90 to-green-800/90 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-95"
                        >
                          <div className="text-white text-center p-4">
                            <h3 className="font-bold text-lg mb-2">{startup.name}</h3>
                            <p className="text-xs text-green-50/90">{startup.description}</p>
                            <div className="mt-3 flex items-center justify-center gap-1">
                              <span className="text-[10px] text-white/70">Est. {startup.foundedYear}</span>
                              <span className="w-1 h-1 bg-white/30 rounded-full"></span>
                              <Info size={12} className="text-white/70" />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Pulsing effect when active */}
                      {activeStartup === startup.id && (
                        <motion.div 
                          className="absolute inset-0 bg-green-400/20 z-0"
                          initial={{ scale: 1, opacity: 0.5 }}
                          animate={{ 
                            scale: [1, 1.1, 1], 
                            opacity: [0.5, 0.2, 0.5] 
                          }}
                          transition={{ 
                            duration: 2, 
                            ease: "easeInOut",
                            repeat: Infinity
                          }}
                          style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
                        />
                      )}
                    </div>
                    
                    {/* Startup name */}
                    <h3 className="text-center font-medium text-gray-900">{startup.name}</h3>
                    
                    {/* Connecting lines between hexagons (only visible on desktop) */}
                    {index < filteredStartups.length - 1 && (index + 1) % 3 !== 0 && (
                      <div className="hidden lg:block absolute top-1/2 -right-16 w-12 h-0.5 bg-gradient-to-r from-green-400 to-transparent transform origin-left scale-0 transition-transform duration-500 group-hover:scale-100"></div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="flex flex-wrap justify-center gap-8 sm:gap-16">
              {startups.map((startup, index) => staticStartupItem(startup, index))}
            </div>
          )}
        </div>
      </div>
      
      {/* Modal for startup details */}
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
              className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Close button */}
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 z-10 p-1 rounded-full bg-white/80 text-gray-700 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
              
              {/* Modal header with gradient and info */}
              <div className="p-8 bg-gradient-to-b from-green-100 to-white border-b border-gray-100 relative">
                <div className="flex items-center gap-6">
                  {/* Logo */}
                  <div 
                    className="h-24 w-24 bg-white shadow-md rounded-xl overflow-hidden border border-gray-200 flex-shrink-0 relative"
                  >
                    <Image
                      src={selectedStartup.logo}
                      alt={selectedStartup.name}
                      fill
                      className="object-contain p-2"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/placeholder-logo.jpg';
                      }}
                    />
                  </div>
                  
                  <div className="flex-1">
                    {/* Category tag */}
                    <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium mb-2">
                      {selectedStartup.category}
                    </span>
                    
                    <h2 className="text-2xl font-bold text-gray-900">{selectedStartup.name}</h2>
                    
                    <p className="text-green-700 font-medium mt-1">Est. {selectedStartup.foundedYear}</p>
                  </div>
                </div>
              </div>
              
              {/* Modal content */}
              <div className="p-6">
                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-sm uppercase text-gray-500 font-semibold mb-2">About</h3>
                  <p className="text-gray-700">{selectedStartup.description}</p>
                </div>
                
                {/* Stats and details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {/* Impact */}
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Leaf size={18} className="text-green-500" />
                      <h4 className="font-medium text-gray-900">Impact</h4>
                    </div>
                    <p className="text-sm text-gray-600">{selectedStartup.impact}</p>
                  </div>
                  
                  {/* Team size */}
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Users size={18} className="text-green-500" />
                      <h4 className="font-medium text-gray-900">Team Size</h4>
                    </div>
                    <p className="text-sm text-gray-600">{selectedStartup.teamSize} members</p>
                  </div>
                </div>
                
                {/* Contact CTA */}
                <div className="mt-8">
                  <button
                    className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                    onClick={() => setShowModal(false)}
                  >
                    <Sparkles size={16} />
                    Contact for Collaboration
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Startups; 