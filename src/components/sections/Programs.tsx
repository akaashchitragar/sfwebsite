'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { BookOpen, Lightbulb, Cpu, Home, ArrowRight, Check, Smartphone, Leaf, CloudCog, Brain, Award, ChevronRight, Star, BadgeCheck, Heart, Boxes } from 'lucide-react';

const Programs = () => {
  const [activeTab, setActiveTab] = useState(1);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const [floatingElements, setFloatingElements] = useState<Array<{
    width: string;
    height: string;
    left: string;
    top: string;
    rotate: string;
    yOffset: number;
    rotateStart: string;
    rotateEnd: string;
    duration: number;
    borderClass: string;
  }>>([]);
  
  // Generate random values for floating elements on client-side only
  useEffect(() => {
    const elements = Array.from({ length: 12 }).map((_, i) => {
      const width = Math.random() * 40 + 20;
      const height = Math.random() * 40 + 20;
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const rotateStart = Math.random() * 45;
      const rotateEnd = rotateStart + 45;
      const yOffset = Math.random() * 30 - 15;
      const duration = 8 + Math.random() * 10;
      
      let borderClass;
      if (i % 4 === 0) borderClass = 'border-green-300/40';
      else if (i % 4 === 1) borderClass = 'border-yellow-300/40';
      else if (i % 4 === 2) borderClass = 'border-blue-300/40';
      else borderClass = 'border-purple-300/40';
      
      return {
        width: `${width}px`,
        height: `${height}px`,
        left: `${left}%`,
        top: `${top}%`,
        rotate: `${rotateStart}deg`,
        yOffset,
        rotateStart: `${rotateStart}deg`,
        rotateEnd: `${rotateEnd}deg`,
        duration,
        borderClass
      };
    });
    
    setFloatingElements(elements);
  }, []);

  const programs = [
    {
      id: 1,
      title: 'Skill Development',
      description: 'Comprehensive training programs in modern farming techniques, digital agriculture, and agribusiness management.',
      features: [
        'Hands-on training in sustainable farming',
        'Digital literacy for agriculture',
        'Business management for agri-entrepreneurs',
        'Market linkage and value chain management'
      ],
      icon: <BookOpen className="h-6 w-6" />,
      bgColor: "bg-green-100",
      gradientFrom: "from-green-500",
      gradientTo: "to-green-600",
      textColor: "text-green-600",
      hoverColor: "group-hover:bg-green-100/70",
      borderColor: "border-green-200",
      lightBg: "bg-green-50"
    },
    {
      id: 2,
      title: 'Entrepreneurship Incubation',
      description: 'Support for rural youth to start and scale their own agricultural ventures.',
      features: [
        'Mentorship from successful agripreneurs',
        'Seed funding and financial literacy',
        'Market access and business network',
        'Ongoing technical and business support'
      ],
      icon: <Lightbulb className="h-6 w-6" />,
      bgColor: "bg-yellow-100",
      gradientFrom: "from-yellow-500",
      gradientTo: "to-amber-600",
      textColor: "text-yellow-600",
      hoverColor: "group-hover:bg-yellow-100/70",
      borderColor: "border-yellow-200",
      lightBg: "bg-yellow-50"
    },
    {
      id: 3,
      title: 'AgriTech Innovation',
      description: 'Introducing and implementing cutting-edge technologies to enhance agricultural productivity and sustainability.',
      features: [
        'Smart farming technologies',
        'Precision agriculture training',
        'IoT and data-driven farming',
        'Climate-resilient agriculture practices'
      ],
      icon: <Cpu className="h-6 w-6" />,
      bgColor: "bg-blue-100",
      gradientFrom: "from-blue-500",
      gradientTo: "to-blue-600",
      textColor: "text-blue-600",
      hoverColor: "group-hover:bg-blue-100/70",
      borderColor: "border-blue-200",
      lightBg: "bg-blue-50"
    },
    {
      id: 4,
      title: 'Rural Economic Development',
      description: 'Creating a supportive ecosystem for agricultural entrepreneurship in rural communities.',
      features: [
        'Community resource centers',
        'Women empowerment in agriculture',
        'Sustainable village economic models',
        'Agricultural infrastructure development'
      ],
      icon: <Home className="h-6 w-6" />,
      bgColor: "bg-purple-100",
      gradientFrom: "from-purple-500",
      gradientTo: "to-purple-600",
      textColor: "text-purple-600",
      hoverColor: "group-hover:bg-purple-100/70",
      borderColor: "border-purple-200",
      lightBg: "bg-purple-50"
    }
  ];

  // Featured initiatives from content plan
  const featuredInitiatives = [
    {
      id: 1,
      title: "Annada.guru",
      description: "A digital-to-PHYGITAL entrepreneurial platform for rural youth, connecting them to markets and opportunities.",
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-500",
      borderColor: "border-yellow-200",
      image: "/images/initiatives/annadata-guru.jpg",
      gradientFrom: "from-yellow-400",
      gradientTo: "to-yellow-600"
    },
    {
      id: 2,
      title: "Natural Farming Movement",
      description: "Promoting organic and natural farming practices in collaboration with Banas Dairy for sustainable agriculture.",
      bgColor: "bg-green-50",
      iconColor: "text-green-500",
      borderColor: "border-green-200",
      image: "/images/initiatives/natural-farming.jpg",
      gradientFrom: "from-green-400",
      gradientTo: "to-green-600"
    },
    {
      id: 3,
      title: "Biochar-based Carbon Credit Initiative",
      description: "Climate-friendly farming solutions for sustainable agriculture and additional income through carbon credits.",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-500",
      borderColor: "border-blue-200",
      image: "/images/initiatives/biochar.jpg",
      gradientFrom: "from-blue-400",
      gradientTo: "to-blue-600"
    },
    {
      id: 4,
      title: "Collaboration with IIT Ropar",
      description: "Leveraging AI and advanced technologies to revolutionize agriculture and improve productivity.",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-500",
      borderColor: "border-purple-200",
      image: "/images/initiatives/agritech.jpg",
      gradientFrom: "from-purple-400",
      gradientTo: "to-purple-600"
    }
  ];

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
      id="programs" 
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-green-50 via-white to-green-50 relative overflow-hidden"
    >
      {/* Enhanced decorative elements with modern gradients */}
      <div className="absolute top-0 right-0 w-[65%] h-[55%] bg-gradient-radial from-green-300/30 to-transparent opacity-70 blur-[90px]"></div>
      <div className="absolute bottom-0 left-0 w-[65%] h-[55%] bg-gradient-radial from-yellow-300/30 to-transparent opacity-70 blur-[90px]"></div>
      <div className="absolute top-1/3 left-1/2 w-[45%] h-[45%] bg-gradient-radial from-green-400/20 to-transparent opacity-60 blur-[80px] -translate-x-1/2"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[30%] h-[30%] bg-gradient-radial from-blue-300/20 to-transparent opacity-60 blur-[70px]"></div>
      
      {/* Animated background patterns */}
      <div className="absolute inset-0">
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="leaf-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M35,20 Q60,5 75,30 Q90,55 65,65 Q40,75 25,50 Q10,25 35,20 Z" fill="none" stroke="#22c55e" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#leaf-pattern)" />
        </svg>
      </div>
      
      {/* Animated floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingElements.map((element, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-md border-2 ${element.borderClass}`}
            style={{
              width: element.width,
              height: element.height,
              left: element.left,
              top: element.top,
              rotate: element.rotate,
            }}
            animate={{
              y: [0, element.yOffset],
              rotate: [element.rotateStart, element.rotateEnd],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: element.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Vertical curved lines */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <svg className="absolute h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.path
            d="M10,0 C15,25 5,50 10,100"
            stroke="#16a34a" 
            strokeWidth="0.3"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <motion.path
            d="M30,0 C35,35 25,70 30,100"
            stroke="#16a34a" 
            strokeWidth="0.3"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 0.3, ease: "easeInOut" }}
          />
          <motion.path
            d="M50,0 C55,40 45,60 50,100"
            stroke="#16a34a" 
            strokeWidth="0.3"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 0.6, ease: "easeInOut" }}
          />
          <motion.path
            d="M70,0 C75,45 65,55 70,100"
            stroke="#16a34a" 
            strokeWidth="0.3"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 0.9, ease: "easeInOut" }}
          />
          <motion.path
            d="M90,0 C95,25 85,75 90,100"
            stroke="#16a34a" 
            strokeWidth="0.3"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 1.2, ease: "easeInOut" }}
          />
        </svg>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="lg:text-center"
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
              <Boxes className="w-4 h-4 text-green-600" />
            </motion.span>
            Our Programs
          </motion.span>
          <h2 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl font-poppins">
            Cultivating Agricultural <span className="text-green-600">Excellence</span>
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 lg:mx-auto">
            Our comprehensive programs address every aspect of agricultural entrepreneurship.
          </p>
        </motion.div>

        {/* Program tabs */}
        <motion.div 
          className="mt-16 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-wrap justify-center mb-8 border-b border-gray-200 gap-2">
            {programs.map((program) => (
              <motion.button
                key={program.id}
                className={`px-4 py-3 font-medium rounded-t-lg transition-all backdrop-blur-sm ${
                  activeTab === program.id 
                    ? `text-white bg-gradient-to-r ${program.gradientFrom} ${program.gradientTo} border-b-2 border-${program.textColor.split('-')[1]}` 
                    : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                }`}
                onClick={() => setActiveTab(program.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-2">
                  <div className={`flex-shrink-0 ${
                    activeTab === program.id 
                      ? "text-white"
                      : 'text-gray-500'
                  }`}>
                    {program.icon}
                  </div>
                  <span>{program.title}</span>
                </div>
              </motion.button>
            ))}
          </div>
          
          <motion.div 
            className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-gray-100/50"
            whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
          >
            {programs.map((program) => (
              <motion.div 
                key={program.id} 
                className={`transition-all duration-300 ${
                  activeTab === program.id ? 'block' : 'hidden'
                }`}
                initial={false}
                animate={activeTab === program.id ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="p-8 md:p-10">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-2/5">
                      <div className="aspect-w-4 aspect-h-3 rounded-lg mb-6 relative flex items-center justify-center">
                        <motion.div 
                          className="w-32 h-32 flex items-center justify-center"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <div className={`transform scale-[4] ${program.textColor}`}>
                            {program.icon}
                          </div>
                        </motion.div>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
                        {program.title}
                        <motion.span 
                          className={`ml-2 ${program.textColor}`}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Star className="w-5 h-5 fill-current" />
                        </motion.span>
                      </h3>
                      <p className="text-gray-600 mb-4">{program.description}</p>
                    </div>
                    <div className="md:w-3/5">
                      <motion.div 
                        className={`h-full ${program.lightBg} ${program.borderColor} hover:border-${program.textColor.split('-')[1]}-400 rounded-lg p-6 border transition-colors duration-300 shadow-sm hover:shadow-md`}
                        whileHover={{ y: -5 }}
                      >
                        <h4 className={`text-lg font-medium text-gray-900 mb-4 flex items-center border-b ${
                          program.borderColor
                        } pb-3`}>
                          <span className={`h-6 w-6 rounded-full bg-gradient-to-r ${program.gradientFrom} ${program.gradientTo} text-white flex items-center justify-center mr-2`}>
                            <BadgeCheck className="h-4 w-4" />
                          </span>
                          Key Features
                        </h4>
                        <ul className="space-y-4">
                          {program.features.map((feature, index) => (
                            <motion.li 
                              key={index} 
                              className="flex items-start"
                              custom={index}
                              variants={fadeIn}
                              initial="hidden"
                              animate="visible"
                              whileHover={{ x: 5 }}
                            >
                              <div className="flex-shrink-0 mt-1">
                                <div className={`flex items-center justify-center h-6 w-6 rounded-full bg-gradient-to-r ${program.gradientFrom} ${program.gradientTo} text-white`}>
                                  <Check className="h-4 w-4" />
                                </div>
                              </div>
                              <span className="ml-3 text-gray-700">{feature}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        
        {/* Featured Initiatives section from content plan */}
        <motion.div 
          className="mt-24"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Featured Initiatives</h3>
            <p className="max-w-3xl mx-auto text-gray-600">
              Discover our innovative projects making a real difference in agricultural communities across India
            </p>
            <div className="w-20 h-1.5 bg-gradient-to-r from-green-400 to-green-600 mx-auto mt-4 rounded-full"></div>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {featuredInitiatives.map((initiative, index) => (
              <motion.div 
                key={initiative.id} 
                className={`${initiative.bgColor} rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border ${initiative.borderColor} group backdrop-blur-sm h-[350px] flex flex-col`}
                initial="rest"
                whileHover="hover"
                animate="rest"
                variants={hoverCard}
                custom={index}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image 
                    src={initiative.image} 
                    alt={initiative.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = "/images/hero-image.jpg";
                    }}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <motion.span
                      className={`text-white text-xs font-medium px-2 py-1 rounded-full w-fit bg-gradient-to-r ${initiative.gradientFrom} ${initiative.gradientTo}`}
                      initial={{ y: 20, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      View Details
                    </motion.span>
                  </motion.div>
                </div>
                
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center mb-3">
                    <motion.div 
                      className={`flex-shrink-0 h-10 w-10 rounded-full ${initiative.bgColor} border-2 border-white shadow-sm flex items-center justify-center ${initiative.iconColor}`}
                      variants={iconsAnimation}
                    >
                      {initiative.id === 1 && <Smartphone className="h-5 w-5" />}
                      {initiative.id === 2 && <Leaf className="h-5 w-5" />}
                      {initiative.id === 3 && <CloudCog className="h-5 w-5" />}
                      {initiative.id === 4 && <Brain className="h-5 w-5" />}
                    </motion.div>
                    <h3 className="ml-3 text-lg font-bold text-gray-900">{initiative.title}</h3>
                  </div>
                  
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-3"></div>
                  
                  <div className="flex-1">
                    <p className="text-gray-600 text-sm">{initiative.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Programs; 