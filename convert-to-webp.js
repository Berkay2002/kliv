const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const judoFolder = path.join(__dirname, 'public', 'images', 'judo');

// Function to convert image to WebP
async function convertToWebP(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .webp({ quality: 80 }) // Good balance between quality and file size
      .toFile(outputPath);
    console.log(`✅ Converted ${path.basename(inputPath)} to ${path.basename(outputPath)}`);
  } catch (error) {
    console.error(`❌ Error converting ${path.basename(inputPath)}:`, error.message);
  }
}

// Main conversion function
async function convertJudoImages() {
  console.log('🔄 Starting JPG/PNG to WebP conversion...\n');
  
  const files = fs.readdirSync(judoFolder);
  const imageFiles = files.filter(file => file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.png'));
  
  if (imageFiles.length === 0) {
    console.log('ℹ️  No JPG or PNG files found in the judo folder.');
    return;
  }
  
  console.log(`📁 Found ${imageFiles.length} JPG/PNG file(s) to convert:`);
  imageFiles.forEach(file => console.log(`   - ${file}`));
  console.log('');
  
  for (const imageFile of imageFiles) {
    const inputPath = path.join(judoFolder, imageFile);
    const outputPath = path.join(judoFolder, imageFile.replace(/\.(jpg|png)$/i, '.webp'));
    
    // Check if WebP version already exists
    if (fs.existsSync(outputPath)) {
      console.log(`⚠️  WebP version of ${imageFile} already exists, skipping...`);
      continue;
    }
    
    await convertToWebP(inputPath, outputPath);
  }
  
  console.log('\n🎉 Conversion completed!');
  
  // Show file size comparison
  console.log('\n📊 File size comparison:');
  for (const imageFile of imageFiles) {
    const imgPath = path.join(judoFolder, imageFile);
    const webpPath = path.join(judoFolder, imageFile.replace(/\.(jpg|png)$/i, '.webp'));
    
    if (fs.existsSync(webpPath)) {
      const imgStats = fs.statSync(imgPath);
      const webpStats = fs.statSync(webpPath);
      const imgSize = (imgStats.size / 1024).toFixed(1);
      const webpSize = (webpStats.size / 1024).toFixed(1);
      const savings = ((imgStats.size - webpStats.size) / imgStats.size * 100).toFixed(1);
      
      console.log(`   ${imageFile}: ${imgSize}KB → ${webpSize}KB (${savings}% smaller)`);
    }
  }
}

// Run the conversion
convertJudoImages().catch(console.error); 