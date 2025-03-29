# Sanghachadwam Foundation Website

## Overview
This repository contains the official website for Sanghachadwam Foundation, a non-profit organization dedicated to transforming agriculture into a first-choice profession by empowering rural youth. Our goal is to cultivate 1 million agri-preneurs by 2035 through skill development, entrepreneurship, and agritech innovation, fostering sustainable growth and economic resilience in Bharat.

## Tech Stack
- **Frontend Framework**: Next.js with React
- **Styling**: Tailwind CSS
- **Contact Form**: SendGrid integration
- **Maps**: Google Maps API
- **Payment Integration**: PhonePe

## Features
- Responsive and modern UI
- Information about the foundation's mission, vision, and initiatives
- Contact form with SendGrid for email delivery
- Interactive location map using Google Maps
- Donation and payment processing through PhonePe
- Blog/News section for updates and articles
- Resources for aspiring agri-preneurs
- Success stories showcase

## Development Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/akaashchitragar/sfwebsite.git
   cd sfwebsite
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   SENDGRID_API_KEY=your_sendgrid_api_key
   PHONEPE_MERCHANT_ID=your_phonepe_merchant_id
   PHONEPE_API_KEY=your_phonepe_api_key
   ```

4. Run the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Deployment
The website can be deployed on Vercel, Netlify, or any other platform that supports Next.js applications.

```
npm run build
# or
yarn build
```

## Contributing
We welcome contributions to improve the website. Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Contact
Sanghachadwam Foundation - [contact information]

Project Link: [https://github.com/akaashchitragar/sfwebsite](https://github.com/akaashchitragar/sfwebsite) 