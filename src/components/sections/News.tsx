'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { BookOpen, Users, Newspaper, Calendar, ChevronRight, ChevronLeft, MapPin, Award, Bell, Globe, Megaphone, Calendar as CalendarIcon, Clock, MessageSquare } from 'lucide-react';

const News = () => {
  const [activeTab, setActiveTab] = useState('updates');
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  // Add newsletter subscription state
  const [email, setEmail] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState({
    submitting: false,
    submitted: false,
    error: null as string | null
  });

  const [newsShapes, setNewsShapes] = useState<Array<{
    width: string;
    height: string;
    left: string;
    top: string;
    rotateAngle: number;
    duration: number;
    delay: number;
  }>>([]);
  
  // Generate random values for news shapes on client-side only
  useEffect(() => {
    const shapes = Array.from({ length: 6 }).map((_, i) => {
      return {
        width: `${80 + Math.random() * 100}px`,
        height: `${60 + Math.random() * 80}px`,
        left: `${Math.random() * 90}%`,
        top: `${Math.random() * 80}%`,
        rotateAngle: Math.random() * 5 - 2.5,
        duration: 5 + Math.random() * 10,
        delay: i * 0.5
      };
    });
    
    setNewsShapes(shapes);
  }, []);

  const newsCategories = [
    { 
      id: 'updates', 
      label: 'Latest Updates', 
      icon: <Newspaper className="h-5 w-5" />,
      gradientFrom: 'from-green-400',
      gradientTo: 'to-green-600',
      color: 'green'
    },
    { 
      id: 'media', 
      label: 'Media Coverage', 
      icon: <Megaphone className="h-5 w-5" />,
      gradientFrom: 'from-blue-400',
      gradientTo: 'to-blue-600',
      color: 'blue'
    },
    { 
      id: 'events', 
      label: 'Events & Webinars', 
      icon: <Calendar className="h-5 w-5" />,
      gradientFrom: 'from-yellow-400',
      gradientTo: 'to-amber-500',
      color: 'yellow'
    }
  ];
  
  // Sample news data for each category
  const newsData = {
    updates: [
      {
        id: 1,
        title: "Sanghachadwam Foundation Launches New Initiative with Banas Dairy",
        date: "June 15, 2023",
        excerpt: "A new collaboration to promote natural farming practices across Gujarat aimed at improving soil health and increasing farmer incomes through sustainable practices.",
        category: "Partnerships",
        imageUrl: "/images/news/banas-dairy.jpg", // Placeholder image
        link: "#news-1"
      },
      {
        id: 2,
        title: "1,000 New Farmers Join Our Skill Development Program",
        date: "May 28, 2023",
        excerpt: "Our flagship program continues to grow with a new batch of rural youth learning modern agricultural techniques and entrepreneurship skills.",
        category: "Milestone",
        imageUrl: "/images/news/farmers-training.jpg", // Placeholder image
        link: "#news-2"
      },
      {
        id: 3,
        title: "Biochar Initiative Wins Environmental Excellence Award",
        date: "April 12, 2023",
        excerpt: "Our carbon credit program using biochar technology has been recognized for its innovative approach to sustainable agriculture and climate action.",
        category: "Awards",
        imageUrl: "/images/news/award.jpg", // Placeholder image
        link: "#news-3"
      }
    ],
    media: [
      {
        id: 1,
        title: "Agri-preneurs: The Future of Rural India",
        publication: "The Economic Times",
        date: "April 10, 2023",
        excerpt: "An in-depth article featuring our work on transforming agriculture into a first-choice profession for India's youth through innovation and entrepreneurship.",
        logo: "/images/media/economic-times.png", // Placeholder
        link: "#media-1"
      },
      {
        id: 2,
        title: "How Technology is Revolutionizing Farming in Rural India",
        publication: "India Today",
        date: "March 5, 2023",
        excerpt: "A feature on our collaboration with IIT Ropar on AI-driven agricultural innovations that are making farming more efficient and profitable.",
        logo: "/images/media/india-today.png", // Placeholder
        link: "#media-2"
      },
      {
        id: 3,
        title: "Women Leading Agricultural Change in Rural Communities",
        publication: "Hindustan Times",
        date: "February 15, 2023",
        excerpt: "A special feature on women agri-entrepreneurs supported by our programs who are breaking barriers and building successful businesses.",
        logo: "/images/media/hindustan-times.png", // Placeholder
        link: "#media-3"
      }
    ],
    events: [
      {
        id: 1,
        title: "Agricultural Entrepreneurship Summit 2023",
        date: "July 25-26, 2023",
        location: "New Delhi, India",
        description: "Join us for our annual summit bringing together agri-entrepreneurs, investors, and policymakers to discuss the future of agriculture in India.",
        image: "/images/events/summit.jpg", // Placeholder 
        link: "#event-1",
        isUpcoming: true
      },
      {
        id: 2,
        title: "Webinar: Sustainable Farming Practices",
        date: "August 12, 2023",
        time: "3:00 PM - 4:30 PM IST",
        description: "Learn about regenerative agricultural techniques from leading experts and discover how to implement them on your farm.",
        image: "/images/events/webinar.jpg", // Placeholder
        link: "#event-2",
        isUpcoming: true
      },
      {
        id: 3,
        title: "Rural Youth Innovation Challenge",
        date: "September 5-30, 2023",
        location: "Virtual",
        description: "A month-long competition for young innovators to develop solutions for agricultural challenges. Cash prizes and mentorship opportunities available.",
        image: "/images/events/challenge.jpg", // Placeholder
        link: "#event-3",
        isUpcoming: true
      }
    ]
  };

  // Add newsletter subscription handler
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setSubscriptionStatus({
        submitting: false,
        submitted: false,
        error: "Please enter your email address"
      });
      return;
    }
    
    setSubscriptionStatus({
      submitting: true,
      submitted: false,
      error: null
    });
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }
      
      setSubscriptionStatus({
        submitting: false,
        submitted: true,
        error: null
      });
      
      setEmail('');
      
    } catch (error) {
      setSubscriptionStatus({
        submitting: false,
        submitted: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred'
      });
    }
  };

  return (
    <section 
      id="news" 
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-green-50 to-white relative overflow-hidden"
    >
      {/* Enhanced decorative background elements */}
      <div className="absolute -top-24 right-0 w-[50%] h-[40%] bg-gradient-radial from-green-200/30 to-transparent opacity-80 blur-[100px]"></div>
      <div className="absolute bottom-20 -left-24 w-[50%] h-[40%] bg-gradient-radial from-yellow-200/30 to-transparent opacity-70 blur-[100px]"></div>
      <div className="absolute top-1/3 left-1/4 w-[30%] h-[30%] bg-gradient-radial from-green-300/20 to-transparent opacity-60 blur-[80px]"></div>
      
      {/* News-themed background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Newspaper-like pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                to bottom,
                transparent,
                transparent 1px,
                #000 1px,
                #000 2px
              )
            `,
            backgroundSize: '100% 8px'
          }}
        ></div>
        
        {/* Headlines style animated decorations */}
        <div className="absolute top-1/4 left-[10%] w-[15%] h-[1px] bg-gray-400/20">
          <motion.div 
            className="h-full bg-green-500/40"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, ease: "easeInOut" }}
          ></motion.div>
        </div>
        <div className="absolute top-1/3 right-[15%] w-[20%] h-[1px] bg-gray-400/20">
          <motion.div 
            className="h-full bg-green-500/40"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.5, delay: 0.2, ease: "easeInOut" }}
          ></motion.div>
        </div>
        <div className="absolute top-2/3 left-[25%] w-[25%] h-[1px] bg-gray-400/20">
          <motion.div 
            className="h-full bg-green-500/40"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 3, delay: 0.4, ease: "easeInOut" }}
          ></motion.div>
        </div>
        <div className="absolute bottom-1/4 right-[5%] w-[10%] h-[1px] bg-gray-400/20">
          <motion.div 
            className="h-full bg-green-500/40"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.5, delay: 0.6, ease: "easeInOut" }}
          ></motion.div>
        </div>
      </div>
      
      {/* Animated dots pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="dots-pattern" x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="#22c55e" opacity="0.2" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#dots-pattern)" />
        </svg>
      </div>
      
      {/* Floating news-like shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {newsShapes.map((shape, i) => (
          <motion.div
            key={i}
            className="absolute rounded bg-white/40 backdrop-blur-md border border-green-100/50 shadow-sm"
            style={{
              width: shape.width,
              height: shape.height,
              left: shape.left,
              top: shape.top,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              y: [0, -15, 0],
              rotate: [0, shape.rotateAngle, 0],
            }}
            transition={{
              duration: shape.duration,
              delay: shape.delay,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          >
            <div className="w-[70%] h-[4px] bg-gray-300/30 rounded-full mt-3 ml-3"></div>
            <div className="w-[40%] h-[4px] bg-gray-300/30 rounded-full mt-3 ml-3"></div>
          </motion.div>
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="lg:text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100/80 backdrop-blur-sm text-green-800 text-sm font-medium mb-4 border border-green-200/50"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Bell className="w-4 h-4 text-green-600" />
            News & Media
          </motion.span>
          <h2 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl font-poppins">
            Stay Updated with <span className="text-green-600">Our Work</span>
          </h2>
          <p className="mt-4 max-w-3xl text-xl text-gray-600 lg:mx-auto">
            The latest news, events, and media coverage about our initiatives and impact.
          </p>
        </motion.div>

        {/* Tab navigation */}
        <motion.div 
          className="flex flex-wrap justify-center border-b border-gray-200 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {newsCategories.map((category, index) => (
            <motion.button
              key={category.id}
              className={`flex items-center py-4 px-6 font-medium text-sm border-b-2 focus:outline-none transition-all duration-300 ${
                activeTab === category.id
                  ? `border-${category.color}-600 text-${category.color}-600 bg-${category.color}-50/50`
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
            >
              <div className={`p-1.5 rounded-full mr-2 ${activeTab === category.id ? `bg-gradient-to-br ${category.gradientFrom} ${category.gradientTo} text-white` : 'bg-gray-100 text-gray-500'}`}>
                {category.icon}
              </div>
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Tab content */}
        <div className="mt-8">
          {/* Latest Updates */}
          {activeTab === 'updates' && (
            <motion.div 
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {newsData.updates.map((news, index) => (
                <motion.div 
                  key={news.id} 
                  className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100 group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  whileHover={{ 
                    y: -5,
                    transition: { duration: 0.2 } 
                  }}
                >
                  <div className="relative h-48 bg-green-100">
                    {/* Replace with actual images when available */}
                    <div className="absolute inset-0 flex items-center justify-center text-green-700 text-sm font-medium">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-green-500 opacity-50">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-medium rounded-full shadow-sm">
                        {news.category}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-gray-500 mb-2 flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-1 text-green-500" />
                      {news.date}
                    </div>
                    <div className="h-0.5 w-20 bg-gradient-to-r from-green-300 to-green-500 rounded-full mb-3"></div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors line-clamp-2">{news.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{news.excerpt}</p>
                    <motion.a 
                      href={news.link} 
                      className="inline-flex items-center text-green-600 hover:text-green-700 font-medium group/link"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      Read more
                      <ChevronRight className="ml-1 h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Media Coverage */}
          {activeTab === 'media' && (
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {newsData.media.map((item, index) => (
                <motion.div 
                  key={item.id} 
                  className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6 md:p-8 hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  whileHover={{ 
                    y: -5,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                >
                  <div className="md:flex md:items-start">
                    <div className="hidden md:block md:flex-shrink-0 mr-8">
                      <div className="h-24 w-24 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-md">
                        <motion.div
                          animate={{ rotate: [0, 5, 0, -5, 0] }}
                          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <Globe className="w-10 h-10 text-white" />
                        </motion.div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-start mb-3">
                        <h3 className="text-xl font-bold text-gray-900 mt-2 md:mt-0">{item.title}</h3>
                        <span className="inline-flex px-3 py-1 bg-gradient-to-r from-blue-400 to-blue-600 text-white text-xs font-semibold rounded-full whitespace-nowrap md:ml-4 shadow-sm">
                          {item.publication}
                        </span>
                      </div>
                      <div className="h-0.5 w-20 bg-gradient-to-r from-blue-300 to-blue-500 rounded-full mb-3"></div>
                      <div className="text-sm text-gray-500 mb-3 flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-1 text-blue-500" />
                        {item.date}
                      </div>
                      <p className="text-gray-600 mb-4">{item.excerpt}</p>
                      <motion.a 
                        href={item.link} 
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group/link"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        Read the article
                        <ChevronRight className="ml-1 h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Events & Webinars */}
          {activeTab === 'events' && (
            <motion.div 
              className="space-y-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div>
                <motion.div 
                  className="flex items-center mb-8"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="p-2 mr-3 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 text-white shadow-md">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Upcoming Events</h3>
                  <div className="ml-4 px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full border border-yellow-200">
                    Save the Date
                  </div>
                </motion.div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {newsData.events.filter(event => event.isUpcoming).map((event, index) => (
                    <motion.div 
                      key={event.id} 
                      className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-yellow-100 group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      whileHover={{ 
                        y: -5,
                        transition: { duration: 0.2 } 
                      }}
                    >
                      <div className="relative h-48 bg-yellow-50">
                        {/* Replace with actual images when available */}
                        <div className="absolute inset-0 flex items-center justify-center text-yellow-700 text-sm font-medium">
                          <motion.div
                            animate={{ 
                              rotate: [0, 2, 0, -2, 0],
                              scale: [1, 1.05, 1, 1.05, 1] 
                            }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                          >
                            <Calendar className="w-12 h-12 text-yellow-500 opacity-60" />
                          </motion.div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <div className="p-6 border-t-4 border-gradient-to-r from-yellow-400 to-amber-500">
                        <h4 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors">{event.title}</h4>
                        <div className="h-0.5 w-16 bg-gradient-to-r from-yellow-300 to-amber-400 rounded-full mb-3"></div>
                        <div className="space-y-2 mb-4 bg-yellow-50/50 p-3 rounded-lg border border-yellow-100">
                          <div className="flex items-center text-sm text-gray-600">
                            <CalendarIcon className="mr-2 h-4 w-4 text-yellow-500" />
                            {event.date}
                          </div>
                          {event.time && (
                            <div className="flex items-center text-sm text-gray-600">
                              <Clock className="mr-2 h-4 w-4 text-yellow-500" />
                              {event.time}
                            </div>
                          )}
                          {event.location && (
                            <div className="flex items-center text-sm text-gray-600">
                              <MapPin className="mr-2 h-4 w-4 text-yellow-500" />
                              {event.location}
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-5 line-clamp-2">{event.description}</p>
                        <motion.a 
                          href={event.link} 
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 shadow-sm transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Register Now
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </motion.a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <motion.div 
                className="bg-gradient-to-r from-green-50 to-yellow-50 rounded-xl shadow-md overflow-hidden p-8 md:p-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="md:flex md:items-center">
                  <div className="md:w-2/3 md:pr-8 mb-8 md:mb-0">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Host an Event with Us</h3>
                    <p className="text-gray-600 mb-5">
                      Interested in collaborating on an event or hosting a workshop about agricultural entrepreneurship? 
                      We partner with organizations, universities, and communities to spread knowledge and foster innovation.
                    </p>
                    <motion.a 
                      href="#contact" 
                      className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 shadow-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>Inquire about Event Partnerships</span>
                      <svg className="ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </motion.a>
                  </div>
                  <div className="md:w-1/3 h-40 bg-green-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <svg className="h-12 w-12 mx-auto text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <p className="mt-2 text-sm text-gray-600">Community Events</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>

        <motion.div 
          className="mt-16 bg-white/80 backdrop-blur-sm rounded-xl shadow-md overflow-hidden border border-gray-100"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ 
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            y: -5,
            transition: { duration: 0.2 }
          }}
        >
          <div className="p-8 md:flex items-center bg-gradient-to-br from-green-50/50 to-transparent">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <div className="flex items-center mb-2">
                <div className="p-2 mr-3 rounded-full bg-gradient-to-r from-green-400 to-green-600 text-white shadow-md">
                  <Bell className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Stay Informed</h3>
              </div>
              <div className="h-0.5 w-20 bg-gradient-to-r from-green-300 to-green-500 rounded-full mb-4"></div>
              <p className="text-gray-600">
                Subscribe to our newsletter for the latest updates on our work, upcoming events, and agricultural innovations.
              </p>
              <form onSubmit={handleSubscribe} className="mt-6 flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none shadow-sm"
                  disabled={subscriptionStatus.submitting || subscriptionStatus.submitted}
                />
                <motion.button 
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-md hover:from-green-600 hover:to-green-700 transition-colors duration-300 whitespace-nowrap shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={subscriptionStatus.submitting || subscriptionStatus.submitted}
                >
                  {subscriptionStatus.submitting ? 'Subscribing...' : subscriptionStatus.submitted ? 'Subscribed ✓' : 'Subscribe'}
                </motion.button>
              </form>
              
              {subscriptionStatus.error && (
                <motion.div 
                  className="mt-3 text-red-600 text-sm flex items-center"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {subscriptionStatus.error}
                </motion.div>
              )}
              
              {subscriptionStatus.submitted && (
                <motion.div 
                  className="mt-3 text-green-600 text-sm flex items-center"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Thank you for subscribing! Check your email for a confirmation.
                </motion.div>
              )}
            </div>
            <div className="md:w-1/3 h-40 bg-green-50/80 rounded-lg flex items-center justify-center shadow-inner">
              <motion.div 
                className="text-center"
                animate={{ 
                  y: [0, -5, 0],
                  rotate: [0, 2, 0, -2, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <MessageSquare className="h-12 w-12 mx-auto text-green-500" />
                <p className="mt-2 text-sm text-gray-600">Monthly newsletter</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default News; 