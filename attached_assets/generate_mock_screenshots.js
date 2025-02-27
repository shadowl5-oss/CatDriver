
const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

// Create screenshots directory if it doesn't exist
const screenshotsDir = path.join(__dirname, 'screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
  console.log(`Created screenshots directory: ${screenshotsDir}`);
}

// Function to generate a mock screenshot as a real PNG image
function generateMockScreenshot(fileName, title, type, width = 1280, height = 800) {
  console.log(`Generating ${fileName}...`);
  
  // Create a canvas
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  // Fill background
  ctx.fillStyle = '#F5F7FA';
  ctx.fillRect(0, 0, width, height);
  
  // Draw a header area
  const gradient = ctx.createLinearGradient(0, 0, width, 0);
  gradient.addColorStop(0, '#2a3f5f');
  gradient.addColorStop(1, '#364f6b');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, 80);
  
  // Draw Cat Driven Value logo
  ctx.font = 'bold 22px Arial, Helvetica, sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'left';
  ctx.fillText('Cat Driven Value', 30, 50);
  
  // Draw navigation menu
  const menuItems = ['Dashboard', 'Portfolio', 'Marketplace', 'Governance', 'Staking'];
  ctx.font = '16px Arial, Helvetica, sans-serif';
  let menuX = width - 500;
  
  menuItems.forEach(item => {
    const highlight = item.toLowerCase() === type.toLowerCase();
    ctx.fillStyle = highlight ? '#FC6D6D' : '#ffffff';
    ctx.fillText(item, menuX, 50);
    
    if (highlight) {
      ctx.fillRect(menuX, 60, ctx.measureText(item).width, 3);
    }
    
    menuX += 100;
  });
  
  // Draw page title
  ctx.font = 'bold 28px Arial, Helvetica, sans-serif';
  ctx.fillStyle = '#2D3748';
  ctx.textAlign = 'left';
  ctx.fillText(title, 40, 130);
  
  // Draw content based on type
  switch (type.toLowerCase()) {
    case 'dashboard':
      drawDashboard(ctx, width, height);
      break;
      
    case 'portfolio':
      drawPortfolio(ctx, width, height);
      break;
      
    case 'governance':
      drawGovernance(ctx, width, height);
      break;
      
    case 'marketplace':
      drawMarketplace(ctx, width, height);
      break;
      
    case 'staking':
      drawStaking(ctx, width, height);
      break;
      
    case 'presentation':
      drawPresentation(ctx, width, height, title);
      break;
  }
  
  // Draw footer
  ctx.fillStyle = '#E2E8F0';
  ctx.fillRect(0, height - 40, width, 40);
  
  // Draw timestamp
  ctx.font = '12px Arial, Helvetica, sans-serif';
  ctx.fillStyle = '#718096';
  ctx.textAlign = 'right';
  ctx.fillText(`Generated: ${new Date().toISOString()}`, width - 20, height - 15);
  
  // Draw company info in footer
  ctx.textAlign = 'left';
  ctx.fillText('Cat Driven Value, Inc. © 2023-2025. All Rights Reserved', 20, height - 15);
  
  // Save as PNG
  const buffer = canvas.toBuffer('image/png');
  const filePath = path.join(screenshotsDir, fileName);
  fs.writeFileSync(filePath, buffer);
  
  // Also save a text version with the timestamp for quick reference
  const textContent = `Mock screenshot: ${title}\nGenerated: ${new Date().toISOString()}`;
  fs.writeFileSync(path.join(screenshotsDir, fileName.replace('.png', '.txt')), textContent);
  
  return filePath;
}

// Helper function to draw a card
function drawCard(ctx, x, y, width, height, title) {
  // Card background
  ctx.fillStyle = '#FFFFFF';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
  ctx.shadowBlur = 10;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 2;
  ctx.fillRect(x, y, width, height);
  ctx.shadowColor = 'transparent';
  
  // Card title
  ctx.fillStyle = '#2D3748';
  ctx.font = 'bold 16px Arial, Helvetica, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(title, x + 15, y + 25);
  
  // Divider
  ctx.fillStyle = '#E2E8F0';
  ctx.fillRect(x, y + 35, width, 1);
  
  return { contentX: x + 15, contentY: y + 50 };
}

