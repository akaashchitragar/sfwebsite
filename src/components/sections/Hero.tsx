'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Leaf, ArrowUpRight, ChevronLeft, Star, ExternalLink } from 'lucide-react';

const Hero = () => {
  // Background images for the slider with enhanced metadata
  const backgroundImages = [
    {
      src: "/images/hero-image.jpg",
      alt: "Rural agriculture background",
      title: "Cultivating Rural",
      titleHighlight: "Prosperity",
      subtitle: "Empowering agricultural innovation",
      description: "Creating sustainable livelihoods in rural communities through skill development and entrepreneurship."
    },
    {
      src: "/images/hero-image-2.jpg",
      alt: "Farming innovation",
      title: "Growing",
      titleHighlight: "Agri-preneurs",
      subtitle: "Building tomorrow's leaders",
      description: "Transforming rural youth into agricultural business leaders who drive economic growth."
    },
    {
      src: "/images/hero-image-3.jpg",
      alt: "Sustainable agriculture",
      title: "Revolutionizing",
      titleHighlight: "Rural Bharat",
      subtitle: "Sustainable farming practices",
      description: "Blending traditional wisdom with modern techniques for food security and prosperity."
    }
  ];

  // Refs and states
  const heroRef = useRef<HTMLElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [slideProgress, setSlideProgress] = useState(0);
  const [particlesData, setParticlesData] = useState<Array<{left: string; top: string; delay: number; duration: number}>>([]);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  // Initialize particles data on client-side only
  useEffect(() => {
    const generateParticles = () => {
      return Array.from({ length: 12 }).map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: Math.random() * 5,
        duration: 2 + Math.random() * 3
      }));
    };
    
    setParticlesData(generateParticles());
  }, []);

  // Handle scroll parallax effect
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const position = window.scrollY;
      setScrollPosition(position);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigate to next slide with enhanced transitions
  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundImages.length);
      setSlideProgress(0);
      setIsTransitioning(false);
    }, 700);
  }, [isTransitioning, backgroundImages.length]);

  // Navigate to previous slide
  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev === 0 ? backgroundImages.length - 1 : prev - 1));
      setSlideProgress(0);
      setIsTransitioning(false);
    }, 700);
  }, [isTransitioning, backgroundImages.length]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.touches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const minSwipeDistance = 50;
    
    if (distance > minSwipeDistance) {
      nextSlide(); // Swipe left, show next slide
    } else if (distance < -minSwipeDistance) {
      prevSlide(); // Swipe right, show previous slide
    }
    
    // Reset values
    setTouchStartX(0);
    setTouchEndX(0);
  };

  // Autoplay slider with improved timing and progress indicator
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    let progressId: NodeJS.Timeout;
    const slideDuration = 6000;
    const progressUpdateFrequency = 30; // Update progress every 30ms
    
    if (autoplayEnabled && !isTransitioning) {
      // Reset progress when slide changes
      setSlideProgress(0);
      
      // Main interval for changing slides
      intervalId = setInterval(() => {
        nextSlide();
      }, slideDuration);
      
      // Progress bar update interval
      progressId = setInterval(() => {
        setSlideProgress(prev => {
          const newProgress = prev + (progressUpdateFrequency / slideDuration) * 100;
          return Math.min(newProgress, 100);
        });
      }, progressUpdateFrequency);
    }

    return () => {
      clearInterval(intervalId);
      clearInterval(progressId);
    };
  }, [autoplayEnabled, nextSlide, currentSlide, isTransitioning]);

  // Pause autoplay on hover
  const handleMouseEnter = () => setAutoplayEnabled(false);
  const handleMouseLeave = () => setAutoplayEnabled(true);

  // Animation variants
  const slideVariants = {
    enter: { opacity: 0, scale: 1.05, x: 0, y: 30 },
    center: { 
      opacity: 1, 
      scale: 1,
      x: 0,
      y: 0,
      transition: { 
        duration: 1.2, 
        ease: [0.32, 0.72, 0, 1],
        opacity: { duration: 0.8 },
        scale: { duration: 1.4 }
      } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      x: 0,
      y: -30,
      transition: { 
        duration: 0.7,
        ease: [0.32, 0.72, 0, 1]
      } 
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { 
        duration: 0.8, 
        delay: custom * 0.2, 
        ease: [0.22, 1, 0.36, 1] 
      }
    }),
    exit: { 
      opacity: 0, 
      y: -20, 
      filter: "blur(5px)",
      transition: { duration: 0.5 } 
    }
  };
  
  const statsVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.6
      }
    }
  };
  
  const statItemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 10
      }
    }
  };

  // Enhanced image depth effect
  const imageDepthEffect = {
    initial: { filter: "brightness(0.8) contrast(1.1)" },
    animate: { 
      filter: "brightness(1) contrast(1)", 
      transition: { duration: 1.5 }
    }
  };

  return (
    <section 
      id="hero" 
      ref={heroRef}
      className="relative w-full h-screen overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slide counter indicator */}
      <div className="absolute top-8 left-8 z-40 flex items-center space-x-2 bg-black/20 backdrop-blur-md py-1.5 px-3 rounded-full border border-white/10">
        <span className="text-white/90 font-medium text-sm">
          {currentSlide + 1}/{backgroundImages.length}
        </span>
      </div>

      {/* Background Image Slider with Parallax */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div 
          key={currentSlide}
          initial="enter"
          animate="center"
          exit="exit"
          variants={slideVariants}
          className="absolute inset-0 w-full h-full"
          style={{ pointerEvents: 'none' }}
        >
          <div className="relative w-full h-full">
            <motion.div 
              className="w-full h-full"
              initial={{ filter: "blur(12px) brightness(0.6)", opacity: 0.7 }}
              animate={{ filter: "blur(0px) brightness(1)", opacity: 1 }}
              exit={{ filter: "blur(12px) brightness(0.6)", opacity: 0.7 }}
              transition={{ duration: 1.4, ease: "easeOut" }}
            >
              <motion.div
                initial="initial"
                animate="animate"
                variants={imageDepthEffect}
                className="w-full h-full"
              >
                <Image
                  src={backgroundImages[currentSlide].src}
                  alt={backgroundImages[currentSlide].alt}
                  fill
                  priority={true}
                  className="object-cover object-center"
                  sizes="100vw"
                  style={{
                    transform: `scale(${1 + scrollPosition * 0.0003}) translateY(${scrollPosition * 0.05}px)`
                  }}
                />
              </motion.div>
            </motion.div>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-b from-black/80 via-green-950/70 to-green-900/80 pointer-events-none"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 0.85 }}
              transition={{ duration: 1 }}
            ></motion.div>
            
            {/* Enhanced abstract shapes overlay with 3D perspective */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ perspective: '1000px' }}>
              <motion.div 
                className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-green-500/20 blur-3xl"
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.2, 0.3, 0.2],
                  rotateX: [0, 5, 0],
                  rotateY: [0, 10, 0]
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              ></motion.div>
              <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-black/40 to-transparent"></div>
              <motion.div 
                className="absolute top-1/3 -left-24 w-64 h-64 rounded-full bg-yellow-500/10 blur-3xl"
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.1, 0.2, 0.1],
                  rotateX: [0, -5, 0],
                  rotateY: [0, -10, 0]
                }}
                transition={{ 
                  duration: 7,
                  delay: 1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              ></motion.div>
              
              {/* Enhanced particle effect */}
              <div className="absolute inset-0">
                {particlesData.map((particle, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full bg-white/40"
                    style={{
                      left: particle.left,
                      top: particle.top,
                      width: i % 3 === 0 ? '2px' : '1px',
                      height: i % 3 === 0 ? '2px' : '1px'
                    }}
                    animate={{
                      opacity: [0, 0.8, 0],
                      scale: [0, 1, 0],
                      filter: ["blur(0px)", "blur(1px)", "blur(0px)"]
                    }}
                    transition={{
                      duration: particle.duration,
                      repeat: Infinity,
                      delay: particle.delay,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Content overlay with animated text */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-4xl space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Animated hero tag */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`tag-${currentSlide}`}
                initial="hidden"
                animate="visible"
                exit="exit"
                custom={0}
                variants={textVariants}
                style={{ pointerEvents: 'auto' }}
              >
                <div className="flex items-center space-x-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20 backdrop-blur-md">
                    <Leaf className="h-4 w-4 text-green-400" />
                  </div>
                  <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-sm font-medium tracking-wider shadow-sm border border-white/10">
                    Sanghachadwam Foundation
                  </span>
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="flex items-center bg-green-600/20 backdrop-blur-md rounded-full px-2 py-0.5 border border-green-500/20"
                  >
                    <Star className="h-3 w-3 text-yellow-400 mr-1" />
                    <span className="text-xs font-medium text-green-200">Since 2022</span>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Hero title with enhanced animated transitions */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={`title-${currentSlide}`}
                className="space-y-2"
                initial="hidden"
                animate="visible"
                exit="exit"
                custom={1}
                variants={textVariants}
              >
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
                  {backgroundImages[currentSlide].title}{" "}
                  <span className="relative inline-block">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-green-500">
                      {backgroundImages[currentSlide].titleHighlight}
                    </span>
                    <motion.span 
                      className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-green-300 to-green-500 rounded-full"
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: "100%", opacity: 1 }}
                      transition={{ delay: 0.8, duration: 0.8 }}
                    ></motion.span>
                  </span>
                </h1>
                <motion.p 
                  className="text-xl md:text-2xl font-medium text-green-200 leading-tight mt-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                >
                  {backgroundImages[currentSlide].subtitle}
                </motion.p>
              </motion.div>
            </AnimatePresence>
            
            {/* Hero description with enhanced animated transitions */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={`desc-${currentSlide}`}
                className="relative"
                initial="hidden"
                animate="visible"
                exit="exit"
                custom={2}
                variants={textVariants}
              >
                <p className="text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed font-medium">
                  {backgroundImages[currentSlide].description}
                </p>
              </motion.div>
            </AnimatePresence>
            
            {/* Stats highlight with improved animation */}
            <motion.div
              variants={statsVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-8 pt-2"
              style={{ pointerEvents: 'auto' }}
            >
              <motion.div 
                variants={statItemVariants} 
                className="flex items-center space-x-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3"
                whileHover={{ y: -4, backgroundColor: "rgba(255,255,255,0.1)" }}
              >
                <div className="text-3xl font-bold text-white">1M<span className="text-green-400">+</span></div>
                <div className="text-sm text-green-200">Agri-preneurs<br/>by 2035</div>
              </motion.div>
              
              <motion.div 
                variants={statItemVariants}
                className="flex items-center space-x-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3"
                whileHover={{ y: -4, backgroundColor: "rgba(255,255,255,0.1)" }}
              >
                <div className="text-3xl font-bold text-white">5K<span className="text-green-400">+</span></div>
                <div className="text-sm text-green-200">Rural youth<br/>trained</div>
              </motion.div>
              
              <motion.div 
                variants={statItemVariants}
                className="flex items-center space-x-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3"
                whileHover={{ y: -4, backgroundColor: "rgba(255,255,255,0.1)" }}
              >
                <div className="text-3xl font-bold text-white">300<span className="text-green-400">+</span></div>
                <div className="text-sm text-green-200">Villages<br/>impacted</div>
              </motion.div>
            </motion.div>
            
            {/* CTA buttons with enhanced animations */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-5 pt-6 z-30"
              initial="hidden"
              animate="visible"
              custom={4}
              variants={textVariants}
              style={{ pointerEvents: 'auto' }}
            >
              <motion.div 
                whileHover={{ scale: 1.03 }} 
                whileTap={{ scale: 0.97 }} 
                className="relative"
              >
                <Link
                  href="#programs"
                  className="inline-flex justify-center items-center px-7 py-4 rounded-full bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold hover:shadow-lg hover:shadow-green-500/25 shadow-lg group"
                >
                  <span className="mr-2">Join Our Movement</span>
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
                
                {/* Enhanced button glow effect */}
                <motion.div 
                  className="absolute -inset-1 rounded-full blur-md bg-green-400/20 z-0"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    opacity: [0.3, 0.5, 0.3]
                   }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.03 }} 
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  href="#donate"
                  className="inline-flex justify-center items-center px-7 py-4 rounded-full bg-white/15 backdrop-blur-md text-white border border-white/20 font-semibold transition-all hover:bg-white/20 hover:border-white/30 shadow-lg group"
                >
                  <span className="mr-2">Support Our Cause</span>
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Enhanced slide navigation with improved progress indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40 flex flex-col items-center space-y-4" style={{ pointerEvents: 'auto' }}>
        <div className="flex space-x-4">
          {backgroundImages.map((_, index) => (
            <div key={index} className="relative cursor-pointer" onClick={() => {
              if (!isTransitioning) {
                setIsTransitioning(true);
                setTimeout(() => {
                  setCurrentSlide(index);
                  setSlideProgress(0);
                  setIsTransitioning(false);
                }, 700);
              }
            }}>
              <div className={`group flex flex-col items-center space-y-2 ${index === currentSlide ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}>
                <div className="relative">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-green-400 w-10' 
                        : 'bg-white/40 group-hover:bg-white/60 w-6'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                  
                  {/* Progress indicator for current slide */}
                  {index === currentSlide && (
                    <motion.div 
                      className="absolute top-0 left-0 h-2 bg-white rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${slideProgress}%` }}
                      style={{ maxWidth: "100%" }}
                    />
                  )}
                </div>
                
                {/* Mini title for each slide */}
                <span className={`text-xs font-medium transition-all duration-300 ${
                  index === currentSlide ? 'text-white' : 'text-white/50 group-hover:text-white/70'
                }`}>
                  {backgroundImages[index].titleHighlight}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Autoplay control */}
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setAutoplayEnabled(!autoplayEnabled)}
            className={`px-3 py-1 text-xs font-medium rounded-full border transition-all duration-300 ${
              autoplayEnabled 
                ? 'bg-green-500/20 text-green-300 border-green-500/30' 
                : 'bg-white/10 text-white/70 border-white/20 hover:bg-white/20'
            }`}
          >
            {autoplayEnabled ? 'Autoplay On' : 'Autoplay Off'}
          </button>
        </div>
      </div>
      
      {/* Enhanced arrow controls with 3D hover effect */}
      <div className="absolute z-40 inset-y-0 w-full flex items-center justify-between px-4" style={{ pointerEvents: 'none' }}>
        <motion.button 
          onClick={prevSlide}
          className="bg-black/20 backdrop-blur-md text-white rounded-full p-3 opacity-0 sm:opacity-50 transition-all duration-300 hover:bg-black/40 hover:opacity-100 border border-white/10"
          aria-label="Previous slide"
          whileHover={{ scale: 1.1, x: -2, boxShadow: "0 0 15px rgba(255,255,255,0.2)" }}
          whileTap={{ scale: 0.95 }}
          style={{ pointerEvents: 'auto' }}
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>
        
        <motion.button 
          onClick={nextSlide}
          className="bg-black/20 backdrop-blur-md text-white rounded-full p-3 opacity-0 sm:opacity-50 transition-all duration-300 hover:bg-black/40 hover:opacity-100 border border-white/10"
          aria-label="Next slide"
          whileHover={{ scale: 1.1, x: 2, boxShadow: "0 0 15px rgba(255,255,255,0.2)" }}
          whileTap={{ scale: 0.95 }}
          style={{ pointerEvents: 'auto' }}
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>
      </div>
    </section>
  );
};

export default Hero; 