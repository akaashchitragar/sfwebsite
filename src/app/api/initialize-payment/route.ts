import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const { amount, name, email } = await request.json();

    // Validate required fields
    if (!amount || !name || !email) {
      return NextResponse.json(
        { error: 'Amount, name, and email are required fields' },
        { status: 400 }
      );
    }

    // Generate a unique transaction ID
    const transactionId = `SANGHA${Date.now()}${Math.floor(Math.random() * 1000)}`;
    
    // PhonePe integration would typically look like this
    // This is a mock implementation as actual integration requires merchant credentials
    
    // 1. Create payload for PhonePe API
    const payload = {
      merchantId: process.env.PHONEPE_MERCHANT_ID || 'MERCHANTUAT',
      merchantTransactionId: transactionId,
      amount: parseInt(amount) * 100, // Convert to paise
      redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/donation-success`,
      redirectMode: 'REDIRECT',
      mobileNumber: '9999999999', // Optional, can be collected from the form
      paymentInstrument: {
        type: 'PAY_PAGE',
      },
    };
    
    // 2. Convert payload to base64
    const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString('base64');
    
    // 3. Generate checksum (SHA256 hash + salt key + "###" + index)
    const saltKey = process.env.PHONEPE_SALT_KEY || 'SALT_KEY'; // Replace with actual salt key
    const saltIndex = process.env.PHONEPE_SALT_INDEX || '1'; // Replace with actual salt index
    
    const dataForHash = payloadBase64 + saltKey;
    const checksum = crypto.createHash('sha256').update(dataForHash).digest('hex') + '###' + saltIndex;
    
    // 4. Make API call to PhonePe
    // In a real implementation, you'd make an actual HTTP request to PhonePe's API
    // This is a mock response
    
    // Store transaction details in your database for verification later
    
    // Return a mock payment URL
    // In a real implementation, this would come from PhonePe's response
    const paymentUrl = `https://pay.phonepe.com/pay/mock?transactionId=${transactionId}`;
    
    // Return the payment URL to the client
    return NextResponse.json({
      success: true,
      paymentUrl,
      transactionId,
    });
    
  } catch (error) {
    console.error('Error initializing payment:', error);
    return NextResponse.json(
      { error: 'Failed to initialize payment' },
      { status: 500 }
    );
  }
} 