// Draw dashboard UI
function drawDashboard(ctx, width, height) {
  // Summary cards
  const cards = [
    { title: 'Total Value', value: '$152,483.56', change: '+12.4%' },
    { title: 'Token Price', value: '$0.0734', change: '+3.2%' },
    { title: 'Portfolio Growth', value: '18.7%', change: '+5.1%' },
    { title: 'Staking Rewards', value: '121 CDV', change: '+2.8%' }
  ];
  
  let cardX = 40;
  cards.forEach(card => {
    // Card
    const cardWidth = 260;
    const cardContent = drawCard(ctx, cardX, 160, cardWidth, 120, card.title);
    
    // Value
    ctx.font = 'bold 24px Arial, Helvetica, sans-serif';
    ctx.fillStyle = '#2D3748';
    ctx.fillText(card.value, cardContent.contentX, cardContent.contentY + 15);
    
    // Change indicator
    ctx.font = '14px Arial, Helvetica, sans-serif';
    ctx.fillStyle = card.change.startsWith('+') ? '#38A169' : '#E53E3E';
    ctx.fillText(card.change, cardContent.contentX, cardContent.contentY + 40);
    
    cardX += cardWidth + 20;
  });
  
  // Graph card
  const graphCard = drawCard(ctx, 40, 310, width - 80, 280, 'Token Performance (Last 30 Days)');
  
  // Draw mock line chart
  ctx.beginPath();
  ctx.moveTo(graphCard.contentX, graphCard.contentY + 150);
  
  // Generate points for the chart
  const points = [];
  const chartWidth = width - 110;
  const step = chartWidth / 30;
  
  for (let i = 0; i < 30; i++) {
    const x = graphCard.contentX + (i * step);
    // Create a slightly upward trending line with randomness
    const randomY = Math.sin(i * 0.3) * 30 + Math.random() * 20;
    const y = graphCard.contentY + 120 - (i * 0.8) - randomY;
    points.push({ x, y });
  }
  
  // Draw grid lines
  ctx.strokeStyle = '#E2E8F0';
  ctx.lineWidth = 1;
  
  // Horizontal grid lines
  for (let i = 0; i < 5; i++) {
    const y = graphCard.contentY + 30 + (i * 40);
    ctx.beginPath();
    ctx.moveTo(graphCard.contentX, y);
    ctx.lineTo(graphCard.contentX + chartWidth, y);
    ctx.stroke();
    
    // Y-axis labels
    ctx.fillStyle = '#718096';
    ctx.font = '12px Arial, Helvetica, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(`$${(0.07 - (i * 0.01)).toFixed(3)}`, graphCard.contentX - 10, y + 4);
  }
  
  // Vertical grid lines
  for (let i = 0; i <= 30; i += 5) {
    const x = graphCard.contentX + (i * step);
    ctx.beginPath();
    ctx.moveTo(x, graphCard.contentY);
    ctx.lineTo(x, graphCard.contentY + 200);
    ctx.stroke();
    
    // X-axis labels (dates)
    if (i % 5 === 0) {
      const date = new Date();
      date.setDate(date.getDate() - (30 - i));
      const dateStr = `${date.getMonth() + 1}/${date.getDate()}`;
      
      ctx.fillStyle = '#718096';
      ctx.font = '12px Arial, Helvetica, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(dateStr, x, graphCard.contentY + 220);
    }
  }
  
  // Draw the line
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  
  ctx.strokeStyle = '#3182CE';
  ctx.lineWidth = 3;
  ctx.stroke();
  
  // Add gradient below the line
  const gradient = ctx.createLinearGradient(0, graphCard.contentY, 0, graphCard.contentY + 200);
  gradient.addColorStop(0, 'rgba(49, 130, 206, 0.4)');
  gradient.addColorStop(1, 'rgba(49, 130, 206, 0)');
  
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  
  ctx.lineTo(points[points.length - 1].x, graphCard.contentY + 200);
  ctx.lineTo(points[0].x, graphCard.contentY + 200);
  ctx.closePath();
  
  ctx.fillStyle = gradient;
  ctx.fill();
}

