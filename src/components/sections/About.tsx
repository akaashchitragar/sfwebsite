'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Play, Info, Leaf, GraduationCap, LightbulbIcon, FlaskConical, X, Award, Heart, Clock, TrendingUp, Building } from 'lucide-react';
import SectionBadge from '../ui/SectionBadge';
import { useLoading } from '@/context/LoadingContext';

// Define a type for tab content
type TabContent = {
  mission: {
    title: string;
    content: string;
  };
  vision: {
    title: string;
    content: string;
  };
  impact: {
    title: string;
    content: string;
  };
};

// Define a type for tab keys
type TabKey = keyof TabContent;

const About = () => {
  // State for YouTube video loading and tabs
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>('mission');
  const [isVisible, setIsVisible] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [bgParticles, setBgParticles] = useState<Array<{
    left: string;
    top: string;
    scale: number;
    xOffset: number;
    yOffset: number;
    duration: number;
  }>>([]);
  const { isLoading } = useLoading();
  const [canAnimate, setCanAnimate] = useState(false);

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  const toggleVideoModal = (state: boolean) => {
    setVideoModalOpen(state);
    document.body.style.overflow = state ? 'hidden' : 'auto';
  };

  // Generate background particles on client-side only
  useEffect(() => {
    const particles = Array.from({ length: 15 }).map(() => {
      return {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        scale: Math.random() * 1.5 + 0.5,
        xOffset: Math.random() * 50 - 25,
        yOffset: Math.random() * 50 - 25,
        duration: 8 + Math.random() * 10
      };
    });
    
    setBgParticles(particles);
  }, []);

  useEffect(() => {
    // Intersection observer to trigger animations when section is in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const section = document.getElementById('about');
    if (section) observer.observe(section);
    
    return () => {
      if (section) observer.unobserve(section);
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Only enable animations after preloader is done
  useEffect(() => {
    if (!isLoading) {
      setCanAnimate(true);
    }
  }, [isLoading]);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const hoverAnimation = {
    rest: { scale: 1, y: 0 },
    hover: { 
      scale: 1.05, 
      y: -5,
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

  // Tab data
  const tabContent: TabContent = {
    mission: {
      title: "Our Mission",
      content: "At Sanghachadwam Foundation, we believe that agriculture can be a first-choice profession for India's youth. Our mission is to transform agriculture in Bharat by empowering rural youth with skills, resources, and opportunities to become successful agri-entrepreneurs."
    },
    vision: {
      title: "Our Vision",
      content: "Our goal is to cultivate 1 million agri-preneurs by 2035, fostering sustainable growth and economic resilience across rural India, making agriculture a profitable and dignified profession."
    },
    impact: {
      title: "Our Impact",
      content: "Through skill development, entrepreneurship opportunities, and agritech innovation, we're creating sustainable business models that empower rural communities and strengthen the agricultural ecosystem in India."
    }
  };

  // Focus areas with icons from Lucide
  const focusAreas = [
    {
      title: "Rural Entrepreneurship",
      icon: <Leaf className="w-5 h-5" />,
      color: "bg-green-500"
    },
    {
      title: "Skill Development",
      icon: <GraduationCap className="w-5 h-5" />,
      color: "bg-blue-500"
    },
    {
      title: "Agritech Innovation",
      icon: <LightbulbIcon className="w-5 h-5" />,
      color: "bg-amber-500"
    },
    {
      title: "Policy Advocacy",
      icon: <FlaskConical className="w-5 h-5" />,
      color: "bg-purple-500"
    }
  ];

  return (
    <section id="about" className="py-16 md:py-20 bg-gradient-to-b from-white to-green-50 relative overflow-hidden">
      {/* Enhanced background decorative elements */}
      <div className="absolute top-0 right-0 w-[40%] h-[60%] bg-gradient-radial from-green-300/20 to-transparent opacity-70 blur-[80px]"></div>
      <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-gradient-radial from-yellow-300/20 to-transparent opacity-60 blur-[100px]"></div>
      <div className="absolute top-1/3 right-1/3 w-[30%] h-[30%] bg-gradient-radial from-blue-200/10 to-transparent opacity-60 blur-[70px]"></div>
      
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {bgParticles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-green-500/20"
            style={{
              left: particle.left,
              top: particle.top,
              scale: particle.scale,
            }}
            animate={{
              x: [0, particle.xOffset],
              y: [0, particle.yOffset],
              opacity: [0.1, 0.6, 0.1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Background grain texture - replaced with CSS pattern */}
      <div className="absolute inset-0 opacity-20 bg-[size:128px_128px] bg-[linear-gradient(to_right,#f9fafb_1px,transparent_1px),linear-gradient(to_bottom,#f9fafb_1px,transparent_1px)]"></div>

      {/* Background grid pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }}
      ></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-2 gap-10 lg:items-center">
          {/* Left column: Title and tabs */}
          <motion.div 
            initial="hidden"
            animate={canAnimate && isVisible ? "visible" : "hidden"}
            variants={fadeIn}
            className="space-y-7"
          >
            <div>
              <SectionBadge icon={Building} text="About Us" />
              <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                Transforming Agriculture <span className="text-green-600">in Bharat</span>
              </h2>
              <div className="w-16 h-1 bg-green-500 mt-4 rounded-full"></div>
            </div>
            
            {/* Tab buttons */}
            <div className="flex space-x-1 bg-green-50/80 backdrop-blur-sm p-1 rounded-lg w-fit border border-green-100/50 shadow-sm">
              {(Object.keys(tabContent) as Array<keyof typeof tabContent>).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                    activeTab === tab
                      ? 'bg-white text-green-700 shadow-sm'
                      : 'text-gray-600 hover:text-green-700 hover:bg-white/70'
                  }`}
                >
                  {tabContent[tab].title}
                </button>
              ))}
            </div>
            
            {/* Tab content */}
            <div 
              className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-green-100/50 transition-colors"
            >
              <p className="text-gray-700 leading-relaxed">
                {tabContent[activeTab].content}
              </p>
            </div>
            
            {/* Focus areas */}
            <motion.div 
              variants={staggerChildren}
              className="grid grid-cols-2 gap-3 mt-6"
            >
              {focusAreas.map((area, index) => (
                <motion.div
                  key={index}
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                  variants={hoverAnimation}
                  className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-sm border border-green-100/30 hover:border-green-200/50 transition-all duration-300"
                >
                  <motion.div 
                    variants={iconAnimation}
                    className={`${area.color} text-white p-2 rounded-lg shadow-sm`}
                  >
                    {area.icon}
                  </motion.div>
                  <span className="text-sm font-medium text-gray-800">{area.title}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Right column: Image and video */}
          <motion.div 
            initial="hidden"
            animate={canAnimate && isVisible ? "visible" : "hidden"}
            variants={fadeIn}
            className="mt-12 lg:mt-0"
          >
            <motion.div 
              initial="rest"
              whileHover="hover"
              animate="rest"
              variants={hoverAnimation}
              className="relative rounded-2xl overflow-hidden shadow-xl h-[420px]"
            >
              {/* Main image */}
              <Image 
                src="/images/hero-image.jpg" 
                alt="Sanghachadwam Foundation"
                fill
                className="object-cover z-0 transition-transform duration-500 hover:scale-105"
                priority
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10 z-10"></div>
              
              {/* Content overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <div className="flex flex-col space-y-4">
                  <div>
                    <h3 className="text-white text-2xl font-bold leading-tight">
                      Empowering Rural Youth in India
                    </h3>
                    <p className="text-white/80 mt-1 max-w-md">
                      Cultivating 1 million agri-preneurs by 2035
                    </p>
                  </div>
                  
                  {/* Video button */}
                  <motion.button
                    onClick={() => toggleVideoModal(true)}
                    className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg shadow-lg w-fit transition-colors group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="bg-white rounded-full p-2 shadow-sm">
                      <Play className="w-5 h-5 text-green-600 fill-green-600" />
                    </div>
                    <span className="font-medium text-base">Watch Our Story</span>
                  </motion.button>
                </div>
              </div>
              
              {/* Info badge */}
              <motion.div 
                initial="rest"
                whileHover="hover"
                animate="rest"
                variants={hoverAnimation}
                className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md z-20 flex items-center space-x-1.5 border border-green-100/50"
              >
                <motion.div variants={iconAnimation}>
                  <Info className="w-4 h-4 text-green-600" />
                </motion.div>
                <span className="text-xs font-medium text-gray-700">Learn More</span>
              </motion.div>
            </motion.div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-5">
              <motion.div 
                initial="rest"
                whileHover="hover"
                animate="rest"
                variants={hoverAnimation}
                className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-md flex flex-col items-center justify-center text-center border border-green-100/50 hover:border-green-200/70 transition-all duration-300"
              >
                <motion.div variants={iconAnimation} className="text-green-500 mb-1">
                  <TrendingUp className="w-5 h-5 mx-auto" />
                </motion.div>
                <span className="text-green-600 font-bold text-2xl md:text-3xl">1M+</span>
                <span className="text-gray-600 text-xs md:text-sm font-medium mt-1">Entrepreneurs</span>
              </motion.div>
              <motion.div 
                initial="rest"
                whileHover="hover"
                animate="rest"
                variants={hoverAnimation}
                className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-md flex flex-col items-center justify-center text-center border border-green-100/50 hover:border-green-200/70 transition-all duration-300"
              >
                <motion.div variants={iconAnimation} className="text-green-500 mb-1">
                  <Heart className="w-5 h-5 mx-auto" />
                </motion.div>
                <span className="text-green-600 font-bold text-2xl md:text-3xl">5K+</span>
                <span className="text-gray-600 text-xs md:text-sm font-medium mt-1">Villages</span>
              </motion.div>
              <motion.div 
                initial="rest"
                whileHover="hover"
                animate="rest"
                variants={hoverAnimation}
                className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-md flex flex-col items-center justify-center text-center border border-green-100/50 hover:border-green-200/70 transition-all duration-300"
              >
                <motion.div variants={iconAnimation} className="text-green-500 mb-1">
                  <Clock className="w-5 h-5 mx-auto" />
                </motion.div>
                <span className="text-green-600 font-bold text-2xl md:text-3xl">24+</span>
                <span className="text-gray-600 text-xs md:text-sm font-medium mt-1">States</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Video Modal */}
      {videoModalOpen && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop with blur effect */}
          <motion.div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => toggleVideoModal(false)}
          />
          
          <motion.div 
            className="w-full max-w-5xl relative z-10"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <motion.button 
              onClick={() => toggleVideoModal(false)}
              className="absolute -top-14 right-0 p-2.5 text-white/90 hover:text-white bg-black/40 hover:bg-black/60 rounded-full transition-colors border border-white/10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              aria-label="Close video"
            >
              <X className="w-7 h-7" />
            </motion.button>
            
            <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-gray-800 relative">
              {!videoLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black">
                  <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-white/70 text-sm font-medium">Loading video...</p>
                </div>
              )}
              <iframe 
                className={`w-full h-full transition-opacity duration-700 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
                src="https://www.youtube.com/embed/4YzzeeBk7LM?si=a478eJcrs6PPPcj3&autoplay=1" 
                title="Sanghachadwam Foundation"
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                onLoad={handleVideoLoad}
              ></iframe>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default About; 