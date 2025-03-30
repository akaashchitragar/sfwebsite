'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle mounting state to prevent hydration errors
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Mission', href: '#mission' },
    { name: 'Programs', href: '#programs' },
    { name: 'Impact', href: '#impact' },
    { name: 'Resources', href: '#resources' },
    { name: 'News', href: '#news' },
    { name: 'Contact', href: '#contact' },
  ];

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: "easeOut"
      }
    })
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0, y: -20 },
    visible: { 
      opacity: 1, 
      height: 'auto', 
      y: 0,
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      height: 0,
      y: -20,
      transition: {
        duration: 0.3,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const mobileNavItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.2 }
    },
    exit: { 
      opacity: 0, 
      x: -20,
      transition: { duration: 0.2 }
    }
  };

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/90 backdrop-blur-sm shadow-md' : 'bg-white shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            {isMounted ? (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Link href="/" className="font-bold text-xl text-green-600 font-poppins flex items-center">
                  <span className="text-gradient bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                    Sanghachadwam Foundation
                  </span>
                </Link>
              </motion.div>
            ) : (
              <Link href="/" className="font-bold text-xl text-green-600 font-poppins flex items-center">
                <span className="text-gradient bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                  Sanghachadwam Foundation
                </span>
              </Link>
            )}
          </div>
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-1">
            {navItems.map((item, index) => (
              isMounted ? (
                <motion.div
                  key={item.name}
                  custom={index}
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link 
                    href={item.href} 
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-green-600 rounded-md hover:bg-green-50/50 transition-colors relative group"
                  >
                    {item.name}
                    <motion.div 
                      className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-green-600 group-hover:w-full transition-all duration-300"
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>
              ) : (
                <div key={item.name}>
                  <Link 
                    href={item.href} 
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-green-600 rounded-md hover:bg-green-50/50 transition-colors relative group"
                  >
                    {item.name}
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-green-600 group-hover:w-full transition-all duration-300" />
                  </Link>
                </div>
              )
            ))}
            {isMounted ? (
              <motion.div
                custom={navItems.length}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href="https://www.annadata.guru" 
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-sm transition-colors"
                >
                  <Heart className="h-4 w-4 mr-1.5" />
                  Join Our Movement
                </Link>
              </motion.div>
            ) : (
              <div>
                <Link 
                  href="https://www.annadata.guru" 
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-sm transition-colors"
                >
                  <Heart className="h-4 w-4 mr-1.5" />
                  Join Our Movement
                </Link>
              </div>
            )}
          </div>
          <div className="flex items-center md:hidden">
            {isMounted ? (
              <motion.button 
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-green-50 focus:outline-none"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </motion.button>
            ) : (
              <button 
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-green-50 focus:outline-none"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {isMounted && (
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="md:hidden overflow-hidden bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    variants={mobileNavItemVariants}
                  >
                    <Link 
                      href={item.href} 
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors border-l-2 border-transparent hover:border-green-500"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  variants={mobileNavItemVariants}
                >
                  <Link 
                    href="https://www.annadata.guru" 
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="flex items-center w-full text-center mt-3 px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Join Our Movement
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </nav>
  );
};

export default Navbar; 