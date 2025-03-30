'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, User, AtSign, ArrowRight, CheckCircle, AlertCircle, Building } from 'lucide-react';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    submitting: false,
    error: null as string | null
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus({ submitted: false, submitting: true, error: null });

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setFormStatus({ submitted: true, submitting: false, error: null });
      setFormState({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    } catch (error) {
      setFormStatus({ 
        submitted: false, 
        submitting: false, 
        error: error instanceof Error ? error.message : 'An unknown error occurred' 
      });
    }
  };

  // Animations
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

  const hoverEffect = {
    scale: 1.02,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: { duration: 0.2 }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-white to-green-50 relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-radial from-green-100/30 to-transparent opacity-70 blur-[80px]"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-radial from-green-100/30 to-transparent opacity-60 blur-[90px]"></div>
        
        {/* Animated floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-green-500"
              style={{
                width: `${3 + i % 4}px`,
                height: `${3 + i % 4}px`,
                left: `${(i * 7) % 100}%`,
                top: `${(i * 11) % 100}%`,
              }}
              animate={{
                y: [0, -20],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 5 + (i % 5),
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Subtle dot pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2316a34a' fill-opacity='0.2' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3Ccircle cx='13' cy='13' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.span 
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100/80 backdrop-blur-sm text-green-800 text-sm font-medium mb-4 border border-green-200/50"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <MessageSquare className="w-4 h-4 text-green-600" />
            Get In Touch
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            We'd Love to Hear From <span className="text-green-600">You</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent mx-auto my-4"></div>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions about our programs or want to get involved? Reach out to us today.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* Contact Information & Map */}
          <motion.div 
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Contact Card */}
            <motion.div 
              className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 overflow-hidden"
              whileHover={hoverEffect}
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <div className="p-2 mr-3 rounded-full bg-gradient-to-r from-green-400 to-green-600 text-white shadow-md">
                    <Building className="h-5 w-5" />
                  </div>
                  Contact Information
                </h3>
                
                <div className="space-y-5">
                  <motion.div 
                    className="flex items-start" 
                    custom={0}
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.div 
                      className="flex-shrink-0 bg-gradient-to-r from-green-400 to-green-600 p-2 rounded-full shadow-sm text-white"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <MapPin className="h-5 w-5" />
                    </motion.div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">Our Office</p>
                      <p className="text-sm text-gray-600 mt-1">27, Nehru Nagar, Gokul Road<br />Hubballi - 580030<br />Karnataka, Bharat</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-start"
                    custom={1}
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.div 
                      className="flex-shrink-0 bg-gradient-to-r from-green-400 to-green-600 p-2 rounded-full shadow-sm text-white"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Mail className="h-5 w-5" />
                    </motion.div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">Email</p>
                      <p className="text-sm text-gray-600 mt-1">info@sfmail.co.in</p>
                    </div>
                  </motion.div>
              </div>
              
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="h-0.5 w-16 bg-gradient-to-r from-green-300 to-green-500 rounded-full mb-4"></div>
                  <p className="text-sm text-gray-500">
                    Connect with us to learn more about how we're empowering rural youth through agriculture and technology.
                  </p>
                </div>
              </div>
            </motion.div>
            
            {/* Static Map Instead of Google Maps */}
            <motion.div 
              className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col items-center justify-center p-6 text-center h-full"
              whileHover={hoverEffect}
            >
              <div className="flex items-center space-x-3 mb-4">
                <motion.div 
                  className="p-2 rounded-full bg-gradient-to-r from-green-400 to-green-600 text-white shadow-sm"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <MapPin className="h-5 w-5" />
                </motion.div>
                <h3 className="text-base font-medium text-gray-900">Visit Our Office</h3>
              </div>
              <div className="h-0.5 w-16 bg-gradient-to-r from-green-300 to-green-500 rounded-full mb-4"></div>
              
              <p className="text-gray-600 text-sm mb-4">
                We're located at Nehru Nagar, Gokul Road in Hubballi, easily accessible via public transportation.
              </p>
              <motion.a 
                href="https://maps.app.goo.gl/q3b8WzdqhqbWdA4W8" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm inline-flex items-center justify-center py-2 px-4 rounded-lg bg-green-500 text-white font-medium group hover:bg-green-600 transition-colors w-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Open in Google Maps
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.div 
              className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="px-6 py-8">
                <div className="flex items-center mb-6">
                  <div className="p-2 mr-3 rounded-full bg-gradient-to-r from-green-400 to-green-600 text-white shadow-md">
                    <MessageSquare className="h-5 w-5" />
            </div>
                  <h3 className="text-xl font-semibold text-gray-900">Send Us a Message</h3>
          </div>
                <div className="h-0.5 w-20 bg-gradient-to-r from-green-300 to-green-500 rounded-full mb-6"></div>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <motion.div
                    custom={0}
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                  >
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-green-500" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="pl-10 py-3 px-4 block w-full shadow-sm border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition-colors bg-white/80"
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    custom={1}
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                  >
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <AtSign className="h-5 w-5 text-green-500" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        placeholder="your@email.com"
                        className="pl-10 py-3 px-4 block w-full shadow-sm border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition-colors bg-white/80"
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    custom={2}
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                  >
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number (Optional)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-green-500" />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={formState.phone}
                        onChange={handleChange}
                        placeholder="+91 12345 67890"
                        className="pl-10 py-3 px-4 block w-full shadow-sm border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition-colors bg-white/80"
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    custom={3}
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                  >
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Message
                    </label>
                    <div className="relative">
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formState.message}
                        onChange={handleChange}
                        required
                        placeholder="How can we help you?"
                        className="py-3 px-4 block w-full shadow-sm border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition-colors bg-white/80"
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    custom={4}
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.button
                      type="submit"
                      disabled={formStatus.submitting}
                      className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {formStatus.submitting ? 'Sending...' : 'Send Message'}
                      {!formStatus.submitting && <Send className="ml-2 h-5 w-5" />}
                    </motion.button>
                  </motion.div>
              </form>

              {formStatus.submitted && (
                  <motion.div 
                    className="mt-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-start"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <p className="text-sm font-medium">Thank you for your message! We'll get back to you soon.</p>
                  </motion.div>
              )}

              {formStatus.error && (
                  <motion.div 
                    className="mt-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                    <p className="text-sm font-medium">{formStatus.error}</p>
                  </motion.div>
              )}
            </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 