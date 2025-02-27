
const fs = require('fs');
const path = require('path');
const { Storage } = require('@google-cloud/storage');
// Using Jimp instead of canvas to avoid system dependencies
const Jimp = require('jimp');

// Create a simple image generator for cat images
function generateCatImage(fileName, type) {
  const canvas = createCanvas(400, 400);
  const ctx = canvas.getContext('2d');
  
  // Background
  ctx.fillStyle = '#0a0a2a';
  ctx.fillRect(0, 0, 400, 400);
  
  // Draw cat based on type
  ctx.fillStyle = '#bb86fc';
  ctx.font = '120px Arial';
  
  let emoji = '😺';
  let title = 'Common Cat';
  
  if (type === 'rare') {
    emoji = '😻';
    title = 'Rare Cat';
  } else if (type === 'epic') {
    emoji = '⭐️😺⭐️';
    title = 'Epic Cat';
  } else if (type === 'legendary') {
    emoji = '🌟😺🌟';
    title = 'Legendary Cat';
  }
  
  // Center the emoji
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(emoji, 200, 170);
  
  // Add title
  ctx.font = '30px Arial';
  ctx.fillText(title, 200, 300);
  
  // Add CDV branding
  ctx.font = '18px Arial';
  ctx.fillText('Cat Driven Value', 200, 350);
  
  // Create buffer and save
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(fileName, buffer);
  return fileName;
}

// Generate the images
function generateImages() {
  const images = [
    { name: 'common_cat.png', type: 'common' },
    { name: 'rare_cat.png', type: 'rare' },
    { name: 'epic_cat.png', type: 'epic' },
    { name: 'legendary_cat.png', type: 'legendary' },
    { name: 'investor_preview.png', type: 'legendary' }
  ];
  
  const createdFiles = [];
  
  for (const image of images) {
    const filePath = generateCatImage(image.name, image.type);
    createdFiles.push(filePath);
    console.log(`Generated: ${filePath}`);
  }
  
  return createdFiles;
}

// Upload files to bucket
async function uploadToBucket(files) {
  try {
    console.log('Starting upload process...');
    
    // Read bucket ID from environment or .replit file
    let bucketId;
    try {
      const replitConfig = fs.readFileSync('.replit', 'utf8');
      const bucketIdMatch = replitConfig.match(/defaultBucketID = "([^"]+)"/);
      
      if (bucketIdMatch) {
        bucketId = bucketIdMatch[1];
      } else {
        // Fallback: Try to use Replit bucket ID from environment
        bucketId = process.env.REPLIT_STORAGE_BUCKET_ID;
      }
      
      if (!bucketId) {
        throw new Error('Cannot find bucket ID. Make sure your Replit Storage bucket is properly set up.');
      }
      
      console.log(`Using bucket ID: ${bucketId}`);
    } catch (err) {
      console.error('Error reading bucket ID:', err);
      throw err;
    }
    
    // Initialize storage with explicit credentials configuration
    // Replit manages authentication automatically
    const storage = new Storage({
      projectId: process.env.REPLIT_PROJECT_ID || 'replit-project',
      scopes: ['https://www.googleapis.com/auth/cloud-platform'],
      autoRetry: true,
      maxRetries: 3
    });
    
    const bucket = storage.bucket(bucketId);
    
    // Check if bucket exists and we have access
    try {
      const [exists] = await bucket.exists();
      if (!exists) {
        throw new Error(`Bucket ${bucketId} does not exist or is not accessible`);
      }
      console.log('Successfully connected to bucket');
    } catch (err) {
      console.error('Error accessing bucket:', err);
      throw new Error(`Cannot access bucket: ${err.message}`);
    }
    
    // Create a directory for images locally first
    const uploadDir = 'cat_images_upload';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    
    // Move files to the upload directory
    const filesToUpload = [];
    for (const file of files) {
      const newPath = path.join(uploadDir, path.basename(file));
      fs.renameSync(file, newPath);
      filesToUpload.push(newPath);
    }
    
    // Upload each file
    for (const file of filesToUpload) {
      console.log(`Uploading ${file} to bucket...`);
      try {
        await bucket.upload(file, {
          destination: `cat_images/${path.basename(file)}`,
          metadata: {
            contentType: 'image/png'
          },
          gzip: true,
          public: true
        });
        console.log(`Successfully uploaded ${file} to bucket as cat_images/${path.basename(file)}`);
        
        // Get public URL
        const publicUrl = `https://storage.googleapis.com/${bucketId}/cat_images/${path.basename(file)}`;
        console.log(`Public URL: ${publicUrl}`);
      } catch (uploadErr) {
        console.error(`Error uploading ${file}:`, uploadErr);
        console.error('Stack trace:', uploadErr.stack);
        // Continue with other files
        continue;
      }
    }
    
    // Clean up the upload directory after all uploads are attempted
    try {
      for (const file of filesToUpload) {
        if (fs.existsSync(file)) {
          fs.unlinkSync(file);
        }
      }
      if (fs.existsSync(uploadDir)) {
        fs.rmdirSync(uploadDir);
      }
    } catch (cleanupErr) {
      console.error('Error during cleanup:', cleanupErr);
    }
    
    console.log('Upload process completed!');
  } catch (error) {
    console.error('Error in upload process:', error);
    console.error('Stack trace:', error.stack);
    throw error; // Re-throw to be caught by main
  }
}

// Main function
async function main() {
  try {
    console.log('Starting image generation and upload process...');
    const files = generateImages();
    console.log(`Generated ${files.length} images. Beginning upload...`);
    await uploadToBucket(files);
    console.log('Process completed successfully!');
  } catch (error) {
    console.error('Error in main process:', error);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  }
}

// Execute the main function
main();
