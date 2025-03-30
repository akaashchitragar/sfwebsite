'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { BookOpen, Users, Home, TrendingUp, ChevronLeft, ChevronRight, MapPin, Quote, Award, Star, BarChart3, TrendingDown, LineChart, Users2, LucideProps, Leaf, SparkleIcon } from 'lucide-react';

const Impact = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const stats = [
    { 
      id: 1, 
      name: 'Youth Trained', 
      value: '5,000+', 
      end: 5000,
      icon: <BookOpen className="h-5 w-5" />,
      color: 'green',
      gradientFrom: 'from-green-400',
      gradientTo: 'to-green-600'
    },
    { 
      id: 2, 
      name: 'Agri-preneurs Created', 
      value: '1,200+', 
      end: 1200,
      icon: <Users className="h-5 w-5" />,
      color: 'yellow',
      gradientFrom: 'from-yellow-400',
      gradientTo: 'to-amber-500'
    },
    { 
      id: 3, 
      name: 'Villages Impacted', 
      value: '300+', 
      end: 300,
      icon: <Home className="h-5 w-5" />,
      color: 'blue',
      gradientFrom: 'from-blue-400',
      gradientTo: 'to-blue-600'
    },
    { 
      id: 4, 
      name: 'Increase in Farm Income', 
      value: '70%', 
      end: 70, 
      suffix: '%',
      icon: <TrendingUp className="h-5 w-5" />,
      color: 'purple',
      gradientFrom: 'from-purple-400',
      gradientTo: 'to-purple-600'
    },
  ];

  const testimonials = [
    {
      id: 1,
      quote: "The Sanghachadwam Foundation transformed my life. From a struggling farmer to a successful agri-entrepreneur, I now employ 15 people from my village.",
      author: "Rajesh Kumar",
      role: "Organic Farmer & Entrepreneur",
      location: "Uttar Pradesh",
      gradientFrom: 'from-green-400',
      gradientTo: 'to-green-600'
    },
    {
      id: 2,
      quote: "The training and support I received helped me start my own food processing unit. My income has tripled, and I'm proud to be a woman entrepreneur in agriculture.",
      author: "Meena Devi",
      role: "Food Processing Entrepreneur",
      location: "Maharashtra",
      gradientFrom: 'from-yellow-400',
      gradientTo: 'to-amber-500'
    },
    {
      id: 3,
      quote: "The Annada.guru platform connected me directly to urban markets. Now I earn 40% more for my organic produce and have expanded my farm.",
      author: "Sunil Patel",
      role: "Progressive Farmer",
      location: "Gujarat",
      gradientFrom: 'from-blue-400',
      gradientTo: 'to-blue-600'
    },
  ];

  // For animated counters
  const [counters, setCounters] = useState(stats.map(() => 0));
  const countersRef = useRef(null);
  const animationTriggered = useRef(false);

  // For testimonial carousel
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
  // For floating particles
  const [particles, setParticles] = useState<Array<{
    width: string;
    height: string;
    left: string;
    top: string;
    color: string;
    xOffset: number;
    yOffset: number;
    scaleMultiplier: number;
    duration: number;
  }>>([]);
  
  // Generate random values for particles on client-side only
  useEffect(() => {
    const generateParticles = () => {
      return Array.from({ length: 30 }).map((_, i) => {
        const width = Math.random() * 6 + 2;
        const color = i % 4 === 0 ? 'rgba(74, 222, 128, 0.3)' : 
                     i % 4 === 1 ? 'rgba(250, 204, 21, 0.3)' : 
                     i % 4 === 2 ? 'rgba(96, 165, 250, 0.3)' :
                     'rgba(192, 132, 252, 0.3)';
        
        return {
          width: `${width}px`,
          height: `${width}px`, // Same as width for a circle
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          color,
          xOffset: Math.random() * 100 - 50,
          yOffset: Math.random() * 100 - 50,
          scaleMultiplier: Math.random() * 1.5 + 1,
          duration: 10 + Math.random() * 20
        };
      });
    };
    
    setParticles(generateParticles());
  }, []);

  // Animate counters on scroll into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateCounters();
        }
      },
      { threshold: 0.25 }
    );

    if (countersRef.current) {
      observer.observe(countersRef.current);
    }

    const currentRef = countersRef.current;

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const animateCounters = () => {
    const duration = 2000;
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(duration / frameDuration);

    let frame = 0;
    const timerId = setInterval(() => {
      frame++;
      const progress = Math.min(frame / totalFrames, 1);
      const newCounters = stats.map((stat) => Math.floor(stat.end * progress));
      
      setCounters(newCounters);

      if (frame === totalFrames) {
        clearInterval(timerId);
      }
    }, frameDuration);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
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
      y: -5,
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
      id="impact"
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-green-50 via-white to-green-50 relative overflow-hidden"
    >
      {/* Enhanced decorative elements */}
      <div className="absolute top-0 right-0 w-[70%] h-[60%] bg-gradient-radial from-green-200/30 to-transparent opacity-80 blur-[120px]"></div>
      <div className="absolute bottom-0 left-0 w-[70%] h-[60%] bg-gradient-radial from-yellow-200/30 to-transparent opacity-70 blur-[120px]"></div>
      <div className="absolute top-1/3 left-1/2 w-[50%] h-[50%] bg-gradient-radial from-green-300/15 to-transparent opacity-60 blur-[100px] -translate-x-1/2"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[35%] h-[35%] bg-gradient-radial from-blue-200/15 to-transparent opacity-60 blur-[80px]"></div>
      
      {/* Animated SVG shapes */}
      <svg className="absolute top-0 left-0 w-full h-full overflow-visible opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#16a34a" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#16a34a" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        <motion.path
          d="M0,128 C150,180 350,50 500,120 C650,190 800,100 1000,120 L1000,500 L0,500 Z"
          fill="url(#grad1)"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
      </svg>
      
      {/* Animated floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: particle.width,
              height: particle.height,
              left: particle.left,
              top: particle.top,
              backgroundColor: particle.color,
            }}
            animate={{
              x: [0, particle.xOffset],
              y: [0, particle.yOffset],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, particle.scaleMultiplier, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "linear-gradient(rgba(74, 222, 128, 0.3) 1px, transparent 1px), linear-gradient(to right, rgba(74, 222, 128, 0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }}
      ></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 min-h-[600px] lg:items-center">
          {/* Left column: Title and Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-10">
              <motion.span 
                initial="rest"
                whileHover="hover"
                animate="rest"
                variants={hoverCard}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100/80 backdrop-blur-sm text-green-800 text-sm font-medium mb-4 border border-green-200/50"
              >
                <motion.span variants={iconsAnimation}>
                  <LineChart className="w-4 h-4 text-green-600" />
                </motion.span>
                Our Impact
              </motion.span>
              <h2 className="text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl font-poppins">
                Transforming Lives and <span className="text-green-600">Communities</span>
              </h2>
              <p className="mt-4 text-gray-600">
                Our work is creating a tangible difference in rural India, one farmer at a time.
              </p>
            </div>
            
            <div ref={countersRef} className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.id}
                  className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm p-4 border border-gray-100 hover:shadow-md transition-all"
                  custom={index}
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br ${stat.gradientFrom} ${stat.gradientTo} text-white mr-3`}>
                      <motion.div 
                        animate={{ rotate: [0, 5, 0, -5, 0] }} 
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                      >
                        {stat.icon}
                      </motion.div>
                    </div>
                    <div>
                      <dd className={`text-2xl font-bold flex items-end leading-none text-${stat.color}-600`}>
                        <motion.span
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                        >
                          {counters[index]}
                        </motion.span>
                        <span className="text-lg">{stat.suffix || '+'}</span>
                      </dd>
                      <dt className="text-sm font-medium text-gray-600 mt-1">{stat.name}</dt>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="mt-10 bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-full p-2 text-white shadow-md">
                  <MapPin className="h-6 w-6 flex-shrink-0" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-900 flex items-center">
                    Geographic Presence
                    <motion.span 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="ml-2"
                    >
                      <BarChart3 className="h-4 w-4 text-green-500" />
                    </motion.span>
                  </h4>
                  <div className="w-20 h-1 bg-gradient-to-r from-green-300 to-green-500 rounded-full mt-2 mb-4"></div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-gradient-to-br from-green-50 to-white rounded-lg p-3 border border-green-100 shadow-sm">
                      <p className="font-medium text-sm text-gray-700 flex items-center">
                        <TrendingUp className="h-3.5 w-3.5 text-green-500 mr-1.5" />
                        Current presence:
                      </p>
                      <p className="text-gray-900 mt-1.5">
                        <span className="text-lg font-bold text-green-600">12</span> States | 
                        <span className="text-lg font-bold text-green-600 ml-2">300+</span> Villages
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg p-3 border border-blue-100 shadow-sm">
                      <p className="font-medium text-sm text-gray-700 flex items-center">
                        <TrendingUp className="h-3.5 w-3.5 text-blue-500 mr-1.5" />
                        2025 Goal:
                      </p>
                      <p className="text-gray-900 mt-1.5">
                        <span className="text-lg font-bold text-blue-600">20</span> States | 
                        <span className="text-lg font-bold text-blue-600 ml-2">1000+</span> Villages
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Right column: Testimonials */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative flex flex-col justify-center h-full"
          >
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center">
                <Quote className="h-5 w-5 text-green-500 mr-2" />
                Stories of Transformation
              </h3>
              <div className="w-48 h-1.5 bg-gradient-to-r from-transparent via-green-500 to-transparent mt-2"></div>
            </div>
            
            <div className="relative mt-8">
              <motion.div 
                className="relative overflow-hidden rounded-xl shadow-md bg-white/80 backdrop-blur-sm border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-green-600"></div>
                <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}>
                  {testimonials.map((testimonial, index) => (
                    <div key={testimonial.id} className="w-full flex-shrink-0">
                      <div className="p-8">
                        <div className="relative mb-8">
                          <div className="absolute -top-6 -left-6 text-7xl text-green-200 leading-none font-serif">"</div>
                          <motion.p 
                            className="text-gray-700 italic text-lg relative z-10"
                            initial={{ opacity: activeTestimonial === index ? 1 : 0 }}
                            animate={{ opacity: activeTestimonial === index ? 1 : 0 }}
                          >
                            {testimonial.quote}
                          </motion.p>
                          <div className="absolute -bottom-5 -right-2 text-7xl text-green-200 leading-none font-serif">"</div>
                        </div>
                        
                        <div className="flex items-center border-t border-gray-100 pt-4 mt-4">
                          <div className="bg-gradient-to-br from-green-100 to-white p-2 rounded-full border border-green-200 shadow-sm mr-4">
                            <motion.div 
                              animate={{ rotate: [0, 10, 0, -10, 0] }}
                              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                            >
                              <Users className="h-6 w-6 text-green-600" />
                            </motion.div>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{testimonial.author}</div>
                            <div className="text-sm flex flex-wrap items-center gap-1">
                              <span className="text-sm font-medium text-gray-700">
                                {testimonial.role}
                              </span>
                              <span className="text-gray-500 flex items-center inline-flex">
                                <MapPin className="h-3 w-3 text-green-500 mr-1" />
                                {testimonial.location}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Carousel indicator dots */}
                <div className="absolute bottom-3 right-3 flex space-x-1">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      className={`h-2 rounded-full transition-all ${
                        activeTestimonial === index ? 'w-8 bg-gradient-to-r from-green-400 to-green-600' : 'w-2 bg-gray-300 hover:bg-gray-400'
                      }`}
                      onClick={() => setActiveTestimonial(index)}
                      aria-label={`Go to testimonial ${index + 1}`}
                    ></button>
                  ))}
                </div>
              </motion.div>
              
              {/* Navigation arrows */}
              <div className="flex justify-between mt-6">
                <motion.button
                  className="bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm text-green-600 hover:text-white hover:bg-green-500 focus:outline-none transition-colors border border-gray-100 group"
                  onClick={() => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-5 w-5 group-hover:scale-110 transition-transform" />
                </motion.button>
                <motion.button
                  className="bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm text-green-600 hover:text-white hover:bg-green-500 focus:outline-none transition-colors border border-gray-100 group"
                  onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-5 w-5 group-hover:scale-110 transition-transform" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Impact; 