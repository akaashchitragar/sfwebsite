'use client';

import { useState, FormEvent, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Check, ArrowRight, DollarSign, User, Mail, Gift } from 'lucide-react';
import Image from 'next/image';

const Donate = () => {
  const [donationAmount, setDonationAmount] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // Set isMounted to true when component mounts on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const donationOptions = [
    { value: '500', label: '₹500' },
    { value: '1000', label: '₹1,000' },
    { value: '5000', label: '₹5,000' },
    { value: 'custom', label: 'Custom' },
  ];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // In a real implementation, this would call your backend to initialize a PhonePe transaction
    try {
      const response = await fetch('/api/initialize-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: donationAmount,
          name,
          email,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to initialize payment');
      }
      
      const data = await response.json();
      
      // Redirect to PhonePe payment page
      window.location.href = data.paymentUrl;
      
    } catch (error) {
      console.error('Payment initialization failed:', error);
      setIsProcessing(false);
    }
  };

  return (
    <section id="donate" className="py-16 bg-gradient-to-r from-green-700 to-green-600 relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 opacity-10">
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 320">
          <path fill="#ffffff" fillOpacity="0.2" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
        
        {/* Animated floating particles - only render when mounted on client side */}
        {isMounted && (
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: `${Math.random() * 5 + 2}px`,
                  height: `${Math.random() * 5 + 2}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, Math.random() * -30 - 10],
                  opacity: [0.1, 0.5, 0.1],
                }}
                transition={{
                  duration: Math.random() * 5 + 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        )}
        
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.2' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3Ccircle cx='13' cy='13' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '20px 20px'
          }}
        ></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <div>
            {isMounted ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div 
                  className="inline-block p-3 rounded-full bg-white/10 backdrop-blur-sm mb-4"
                  animate={{ 
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <Gift className="w-10 h-10 text-white/90 mx-auto" />
                </motion.div>
                <h2 className="text-3xl font-bold text-white">Support Our Mission</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto my-4 opacity-60"></div>
                <p className="mt-3 text-lg text-green-100 max-w-2xl mx-auto">
                  Your contribution helps empower rural youth to become successful agri-preneurs
                </p>
              </motion.div>
            ) : (
              <div>
                <div className="inline-block p-3 rounded-full bg-white/10 backdrop-blur-sm mb-4">
                  <Gift className="w-10 h-10 text-white/90 mx-auto" />
                </div>
                <h2 className="text-3xl font-bold text-white">Support Our Mission</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto my-4 opacity-60"></div>
                <p className="mt-3 text-lg text-green-100 max-w-2xl mx-auto">
                  Your contribution helps empower rural youth to become successful agri-preneurs
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="max-w-md mx-auto">
          {isMounted ? (
            <motion.div 
              className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ 
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                y: -5
              }}
            >
              <div className="px-6 py-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <DollarSign className="h-4 w-4 mr-1 text-green-600" />
                      Donation Amount
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {donationOptions.map((option) => (
                        <motion.button
                          key={option.value}
                          type="button"
                          className={`rounded-lg py-2 px-1 text-sm font-medium transition-colors ${
                            donationAmount === option.value
                              ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md'
                              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          }`}
                          onClick={() => setDonationAmount(option.value)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {option.label}
                        </motion.button>
                      ))}
                    </div>

                    <AnimatePresence>
                      {donationAmount === 'custom' && (
                        <motion.div 
                          className="mt-3"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="text-gray-500">₹</span>
                            </div>
                            <input
                              type="number"
                              name="customAmount"
                              id="customAmount"
                              min="100"
                              className="focus:ring-green-500 focus:border-green-500 block w-full pl-7 pr-12 border-gray-300 rounded-md py-2 shadow-sm"
                              placeholder="Enter amount"
                              onChange={(e) => setDonationAmount(e.target.value)}
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <User className="h-4 w-4 mr-1 text-green-600" />
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <Mail className="h-4 w-4 mr-1 text-green-600" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <p className="mt-1 text-xs text-gray-500">Receipt will be sent to this email</p>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={!donationAmount || isProcessing}
                    className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isProcessing ? 'Processing...' : 'Donate Now'}
                    {!isProcessing && <Check className="ml-2 h-4 w-4" />}
                  </motion.button>
                </form>

                <div className="mt-5 pt-4 border-t border-gray-100">
                  {/* PhonePe payment section with optimal styling */}
                  <div className="flex flex-col items-center">
                    <motion.div 
                      className="bg-white/80 border border-gray-200 px-6 py-3 rounded-lg flex items-center justify-center shadow-sm"
                      whileHover={{ y: -2, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="relative w-44 h-12">
                        <Image 
                          src="/images/phonepe-logo.png" 
                          alt="PhonePe" 
                          fill
                          priority
                          className="object-contain"
                        />
                      </div>
                      <div className="h-10 mx-4 w-px bg-gray-200"></div>
                      <span className="text-sm text-gray-600 font-medium flex items-center">
                        Secure Payments <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                      </span>
                    </motion.div>
                    <p className="text-xs text-gray-500 mt-2">
                      All donations are eligible for tax benefits under 80G
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-white/20">
              <div className="px-6 py-8">
                <form className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <DollarSign className="h-4 w-4 mr-1 text-green-600" />
                      Donation Amount
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {donationOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          className="rounded-lg py-2 px-1 text-sm font-medium transition-colors bg-gray-100 text-gray-800"
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <User className="h-4 w-4 mr-1 text-green-600" />
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <Mail className="h-4 w-4 mr-1 text-green-600" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                    <p className="mt-1 text-xs text-gray-500">Receipt will be sent to this email</p>
                  </div>

                  <button
                    type="button"
                    disabled={true}
                    className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-green-500 to-green-600 disabled:opacity-50 transition-colors"
                  >
                    Donate Now
                    <Check className="ml-2 h-4 w-4" />
                  </button>
                </form>

                <div className="mt-5 pt-4 border-t border-gray-100">
                  <div className="flex flex-col items-center">
                    <div className="bg-white/80 border border-gray-200 px-6 py-3 rounded-lg flex items-center justify-center shadow-sm">
                      <div className="relative w-44 h-12">
                        <Image 
                          src="/images/phonepe-logo.png" 
                          alt="PhonePe" 
                          fill
                          priority
                          className="object-contain"
                        />
                      </div>
                      <div className="h-10 mx-4 w-px bg-gray-200"></div>
                      <span className="text-sm text-gray-600 font-medium flex items-center">
                        Secure Payments <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      All donations are eligible for tax benefits under 80G
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Donate; 