// Draw portfolio UI
function drawPortfolio(ctx, width, height) {
  // Portfolio Summary Card
  const summaryCard = drawCard(ctx, 40, 160, width - 80, 140, 'Portfolio Summary');
  
  // Total value
  ctx.font = 'bold 28px Arial, Helvetica, sans-serif';
  ctx.fillStyle = '#2D3748';
  ctx.fillText('$152,483.56', summaryCard.contentX, summaryCard.contentY + 20);
  
  // Change indicator
  ctx.font = '16px Arial, Helvetica, sans-serif';
  ctx.fillStyle = '#38A169';
  ctx.fillText('+12.4% (30d)', summaryCard.contentX + 200, summaryCard.contentY + 20);
  
  // Portfolio allocation
  const allocationCard = drawCard(ctx, 40, 330, width - 80, 300, 'Asset Allocation');
  
  // Draw pie chart
  const centerX = allocationCard.contentX + 150;
  const centerY = allocationCard.contentY + 120;
  const radius = 100;
  
  const assets = [
    { name: 'CDV Token', percentage: 45, color: '#3182CE' },
    { name: 'Bitcoin', percentage: 25, color: '#F6AD55' },
    { name: 'Ethereum', percentage: 15, color: '#9F7AEA' },
    { name: 'Stablecoins', percentage: 10, color: '#38A169' },
    { name: 'Other', percentage: 5, color: '#FC8181' }
  ];
  
  let startAngle = 0;
  assets.forEach(asset => {
    const endAngle = startAngle + (asset.percentage / 100) * Math.PI * 2;
    
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    
    ctx.fillStyle = asset.color;
    ctx.fill();
    
    startAngle = endAngle;
  });
  
  // Draw legend
  let legendY = allocationCard.contentY + 20;
  const legendX = allocationCard.contentX + 350;
  
  assets.forEach(asset => {
    // Color box
    ctx.fillStyle = asset.color;
    ctx.fillRect(legendX, legendY, 20, 20);
    
    // Asset name and percentage
    ctx.fillStyle = '#2D3748';
    ctx.font = '14px Arial, Helvetica, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`${asset.name} (${asset.percentage}%)`, legendX + 30, legendY + 15);
    
    legendY += 30;
  });
}

// Draw governance UI
function drawGovernance(ctx, width, height) {
  // Active Proposals
  const proposalsCard = drawCard(ctx, 40, 160, width - 80, 400, 'Active Governance Proposals');
  
  const proposals = [
    { id: 'CDVP-42', title: 'Increase Staking Rewards by 2%', status: 'Voting', votes: { for: 68, against: 32 } },
    { id: 'CDVP-41', title: 'Add New Cat Traits Collection', status: 'Voting', votes: { for: 75, against: 25 } },
    { id: 'CDVP-40', title: 'Reduce Marketplace Fees to 1.5%', status: 'Voting', votes: { for: 82, against: 18 } }
  ];
  
  let proposalY = proposalsCard.contentY;
  
  proposals.forEach((proposal, index) => {
    // Proposal container
    ctx.fillStyle = index % 2 === 0 ? '#F7FAFC' : '#FFFFFF';
    ctx.fillRect(proposalsCard.contentX - 15, proposalY, width - 110, 100);
    
    // Proposal ID and title
    ctx.fillStyle = '#2D3748';
    ctx.font = 'bold 16px Arial, Helvetica, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`${proposal.id}: ${proposal.title}`, proposalsCard.contentX, proposalY + 25);
    
    // Status pill
    ctx.fillStyle = '#3182CE';
    ctx.beginPath();
    ctx.roundRect(proposalsCard.contentX, proposalY + 40, 60, 24, 12);
    ctx.fill();
    
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 12px Arial, Helvetica, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(proposal.status, proposalsCard.contentX + 30, proposalY + 55);
    
    // Voting progress bar background
    ctx.fillStyle = '#E2E8F0';
    ctx.fillRect(proposalsCard.contentX + 200, proposalY + 45, 400, 15);
    
    // For votes
    ctx.fillStyle = '#38A169';
    ctx.fillRect(proposalsCard.contentX + 200, proposalY + 45, 400 * (proposal.votes.for / 100), 15);
    
    // Vote percentages
    ctx.fillStyle = '#2D3748';
    ctx.font = '14px Arial, Helvetica, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`For: ${proposal.votes.for}%`, proposalsCard.contentX + 620, proposalY + 55);
    ctx.fillText(`Against: ${proposal.votes.against}%`, proposalsCard.contentX + 700, proposalY + 55);
    
    proposalY += 110;
  });
  
  // Your voting power
  const votingCard = drawCard(ctx, 40, 570, width - 80, 100, 'Your Voting Power');
  
  ctx.fillStyle = '#2D3748';
  ctx.font = 'bold 24px Arial, Helvetica, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('3,245 Votes (2.1% of Total)', votingCard.contentX, votingCard.contentY + 30);
  
  // Voting button
  ctx.fillStyle = '#3182CE';
  ctx.beginPath();
  ctx.roundRect(votingCard.contentX + 600, votingCard.contentY, 120, 40, 5);
  ctx.fill();
  
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 16px Arial, Helvetica, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Cast Vote', votingCard.contentX + 660, votingCard.contentY + 25);
}

