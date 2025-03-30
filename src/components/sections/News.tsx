'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { BookOpen, Users, Newspaper, Calendar, ChevronRight, ChevronLeft, MapPin, Award, Bell, Calendar as CalendarIcon, Clock, MessageSquare } from 'lucide-react';

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
        date: "March 15, 2024",
        excerpt: "A new collaboration to promote natural farming practices across Gujarat aimed at improving soil health and increasing farmer incomes through sustainable practices.",
        category: "Partnerships",
        imageUrl: "/images/news/leftcard.jpg",
        link: "#news-1"
      },
      {
        id: 2,
        title: "1,000 New Farmers Join Our Skill Development Program",
        date: "February 28, 2024",
        excerpt: "Our flagship program continues to grow with a new batch of rural youth learning modern agricultural techniques and entrepreneurship skills.",
        category: "Milestone",
        imageUrl: "/images/news/middlecard.jpg",
        link: "#news-2"
      },
      {
        id: 3,
        title: "Biochar Initiative Wins Environmental Excellence Award",
        date: "January 12, 2024",
        excerpt: "Our carbon credit program using biochar technology has been recognized for its innovative approach to sustainable agriculture and climate action.",
        category: "Awards",
        imageUrl: "/images/news/rightcard.jpg",
        link: "#news-3"
      }
    ],
    events: [
      {
        id: 1,
        title: "Agricultural Entrepreneurship Summit 2025",
        date: "July 25-26, 2025",
        location: "New Delhi, India",
        description: "Join us for our annual summit bringing together agri-entrepreneurs, investors, and policymakers to discuss the future of agriculture in India.",
        image: "/images/events/event1.jpeg",
        link: "#event-1",
        isUpcoming: true
      },
      {
        id: 2,
        title: "Webinar: Sustainable Farming Practices",
        date: "August 12, 2025",
        time: "3:00 PM - 4:30 PM IST",
        description: "Learn about regenerative agricultural techniques from leading experts and discover how to implement them on your farm.",
        image: "/images/events/event2.jpeg",
        link: "#event-2",
        isUpcoming: true
      },
      {
        id: 3,
        title: "Rural Youth Innovation Challenge",
        date: "September 5-30, 2025",
        location: "Virtual",
        description: "A month-long competition for young innovators to develop solutions for agricultural challenges. Cash prizes and mentorship opportunities available.",
        image: "/images/events/event3.jpeg",
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
      className="py-24 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden"
    >
      {/* New background design */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large circular gradients */}
        <div className="absolute top-0 -right-64 w-[600px] h-[600px] rounded-full bg-green-50/80 mix-blend-multiply blur-3xl"></div>
        <div className="absolute bottom-0 -left-64 w-[600px] h-[600px] rounded-full bg-amber-50/80 mix-blend-multiply blur-3xl"></div>
        
        {/* Diagonal stripes */}
        <div className="absolute inset-0 opacity-[0.03] 
          bg-[linear-gradient(45deg,transparent_25%,#22c55e_25%,#22c55e_30%,transparent_30%,transparent_75%,#22c55e_75%,#22c55e_80%,transparent_80%)]"
          style={{ backgroundSize: '60px 60px' }}>
        </div>
        
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.02]"
             style={{
               backgroundImage: `
                 linear-gradient(to right, #000 1px, transparent 1px),
                 linear-gradient(to bottom, #000 1px, transparent 1px)
               `,
               backgroundSize: '40px 40px'
             }}>
        </div>
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
            <Newspaper className="w-4 h-4 text-green-600" />
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
                    {/* Use the new images from the news object */}
                    <Image 
                      src={news.imageUrl}
                      alt={news.title}
                      fill
                      className="object-cover"
                    />
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
                        {/* Display actual event images */}
                        <Image 
                          src={event.image}
                          alt={event.title}
                          fill
                          className="object-cover"
                        />
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