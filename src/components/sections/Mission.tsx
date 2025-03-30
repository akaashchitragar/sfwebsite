'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Leaf, Goal, Users, GraduationCap, ChevronDown, Award, Heart, Zap, Shield, BarChart3 } from 'lucide-react';

const Mission = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const [activeValue, setActiveValue] = useState(0);
  const [floatingElements, setFloatingElements] = useState<Array<{top: string; left: string; size: number; duration: number; delay: number; rotate: number}>>([]);

  // Generate floating elements on client side
  useEffect(() => {
    const elements = Array.from({ length: 15 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 8 + 2,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
      rotate: Math.random() * 360
    }));
    
    setFloatingElements(elements);
  }, []);

  const coreValues = [
    {
      icon: <Leaf className="w-6 h-6" />,
      color: "bg-gradient-to-br from-green-500 to-green-600",
      value: "Sustainability",
      description: "We promote environmentally responsible farming practices that preserve resources for future generations."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      color: "bg-gradient-to-br from-amber-500 to-yellow-600",
      value: "Innovation",
      description: "We embrace new technologies and methodologies to revolutionize traditional agriculture."
    },
    {
      icon: <Users className="w-6 h-6" />,
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      value: "Community",
      description: "We build supportive networks that empower rural communities to thrive together."
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
      value: "Education",
      description: "We believe in continuous learning and knowledge sharing as the foundation of progress."
    }
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  const pulseAnimation = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const hoverCard = {
    rest: { 
      scale: 1,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      y: 0
    },
    hover: { 
      scale: 1.03, 
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      y: -8,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 17
      }
    }
  };
  
  const iconsAnimation = {
    rest: { rotate: 0 },
    hover: { 
      rotate: [0, -10, 10, -5, 0],
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section 
      id="mission" 
      ref={sectionRef}
      className="py-28 bg-gradient-to-br from-green-50 via-white to-green-50 relative overflow-hidden"
    >
      {/* Enhanced decorative elements */}
      <div className="absolute top-0 right-0 w-[60%] h-[50%] bg-gradient-radial from-green-200/40 to-transparent blur-[100px]"></div>
      <div className="absolute bottom-0 left-0 w-[60%] h-[50%] bg-gradient-radial from-yellow-200/40 to-transparent blur-[100px]"></div>
      <div className="absolute top-1/3 left-1/2 w-[40%] h-[40%] bg-gradient-radial from-green-300/30 to-transparent blur-[80px] -translate-x-1/2"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[30%] h-[30%] bg-gradient-radial from-blue-200/30 to-transparent blur-[60px]"></div>
      
      {/* Animated floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingElements.map((el, index) => (
          <motion.div
            key={index}
            className="absolute bg-gradient-to-r from-green-300/20 to-blue-300/20 rounded-full"
            style={{
              top: el.top,
              left: el.left,
              width: `${el.size}px`,
              height: `${el.size}px`,
              rotate: `${el.rotate}deg`
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              rotate: [el.rotate, el.rotate + 180, el.rotate],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: el.duration,
              delay: el.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
        
        <motion.div 
          className="absolute top-[15%] left-[10%] w-16 h-16 border-2 border-green-300/40 rounded-full"
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, 180],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-[30%] right-[15%] w-24 h-24 border-2 border-yellow-300/30 rounded-lg rotate-45"
          animate={{ 
            y: [0, 30, 0],
            opacity: [0.1, 0.3, 0.1],
            rotate: [45, 90, 45],
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-[20%] left-[20%] w-20 h-20 border-2 border-blue-300/30 rounded-md"
          animate={{ 
            y: [0, -25, 0],
            opacity: [0.15, 0.35, 0.15],
            rotate: [0, -60, 0],
          }}
          transition={{ 
            duration: 18, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      {/* Background dotted pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "radial-gradient(#94a3b8 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      ></div>

      {/* Background noise overlay - replaced with CSS pattern */}
      <div className="absolute inset-0 opacity-25 mix-blend-overlay bg-gradient-to-br from-gray-400/10 to-gray-600/10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="lg:text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            initial="rest"
            whileHover="hover"
            animate="rest"
            variants={hoverCard}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100/80 backdrop-blur-sm text-green-800 text-sm font-medium mb-4 border border-green-200/50"
          >
            <motion.span variants={iconsAnimation}>
              <Award className="w-4 h-4 text-green-600" />
            </motion.span>
            Our Mission
          </motion.span>
          <h2 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl font-poppins">
            Building the Future of <span className="text-green-600">Agriculture</span>
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            We're committed to transforming agriculture into a first-choice profession for India's youth.
          </p>
        </motion.div>

        <motion.div 
          className="mt-20 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 relative">
              <motion.div 
                className="relative h-[450px] rounded-2xl overflow-hidden shadow-xl"
                initial="initial"
                whileHover="animate"
                variants={pulseAnimation}
              >
                <Image 
                  src="/images/mission.jpg" 
                  alt="Our mission in action"
                  fill
                  priority
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = "/images/hero-image.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="inline-flex items-center px-4 py-2 rounded-full bg-green-600/90 text-white text-sm font-medium backdrop-blur-sm mb-3 w-fit"
                  >
                    <Zap className="w-4 h-4 mr-2 text-yellow-300" />
                    <span>1 Million Agri-preneurs by 2035</span>
                  </motion.div>
                  <h3 className="text-white text-2xl font-bold">Our Purpose</h3>
                  <p className="text-white/90 mt-2">
                    To foster a thriving agricultural ecosystem where rural youth can build prosperous futures.
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                initial="rest"
                whileHover="hover"
                animate="rest"
                variants={hoverCard}
                className="absolute -bottom-6 -right-6 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-xl border border-green-100 max-w-[220px] z-20"
              >
                <p className="text-sm text-gray-700 font-medium">
                  "Creating a sustainable future through agriculture innovation and community empowerment."
                </p>
                <div className="flex items-center mt-3">
                  <motion.div
                    className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center mr-3"
                    variants={iconsAnimation}
                  >
                    <Heart className="w-5 h-5 text-green-600" />
                  </motion.div>
                  <div>
                    <p className="text-sm font-bold text-green-700">Sandeep Sabharwal</p>
                    <p className="text-xs text-gray-500">Founder</p>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-7 space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 border-b border-green-200 pb-3">Our Vision & Approach</h3>
              <div className="space-y-5">
                <motion.div 
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border-l-4 border-green-600 hover:shadow-lg transition-all duration-300"
                  custom={0}
                  variants={fadeIn}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  whileHover={{ 
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                  }}
                >
                  <h4 className="font-medium text-gray-900 flex items-center">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 text-white mr-3">1</span>
                    Vision
                  </h4>
                  <p className="mt-2 text-gray-600">
                    To create a thriving agricultural ecosystem where rural youth see farming as an aspirational career path with economic prosperity and social status.
                  </p>
                </motion.div>
                
                <motion.div 
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border-l-4 border-blue-500 hover:shadow-lg transition-all duration-300"
                  custom={1}
                  variants={fadeIn}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  whileHover={{ 
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                  }}
                >
                  <h4 className="font-medium text-gray-900 flex items-center">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-white mr-3">2</span>
                    Approach
                  </h4>
                  <p className="mt-2 text-gray-600">
                    Integrating traditional wisdom with modern technology to develop sustainable farming practices that respect nature while enhancing productivity and profitability.
                  </p>
                </motion.div>
                
                <motion.div 
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border-l-4 border-amber-500 hover:shadow-lg transition-all duration-300"
                  custom={2}
                  variants={fadeIn}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  whileHover={{ 
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                  }}
                >
                  <h4 className="font-medium text-gray-900 flex items-center">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 text-white mr-3">3</span>
                    Impact
                  </h4>
                  <p className="mt-2 text-gray-600">
                    Creating a network of 1 million successful agri-preneurs who will transform rural economies, ensure food security, and lead India's agricultural renaissance.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Core Values Section with Enhanced Animations */}
        <motion.div 
          className="mt-24"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900">Our Core Values</h3>
            <div className="w-20 h-1.5 bg-gradient-to-r from-green-400 to-green-600 mx-auto mt-3 rounded-full"></div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              These principles guide our work and define our organizational culture as we strive to transform agriculture in India.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {coreValues.map((value, index) => (
              <motion.div 
                key={index}
                className={`bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-gray-100/50 overflow-hidden cursor-pointer ${
                  activeValue === index ? 'ring-2 ring-offset-2 ring-green-500/50' : ''
                }`}
                onClick={() => setActiveValue(index)}
                initial="rest"
                whileHover="hover"
                animate="rest"
                variants={hoverCard}
                custom={index}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`h-2 ${value.color}`}></div>
                <div className="p-6">
                  <motion.div 
                    variants={iconsAnimation}
                    className={`w-12 h-12 rounded-full ${value.color} text-white flex items-center justify-center mb-4 shadow-md`}
                  >
                    {value.icon}
                  </motion.div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">{value.value}</h4>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                  
                  <motion.div
                    className="mt-4 flex items-center text-green-600 text-sm font-medium"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <span>Learn more</span>
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Mission; 