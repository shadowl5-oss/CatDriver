/**
 * Cat Canvas Generator
 * Advanced canvas-based generator for creating cat ordinals with various traits and effects
 */

// Type definitions
export interface CatTraits {
  type: 'quantum' | 'bitcoin' | 'cypherpunk' | 'schrodinger' | 'generic';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  colors: string[];
  accessories: string[];
  expression: 'happy' | 'sad' | 'surprised' | 'grumpy' | 'wise' | 'mischievous' | 'neutral';
  features?: {
    eyeStyle?: string;
    whiskerStyle?: string;
    earShape?: string;
    tailType?: string;
    furPattern?: string;
  };
  special?: boolean;
}

export interface BlockchainData {
  blockHeight?: number;
  blockHash?: string;
  transactionId?: string;
  entropy?: number;
  quantumState?: 'observed' | 'unobserved' | 'superposition' | 'entangled';
}

export class CatCanvasGenerator {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private traits: CatTraits;
  private blockchainData?: BlockchainData;
  
  constructor(width = 500, height = 500) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx = this.canvas.getContext('2d')!;
    this.traits = {
      type: 'quantum',
      rarity: 'common',
      colors: ['#000000', '#ffffff'],
      accessories: [],
      expression: 'neutral'
    };
  }
  
  setTraits(traits: Partial<CatTraits>) {
    this.traits = { ...this.traits, ...traits };
    return this;
  }
  
  setBlockchainData(data: BlockchainData) {
    this.blockchainData = data;
    return this;
  }
  
  // Drawing methods
  drawBackground() {
    const { type, rarity } = this.traits;
    const ctx = this.ctx;
    const width = this.canvas.width;
    const height = this.canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Background based on type
    switch (type) {
      case 'quantum':
        // Quantum field background
        const gradient = ctx.createRadialGradient(
          width / 2, height / 2, 0,
          width / 2, height / 2, width * 0.8
        );
        gradient.addColorStop(0, '#1a1a2e');
        gradient.addColorStop(1, '#0f0f1a');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        
        // Add quantum field waves
        this.drawQuantumWaves();
        break;
        
      case 'bitcoin':
        // Bitcoin-themed background
        ctx.fillStyle = '#f7931a20'; // Bitcoin orange with transparency
        ctx.fillRect(0, 0, width, height);
        
        // Grid pattern
        ctx.strokeStyle = '#f7931a10';
        ctx.lineWidth = 1;
        const gridSize = 30;
        
        for (let x = 0; x < width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        
        for (let y = 0; y < height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
        
        // Add binary pattern in background
        this.drawBinaryPattern();
        break;
        
      case 'cypherpunk':
        // Cypherpunk-themed dark background with matrix effect
        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(0, 0, width, height);
        
        // Matrix-like effect
        this.drawMatrixEffect();
        break;
        
      case 'schrodinger':
        // Schrodinger's cat themed - split background
        ctx.fillStyle = '#121212';
        ctx.fillRect(0, 0, width, height);
        
        // Draw box outline
        ctx.strokeStyle = '#444';
        ctx.lineWidth = 3;
        ctx.strokeRect(width * 0.1, height * 0.1, width * 0.8, height * 0.8);
        
        // Quantum uncertainty visualization
        this.drawUncertaintyWaves();
        break;
        
      default:
        // Generic background
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, width, height);
        break;
    }
    
    // Add rarity-based effects
    if (rarity === 'legendary') {
      this.drawLegendaryBackground();
    } else if (rarity === 'epic') {
      this.drawEpicBackground();
    }
    
    return this;
  }
  
  drawQuantumWaves() {
    const ctx = this.ctx;
    const width = this.canvas.width;
    const height = this.canvas.height;
    const entropy = this.blockchainData?.entropy || Math.random() * 100;
    
    // Draw quantum field waves
    ctx.strokeStyle = 'rgba(80, 200, 240, 0.15)';
    ctx.lineWidth = 1;
    
    for (let i = 0; i < 8; i++) {
      ctx.beginPath();
      for (let x = 0; x < width; x += 5) {
        const waveHeight = Math.sin(x * 0.02 + i * 0.5) * (10 + i * 3);
        const y = height / 2 + waveHeight + Math.sin(entropy * 0.01 + x * 0.01) * 20;
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    }
  }
  
  drawBinaryPattern() {
    const ctx = this.ctx;
    const width = this.canvas.width;
    const height = this.canvas.height;
    
    ctx.font = '8px monospace';
    ctx.fillStyle = 'rgba(247, 147, 26, 0.2)'; // Bitcoin orange with high transparency
    
    const blockHeight = this.blockchainData?.blockHeight || 77000 + Math.floor(Math.random() * 10000);
    const binary = blockHeight.toString(2);
    
    for (let y = 10; y < height; y += 20) {
      for (let x = 10; x < width; x += 20) {
        const digit = binary[Math.floor(Math.random() * binary.length)];
        ctx.fillText(digit || (Math.random() > 0.5 ? '1' : '0'), x, y);
      }
    }
  }
  
  drawMatrixEffect() {
    const ctx = this.ctx;
    const width = this.canvas.width;
    const height = this.canvas.height;
    
    ctx.font = '10px monospace';
    ctx.fillStyle = 'rgba(0, 255, 70, 0.15)';
    
    for (let x = 10; x < width; x += 15) {
      const columnSize = Math.floor(Math.random() * 10) + 3;
      for (let y = 10; y < height; y += 15) {
        if (Math.random() > 0.8) {
          const char = String.fromCharCode(33 + Math.floor(Math.random() * 94));
          ctx.fillText(char, x, y);
        }
      }
    }
  }
  
  drawUncertaintyWaves() {
    const ctx = this.ctx;
    const width = this.canvas.width;
    const height = this.canvas.height;
    
    ctx.strokeStyle = 'rgba(100, 100, 255, 0.1)';
    ctx.lineWidth = 2;
    
    // Wave function visualization
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      for (let x = width * 0.1; x <= width * 0.9; x += 2) {
        const waveHeight = 
          Math.sin(x * 0.05 + i) * 10 * 
          Math.exp(-Math.pow((x - width/2) / (width/5), 2));
        
        const y = height / 2 + waveHeight;
        
        if (x === width * 0.1) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    }
  }
  
  drawLegendaryBackground() {
    const ctx = this.ctx;
    const width = this.canvas.width;
    const height = this.canvas.height;
    
    // Add subtle shimmering effect
    ctx.fillStyle = 'rgba(255, 215, 0, 0.1)'; // Gold with transparency
    
    for (let i = 0; i < 30; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = Math.random() * 5 + 1;
      
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  drawEpicBackground() {
    const ctx = this.ctx;
    const width = this.canvas.width;
    const height = this.canvas.height;
    
    // Add subtle purple glow
    ctx.fillStyle = 'rgba(160, 32, 240, 0.08)';
    
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = Math.random() * 8 + 3;
      
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  drawHead() {
    const ctx = this.ctx;
    const width = this.canvas.width;
    const height = this.canvas.height;
    
    // Draw basic cat head
    const centerX = width / 2;
    const centerY = height / 2;
    const headRadius = width * 0.2;
    
    // Head shape
    ctx.beginPath();
    ctx.arc(centerX, centerY, headRadius, 0, Math.PI * 2);
    ctx.fillStyle = this.traits.colors[0] || '#000';
    ctx.fill();
    
    // Eyes
    this.drawEyes();
    
    // Ears
    this.drawEars();
    
    // Whiskers
    this.drawWhiskers();
    
    // Nose and mouth
    this.drawNoseAndMouth();
    
    return this;
  }
  
  drawEyes() {
    const ctx = this.ctx;
    const width = this.canvas.width;
    const height = this.canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const headRadius = width * 0.2;
    
    // Eye parameters
    const eyeOffsetX = headRadius * 0.5;
    const eyeOffsetY = -headRadius * 0.1;
    const eyeRadius = headRadius * 0.25;
    
    // Left eye
    ctx.beginPath();
    ctx.arc(centerX - eyeOffsetX, centerY + eyeOffsetY, eyeRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    
    // Right eye
    ctx.beginPath();
    ctx.arc(centerX + eyeOffsetX, centerY + eyeOffsetY, eyeRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    
    // Pupils
    const pupilRadius = eyeRadius * 0.5;
    const quantumState = this.blockchainData?.quantumState || 'observed';
    
    // Different pupils based on type
    if (this.traits.type === 'quantum' && quantumState === 'unobserved') {
      // Quantum cat - uncertain pupils
      this.drawQuantumPupils(centerX, centerY, eyeOffsetX, eyeOffsetY, pupilRadius);
    } else if (this.traits.type === 'bitcoin') {
      // Bitcoin cat - BTC symbol pupils
      this.drawBitcoinPupils(centerX, centerY, eyeOffsetX, eyeOffsetY, pupilRadius);
    } else {
      // Normal pupils
      ctx.beginPath();
      ctx.arc(centerX - eyeOffsetX, centerY + eyeOffsetY, pupilRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#000000';
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(centerX + eyeOffsetX, centerY + eyeOffsetY, pupilRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#000000';
      ctx.fill();
    }
    
    // Expression-based eye details
    this.applyEyeExpression();
  }
  
  drawQuantumPupils(centerX: number, centerY: number, eyeOffsetX: number, eyeOffsetY: number, pupilRadius: number) {
    const ctx = this.ctx;
    
    // Left eye - superposition visualization
    for (let i = 0; i < 3; i++) {
      const offsetFactor = 0.3;
      ctx.beginPath();
      ctx.arc(
        centerX - eyeOffsetX + (Math.random() - 0.5) * pupilRadius * offsetFactor, 
        centerY + eyeOffsetY + (Math.random() - 0.5) * pupilRadius * offsetFactor, 
        pupilRadius * (0.8 + Math.random() * 0.4), 
        0, 
        Math.PI * 2
      );
      ctx.fillStyle = `rgba(0, 0, 0, ${0.5 + Math.random() * 0.5})`;
      ctx.fill();
    }
    
    // Right eye - superposition visualization
    for (let i = 0; i < 3; i++) {
      const offsetFactor = 0.3;
      ctx.beginPath();
      ctx.arc(
        centerX + eyeOffsetX + (Math.random() - 0.5) * pupilRadius * offsetFactor, 
        centerY + eyeOffsetY + (Math.random() - 0.5) * pupilRadius * offsetFactor, 
        pupilRadius * (0.8 + Math.random() * 0.4), 
        0, 
        Math.PI * 2
      );
      ctx.fillStyle = `rgba(0, 0, 0, ${0.5 + Math.random() * 0.5})`;
      ctx.fill();
    }
  }
  
  drawBitcoinPupils(centerX: number, centerY: number, eyeOffsetX: number, eyeOffsetY: number, pupilRadius: number) {
    const ctx = this.ctx;
    
    // Fill pupils first
    ctx.beginPath();
    ctx.arc(centerX - eyeOffsetX, centerY + eyeOffsetY, pupilRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#f7931a'; // Bitcoin orange
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(centerX + eyeOffsetX, centerY + eyeOffsetY, pupilRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#f7931a'; // Bitcoin orange
    ctx.fill();
    
    // Draw stylized ₿ symbol (simplified)
    const symbolSize = pupilRadius * 0.8;
    
    // Left eye
    ctx.font = `bold ${symbolSize * 1.5}px Arial`;
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('₿', centerX - eyeOffsetX, centerY + eyeOffsetY);
    
    // Right eye
    ctx.fillText('₿', centerX + eyeOffsetX, centerY + eyeOffsetY);
  }
  
  applyEyeExpression() {
    const ctx = this.ctx;
    const width = this.canvas.width;
    const height = this.canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const headRadius = width * 0.2;
    const eyeOffsetX = headRadius * 0.5;
    const eyeOffsetY = -headRadius * 0.1;
    
    switch (this.traits.expression) {
      case 'happy':
        // Add slight upward curves under eyes
        ctx.beginPath();
        ctx.moveTo(centerX - eyeOffsetX - headRadius * 0.1, centerY + eyeOffsetY + headRadius * 0.1);
        ctx.quadraticCurveTo(
          centerX - eyeOffsetX, 
          centerY + eyeOffsetY + headRadius * 0.2, 
          centerX - eyeOffsetX + headRadius * 0.1, 
          centerY + eyeOffsetY + headRadius * 0.1
        );
        ctx.strokeStyle = this.traits.colors[0] === '#000000' ? '#333' : '#000';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(centerX + eyeOffsetX - headRadius * 0.1, centerY + eyeOffsetY + headRadius * 0.1);
        ctx.quadraticCurveTo(
          centerX + eyeOffsetX, 
          centerY + eyeOffsetY + headRadius * 0.2, 
          centerX + eyeOffsetX + headRadius * 0.1, 
          centerY + eyeOffsetY + headRadius * 0.1
        );
        ctx.stroke();
        break;
        
      case 'sad':
        // Add slight downward curves under eyes
        ctx.beginPath();
        ctx.moveTo(centerX - eyeOffsetX - headRadius * 0.1, centerY + eyeOffsetY + headRadius * 0.1);
        ctx.quadraticCurveTo(
          centerX - eyeOffsetX, 
          centerY + eyeOffsetY, 
          centerX - eyeOffsetX + headRadius * 0.1, 
          centerY + eyeOffsetY + headRadius * 0.1
        );
        ctx.strokeStyle = this.traits.colors[0] === '#000000' ? '#333' : '#000';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(centerX + eyeOffsetX - headRadius * 0.1, centerY + eyeOffsetY + headRadius * 0.1);
        ctx.quadraticCurveTo(
          centerX + eyeOffsetX, 
          centerY + eyeOffsetY, 
          centerX + eyeOffsetX + headRadius * 0.1, 
          centerY + eyeOffsetY + headRadius * 0.1
        );
        ctx.stroke();
        break;
        
      case 'surprised':
        // Make pupils larger
        const pupilRadius = headRadius * 0.25 * 0.6;
        ctx.beginPath();
        ctx.arc(centerX - eyeOffsetX, centerY + eyeOffsetY, pupilRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#000000';
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(centerX + eyeOffsetX, centerY + eyeOffsetY, pupilRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#000000';
        ctx.fill();
        break;
        
      // Add other expressions as needed
      default:
        // Default neutral expression - no additional drawing
        break;
    }
  }
  
  drawEars() {
    const ctx = this.ctx;
    const width = this.canvas.width;
    const height = this.canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const headRadius = width * 0.2;
    
    // Ear parameters
    const earHeight = headRadius * 0.8;
    const earWidth = headRadius * 0.5;
    const earOffsetX = headRadius * 0.7;
    const earOffsetY = -headRadius * 0.7;
    
    // Left ear
    ctx.beginPath();
    ctx.moveTo(centerX - earOffsetX + earWidth, centerY + earOffsetY + earHeight);
    ctx.lineTo(centerX - earOffsetX, centerY + earOffsetY);
    ctx.lineTo(centerX - earOffsetX - earWidth, centerY + earOffsetY + earHeight);
    ctx.closePath();
    ctx.fillStyle = this.traits.colors[0] || '#000';
    ctx.fill();
    
    // Right ear
    ctx.beginPath();
    ctx.moveTo(centerX + earOffsetX - earWidth, centerY + earOffsetY + earHeight);
    ctx.lineTo(centerX + earOffsetX, centerY + earOffsetY);
    ctx.lineTo(centerX + earOffsetX + earWidth, centerY + earOffsetY + earHeight);
    ctx.closePath();
    ctx.fillStyle = this.traits.colors[0] || '#000';
    ctx.fill();
    
    // Inner ear details
    const innerEarColor = this.traits.colors[1] || '#ffcccc';
    
    // Left inner ear
    ctx.beginPath();
    ctx.moveTo(centerX - earOffsetX + earWidth * 0.7, centerY + earOffsetY + earHeight * 0.9);
    ctx.lineTo(centerX - earOffsetX, centerY + earOffsetY + earHeight * 0.3);
    ctx.lineTo(centerX - earOffsetX - earWidth * 0.7, centerY + earOffsetY + earHeight * 0.9);
    ctx.closePath();
    ctx.fillStyle = innerEarColor;
    ctx.fill();
    
    // Right inner ear
    ctx.beginPath();
    ctx.moveTo(centerX + earOffsetX - earWidth * 0.7, centerY + earOffsetY + earHeight * 0.9);
    ctx.lineTo(centerX + earOffsetX, centerY + earOffsetY + earHeight * 0.3);
    ctx.lineTo(centerX + earOffsetX + earWidth * 0.7, centerY + earOffsetY + earHeight * 0.9);
    ctx.closePath();
    ctx.fillStyle = innerEarColor;
    ctx.fill();
  }
  
  drawWhiskers() {
    const ctx = this.ctx;
    const width = this.canvas.width;
    const height = this.canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const headRadius = width * 0.2;
    
    // Whisker parameters
    const whiskerLength = headRadius * 0.8;
    const whiskerOffsetX = headRadius * 0.5;
    const whiskerOffsetY = headRadius * 0.2;
    const whiskerSpacing = headRadius * 0.15;
    
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    
    // Left whiskers
    for (let i = -1; i <= 1; i++) {
      ctx.beginPath();
      ctx.moveTo(centerX - whiskerOffsetX, centerY + whiskerOffsetY + i * whiskerSpacing);
      ctx.lineTo(centerX - whiskerOffsetX - whiskerLength, centerY + whiskerOffsetY + i * whiskerSpacing + (i * whiskerSpacing * 0.5));
      ctx.stroke();
    }
    
    // Right whiskers
    for (let i = -1; i <= 1; i++) {
      ctx.beginPath();
      ctx.moveTo(centerX + whiskerOffsetX, centerY + whiskerOffsetY + i * whiskerSpacing);
      ctx.lineTo(centerX + whiskerOffsetX + whiskerLength, centerY + whiskerOffsetY + i * whiskerSpacing + (i * whiskerSpacing * 0.5));
      ctx.stroke();
    }
    
    // Add quantum effect to whiskers if type is quantum
    if (this.traits.type === 'quantum') {
      this.addQuantumWhiskerEffect();
    }
  }
  
  addQuantumWhiskerEffect() {
    const ctx = this.ctx;
    const width = this.canvas.width;
    const height = this.canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const headRadius = width * 0.2;
    
    const whiskerLength = headRadius * 0.8;
    const whiskerOffsetX = headRadius * 0.5;
    const whiskerOffsetY = headRadius * 0.2;
    const whiskerSpacing = headRadius * 0.15;
    
    // Add quantum "uncertainty" to whiskers
    ctx.strokeStyle = 'rgba(80, 200, 240, 0.4)';
    ctx.lineWidth = 0.5;
    
    for (let i = -1; i <= 1; i++) {
      // Left whisker quantum trails
      for (let j = 0; j < 3; j++) {
        const randomOffset = Math.random() * whiskerSpacing * 0.3;
        
        ctx.beginPath();
        ctx.moveTo(centerX - whiskerOffsetX, centerY + whiskerOffsetY + i * whiskerSpacing + randomOffset);
        ctx.lineTo(
          centerX - whiskerOffsetX - whiskerLength, 
          centerY + whiskerOffsetY + i * whiskerSpacing + (i * whiskerSpacing * 0.5) + randomOffset
        );
        ctx.stroke();
      }
      
      // Right whisker quantum trails
      for (let j = 0; j < 3; j++) {
        const randomOffset = Math.random() * whiskerSpacing * 0.3;
        
        ctx.beginPath();
        ctx.moveTo(centerX + whiskerOffsetX, centerY + whiskerOffsetY + i * whiskerSpacing + randomOffset);
        ctx.lineTo(
          centerX + whiskerOffsetX + whiskerLength, 
          centerY + whiskerOffsetY + i * whiskerSpacing + (i * whiskerSpacing * 0.5) + randomOffset
        );
        ctx.stroke();
      }
    }
  }
  
  drawNoseAndMouth() {
    const ctx = this.ctx;
    const width = this.canvas.width;
    const height = this.canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const headRadius = width * 0.2;
    
    // Nose
    const noseSize = headRadius * 0.15;
    const noseOffsetY = headRadius * 0.1;
    
    ctx.beginPath();
    ctx.moveTo(centerX, centerY + noseOffsetY);
    ctx.lineTo(centerX - noseSize, centerY + noseOffsetY + noseSize);
    ctx.lineTo(centerX + noseSize, centerY + noseOffsetY + noseSize);
    ctx.closePath();
    ctx.fillStyle = this.traits.type === 'bitcoin' ? '#f7931a' : '#ff9999';
    ctx.fill();
    
    // Mouth
    this.drawMouth();
  }
  
  drawMouth() {
    const ctx = this.ctx;
    const width = this.canvas.width;
    const height = this.canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const headRadius = width * 0.2;
    
    const noseSize = headRadius * 0.15;
    const noseOffsetY = headRadius * 0.1;
    const mouthOffsetY = noseOffsetY + noseSize + headRadius * 0.05;
    
    // Different mouth based on expression
    switch (this.traits.expression) {
      case 'happy':
        // Happy smile
        ctx.beginPath();
        ctx.moveTo(centerX - headRadius * 0.25, centerY + mouthOffsetY);
        ctx.quadraticCurveTo(
          centerX, 
          centerY + mouthOffsetY + headRadius * 0.2, 
          centerX + headRadius * 0.25, 
          centerY + mouthOffsetY
        );
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.stroke();
        break;
        
      case 'sad':
        // Sad frown
        ctx.beginPath();
        ctx.moveTo(centerX - headRadius * 0.25, centerY + mouthOffsetY);
        ctx.quadraticCurveTo(
          centerX, 
          centerY + mouthOffsetY - headRadius * 0.1, 
          centerX + headRadius * 0.25, 
          centerY + mouthOffsetY
        );
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.stroke();
        break;
        
      case 'surprised':
        // O-shaped mouth
        ctx.beginPath();
        ctx.arc(centerX, centerY + mouthOffsetY, headRadius * 0.1, 0, Math.PI * 2);
        ctx.fillStyle = '#000000';
        ctx.fill();
        break;
        
      case 'grumpy':
        // Straight line
        ctx.beginPath();
        ctx.moveTo(centerX - headRadius * 0.2, centerY + mouthOffsetY);
        ctx.lineTo(centerX + headRadius * 0.2, centerY + mouthOffsetY);
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.stroke();
        break;
        
      default:
        // Default neutral mouth - small curve
        ctx.beginPath();
        ctx.moveTo(centerX - headRadius * 0.15, centerY + mouthOffsetY);
        ctx.quadraticCurveTo(
          centerX, 
          centerY + mouthOffsetY + headRadius * 0.05, 
          centerX + headRadius * 0.15, 
          centerY + mouthOffsetY
        );
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        break;
    }
  }
  
  drawBody() {
    const ctx = this.ctx;
    const width = this.canvas.width;
    const height = this.canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const headRadius = width * 0.2;
    
    // Body parameters
    const bodyHeight = headRadius * 2;
    const bodyWidth = headRadius * 2.5;
    const bodyOffsetY = headRadius * 0.8;
    
    // Body shape
    ctx.beginPath();
    ctx.ellipse(
      centerX, 
      centerY + bodyOffsetY, 
      bodyWidth / 2, 
      bodyHeight / 2, 
      0, 
      0, 
      Math.PI * 2
    );
    ctx.fillStyle = this.traits.colors[0] || '#000';
    ctx.fill();
    
    // Body details based on type
    switch (this.traits.type) {
      case 'quantum':
        this.drawQuantumBodyDetails(centerX, centerY, bodyOffsetY, bodyWidth, bodyHeight);
        break;
        
      case 'bitcoin':
        this.drawBitcoinBodyDetails(centerX, centerY, bodyOffsetY, bodyWidth, bodyHeight);
        break;
        
      case 'cypherpunk':
        this.drawCypherpunkBodyDetails(centerX, centerY, bodyOffsetY, bodyWidth, bodyHeight);
        break;
        
      default:
        // Generic body pattern
        this.drawGenericBodyDetails(centerX, centerY, bodyOffsetY, bodyWidth, bodyHeight);
        break;
    }
    
    // Draw tail
    this.drawTail(centerX, centerY, bodyOffsetY, bodyWidth, bodyHeight);
    
    // Draw paws
    this.drawPaws(centerX, centerY, bodyOffsetY, bodyWidth, bodyHeight);
    
    return this;
  }
  
  drawQuantumBodyDetails(centerX: number, centerY: number, bodyOffsetY: number, bodyWidth: number, bodyHeight: number) {
    const ctx = this.ctx;
    
    // Quantum wave patterns
    ctx.strokeStyle = 'rgba(80, 200, 240, 0.6)';
    ctx.lineWidth = 1;
    
    for (let i = 0; i < 5; i++) {
      const yPos = centerY + bodyOffsetY - bodyHeight * 0.3 + (i * bodyHeight * 0.15);
      
      ctx.beginPath();
      for (let x = centerX - bodyWidth * 0.4; x <= centerX + bodyWidth * 0.4; x += 2) {
        const waveHeight = Math.sin((x - centerX) * 0.1 + i) * 5;
        ctx.lineTo(x, yPos + waveHeight);
      }
      ctx.stroke();
    }
    
    // Quantum particles
    ctx.fillStyle = 'rgba(80, 200, 240, 0.7)';
    for (let i = 0; i < 10; i++) {
      const x = centerX + (Math.random() - 0.5) * bodyWidth * 0.8;
      const y = centerY + bodyOffsetY + (Math.random() - 0.5) * bodyHeight * 0.8;
      const size = Math.random() * 3 + 1;
      
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  drawBitcoinBodyDetails(centerX: number, centerY: number, bodyOffsetY: number, bodyWidth: number, bodyHeight: number) {
    const ctx = this.ctx;
    
    // Bitcoin symbol on chest
    const symbolSize = bodyWidth * 0.2;
    
    ctx.font = `bold ${symbolSize}px Arial`;
    ctx.fillStyle = '#f7931a'; // Bitcoin orange
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('₿', centerX, centerY + bodyOffsetY - bodyHeight * 0.1);
    
    // Circuit-like patterns
    ctx.strokeStyle = 'rgba(247, 147, 26, 0.5)'; // Bitcoin orange with transparency
    ctx.lineWidth = 1;
    
    const drawCircuitLine = (startX: number, startY: number, length: number, direction: 'h' | 'v') => {
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      
      if (direction === 'h') {
        ctx.lineTo(startX + length, startY);
      } else {
        ctx.lineTo(startX, startY + length);
      }
      
      ctx.stroke();
    };
    
    // Draw some circuit lines on the body
    for (let i = 0; i < 8; i++) {
      const x = centerX + (Math.random() - 0.5) * bodyWidth * 0.7;
      const y = centerY + bodyOffsetY + (Math.random() - 0.5) * bodyHeight * 0.7;
      const length = Math.random() * bodyWidth * 0.2 + bodyWidth * 0.1;
      const direction = Math.random() > 0.5 ? 'h' : 'v';
      
      drawCircuitLine(x, y, length, direction);
    }
  }
  
  drawCypherpunkBodyDetails(centerX: number, centerY: number, bodyOffsetY: number, bodyWidth: number, bodyHeight: number) {
    const ctx = this.ctx;
    
    // Cyber patterns
    ctx.strokeStyle = 'rgba(0, 255, 70, 0.4)';
    ctx.lineWidth = 1;
    
    // Matrix-like code on body
    ctx.font = '8px monospace';
    ctx.fillStyle = 'rgba(0, 255, 70, 0.6)';
    
    for (let i = 0; i < 15; i++) {
      const x = centerX + (Math.random() - 0.5) * bodyWidth * 0.7;
      const y = centerY + bodyOffsetY + (Math.random() - 0.5) * bodyHeight * 0.7;
      const char = String.fromCharCode(33 + Math.floor(Math.random() * 94));
      
      ctx.fillText(char, x, y);
    }
    
    // Hexagon pattern (cypherpunk aesthetic)
    const hexSize = bodyWidth * 0.05;
    ctx.strokeStyle = 'rgba(0, 255, 70, 0.3)';
    
    for (let i = 0; i < 8; i++) {
      const x = centerX + (Math.random() - 0.5) * bodyWidth * 0.6;
      const y = centerY + bodyOffsetY + (Math.random() - 0.5) * bodyHeight * 0.6;
      
      ctx.beginPath();
      for (let j = 0; j < 6; j++) {
        const angle = (j * Math.PI) / 3;
        const pointX = x + Math.cos(angle) * hexSize;
        const pointY = y + Math.sin(angle) * hexSize;
        
        if (j === 0) {
          ctx.moveTo(pointX, pointY);
        } else {
          ctx.lineTo(pointX, pointY);
        }
      }
      ctx.closePath();
      ctx.stroke();
    }
  }
  
  drawGenericBodyDetails(centerX: number, centerY: number, bodyOffsetY: number, bodyWidth: number, bodyHeight: number) {
    const ctx = this.ctx;
    
    // Add some fur texture or pattern
    if (this.traits.colors.length > 1) {
      // If we have a second color, add some spots or stripes
      ctx.fillStyle = this.traits.colors[1];
      
      // Random spots
      for (let i = 0; i < 5; i++) {
        const x = centerX + (Math.random() - 0.5) * bodyWidth * 0.7;
        const y = centerY + bodyOffsetY + (Math.random() - 0.5) * bodyHeight * 0.7;
        const spotSize = Math.random() * bodyWidth * 0.1 + bodyWidth * 0.05;
        
        ctx.beginPath();
        ctx.arc(x, y, spotSize, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
  
  drawTail(centerX: number, centerY: number, bodyOffsetY: number, bodyWidth: number, bodyHeight: number) {
    const ctx = this.ctx;
    
    // Tail parameters
    const tailWidth = bodyWidth * 0.15;
    const tailLength = bodyHeight * 1.2;
    const tailStartX = centerX - bodyWidth * 0.3;
    const tailStartY = centerY + bodyOffsetY + bodyHeight * 0.3;
    
    // Draw tail curve
    ctx.beginPath();
    ctx.moveTo(tailStartX, tailStartY);
    ctx.quadraticCurveTo(
      tailStartX - tailLength * 0.3, 
      tailStartY + tailLength * 0.2, 
      tailStartX - tailLength * 0.5, 
      tailStartY - tailLength * 0.3
    );
    
    ctx.lineWidth = tailWidth;
    ctx.lineCap = 'round';
    ctx.strokeStyle = this.traits.colors[0] || '#000';
    ctx.stroke();
    
    // Special tail effects based on type
    if (this.traits.type === 'quantum') {
      // Quantum trail for the tail
      ctx.beginPath();
      ctx.moveTo(tailStartX, tailStartY);
      ctx.quadraticCurveTo(
        tailStartX - tailLength * 0.3, 
        tailStartY + tailLength * 0.2, 
        tailStartX - tailLength * 0.5, 
        tailStartY - tailLength * 0.3
      );
      
      ctx.lineWidth = tailWidth * 0.7;
      ctx.strokeStyle = 'rgba(80, 200, 240, 0.4)';
      ctx.stroke();
    } else if (this.traits.type === 'bitcoin') {
      // Bitcoin-colored tail tip
      const tipX = tailStartX - tailLength * 0.5;
      const tipY = tailStartY - tailLength * 0.3;
      
      ctx.beginPath();
      ctx.arc(tipX, tipY, tailWidth * 0.8, 0, Math.PI * 2);
      ctx.fillStyle = '#f7931a'; // Bitcoin orange
      ctx.fill();
    }
  }
  
  drawPaws(centerX: number, centerY: number, bodyOffsetY: number, bodyWidth: number, bodyHeight: number) {
    const ctx = this.ctx;
    
    // Paw parameters
    const pawRadius = bodyWidth * 0.12;
    const frontPawOffsetX = bodyWidth * 0.3;
    const frontPawOffsetY = bodyHeight * 0.4;
    const backPawOffsetX = bodyWidth * 0.1;
    const backPawOffsetY = bodyHeight * 0.5;
    
    // Front paws
    // Left front paw
    ctx.beginPath();
    ctx.arc(
      centerX - frontPawOffsetX, 
      centerY + bodyOffsetY + frontPawOffsetY, 
      pawRadius, 
      0, 
      Math.PI * 2
    );
    ctx.fillStyle = this.traits.colors[0] || '#000';
    ctx.fill();
    
    // Right front paw
    ctx.beginPath();
    ctx.arc(
      centerX + frontPawOffsetX, 
      centerY + bodyOffsetY + frontPawOffsetY, 
      pawRadius, 
      0, 
      Math.PI * 2
    );
    ctx.fillStyle = this.traits.colors[0] || '#000';
    ctx.fill();
    
    // Back paws (partially hidden)
    // Left back paw
    ctx.beginPath();
    ctx.arc(
      centerX - backPawOffsetX, 
      centerY + bodyOffsetY + backPawOffsetY, 
      pawRadius * 0.8, 
      0, 
      Math.PI * 2
    );
    ctx.fillStyle = this.traits.colors[0] || '#000';
    ctx.fill();
    
    // Right back paw
    ctx.beginPath();
    ctx.arc(
      centerX + backPawOffsetX, 
      centerY + bodyOffsetY + backPawOffsetY, 
      pawRadius * 0.8, 
      0, 
      Math.PI * 2
    );
    ctx.fillStyle = this.traits.colors[0] || '#000';
    ctx.fill();
    
    // Add paw details
    this.drawPawDetails(centerX, centerY, bodyOffsetY, frontPawOffsetX, frontPawOffsetY, pawRadius);
  }
  
  drawPawDetails(centerX: number, centerY: number, bodyOffsetY: number, pawOffsetX: number, pawOffsetY: number, pawRadius: number) {
    const ctx = this.ctx;
    
    // Paw pad color
    const padColor = '#ffcccc';
    const padRadius = pawRadius * 0.4;
    
    // Left paw pad
    ctx.beginPath();
    ctx.arc(
      centerX - pawOffsetX, 
      centerY + bodyOffsetY + pawOffsetY + padRadius, 
      padRadius, 
      0, 
      Math.PI * 2
    );
    ctx.fillStyle = padColor;
    ctx.fill();
    
    // Right paw pad
    ctx.beginPath();
    ctx.arc(
      centerX + pawOffsetX, 
      centerY + bodyOffsetY + pawOffsetY + padRadius, 
      padRadius, 
      0, 
      Math.PI * 2
    );
    ctx.fillStyle = padColor;
    ctx.fill();
    
    // Add paw toe details
    const toeRadius = padRadius * 0.6;
    const toeOffsetY = padRadius * 0.8;
    
    // Left paw toes
    for (let i = -1; i <= 1; i++) {
      ctx.beginPath();
      ctx.arc(
        centerX - pawOffsetX + i * toeRadius * 1.5, 
        centerY + bodyOffsetY + pawOffsetY + toeOffsetY, 
        toeRadius, 
        0, 
        Math.PI * 2
      );
      ctx.fillStyle = padColor;
      ctx.fill();
    }
    
    // Right paw toes
    for (let i = -1; i <= 1; i++) {
      ctx.beginPath();
      ctx.arc(
        centerX + pawOffsetX + i * toeRadius * 1.5, 
        centerY + bodyOffsetY + pawOffsetY + toeOffsetY, 
        toeRadius, 
        0, 
        Math.PI * 2
      );
      ctx.fillStyle = padColor;
      ctx.fill();
    }
  }
  
  drawAccessories() {
    if (!this.traits.accessories.length) return this;
    
    for (const accessory of this.traits.accessories) {
      switch (accessory) {
        case 'hat':
          this.drawHat();
          break;
          
        case 'bowtie':
          this.drawBowtie();
          break;
          
        case 'glasses':
          this.drawGlasses();
          break;
          
        case 'collar':
          this.drawCollar();
          break;
          
        // Add more accessories as needed
      }
    }
    
    return this;
  }
  
  drawHat() {
    const ctx = this.ctx;
    const width = this.canvas.width;
    const height = this.canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const headRadius = width * 0.2;
    
    // Hat parameters based on type
    if (this.traits.type === 'bitcoin') {
      // Bitcoin mining hat
      this.drawMinerHat(centerX, centerY, headRadius);
    } else if (this.traits.type === 'cypherpunk') {
      // Cypherpunk hoodie
      this.drawHoodie(centerX, centerY, headRadius);
    } else {
      // Default top hat
      this.drawTopHat(centerX, centerY, headRadius);
    }
  }
  
  drawMinerHat(centerX: number, centerY: number, headRadius: number) {
    const ctx = this.ctx;
    
    // Miner hat
    ctx.fillStyle = '#ffcc33';
    
    // Hat base
    ctx.beginPath();
    ctx.ellipse(
      centerX, 
      centerY - headRadius * 0.7, 
      headRadius * 1.2, 
      headRadius * 0.4, 
      0, 
      0, 
      Math.PI * 2
    );
    ctx.fill();
    
    // Hat top
    ctx.beginPath();
    ctx.ellipse(
      centerX, 
      centerY - headRadius * 1.2, 
      headRadius * 0.7, 
      headRadius * 0.3, 
      0, 
      0, 
      Math.PI * 2
    );
    ctx.fill();
    
    // Hat band
    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.rect(
      centerX - headRadius * 0.9, 
      centerY - headRadius * 0.9, 
      headRadius * 1.8, 
      headRadius * 0.2
    );
    ctx.fill();
    
    // Miner light
    ctx.beginPath();
    ctx.arc(
      centerX, 
      centerY - headRadius * 0.8, 
      headRadius * 0.15, 
      0, 
      Math.PI * 2
    );
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    
    // Light beam
    const gradient = ctx.createRadialGradient(
      centerX, centerY - headRadius * 0.8, 0,
      centerX, centerY - headRadius * 0.8, headRadius * 0.4
    );
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    ctx.beginPath();
    ctx.arc(
      centerX, 
      centerY - headRadius * 0.8, 
      headRadius * 0.4, 
      0, 
      Math.PI * 2
    );
    ctx.fillStyle = gradient;
    ctx.fill();
  }
  
  drawHoodie(centerX: number, centerY: number, headRadius: number) {
    const ctx = this.ctx;
    
    // Hoodie color
    ctx.fillStyle = '#333333';
    
    // Hoodie base
    ctx.beginPath();
    ctx.arc(
      centerX, 
      centerY, 
      headRadius * 1.2, 
      Math.PI * 1.8, 
      Math.PI * 3.2, 
      false
    );
    ctx.lineTo(centerX + headRadius * 1.4, centerY - headRadius * 0.5);
    ctx.lineTo(centerX - headRadius * 1.4, centerY - headRadius * 0.5);
    ctx.closePath();
    ctx.fill();
    
    // Hoodie opening
    ctx.beginPath();
    ctx.arc(
      centerX, 
      centerY, 
      headRadius * 1.1, 
      Math.PI * 1.9, 
      Math.PI * 3.1, 
      false
    );
    ctx.fillStyle = '#222222';
    ctx.fill();
    
    // Hood details
    ctx.strokeStyle = '#444444';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(centerX - headRadius * 0.8, centerY - headRadius * 0.3);
    ctx.lineTo(centerX - headRadius * 1.1, centerY - headRadius * 0.4);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(centerX + headRadius * 0.8, centerY - headRadius * 0.3);
    ctx.lineTo(centerX + headRadius * 1.1, centerY - headRadius * 0.4);
    ctx.stroke();
  }
  
  drawTopHat(centerX: number, centerY: number, headRadius: number) {
    const ctx = this.ctx;
    
    // Top hat
    const hatWidth = headRadius * 1.5;
    const hatHeight = headRadius * 1.2;
    const hatBrimWidth = hatWidth * 1.3;
    const hatBrimHeight = hatHeight * 0.2;
    
    // Hat brim
    ctx.beginPath();
    ctx.ellipse(
      centerX, 
      centerY - headRadius * 0.7, 
      hatBrimWidth / 2, 
      hatBrimHeight / 2, 
      0, 
      0, 
      Math.PI * 2
    );
    ctx.fillStyle = '#111';
    ctx.fill();
    
    // Hat body
    ctx.beginPath();
    ctx.rect(
      centerX - hatWidth / 2, 
      centerY - headRadius * 0.7 - hatHeight, 
      hatWidth, 
      hatHeight
    );
    ctx.fillStyle = '#111';
    ctx.fill();
    
    // Hat band
    ctx.beginPath();
    ctx.rect(
      centerX - hatWidth / 2, 
      centerY - headRadius * 0.7 - hatHeight * 0.2, 
      hatWidth, 
      hatHeight * 0.15
    );
    
    // Band color based on rarity
    let bandColor;
    switch (this.traits.rarity) {
      case 'legendary':
        bandColor = '#ffd700'; // Gold
        break;
      case 'epic':
        bandColor = '#a020f0'; // Purple
        break;
      case 'rare':
        bandColor = '#0070dd'; // Blue
        break;
      default:
        bandColor = '#888'; // Gray
    }
    
    ctx.fillStyle = bandColor;
    ctx.fill();
  }
  
  drawBowtie() {
    const ctx = this.ctx;
    const width = this.canvas.width;
    const height = this.canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const headRadius = width * 0.2;
    
    // Bowtie parameters
    const bodyOffsetY = headRadius * 0.8;
    const bowTieWidth = headRadius * 0.8;
    const bowTieHeight = headRadius * 0.3;
    const bowTieY = centerY + bodyOffsetY - headRadius * 0.3;
    
    // Bowtie color based on type
    let bowTieColor;
    switch (this.traits.type) {
      case 'bitcoin':
        bowTieColor = '#f7931a'; // Bitcoin orange
        break;
      case 'quantum':
        bowTieColor = '#50c8f0'; // Quantum blue
        break;
      case 'cypherpunk':
        bowTieColor = '#00ff46'; // Matrix green
        break;
      default:
        bowTieColor = '#e91e63'; // Pink
    }
    
    // Left side
    ctx.beginPath();
    ctx.moveTo(centerX, bowTieY);
    ctx.lineTo(centerX - bowTieWidth / 2, bowTieY - bowTieHeight / 2);
    ctx.lineTo(centerX - bowTieWidth / 2, bowTieY + bowTieHeight / 2);
    ctx.closePath();
    ctx.fillStyle = bowTieColor;
    ctx.fill();
    
    // Right side
    ctx.beginPath();
    ctx.moveTo(centerX, bowTieY);
    ctx.lineTo(centerX + bowTieWidth / 2, bowTieY - bowTieHeight / 2);
    ctx.lineTo(centerX + bowTieWidth / 2, bowTieY + bowTieHeight / 2);
    ctx.closePath();
    ctx.fillStyle = bowTieColor;
    ctx.fill();
    
    // Center knot
    ctx.beginPath();
    ctx.arc(centerX, bowTieY, bowTieHeight / 3, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.strokeStyle = bowTieColor;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
  
  drawGlasses() {
    const ctx = this.ctx;
    const width = this.canvas.width;
    const height = this.canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const headRadius = width * 0.2;
    
    // Eye parameters for positioning
    const eyeOffsetX = headRadius * 0.5;
    const eyeOffsetY = -headRadius * 0.1;
    const eyeRadius = headRadius * 0.25;
    
    // Glasses parameters
    const glassesColor = this.traits.type === 'cypherpunk' ? '#00ff46' : '#333';
    const lensRadius = eyeRadius * 1.2;
    
    // Left lens
    ctx.beginPath();
    ctx.arc(centerX - eyeOffsetX, centerY + eyeOffsetY, lensRadius, 0, Math.PI * 2);
    ctx.strokeStyle = glassesColor;
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Right lens
    ctx.beginPath();
    ctx.arc(centerX + eyeOffsetX, centerY + eyeOffsetY, lensRadius, 0, Math.PI * 2);
    ctx.stroke();
    
    // Bridge
    ctx.beginPath();
    ctx.moveTo(centerX - eyeOffsetX + lensRadius * 0.7, centerY + eyeOffsetY);
    ctx.lineTo(centerX + eyeOffsetX - lensRadius * 0.7, centerY + eyeOffsetY);
    ctx.stroke();
    
    // Temple arms
    ctx.beginPath();
    ctx.moveTo(centerX - eyeOffsetX - lensRadius, centerY + eyeOffsetY);
    ctx.lineTo(centerX - eyeOffsetX - lensRadius * 1.5, centerY + eyeOffsetY + lensRadius);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(centerX + eyeOffsetX + lensRadius, centerY + eyeOffsetY);
    ctx.lineTo(centerX + eyeOffsetX + lensRadius * 1.5, centerY + eyeOffsetY + lensRadius);
    ctx.stroke();
    
    // Special lens effect for certain types
    if (this.traits.type === 'cypherpunk') {
      // Matrix-style digital effect
      ctx.fillStyle = 'rgba(0, 255, 70, 0.2)';
      ctx.beginPath();
      ctx.arc(centerX - eyeOffsetX, centerY + eyeOffsetY, lensRadius * 0.9, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(centerX + eyeOffsetX, centerY + eyeOffsetY, lensRadius * 0.9, 0, Math.PI * 2);
      ctx.fill();
      
      // Add some matrix code on the lenses
      ctx.font = '6px monospace';
      ctx.fillStyle = 'rgba(0, 255, 70, 0.6)';
      
      for (let i = 0; i < 4; i++) {
        const x1 = centerX - eyeOffsetX + (Math.random() - 0.5) * lensRadius;
        const y1 = centerY + eyeOffsetY + (Math.random() - 0.5) * lensRadius;
        const char1 = String.fromCharCode(33 + Math.floor(Math.random() * 94));
        
        const x2 = centerX + eyeOffsetX + (Math.random() - 0.5) * lensRadius;
        const y2 = centerY + eyeOffsetY + (Math.random() - 0.5) * lensRadius;
        const char2 = String.fromCharCode(33 + Math.floor(Math.random() * 94));
        
        ctx.fillText(char1, x1, y1);
        ctx.fillText(char2, x2, y2);
      }
    }
  }
  
  drawCollar() {
    const ctx = this.ctx;
    const width = this.canvas.width;
    const height = this.canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const headRadius = width * 0.2;
    
    // Collar parameters
    const bodyOffsetY = headRadius * 0.8;
    const collarY = centerY + bodyOffsetY - headRadius * 0.4;
    const collarWidth = headRadius * 1.6;
    const collarHeight = headRadius * 0.3;
    
    // Collar color based on rarity
    let collarColor;
    switch (this.traits.rarity) {
      case 'legendary':
        collarColor = '#ffd700'; // Gold
        break;
      case 'epic':
        collarColor = '#a020f0'; // Purple
        break;
      case 'rare':
        collarColor = '#0070dd'; // Blue
        break;
      default:
        collarColor = '#e91e63'; // Pink
    }
    
    // Draw collar band
    ctx.beginPath();
    ctx.ellipse(
      centerX, 
      collarY, 
      collarWidth / 2, 
      collarHeight / 2, 
      0, 
      Math.PI * 0.2, 
      Math.PI * 0.8, 
      false
    );
    ctx.strokeStyle = collarColor;
    ctx.lineWidth = 6;
    ctx.stroke();
    
    // Add collar bell or tag
    ctx.beginPath();
    ctx.arc(centerX, collarY + collarHeight * 0.3, collarHeight * 0.5, 0, Math.PI * 2);
    ctx.fillStyle = '#ffcc33'; // Gold color for bell
    ctx.fill();
    ctx.strokeStyle = '#aa8800';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // Bell details
    ctx.beginPath();
    ctx.moveTo(centerX, collarY + collarHeight * 0.5);
    ctx.lineTo(centerX, collarY + collarHeight * 0.8);
    ctx.strokeStyle = '#aa8800';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Special collar details based on type
    if (this.traits.type === 'bitcoin') {
      // Bitcoin symbol tag
      ctx.font = `bold ${collarHeight * 0.6}px Arial`;
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('₿', centerX, collarY + collarHeight * 0.3);
    } else if (this.traits.type === 'quantum') {
      // Quantum effect for the collar bell
      ctx.beginPath();
      ctx.arc(centerX, collarY + collarHeight * 0.3, collarHeight * 0.7, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(80, 200, 240, 0.5)';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      ctx.beginPath();
      ctx.arc(centerX, collarY + collarHeight * 0.3, collarHeight * 0.9, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(80, 200, 240, 0.3)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }
  
  drawSpecialEffects() {
    if (this.traits.type === 'quantum') {
      this.drawQuantumEffects();
    } else if (this.traits.type === 'bitcoin') {
      this.drawBitcoinEffects();
    } else if (this.traits.type === 'cypherpunk') {
      this.drawCypherpunkEffects();
    }
    
    // Add rarity-based effects
    this.drawRarityEffects();
    
    return this;
  }
  
  drawQuantumEffects() {
    const ctx = this.ctx;
    const width = this.canvas.width;
    const height = this.canvas.height;
    
    // Quantum particles
    ctx.fillStyle = 'rgba(80, 200, 240, 0.7)';
    
    for (let i = 0; i < 30; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = Math.random() * 3 + 1;
      
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Quantum entanglement lines
    const quantumState = this.blockchainData?.quantumState || 'observed';
    
    if (quantumState === 'entangled' || quantumState === 'superposition') {
      ctx.strokeStyle = 'rgba(80, 200, 240, 0.3)';
      ctx.lineWidth = 1;
      
      for (let i = 0; i < 10; i++) {
        const x1 = Math.random() * width;
        const y1 = Math.random() * height;
        const x2 = Math.random() * width;
        const y2 = Math.random() * height;
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
    }
  }
  
  drawBitcoinEffects() {
    const ctx = this.ctx;
    const width = this.canvas.width;
    const height = this.canvas.height;
    
    // Bitcoin symbols
    ctx.font = '14px Arial';
    ctx.fillStyle = 'rgba(247, 147, 26, 0.3)'; // Bitcoin orange with transparency
    
    for (let i = 0; i < 5; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      
      ctx.fillText('₿', x, y);
    }
    
    // Blockchain links
    ctx.strokeStyle = 'rgba(247, 147, 26, 0.2)';
    ctx.lineWidth = 2;
    
    for (let i = 0; i < 3; i++) {
      const startX = Math.random() * width * 0.2;
      const startY = Math.random() * height;
      
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      
      for (let j = 1; j <= 5; j++) {
        const blockX = startX + (width * 0.8 * j) / 5;
        const blockY = startY + (Math.random() - 0.5) * height * 0.2;
        
        ctx.lineTo(blockX, blockY);
        
        // Block
        ctx.fillStyle = 'rgba(247, 147, 26, 0.1)';
        ctx.fillRect(blockX - 15, blockY - 15, 30, 30);
      }
      
      ctx.stroke();
    }
  }
  
  drawCypherpunkEffects() {
    const ctx = this.ctx;
    const width = this.canvas.width;
    const height = this.canvas.height;
    
    // Matrix-like code rain effect
    ctx.font = '10px monospace';
    ctx.fillStyle = 'rgba(0, 255, 70, 0.4)';
    
    for (let x = 0; x < width; x += 20) {
      const columnLength = Math.floor(Math.random() * 10) + 5;
      const startY = Math.random() * height * 0.5;
      
      for (let i = 0; i < columnLength; i++) {
        const char = String.fromCharCode(33 + Math.floor(Math.random() * 94));
        ctx.fillText(char, x, startY + i * 15);
      }
    }
    
    // Privacy symbols
    const symbols = ['🔒', '🛡️', '🔐', '🕶️', '⚡'];
    ctx.font = '12px Arial';
    
    for (let i = 0; i < 5; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const symbol = symbols[Math.floor(Math.random() * symbols.length)];
      
      ctx.fillText(symbol, x, y);
    }
  }
  
  drawRarityEffects() {
    if (this.traits.rarity === 'legendary') {
      this.drawLegendaryEffects();
    } else if (this.traits.rarity === 'epic') {
      this.drawEpicEffects();
    } else if (this.traits.rarity === 'rare') {
      this.drawRareEffects();
    }
  }
  
  drawLegendaryEffects() {
    const ctx = this.ctx;
    const width = this.canvas.width;
    const height = this.canvas.height;
    
    // Golden aura
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = width * 0.45;
    
    const gradient = ctx.createRadialGradient(
      centerX, centerY, radius * 0.5,
      centerX, centerY, radius
    );
    gradient.addColorStop(0, 'rgba(255, 215, 0, 0.3)');
    gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Sparkles
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    
    for (let i = 0; i < 20; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * radius * 0.8;
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;
      const size = Math.random() * 3 + 1;
      
      this.drawStar(x, y, 4, size * 2, size);
    }
  }
  
  drawEpicEffects() {
    const ctx = this.ctx;
    const width = this.canvas.width;
    const height = this.canvas.height;
    
    // Purple mystical aura
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = width * 0.45;
    
    const gradient = ctx.createRadialGradient(
      centerX, centerY, radius * 0.5,
      centerX, centerY, radius
    );
    gradient.addColorStop(0, 'rgba(160, 32, 240, 0.2)');
    gradient.addColorStop(1, 'rgba(160, 32, 240, 0)');
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Mystical runes
    ctx.font = '16px serif';
    ctx.fillStyle = 'rgba(160, 32, 240, 0.5)';
    
    const runes = ['⚕', '☄', '✴', '✵', '⚜', '⚝'];
    
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const x = centerX + Math.cos(angle) * radius * 0.7;
      const y = centerY + Math.sin(angle) * radius * 0.7;
      const rune = runes[Math.floor(Math.random() * runes.length)];
      
      ctx.fillText(rune, x, y);
    }
  }
  
  drawRareEffects() {
    const ctx = this.ctx;
    const width = this.canvas.width;
    const height = this.canvas.height;
    
    // Blue aura
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = width * 0.45;
    
    const gradient = ctx.createRadialGradient(
      centerX, centerY, radius * 0.5,
      centerX, centerY, radius
    );
    gradient.addColorStop(0, 'rgba(0, 112, 221, 0.1)');
    gradient.addColorStop(1, 'rgba(0, 112, 221, 0)');
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Subtle sparkles
    ctx.fillStyle = 'rgba(180, 225, 255, 0.6)';
    
    for (let i = 0; i < 10; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = Math.random() * 2 + 1;
      
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  drawStar(x: number, y: number, spikes: number, outerRadius: number, innerRadius: number) {
    const ctx = this.ctx;
    
    let rot = Math.PI / 2 * 3;
    const step = Math.PI / spikes;
    
    ctx.beginPath();
    ctx.moveTo(x, y - outerRadius);
    
    for (let i = 0; i < spikes; i++) {
      ctx.lineTo(
        x + Math.cos(rot) * outerRadius,
        y + Math.sin(rot) * outerRadius
      );
      rot += step;
      
      ctx.lineTo(
        x + Math.cos(rot) * innerRadius,
        y + Math.sin(rot) * innerRadius
      );
      rot += step;
    }
    
    ctx.lineTo(x, y - outerRadius);
    ctx.closePath();
    ctx.fill();
  }
  
  visualizeBlockchainData() {
    if (!this.blockchainData) return;
    
    const ctx = this.ctx;
    const width = this.canvas.width;
    const height = this.canvas.height;
    
    // Add block height at bottom
    if (this.blockchainData.blockHeight) {
      ctx.font = '10px monospace';
      ctx.fillStyle = this.traits.type === 'bitcoin' ? '#f7931a' : '#aaa';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'bottom';
      ctx.fillText(
        `Block: ${this.blockchainData.blockHeight}`, 
        width - 10, 
        height - 10
      );
    }
    
    // Add hash visualization
    if (this.blockchainData.blockHash) {
      this.visualizeHash(this.blockchainData.blockHash);
    }
    
    // Add quantum state indicator
    if (this.blockchainData.quantumState) {
      this.visualizeQuantumState(this.blockchainData.quantumState);
    }
  }
  
  visualizeHash(hash: string) {
    const ctx = this.ctx;
    const width = this.canvas.width;
    const height = this.canvas.height;
    
    // Convert hash to points around the edge
    ctx.strokeStyle = this.traits.type === 'bitcoin' ? 'rgba(247, 147, 26, 0.3)' : 'rgba(100, 100, 100, 0.2)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    
    // Take pairs of characters from hash and convert to points
    for (let i = 0; i < hash.length - 1; i += 2) {
      const value = parseInt(hash.substr(i, 2), 16);
      const angle = (value / 255) * Math.PI * 2;
      const radius = width * 0.45;
      
      const x = width / 2 + Math.cos(angle) * radius;
      const y = height / 2 + Math.sin(angle) * radius;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    
    ctx.closePath();
    ctx.stroke();
  }
  
  visualizeQuantumState(state: string) {
    const ctx = this.ctx;
    const width = this.canvas.width;
    const height = this.canvas.height;
    
    // Add a label
    ctx.font = '10px monospace';
    ctx.fillStyle = '#50c8f0';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'bottom';
    ctx.fillText(`Quantum: ${state}`, 10, height - 10);
    
    // Visual effect based on state
    switch (state) {
      case 'superposition':
        // Multiple ghost images
        ctx.save();
        ctx.globalAlpha = 0.2;
        ctx.drawImage(
          this.canvas, 
          0, 0, width, height,
          -5, -5, width, height
        );
        ctx.drawImage(
          this.canvas, 
          0, 0, width, height,
          5, 5, width, height
        );
        ctx.restore();
        break;
        
      case 'entangled':
        // Entanglement lines
        ctx.strokeStyle = 'rgba(80, 200, 240, 0.2)';
        ctx.lineWidth = 1;
        
        for (let i = 0; i < 20; i++) {
          const angle1 = Math.random() * Math.PI * 2;
          const angle2 = angle1 + Math.PI;
          const radius = width * 0.4;
          
          const x1 = width / 2 + Math.cos(angle1) * radius * Math.random();
          const y1 = height / 2 + Math.sin(angle1) * radius * Math.random();
          
          const x2 = width / 2 + Math.cos(angle2) * radius * Math.random();
          const y2 = height / 2 + Math.sin(angle2) * radius * Math.random();
          
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
        break;
        
      case 'unobserved':
        // Blur effect
        ctx.save();
        ctx.filter = 'blur(2px)';
        ctx.drawImage(
          this.canvas, 
          0, 0, width, height,
          0, 0, width, height
        );
        ctx.restore();
        break;
    }
  }
  
  // Main draw function
  draw() {
    // Clear canvas to start fresh
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw background based on type
    this.drawBackground();
    
    // Draw cat elements in order
    this.drawBody();
    this.drawHead();
    this.drawAccessories();
    
    // Apply special effects
    this.drawSpecialEffects();
    
    // Add blockchain data visualization if available
    if (this.blockchainData) {
      this.visualizeBlockchainData();
    }
    
    return this;
  }
  
  // Export methods
  toDataURL(format = 'image/png') {
    return this.canvas.toDataURL(format);
  }
  
  toBlob(callback: (blob: Blob | null) => void, format = 'image/png') {
    return this.canvas.toBlob(callback, format);
  }
  
  toASCII(): string {
    // Create a simplified ASCII representation of the canvas
    const width = 40;
    const height = 20;
    const aspectRatio = this.canvas.width / this.canvas.height;
    const adjustedWidth = Math.floor(height * aspectRatio);
    
    const ctx = this.ctx;
    const imageData = ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const pixels = imageData.data;
    
    // ASCII characters from darkest to lightest
    const asciiChars = ['@', '#', '8', '&', 'o', ':', '*', '.', ' '];
    let result = '';
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < adjustedWidth; x++) {
        // Map canvas coordinates to image data coordinates
        const sourceX = Math.floor(x * this.canvas.width / adjustedWidth);
        const sourceY = Math.floor(y * this.canvas.height / height);
        const sourceIndex = (sourceY * this.canvas.width + sourceX) * 4;
        
        // Get pixel color
        const r = pixels[sourceIndex];
        const g = pixels[sourceIndex + 1];
        const b = pixels[sourceIndex + 2];
        
        // Calculate brightness (0 to 255)
        const brightness = (0.299 * r + 0.587 * g + 0.114 * b);
        
        // Map brightness to ASCII character
        const charIndex = Math.floor(brightness / 255 * (asciiChars.length - 1));
        result += asciiChars[charIndex];
      }
      result += '\n';
    }
    
    return result;
  }
  
  toSVG(): string {
    // Create a basic SVG representation
    // This is a simplified version - a full implementation would be more complex
    const width = this.canvas.width;
    const height = this.canvas.height;
    
    // Start SVG
    let svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">`;
    
    // Add a background
    svg += `<rect width="${width}" height="${height}" fill="#f0f0f0" />`;
    
    // Add the base64 image from canvas
    const imageData = this.toDataURL();
    svg += `<image href="${imageData}" width="${width}" height="${height}" />`;
    
    // Close SVG
    svg += '</svg>';
    
    return svg;
  }
  
  // Get a reference to the canvas element
  getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }
}

// Utility function to get default colors for type
export function getDefaultColors(type: 'quantum' | 'bitcoin' | 'cypherpunk' | 'schrodinger' | 'generic'): string[] {
  switch (type) {
    case 'quantum':
      return ['#000033', '#50c8f0'];
    case 'bitcoin':
      return ['#000000', '#f7931a'];
    case 'cypherpunk':
      return ['#000000', '#00ff46'];
    case 'schrodinger':
      return ['#444444', '#000000'];
    default:
      return ['#000000', '#ffffff'];
  }
}

// Utility function to get random accessories
export function getRandomAccessories(rarity: string): string[] {
  const accessories = ['hat', 'bowtie', 'glasses', 'collar'];
  const result = [];
  
  // More accessories for higher rarities
  let count = 0;
  switch (rarity) {
    case 'legendary':
      count = 2 + Math.floor(Math.random() * 2); // 2-3
      break;
    case 'epic':
      count = 1 + Math.floor(Math.random() * 2); // 1-2
      break;
    case 'rare':
      count = Math.floor(Math.random() * 2); // 0-1
      break;
    default:
      count = Math.random() > 0.7 ? 1 : 0; // 30% chance for 1
  }
  
  // Select random accessories
  const shuffled = [...accessories].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}