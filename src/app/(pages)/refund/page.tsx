import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy | Sangha Chadvam',
  description: 'Refund and cancellation policy for Sangha Chadvam platform and services.',
};

export default function RefundPage() {
  return (
    <div className="relative overflow-hidden bg-gray-50 pt-24">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-green-600 rounded-full opacity-5 blur-3xl -translate-x-1/2 -translate-y-1/4"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-500 rounded-full opacity-5 blur-3xl translate-y-1/3"></div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-800">
            Refund & Cancellation Policy
          </h1>
          
          <div className="prose max-w-none bg-white rounded-lg p-6 shadow-sm">
            <p className="mb-6 text-gray-700 border-l-4 border-green-500 pl-4 italic">
              This refund and cancellation policy outlines how you can cancel or seek a refund for a product / service 
              that you have purchased through the Platform. Under this policy:
            </p>
            
            <div className="space-y-6">
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                <p className="text-gray-700">
                  Cancellations will only be considered if the request is made <span className="font-semibold">1 days</span> of placing the order. However, 
                  cancellation requests may not be entertained if the orders have been communicated to such sellers / 
                  merchant(s) listed on the Platform and they have initiated the process of shipping them, or the product 
                  is out for delivery. In such an event, you may choose to reject the product at the doorstep.
                </p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                <p className="text-gray-700">
                  SANGACHADVAM FOUNDATION does not accept cancellation requests for perishable items like flowers, 
                  eatables, etc. However, the refund / replacement can be made if the user establishes that the quality 
                  of the product delivered is not good.
                </p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                <p className="text-gray-700">
                  In case of receipt of damaged or defective items, please report to our customer service team. The 
                  request would be entertained once the seller/ merchant listed on the Platform, has checked and 
                  determined the same at its own end. This should be reported within <span className="font-semibold">1 days</span> of receipt of products. 
                  In case you feel that the product received is not as shown on the site or as per your expectations, 
                  you must bring it to the notice of our customer service within <span className="font-semibold">1 days</span> of receiving the product. 
                  The customer service team after looking into your complaint will take an appropriate decision.
                </p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                <p className="text-gray-700">
                  In case of complaints regarding the products that come with a warranty from the manufacturers, 
                  please refer the issue to them.
                </p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                <p className="text-gray-700">
                  In case of any refunds approved by SANGACHADVAM FOUNDATION, it will take <span className="font-semibold">3 days</span> for the refund 
                  to be processed to you.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 italic">Last updated: January 21, 2025</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 