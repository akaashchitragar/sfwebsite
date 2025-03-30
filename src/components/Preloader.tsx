'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLoading } from '@/context/LoadingContext';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const { setIsLoading } = useLoading();

  useEffect(() => {
    // Prevent scrolling while preloader is active
    document.body.classList.add('overflow-hidden');
    
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 200);
    
    // Hide preloader after the page is fully loaded
    const timer = setTimeout(() => {
      clearInterval(progressInterval);
      setProgress(100);
      
      // Small delay before removing preloader for smooth transition
      setTimeout(() => {
        setLoading(false);
        // Add a class to the body to enable scrolling after loading
        document.body.classList.remove('overflow-hidden');
        // Update global loading state
        setIsLoading(false);
      }, 600);
    }, 2000); // 2 seconds minimum to show the preloader
    
    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
      document.body.classList.remove('overflow-hidden');
    };
  }, [setIsLoading]);

  if (!loading) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-white"
    >
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {/* Logo container with pulse effect */}
          <div className="w-36 h-36 relative">
            <Image
              src="/logo.png"
              alt="Sanghachadwam Foundation"
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
            
            {/* Animated rings around logo */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-green-500/30"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-green-500/20"
              animate={{ 
                scale: [1.1, 1.3, 1.1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ 
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3
              }}
            />
          </div>
        </motion.div>
        
        {/* Loading message */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="mt-4 text-green-700 font-medium text-sm"
        >
          {progress < 100 ? 'Loading experience...' : 'Ready!'}
        </motion.p>
        
        {/* Enhanced progress bar */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "100%", opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-4 w-64 h-1.5 bg-gray-100 rounded-full overflow-hidden"
        >
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
          />
        </motion.div>
        
        {/* Percentage indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-2 text-sm text-gray-500 font-medium"
        >
          {Math.round(progress)}%
        </motion.div>
      </div>
      
      {/* Background shape decorations */}
      <motion.div 
        className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-green-500/10 blur-3xl"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-green-600/10 blur-3xl"
        animate={{ 
          scale: [1.1, 1, 1.1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ 
          duration: 4,
          delay: 1,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
} 