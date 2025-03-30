const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Create the images directory if it doesn't exist
const imagesDir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Source logo
const logoPath = path.join(__dirname, 'public', 'logo.png');

async function generateOgImages() {
  try {
    // Generate OG image (1200x630)
    const ogImageWidth = 1200;
    const ogImageHeight = 630;
    const ogBackground = {
      create: {
        width: ogImageWidth,
        height: ogImageHeight,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      }
    };
    
    // Resize the logo to fit in the OG image
    const logoWidth = 300;
    const logoImage = await sharp(logoPath)
      .resize({ width: logoWidth })
      .toBuffer();
    
    // Create OG image with logo positioned in the center
    await sharp(ogBackground)
      .composite([
        {
          input: logoImage,
          top: Math.floor((ogImageHeight - logoWidth) / 2),
          left: Math.floor((ogImageWidth - logoWidth) / 2)
        }
      ])
      .png()
      .toFile(path.join(imagesDir, 'og-image.jpg'));
    
    console.log('OG image created');
    
    // Create a copy for Twitter
    await sharp(path.join(imagesDir, 'og-image.jpg'))
      .toFile(path.join(imagesDir, 'twitter-image.jpg'));
    
    console.log('Twitter image created');
    
    console.log('All social media images generated successfully!');
  } catch (error) {
    console.error('Error generating social media images:', error);
  }
}

generateOgImages(); 