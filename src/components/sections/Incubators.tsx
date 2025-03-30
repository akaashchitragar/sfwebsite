'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Startups = () => {
  // Reference for the scroll container
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Sample startup logos - replace with actual logos
  const startups = [
    { id: 1, name: 'Startup 1', logo: '/images/startups/logo1.png' },
    { id: 2, name: 'Startup 2', logo: '/images/startups/logo2.png' },
    { id: 3, name: 'Startup 3', logo: '/images/startups/logo3.png' },
    { id: 4, name: 'Startup 4', logo: '/images/startups/logo4.png' },
    { id: 5, name: 'Startup 5', logo: '/images/startups/logo5.png' },
    { id: 6, name: 'Startup 6', logo: '/images/startups/logo6.png' },
    { id: 7, name: 'Startup 7', logo: '/images/startups/logo7.png' },
    { id: 8, name: 'Startup 8', logo: '/images/startups/logo8.png' }
  ];
  
  // Duplicate the logos for infinite effect
  const duplicatedStartups = [...startups, ...startups];
  
  return (
    <section className="py-16 bg-gray-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-radial from-green-100/20 to-transparent opacity-70 blur-[80px]"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-radial from-green-100/20 to-transparent opacity-60 blur-[90px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.span 
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100/80 backdrop-blur-sm text-green-800 text-sm font-medium mb-4 border border-green-200/50"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Our Network
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Our <span className="text-green-600">Startups</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent mx-auto my-4"></div>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Supporting innovative agri-entrepreneurs to transform rural economies
          </p>
        </motion.div>
        
        {/* Infinite horizontal scroll container */}
        <div className="relative w-full overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-gray-50 to-transparent z-10"></div>
          
          <div ref={scrollRef} className="flex gap-12 py-8 animate-marquee">
            {duplicatedStartups.map((startup, index) => (
              <motion.div
                key={`${startup.id}-${index}`}
                className="flex-shrink-0 relative w-40 h-20 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex items-center justify-center p-4 hover:shadow-md transition-shadow"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={startup.logo}
                    alt={startup.name}
                    fill
                    className="object-contain"
                    style={{ objectFit: 'contain' }}
                    onError={(e) => {
                      // Fallback if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/placeholder-logo.png';
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Startups; 