// Draw marketplace UI
function drawMarketplace(ctx, width, height) {
  // Featured collections
  const featuredCard = drawCard(ctx, 40, 160, width - 80, 200, 'Featured Collections');
  
  const collections = [
    { name: 'Genesis Cats', items: 1000, floor: 0.5 },
    { name: 'Quantum Kittens', items: 500, floor: 1.2 },
    { name: 'Space Cats', items: 750, floor: 0.8 },
    { name: 'Rare Breeds', items: 250, floor: 2.5 }
  ];
  
  let collectionX = featuredCard.contentX;
  
  collections.forEach(collection => {
    // Collection container
    ctx.fillStyle = '#F7FAFC';
    ctx.fillRect(collectionX, featuredCard.contentY, 250, 150);
    
    // Collection image placeholder
    ctx.fillStyle = '#E2E8F0';
    ctx.fillRect(collectionX + 20, featuredCard.contentY + 20, 210, 80);
    
    // Cat silhouette
    ctx.fillStyle = '#A0AEC0';
    ctx.beginPath();
    const catX = collectionX + 125;
    const catY = featuredCard.contentY + 60;
    
    // Draw cat ears
    ctx.moveTo(catX - 20, catY - 20);
    ctx.lineTo(catX - 10, catY - 30);
    ctx.lineTo(catX, catY - 20);
    ctx.moveTo(catX, catY - 20);
    ctx.lineTo(catX + 10, catY - 30);
    ctx.lineTo(catX + 20, catY - 20);
    
    // Draw cat head
    ctx.arc(catX, catY, 20, 0, Math.PI * 2);
    
    ctx.fill();
    
    // Collection name
    ctx.fillStyle = '#2D3748';
    ctx.font = 'bold 16px Arial, Helvetica, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(collection.name, collectionX + 125, featuredCard.contentY + 120);
    
    // Collection stats
    ctx.fillStyle = '#718096';
    ctx.font = '12px Arial, Helvetica, sans-serif';
    ctx.fillText(`${collection.items} items · Floor: ${collection.floor} CDV`, collectionX + 125, featuredCard.contentY + 140);
    
    collectionX += 280;
  });
  
  // Recent listings
  const listingsCard = drawCard(ctx, 40, 380, width - 80, 300, 'Recent Listings');
  
  const listings = [
    { id: 'CDV #1024', name: 'Cosmic Explorer', price: 12.5, rarity: 'Legendary' },
    { id: 'CDV #482', name: 'Quantum Tabby', price: 3.2, rarity: 'Rare' },
    { id: 'CDV #2189', name: 'Space Whiskers', price: 1.8, rarity: 'Uncommon' },
    { id: 'CDV #901', name: 'Galactic Siamese', price: 5.4, rarity: 'Epic' }
  ];
  
  let listingY = listingsCard.contentY;
  
  listings.forEach((listing, index) => {
    // Listing container
    ctx.fillStyle = index % 2 === 0 ? '#F7FAFC' : '#FFFFFF';
    ctx.fillRect(listingsCard.contentX - 15, listingY, width - 110, 60);
    
    // Thumbnail placeholder
    ctx.fillStyle = '#E2E8F0';
    ctx.fillRect(listingsCard.contentX, listingY + 10, 40, 40);
    
    // Listing ID and name
    ctx.fillStyle = '#2D3748';
    ctx.font = 'bold 16px Arial, Helvetica, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`${listing.id}: ${listing.name}`, listingsCard.contentX + 60, listingY + 25);
    
    // Rarity badge
    const rarityColors = {
      'Common': '#A0AEC0',
      'Uncommon': '#38A169',
      'Rare': '#3182CE',
      'Epic': '#9F7AEA',
      'Legendary': '#F6AD55'
    };
    
    ctx.fillStyle = rarityColors[listing.rarity];
    ctx.beginPath();
    ctx.roundRect(listingsCard.contentX + 60, listingY + 35, 80, 20, 10);
    ctx.fill();
    
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 12px Arial, Helvetica, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(listing.rarity, listingsCard.contentX + 100, listingY + 48);
    
    // Price
    ctx.fillStyle = '#2D3748';
    ctx.font = 'bold 16px Arial, Helvetica, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(`${listing.price} CDV`, listingsCard.contentX + 800, listingY + 35);
    
    // Buy button
    ctx.fillStyle = '#3182CE';
    ctx.beginPath();
    ctx.roundRect(listingsCard.contentX + 850, listingY + 20, 80, 30, 5);
    ctx.fill();
    
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 14px Arial, Helvetica, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Buy', listingsCard.contentX + 890, listingY + 40);
    
    listingY += 70;
  });
}

