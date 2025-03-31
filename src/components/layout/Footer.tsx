'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
  
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-green-900 rounded-full opacity-5 blur-3xl -translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-green-600 rounded-full opacity-5 blur-3xl translate-x-1/3"></div>
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="flex flex-col items-center text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="relative w-20 h-20">
              <Image 
                src="/logo.png" 
                alt="Sanghachadwam Logo" 
                width={80} 
                height={80}
                className="transition-all duration-300 hover:scale-105"
                priority
              />
            </div>
            <div className="text-left">
              <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                Sanghachadwam Foundation
              </h3>
              <div className="flex items-center mt-1 space-x-1">
                <span className="text-green-500 font-medium">Agri</span>
                <span className="text-green-400 font-bold">+</span>
                <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent font-medium">
                  Preneurship & Beyond
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse ml-1"></div>
              </div>
            </div>
          </div>
          
          <p className="text-gray-300 text-xs max-w-md mx-auto">
            Transforming agriculture into a first-choice profession, empowering rural youth to become successful agri-preneurs.
          </p>
        </motion.div>
        
        <motion.div 
          className="mt-4 pt-4 border-t border-gray-700/50 flex items-center justify-between flex-wrap gap-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <p className="text-xs text-gray-400">
            &copy; {currentYear} Sanghachadwam Foundation. All rights reserved.
          </p>
          
          <div className="flex gap-x-4">
            <p className="text-xs text-gray-400">
              Section 8, Companies Act 2013
            </p>
            <p className="text-xs text-gray-400">
              80G & 12A Tax Exemptions
            </p>
            <Link href="/refund" className="text-xs text-green-500 hover:text-green-400 font-medium transition-colors">
              Refund Policy
            </Link>
            <Link href="/terms" className="text-xs text-green-500 hover:text-green-400 font-medium transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/privacy" className="text-xs text-green-500 hover:text-green-400 font-medium transition-colors">
              Privacy Policy
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 