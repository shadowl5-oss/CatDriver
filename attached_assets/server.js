
// Set library path for libuuid
const { execSync } = require('child_process');
try {
  // Create a temporary file to store the path and prevent garbage collection
  const tempRootFile = '/tmp/libuuid-gc-root';
  
  // Use --add-root to prevent garbage collection
  const libuuidPath = execSync(
    `nix-store -r $(nix-instantiate --expr '(import <nixpkgs> {}).libuuid') --add-root ${tempRootFile} --indirect`, 
    { encoding: 'utf8' }
  ).trim();
  
  process.env.LD_LIBRARY_PATH = `${process.env.LD_LIBRARY_PATH || ''}:${libuuidPath}/lib`;
  console.log('Set LD_LIBRARY_PATH for libuuid:', process.env.LD_LIBRARY_PATH);
} catch (error) {
  console.error('Failed to set libuuid path:', error);
}


const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const BASE_PORT = 3001;

// Function to try different ports if the base port is already in use
const findAvailablePort = (startPort) => {
  return new Promise((resolve, reject) => {
    let currentPort = startPort;
    const maxAttempts = 10;
    let attempts = 0;

    const tryPort = () => {
      const server = require('http').createServer();
      
      server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
          console.log(`Port ${currentPort} is in use, trying next port...`);
          currentPort++;
          attempts++;
          if (attempts >= maxAttempts) {
            reject(new Error(`Could not find an available port after ${maxAttempts} attempts`));
            return;
          }
          tryPort();
        } else {
          reject(err);
        }
      });
      
      server.on('listening', () => {
        server.close(() => {
          console.log(`Found available port: ${currentPort}`);
          resolve(currentPort);
        });
      });
      
      server.listen(currentPort, '0.0.0.0');
    };
    
    tryPort();
  });
};

// Dynamic port assignment
let PORT = BASE_PORT;

// Serve static files from the presentations directory
app.use(express.static('presentations'));

// Serve static files from the src/public directory
app.use(express.static('src/public'));

// Create a simple slide extractor that parses the HTML directly
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

// Create HTML page that displays all slides
app.get('/', (req, res) => {
  const slides = extractSlidesFromHTML();

  const htmlContent = `
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
        .slides-container {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            justify-content: center;
        }
        .slide {
            max-width: 350px;
            margin-bottom: 30px;
            background: rgba(255,255,255,0.05);
            border-radius: 8px;
            padding: 15px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        .slide-content {
            width: 100%;
            border-radius: 4px;
            border: 1px solid rgba(255,255,255,0.1);
            padding: 10px;
            background: rgba(0,0,0,0.2);
            min-height: 200px;
        }
        .slide-content h1, .slide-content h2, .slide-content h3 {
            color: #bb86fc !important;
        }
        .slide-content p, .slide-content li {
            color: #f0f0f0 !important;
        }
        .slide-content .highlight {
            color: #03dac6 !important;
        }
        .slide-title {
            margin-top: 10px;
            font-size: 14px;
            text-align: center;
        }
        .actions {
            margin: 20px 0;
            padding: 15px;
            background: rgba(255,255,255,0.05);
            border-radius: 8px;
        }
        button {
            background: #bb86fc;
            color: #0a0a2a;
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            font-weight: bold;
            cursor: pointer;
            margin-right: 10px;
        }
        button:hover {
            background: #03dac6;
        }
        .view-presentation {
            display: block;
            margin: 20px 0;
        }
        .print-all {
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <h1>Cat Driven Value (CDV) Presentation</h1>

    <div class="actions">
        <a href="/cdv_investor_deck.html" target="_blank" class="view-presentation">
            <button>View Interactive Presentation</button>
        </a>
        <button id="print-btn" class="print-all">Print All Slides</button>
    </div>

    <h2>Slides Preview</h2>
    <div id="slides-container" class="slides-container">
        ${slides.map((slide, index) => `
            <div class="slide">
                <div class="slide-content">${slide.innerContent}</div>
                <div class="slide-title">Slide ${index + 1}</div>
            </div>
        `).join('')}
    </div>

    <script>
        document.getElementById('print-btn').addEventListener('click', () => {
            window.print();
        });
    </script>
</body>
</html>
  `;

  res.send(htmlContent);
});