// Draw staking UI
function drawStaking(ctx, width, height) {
  // Staking overview
  const overviewCard = drawCard(ctx, 40, 160, width - 80, 140, 'Staking Overview');
  
  // Staking stats
  const stats = [
    { label: 'Total Staked', value: '31,245,683 CDV' },
    { label: 'Your Stake', value: '12,500 CDV' },
    { label: 'APY', value: '18.5%' },
    { label: 'Earned Rewards', value: '321 CDV' }
  ];
  
  let statX = overviewCard.contentX;
  
  stats.forEach(stat => {
    ctx.fillStyle = '#2D3748';
    ctx.font = 'bold 20px Arial, Helvetica, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(stat.value, statX, overviewCard.contentY + 30);
    
    ctx.fillStyle = '#718096';
    ctx.font = '14px Arial, Helvetica, sans-serif';
    ctx.fillText(stat.label, statX, overviewCard.contentY + 60);
    
    statX += 280;
  });
  
  // Staking tiers
  const tiersCard = drawCard(ctx, 40, 330, width - 80, 250, 'Staking Tiers');
  
  const tiers = [
    { name: 'Bronze', minStake: '1,000', apy: '12%', benefits: ['Basic Governance Rights', 'Standard Rewards'] },
    { name: 'Silver', minStake: '5,000', apy: '15%', benefits: ['Enhanced Governance Weight', 'Bonus Rewards', 'Early Access to New Features'] },
    { name: 'Gold', minStake: '10,000', apy: '18%', benefits: ['Premium Governance Weight', 'Maximum Rewards', 'Exclusive NFT Drops', 'Fee Discounts'] },
    { name: 'Platinum', minStake: '25,000', apy: '22%', benefits: ['Elite Governance Weight', 'Maximum Rewards + 20%', 'VIP NFT Access', 'Zero Fees', 'Quarterly Airdrops'] }
  ];
  
  let tierX = tiersCard.contentX;
  
  tiers.forEach((tier, index) => {
    // Current tier highlight
    const isCurrentTier = index === 2; // Gold tier
    
    // Tier card
    ctx.fillStyle = isCurrentTier ? '#FEFCBF' : '#FFFFFF';
    ctx.strokeStyle = isCurrentTier ? '#F6AD55' : '#E2E8F0';
    ctx.lineWidth = isCurrentTier ? 2 : 1;
    
    ctx.beginPath();
    ctx.roundRect(tierX, tiersCard.contentY, 260, 200, 5);
    ctx.stroke();
    ctx.fill();
    
    // Tier name
    ctx.fillStyle = '#2D3748';
    ctx.font = 'bold 18px Arial, Helvetica, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(tier.name, tierX + 130, tiersCard.contentY + 30);
    
    // Min stake
    ctx.fillStyle = '#718096';
    ctx.font = '14px Arial, Helvetica, sans-serif';
    ctx.fillText(`Min Stake: ${tier.minStake} CDV`, tierX + 130, tiersCard.contentY + 55);
    
    // APY
    ctx.fillStyle = '#38A169';
    ctx.font = 'bold 20px Arial, Helvetica, sans-serif';
    ctx.fillText(`${tier.apy} APY`, tierX + 130, tiersCard.contentY + 85);
    
    // Benefits
    ctx.fillStyle = '#2D3748';
    ctx.font = '12px Arial, Helvetica, sans-serif';
    ctx.textAlign = 'left';
    
    tier.benefits.forEach((benefit, i) => {
      ctx.fillText(`• ${benefit}`, tierX + 20, tiersCard.contentY + 115 + (i * 20));
    });
    
    // Current tier indicator
    if (isCurrentTier) {
      ctx.fillStyle = '#F6AD55';
      ctx.font = 'bold 12px Arial, Helvetica, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('YOUR CURRENT TIER', tierX + 130, tiersCard.contentY + 190);
    }
    
    tierX += 280;
  });
}

