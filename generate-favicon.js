const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Create the favicon directory if it doesn't exist
const faviconDir = path.join(__dirname, 'public', 'favicon');
if (!fs.existsSync(faviconDir)) {
  fs.mkdirSync(faviconDir, { recursive: true });
}

// Source logo
const logoPath = path.join(__dirname, 'public', 'logo.png');

// Generate different favicon sizes
const sizes = [16, 32, 48, 64, 128, 192, 256];

async function generateFavicons() {
  try {
    // Create ICO file (16x16 and 32x32)
    await sharp(logoPath)
      .resize(32, 32)
      .toFile(path.join(faviconDir, 'favicon.ico'));

    console.log('favicon.ico created');

    // Create favicon.png (32x32)
    await sharp(logoPath)
      .resize(32, 32)
      .png()
      .toFile(path.join(faviconDir, 'favicon.png'));

    console.log('favicon.png created');

    // Create apple-touch-icon.png (180x180)
    await sharp(logoPath)
      .resize(180, 180)
      .png()
      .toFile(path.join(faviconDir, 'apple-touch-icon.png'));

    console.log('apple-touch-icon.png created');

    // Create various sized favicon images
    for (const size of sizes) {
      await sharp(logoPath)
        .resize(size, size)
        .png()
        .toFile(path.join(faviconDir, `favicon-${size}x${size}.png`));
      console.log(`favicon-${size}x${size}.png created`);
    }

    // Copy the favicon.ico to the root of public
    await sharp(logoPath)
      .resize(32, 32)
      .toFile(path.join(__dirname, 'public', 'favicon.ico'));

    console.log('Root favicon.ico created');

    console.log('All favicons generated successfully!');
  } catch (error) {
    console.error('Error generating favicons:', error);
  }
}

generateFavicons(); 