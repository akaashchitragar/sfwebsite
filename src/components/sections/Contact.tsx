'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, User, AtSign, ArrowUpRight, CheckCircle, AlertCircle, Building } from 'lucide-react';
import Image from 'next/image';

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

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="contact" className="py-16 lg:py-24 bg-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-green-50 rounded-full mix-blend-multiply opacity-70 blur-3xl transform translate-x-1/3"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-green-100 rounded-full mix-blend-multiply opacity-50 blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-64 bg-amber-50 rounded-full mix-blend-multiply opacity-60 blur-3xl"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="mb-16 text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center mb-4">
            <div className="bg-green-50 border border-green-100 rounded-full p-3">
              <Mail className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Get in touch with us
          </h2>
          <p className="text-gray-600">
            Have questions or want to get involved? We'd love to hear from you.
          </p>
        </motion.div>

        <motion.div 
          className="bg-white border border-gray-100 shadow-xl rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Contact Info Side */}
            <div className="bg-gradient-to-br from-green-600 to-green-700 text-white p-8 lg:p-12">
              <div className="h-full flex flex-col">
                <div className="mb-10 flex items-center">
                  <Image 
                    src="/logo.png" 
                    alt="Sanghachadwam Logo" 
                    width={44} 
                    height={44}
                    className="mr-3"
                  />
                  <h3 className="text-xl font-bold">Sanghachadwam Foundation</h3>
                </div>
              
                <h4 className="text-lg font-semibold mb-6">Contact Information</h4>
              
                <div className="space-y-6 mb-8">
                  <motion.div 
                    className="flex items-start" 
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <div className="mt-1 mr-4 bg-white/20 p-2 rounded-lg">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-white/90">Our Office</p>
                      <p className="text-white/80 mt-1">27, Nehru Nagar, Gokul Road<br />Hubballi - 580030<br />Karnataka, Bharat</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-start"
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <div className="mt-1 mr-4 bg-white/20 p-2 rounded-lg">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-white/90">Email</p>
                      <p className="text-white/80 mt-1">info@sfmail.co.in</p>
                    </div>
                  </motion.div>
                </div>
                
                <div className="mt-auto">
                  <a 
                    href="https://maps.app.goo.gl/q3b8WzdqhqbWdA4W8" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium text-white hover:underline group"
                  >
                    Open in Google Maps
                    <ArrowUpRight className="ml-1.5 h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                  
                  <div className="mt-8">
                    <p className="text-sm text-white/70 border-t border-white/20 pt-6">
                      Transforming agriculture into a first-choice profession, empowering rural youth to become successful agri-preneurs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Form Side */}
            <div className="p-8 lg:p-12">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Send us a message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="py-3 px-4 block w-full border border-gray-200 rounded-lg focus:ring-green-500 focus:border-green-500 transition-colors bg-gray-50 text-gray-900"
                    />
                  </div>
                </motion.div>

                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="py-3 px-4 block w-full border border-gray-200 rounded-lg focus:ring-green-500 focus:border-green-500 transition-colors bg-gray-50 text-gray-900"
                    />
                  </div>
                </motion.div>

                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number (Optional)
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      value={formState.phone}
                      onChange={handleChange}
                      placeholder="+91 12345 67890"
                      className="py-3 px-4 block w-full border border-gray-200 rounded-lg focus:ring-green-500 focus:border-green-500 transition-colors bg-gray-50 text-gray-900"
                    />
                  </div>
                </motion.div>

                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
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
                      className="py-3 px-4 block w-full border border-gray-200 rounded-lg focus:ring-green-500 focus:border-green-500 transition-colors bg-gray-50 text-gray-900"
                    />
                  </div>
                </motion.div>

                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="pt-2"
                >
                  <button
                    type="submit"
                    disabled={formStatus.submitting}
                    className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                  >
                    {formStatus.submitting ? 'Sending...' : 'Send Message'}
                    {!formStatus.submitting && <Send className="ml-2 h-5 w-5" />}
                  </button>
                </motion.div>
              </form>

              {formStatus.submitted && (
                <motion.div 
                  className="mt-6 bg-green-50 border border-green-100 text-green-700 px-4 py-3 rounded-lg flex items-start"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <p className="text-sm">Thank you for your message! We'll get back to you soon.</p>
                </motion.div>
              )}

              {formStatus.error && (
                <motion.div 
                  className="mt-6 bg-red-50 border border-red-100 text-red-700 px-4 py-3 rounded-lg flex items-start"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                  <p className="text-sm">{formStatus.error}</p>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact; 