// Draw presentation slides
function drawPresentation(ctx, width, height, slideTitle) {
  // Presentation header
  ctx.fillStyle = '#2D3748';
  ctx.textAlign = 'center';
  ctx.font = 'bold 36px Arial, Helvetica, sans-serif';
  ctx.fillText('Cat Driven Value (CDV)', width / 2, 180);
  
  ctx.fillStyle = '#718096';
  ctx.font = 'italic 20px Arial, Helvetica, sans-serif';
  ctx.fillText('Investor Presentation', width / 2, 220);
  
  // Draw slide content based on title
  if (slideTitle.includes('Investment')) {
    drawInvestmentSlide(ctx, width, height);
  } else if (slideTitle.includes('Market')) {
    drawMarketSlide(ctx, width, height);
  } else if (slideTitle.includes('Financial')) {
    drawFinancialSlide(ctx, width, height);
  }
  
  // Slide number
  ctx.fillStyle = '#718096';
  ctx.font = '14px Arial, Helvetica, sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('Slide 1 of 15', width - 40, height - 60);
  
  // Cat logo
  ctx.fillStyle = '#2D3748';
  ctx.textAlign = 'center';
  ctx.font = '24px Arial, Helvetica, sans-serif';
  ctx.fillText('/\\_/\\', 100, height - 90);
  ctx.fillText('( o.o )', 100, height - 70);
  ctx.fillText('> ^ <', 100, height - 50);
}

