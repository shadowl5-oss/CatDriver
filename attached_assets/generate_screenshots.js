
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// Create screenshots directory if it doesn't exist
const screenshotsDir = path.join(__dirname, 'screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
  console.log(`Created screenshots directory: ${screenshotsDir}`);
}

async function generateScreenshots() {
  console.log('Launching browser to capture screenshots...');
  
  const browser = await chromium.launch({
    headless: true
  });
  
  try {
    const context = await browser.newContext();
    const page = await context.newPage();
    
    // Set viewport size to simulate desktop
    await page.setViewportSize({ width: 1280, height: 800 });
    
    // 1. Main Landing Page Screenshot
    console.log('Capturing main landing page...');
    await page.goto('http://0.0.0.0:3000', { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(screenshotsDir, '01_landing_page.png') });
    
    // 2. Cat Collection View
    console.log('Capturing cat collection view...');
    await page.goto('http://0.0.0.0:3000/collection', { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(screenshotsDir, '02_cat_collection.png') });
    
    // 3. Trait Viewer
    console.log('Capturing trait viewer...');
    await page.goto('http://0.0.0.0:3000/trait-viewer', { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(screenshotsDir, '03_trait_viewer.png') });
    
    // 4. Mint Interface
    console.log('Capturing mint interface...');
    await page.goto('http://0.0.0.0:3000/mint', { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(screenshotsDir, '04_mint_interface.png') });
    
    // 5. Investor Dashboard
    console.log('Capturing investor dashboard...');
    await page.goto('http://0.0.0.0:3000/investor-dashboard', { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(screenshotsDir, '05_investor_dashboard.png') });
    
    // 6. Presentation Viewer
    console.log('Capturing presentation viewer...');
    await page.goto('http://0.0.0.0:3001', { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(screenshotsDir, '06_presentation_viewer.png') });
    
    // 7. Interactive Presentation
    console.log('Capturing interactive presentation...');
    await page.goto('http://0.0.0.0:3001/cdv_investor_deck.html', { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(screenshotsDir, '07_interactive_presentation.png') });
    
    // 8. Print Slides View
    console.log('Capturing print slides view...');
    await page.goto('http://0.0.0.0:3001/print-slides', { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(screenshotsDir, '08_print_slides_view.png') });
    
    console.log('All screenshots captured successfully!');
    console.log(`Screenshots saved to: ${screenshotsDir}`);
  } catch (error) {
    console.error('Error capturing screenshots:', error);
  } finally {
    await browser.close();
  }
}

// Generate the screenshots
generateScreenshots();
