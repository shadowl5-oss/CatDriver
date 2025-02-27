
const fs = require('fs');
const path = require('path');

// Function to extract slides from HTML
function extractSlidesFromHTML() {
  try {
    const presentationPath = path.join(__dirname, 'presentations', 'cdv_investor_deck.html');
    const htmlContent = fs.readFileSync(presentationPath, 'utf8');
    
    // Find slide content by looking for section tags
    const slidesRegex = /<section[^>]*>([\s\S]*?)<\/section>/g;
    const slides = [];
    let match;
    
    while ((match = slidesRegex.exec(htmlContent)) !== null) {
      slides.push({
        content: match[0],
        innerContent: match[1].trim()
      });
    }
    
    return slides;
  } catch (error) {
    console.error('Error extracting slides:', error);
    return [];
  }
}

// Create slides directory if it doesn't exist
const slidesDir = path.join(__dirname, 'presentations', 'slides');
if (!fs.existsSync(slidesDir)) {
  fs.mkdirSync(slidesDir, { recursive: true });
  console.log(`Created slides directory: ${slidesDir}`);
}

// Generate individual HTML files for each slide
function generateSlideHTMLFiles() {
  const slides = extractSlidesFromHTML();
  console.log(`Found ${slides.length} slides to process`);
  
  if (slides.length === 0) {
    console.error('No slides found. Check the presentation HTML structure.');
    return;
  }
  
  // Create an index file
  let indexContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CDV Presentation Slides</title>
  <style>
    body {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      background: #0a0a2a;
      color: #f0f0f0;
      padding: 20px;
    }
    h1, h2 {
      color: #bb86fc;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 20px;
    }
    .slide-link {
      display: block;
      padding: 15px;
      background: rgba(255,255,255,0.05);
      border-radius: 8px;
      color: #f0f0f0;
      text-decoration: none;
      transition: all 0.3s ease;
      text-align: center;
    }
    .slide-link:hover {
      background: rgba(255,255,255,0.1);
      transform: translateY(-2px);
    }
  </style>
</head>
<body>
  <h1>CDV Presentation Slides</h1>
  <p>Click on a slide to view it individually</p>
  <div class="grid">
`;
  
  slides.forEach((slide, index) => {
    const slideNumber = index + 1;
    const slideFilename = `slide_${slideNumber}.html`;
    const slidePath = path.join(slidesDir, slideFilename);
    
    // Create individual slide HTML
    const slideHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CDV Slide ${slideNumber}</title>
  <link rel="stylesheet" href="../theme.css">
  <style>
    body {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      background: #0a0a2a;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    .slide-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 40px;
    }
    .slide-content {
      max-width: 800px;
      width: 100%;
      padding: 40px;
      background: rgba(0,0,0,0.2);
      border-radius: 8px;
    }
    h1, h2, h3 {
      color: #bb86fc !important;
    }
    p, li {
      color: #f0f0f0 !important;
    }
    .highlight {
      color: #03dac6 !important;
    }
    .navigation {
      display: flex;
      justify-content: space-between;
      padding: 10px 20px;
      background: rgba(0,0,0,0.3);
    }
    .navigation a {
      color: #bb86fc;
      text-decoration: none;
      padding: 8px 16px;
      border-radius: 4px;
      background: rgba(255,255,255,0.05);
      transition: all 0.3s ease;
    }
    .navigation a:hover {
      background: rgba(255,255,255,0.1);
    }
    .slide-number {
      position: absolute;
      bottom: 10px;
      right: 10px;
      background: rgba(0,0,0,0.5);
      padding: 5px 10px;
      border-radius: 4px;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="navigation">
    <a href="index.html">All Slides</a>
    ${index > 0 ? `<a href="slide_${index}.html">Previous</a>` : '<span></span>'}
    ${index < slides.length - 1 ? `<a href="slide_${index + 2}.html">Next</a>` : '<span></span>'}
  </div>
  
  <div class="slide-container">
    <div class="slide-content">
      ${slide.innerContent}
    </div>
    <div class="slide-number">Slide ${slideNumber} / ${slides.length}</div>
  </div>
</body>
</html>
    `;
    
    fs.writeFileSync(slidePath, slideHTML);
    console.log(`Generated slide ${slideNumber} at ${slidePath}`);
    
    // Add to index
    indexContent += `    <a href="${slideFilename}" class="slide-link">Slide ${slideNumber}</a>\n`;
  });
  
  // Close index file
  indexContent += `
  </div>
</body>
</html>
  `;
  
  fs.writeFileSync(path.join(slidesDir, 'index.html'), indexContent);
  console.log(`Generated index at ${path.join(slidesDir, 'index.html')}`);
  
  console.log(`Successfully generated ${slides.length} individual slide HTML files`);
}

// Run the function
generateSlideHTMLFiles();