function drawInvestmentSlide(ctx, width, height) {
  // Key points
  const points = [
    'Revolutionary Feline-Powered Blockchain',
    'First-Mover Advantage in Cat NFT Market',
    'Proprietary Quantum-Inspired Technology',
    '$1.5M Seed Round at $15M Valuation'
  ];
  
  ctx.fillStyle = '#2D3748';
  ctx.textAlign = 'left';
  ctx.font = 'bold 24px Arial, Helvetica, sans-serif';
  ctx.fillText('Investment Highlights', width / 2 - 300, 300);
  
  ctx.font = '20px Arial, Helvetica, sans-serif';
  points.forEach((point, i) => {
    ctx.fillText(`• ${point}`, width / 2 - 280, 350 + (i * 40));
  });
  
  // Investment graph
  ctx.fillStyle = '#E2E8F0';
  ctx.fillRect(width / 2 + 50, 300, 350, 250);
  
  // Growth line
  ctx.strokeStyle = '#3182CE';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(width / 2 + 70, 500);
  ctx.bezierCurveTo(
    width / 2 + 150, 450,
    width / 2 + 250, 430,
    width / 2 + 380, 320
  );
  ctx.stroke();
  
  // Draw arrow at the end
  ctx.fillStyle = '#3182CE';
  ctx.beginPath();
  ctx.moveTo(width / 2 + 380, 320);
  ctx.lineTo(width / 2 + 390, 310);
  ctx.lineTo(width / 2 + 400, 330);
  ctx.closePath();
  ctx.fill();
  
  // X axis label
  ctx.fillStyle = '#718096';
  ctx.font = '14px Arial, Helvetica, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Time (Quarters)', width / 2 + 225, 570);
  
  // Y axis label
  ctx.save();
  ctx.translate(width / 2 + 40, 425);
  ctx.rotate(-Math.PI / 2);
  ctx.textAlign = 'center';
  ctx.fillText('Value ($)', 0, 0);
  ctx.restore();
}

function drawMarketSlide(ctx, width, height) {
  // Market size heading
  ctx.fillStyle = '#2D3748';
  ctx.textAlign = 'left';
  ctx.font = 'bold 24px Arial, Helvetica, sans-serif';
  ctx.fillText('Market Analysis', width / 2 - 300, 300);
  
  // Market data table
  const tableX = width / 2 - 280;
  const tableY = 340;
  const tableWidth = 560;
  const rowHeight = 40;
  
  // Table header
  ctx.fillStyle = '#3182CE';
  ctx.fillRect(tableX, tableY, tableWidth, rowHeight);
  
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 16px Arial, Helvetica, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('Market Segment', tableX + 20, tableY + 25);
  ctx.textAlign = 'right';
  ctx.fillText('Size (USD)', tableX + 300, tableY + 25);
  ctx.fillText('Annual Growth', tableX + 540, tableY + 25);
  
  // Table rows
  const marketData = [
    { segment: 'NFT Market', size: '$35B', growth: '18.2%' },
    { segment: 'Pet Economy', size: '$90B', growth: '5.7%' },
    { segment: 'DeFi Sector', size: '$120B', growth: '21.4%' },
    { segment: 'CDV Target Market', size: '$8.5B', growth: '28.9%' }
  ];
  
  marketData.forEach((data, i) => {
    const rowY = tableY + rowHeight + (i * rowHeight);
    
    // Row background
    ctx.fillStyle = i % 2 === 0 ? '#F7FAFC' : '#FFFFFF';
    ctx.fillRect(tableX, rowY, tableWidth, rowHeight);
    
    // Row data
    ctx.fillStyle = '#2D3748';
    ctx.font = '16px Arial, Helvetica, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(data.segment, tableX + 20, rowY + 25);
    
    ctx.textAlign = 'right';
    ctx.fillText(data.size, tableX + 300, rowY + 25);
    
    ctx.fillStyle = '#38A169';
    ctx.fillText(data.growth, tableX + 540, rowY + 25);
  });
  
  // Highlight CDV row
  ctx.strokeStyle = '#3182CE';
  ctx.lineWidth = 2;
  ctx.strokeRect(tableX, tableY + rowHeight + (3 * rowHeight), tableWidth, rowHeight);
}

