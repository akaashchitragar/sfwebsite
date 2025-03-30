'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import React from 'react';

interface SectionBadgeProps {
  icon: LucideIcon;
  text: string;
  className?: string;
}

const SectionBadge = ({ icon: Icon, text, className = '' }: SectionBadgeProps) => {
  const hoverAnimation = {
    rest: { scale: 1, y: 0 },
    hover: { 
      scale: 1.05, 
      y: -2,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 17 
      } 
    }
  };

  const iconAnimation = {
    rest: { rotate: 0 },
    hover: { 
      rotate: [0, -10, 10, -5, 0],
      transition: { 
        duration: 0.6,
        ease: "easeInOut" 
      } 
    }
  };

  return (
    <motion.span 
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={hoverAnimation}
      className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100/80 backdrop-blur-sm text-green-800 text-sm font-medium mb-4 border border-green-200/50 shadow-sm ${className}`}
    >
      <motion.span variants={iconAnimation} className="flex items-center justify-center">
        <Icon className="w-4 h-4 text-green-600" />
      </motion.span>
      {text}
    </motion.span>
  );
};

export default SectionBadge; 