// Add a printable version of all slides
app.get('/print-slides', (req, res) => {
  const slides = extractSlidesFromHTML();

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CDV Presentation Slides - Printable</title>
    <style>
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            background: white;
            color: black;
        }
        .slide {
            page-break-after: always;
            margin: 20px;
            padding: 20px;
            border: 1px solid #ccc;
            height: 90vh;
            position: relative;
        }
        .slide-number {
            position: absolute;
            bottom: 10px;
            right: 10px;
            font-size: 12px;
            color: #666;
        }
        h1, h2, h3 {
            color: #5a2ca0;
        }
        .highlight {
            color: #03968a;
        }
        @media print {
            .slide {
                border: none;
                margin: 0;
                padding: 40px;
            }
            .no-print {
                display: none;
            }
        }
    </style>
</head>
<body>
    <div class="no-print" style="padding: 20px; background: #f0f0f0; margin-bottom: 20px;">
        <h1>Printable Version</h1>
        <p>This page is optimized for printing. Click the button below or use your browser's print function.</p>
        <button onclick="window.print()">Print Slides</button>
    </div>

    ${slides.map((slide, index) => `
        <div class="slide">
            <div class="slide-content">${slide.innerContent}</div>
            <div class="slide-number">Slide ${index + 1}</div>
        </div>
    `).join('')}
</body>
</html>
  `;

  res.send(htmlContent);
});

// Add a downloadable PDF option using browser's print-to-PDF capability
app.get('/pdf-slides', (req, res) => {
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CDV Presentation - PDF Export</title>
    <style>
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            background: #0a0a2a;
            color: #f0f0f0;
            padding: 20px;
            text-align: center;
        }
        h1, h2 {
            color: #bb86fc;
        }
        .instructions {
            max-width: 600px;
            margin: 0 auto;
            background: rgba(255,255,255,0.05);
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        button {
            background: #bb86fc;
            color: #0a0a2a;
            border: none;
            padding: 15px 30px;
            border-radius: 4px;
            font-weight: bold;
            cursor: pointer;
            font-size: 16px;
            margin: 10px;
        }
        button:hover {
            background: #03dac6;
        }
        .buttons {
            margin: 30px 0;
        }
    </style>
</head>
<body>
    <h1>CDV Presentation - PDF Export</h1>

    <div class="instructions">
        <h2>How to Export as PDF</h2>
        <p>Click the button below to open the printable version. When the page opens, use your browser's print function (Ctrl+P or Cmd+P) and select "Save as PDF" as the destination.</p>
    </div>

    <div class="buttons">
        <a href="/print-slides" target="_blank">
            <button>Open Printable Version</button>
        </a>
        <a href="/">
            <button>Back to Slides</button>
        </a>
    </div>
</body>
</html>
  `;

  res.send(htmlContent);
});

// Add a diagnostic endpoint
app.get('/test-reveal', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Reveal.js Test</title>
      <script src="reveal.js"></script>
    </head>
    <body>
      <div class="reveal">
        <div class="slides">
          <section>
            <h1>Test Slide 1</h1>
            <p>This is a test slide to verify Reveal.js functionality.</p>
          </section>
          <section>
            <h1>Test Slide 2</h1>
            <p>If you can see this slide, Reveal.js is working correctly.</p>
          </section>
        </div>
      </div>
      <script>
        window.onload = function() {
          if (typeof Reveal !== 'undefined') {
            document.body.innerHTML += '<p>Reveal.js loaded successfully!</p>';
            Reveal.initialize({
              controls: true,
              progress: true,
              history: true,
              center: true
            });
            document.body.innerHTML += '<p>Reveal.js initialized successfully!</p>';
          } else {
            document.body.innerHTML += '<p>Error: Reveal.js failed to load!</p>';
          }
        };
      </script>
    </body>
    </html>
  `);
});

// Start the server with dynamic port selection
findAvailablePort(BASE_PORT)
  .then(availablePort => {
    PORT = availablePort;
    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`\n=== PRESENTATION SERVER ===`);
      console.log(`Server running at http://0.0.0.0:${PORT}`);
      console.log(`Test Reveal.js at: http://0.0.0.0:${PORT}/test-reveal`);
      console.log(`Presentation at: http://0.0.0.0:${PORT}/cdv_investor_deck.html`);
      console.log(`Slides viewer at: http://0.0.0.0:${PORT}/`);
      console.log(`Printable slides at: http://0.0.0.0:${PORT}/print-slides`);
      console.log(`PDF export guide at: http://0.0.0.0:${PORT}/pdf-slides`);
    });
  })
  .catch(err => {
    console.error('Failed to start server:', err);
  });