function drawFinancialSlide(ctx, width, height) {
  // Financial projections heading
  ctx.fillStyle = '#2D3748';
  ctx.textAlign = 'left';
  ctx.font = 'bold 24px Arial, Helvetica, sans-serif';
  ctx.fillText('Financial Projections', width / 2 - 300, 300);
  
  // Bar chart
  const chartX = width / 2 - 280;
  const chartY = 340;
  const chartWidth = 560;
  const chartHeight = 200;
  
  // X and Y axes
  ctx.strokeStyle = '#718096';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(chartX, chartY);
  ctx.lineTo(chartX, chartY + chartHeight);
  ctx.lineTo(chartX + chartWidth, chartY + chartHeight);
  ctx.stroke();
  
  // Financial data
  const financialData = [
    { year: 'Year 1', revenue: 0.8, profit: 0.2 },
    { year: 'Year 2', revenue: 2.5, profit: 0.9 },
    { year: 'Year 3', revenue: 6.2, profit: 2.7 },
    { year: 'Year 4', revenue: 12.8, profit: 5.4 },
    { year: 'Year 5', revenue: 24.5, profit: 10.2 }
  ];
  
  // Draw bars
  const barWidth = 80;
  const barSpacing = (chartWidth - (barWidth * financialData.length)) / (financialData.length + 1);
  
  financialData.forEach((data, i) => {
    const barX = chartX + barSpacing + (i * (barWidth + barSpacing));
    
    // Revenue bar
    const revenueHeight = (data.revenue / 25) * chartHeight;
    ctx.fillStyle = '#3182CE';
    ctx.fillRect(barX, chartY + chartHeight - revenueHeight, barWidth / 2, revenueHeight);
    
    // Profit bar
    const profitHeight = (data.profit / 25) * chartHeight;
    ctx.fillStyle = '#38A169';
    ctx.fillRect(barX + barWidth / 2, chartY + chartHeight - profitHeight, barWidth / 2, profitHeight);
    
    // X axis label
    ctx.fillStyle = '#718096';
    ctx.font = '14px Arial, Helvetica, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(data.year, barX + barWidth / 2, chartY + chartHeight + 20);
    
    // Bar values
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 12px Arial, Helvetica, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`$${data.revenue}M`, barX + barWidth / 4, chartY + chartHeight - revenueHeight + 20);
    ctx.fillText(`$${data.profit}M`, barX + barWidth * 3/4, chartY + chartHeight - profitHeight + 20);
  });
  
  // Legend
  ctx.fillStyle = '#3182CE';
  ctx.fillRect(chartX + 100, chartY + chartHeight + 40, 20, 20);
  
  ctx.fillStyle = '#2D3748';
  ctx.font = '14px Arial, Helvetica, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('Revenue', chartX + 130, chartY + chartHeight + 55);
  
  ctx.fillStyle = '#38A169';
  ctx.fillRect(chartX + 300, chartY + chartHeight + 40, 20, 20);
  
  ctx.fillStyle = '#2D3748';
  ctx.fillText('Profit', chartX + 330, chartY + chartHeight + 55);
  
  // Y axis labels
  for (let i = 0; i <= 5; i++) {
    const labelY = chartY + chartHeight - (i * chartHeight / 5);
    
    ctx.fillStyle = '#718096';
    ctx.font = '12px Arial, Helvetica, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(`$${i * 5}M`, chartX - 10, labelY + 5);
    
    // Grid line
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(chartX, labelY);
    ctx.lineTo(chartX + chartWidth, labelY);
    ctx.stroke();
  }
}

function generateMockScreenshots() {
  console.log('Generating enhanced mock screenshots for investors...');

  const screenshots = [
    { file: 'dashboard.png', title: 'Investor Dashboard', type: 'dashboard' },
    { file: 'portfolio.png', title: 'Your Portfolio', type: 'portfolio' },
    { file: 'marketplace.png', title: 'NFT Marketplace', type: 'marketplace' },
    { file: 'staking.png', title: 'Token Staking', type: 'staking' },
    { file: 'governance.png', title: 'DAO Governance', type: 'governance' },
    { file: 'presentation_slide1.png', title: 'Investment Opportunity', type: 'presentation' },
    { file: 'presentation_slide2.png', title: 'Market Analysis', type: 'presentation' },
    { file: 'presentation_slide3.png', title: 'Financial Projections', type: 'presentation' }
  ];

  try {
    for (const screenshot of screenshots) {
      const filePath = generateMockScreenshot(screenshot.file, screenshot.title, screenshot.type);
      console.log(`Generated: ${filePath}`);
    }

    console.log('\n✅ All mock screenshots generated successfully!');
    console.log(`📁 Screenshots saved to: ${screenshotsDir}`);
    console.log('📩 These screenshots are ready to be shared with investors');
  } catch (error) {
    console.error('Error generating screenshots:', error);
  }
}

// Generate the enhanced mock screenshots
generateMockScreenshots();
