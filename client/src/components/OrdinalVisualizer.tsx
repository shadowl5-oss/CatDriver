import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bitcoin, Binary, Atom, Cpu, HardDrive, GitBranch, Zap, Cat, Box, Info, Terminal, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import AsciiArtVisualizer from './AsciiArtVisualizer';
import { generateAdvancedCatASCII } from '@/lib/asciiArtGenerator';

const BITCOIN_PRICE_HISTORY = [
  { date: "2023-01-01", price: 16547 },
  { date: "2023-02-01", price: 23119 },
  { date: "2023-03-01", price: 23147 },
  { date: "2023-04-01", price: 28027 },
  { date: "2023-05-01", price: 27124 },
  { date: "2023-06-01", price: 26877 },
  { date: "2023-07-01", price: 30477 },
  { date: "2023-08-01", price: 29236 },
  { date: "2023-09-01", price: 25886 },
  { date: "2023-10-01", price: 27435 },
  { date: "2023-11-01", price: 34643 },
  { date: "2023-12-01", price: 43099 },
  { date: "2024-01-01", price: 42199 },
  { date: "2024-02-01", price: 51569 },
  { date: "2024-03-01", price: 61547 },
];

const BITCOIN_HEADLINES = [
  { date: "2023-03-10", headline: "Banking crisis spurs Bitcoin surge" },
  { date: "2023-06-15", headline: "BlackRock files for Bitcoin ETF" },
  { date: "2023-08-29", headline: "Judge rules in favor of Grayscale over SEC" },
  { date: "2023-10-17", headline: "Bitcoin halving countdown begins" },
  { date: "2024-01-10", headline: "Spot Bitcoin ETFs approved" },
  { date: "2024-02-28", headline: "Bitcoin hits all-time high above $60K" },
];

interface OrdinalVisualizerProps {
  isFullscreen?: boolean;
  onClose?: () => void;
  ordinalId?: string;
  name?: string;
  blockHeight?: number;
  rarity?: string;
}

export default function OrdinalVisualizer({ 
  isFullscreen = false, 
  onClose,
  ordinalId, 
  name, 
  blockHeight, 
  rarity 
}: OrdinalVisualizerProps): JSX.Element {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [quantumState, setQuantumState] = useState<'superposition' | 'entangled' | 'observed' | 'collapsed'>('superposition');
  const [currentTab, setCurrentTab] = useState('quantum');
  const [showAsciiVisualizer, setShowAsciiVisualizer] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  // Use the provided blockHeight if available, otherwise use default
  const [bitcoinData, setBitcoinData] = useState({
    block: blockHeight || 831045,
    transactions: 3791,
    fees: 2.14,
    price: 61742,
    volatility: 0.67,
  });
  const [quantum, setQuantum] = useState({
    superposition: Math.random(),
    entanglement: Math.random(),
    wave: {
      amplitude: 30,
      frequency: 0.02,
      phase: 0
    }
  });
  // Use the provided rarity if available
  const [catTraits, setCatTraits] = useState({
    rarity: rarity || 'Unknown',
    color: '#333',
    eyeColor: '#00ff00',
    pattern: 'none',
    special: false,
  });

  // Set up animation loop
  useEffect(() => {
    if (isPlaying) {
      let lastTime = 0;
      const animate = (time: number) => {
        if (time - lastTime > 100) { // Throttle updates to every 100ms
          // Update quantum state
          setQuantum(prev => ({
            ...prev,
            wave: {
              ...prev.wave,
              phase: prev.wave.phase + 0.1,
              amplitude: prev.wave.amplitude + (Math.random() - 0.5) * 3
            },
            superposition: Math.min(1, Math.max(0, prev.superposition + (Math.random() - 0.5) * 0.1)),
            entanglement: Math.min(1, Math.max(0, prev.entanglement + (Math.random() - 0.5) * 0.1))
          }));

          lastTime = time;
        }

        // Draw canvas
        drawCanvas();
        animationRef.current = requestAnimationFrame(animate);
      };

      animationRef.current = requestAnimationFrame(animate);

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  }, [isPlaying, quantumState, step]);

  // Advance step after a delay
  useEffect(() => {
    if (isPlaying && step < 3) {
      const timer = setTimeout(() => {
        setStep(prev => prev + 1);

        // When we reach step 1, set quantum state to entangled
        if (step === 0) {
          setQuantumState('entangled');
        } 
        // When we reach step 2, set quantum state to observed
        else if (step === 1) {
          setQuantumState('observed');
        }
        // When we reach step 3, set quantum state to collapsed
        else if (step === 2) {
          setQuantumState('collapsed');

          // Determine cat traits based on bitcoin data and quantum states
          const rarityValue = bitcoinData.volatility * quantum.superposition;
          let rarity, color;

          if (rarityValue > 0.8) {
            rarity = 'Legendary';
            color = '#FFD700'; // Gold
          } else if (rarityValue > 0.6) {
            rarity = 'Epic';
            color = '#9370DB'; // Purple
          } else if (rarityValue > 0.4) {
            rarity = 'Rare';
            color = '#1E90FF'; // Blue
          } else {
            rarity = 'Common';
            color = '#32CD32'; // Green
          }

          // Determine eye color based on bitcoin price
          const eyeHue = (bitcoinData.price % 360);
          const eyeColor = `hsl(${eyeHue}, 80%, 50%)`;

          // Determine if special trait based on transaction count
          const special = bitcoinData.transactions > 3500;

          setCatTraits({
            rarity,
            color,
            eyeColor,
            pattern: bitcoinData.fees > 1.5 ? 'striped' : 'solid',
            special
          });
        }
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isPlaying, step]);

  // Draw on canvas
  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Background
    if (step === 3) {
      // Final cat shape
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, catTraits.color);
      gradient.addColorStop(1, adjustColor(catTraits.color, -20));
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw cat silhouette
      drawCat(ctx, width, height);

      // Add binary pattern if it's a special cat
      if (catTraits.special) {
        drawBinaryPattern(ctx, width, height);
      }

      // Add rarity tag
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      ctx.fillRect(10, 10, 120, 30);
      ctx.fillStyle = 'white';
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText(catTraits.rarity, 20, 30);

      // Add block information
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      ctx.fillRect(width - 130, 10, 120, 30);
      ctx.fillStyle = 'white';
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText(`Block: ${bitcoinData.block}`, width - 120, 30);
    } else {
      // Background for other steps
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, width, height);

      if (step >= 0) {
        // Draw Bitcoin data as waves
        drawBitcoinWaves(ctx, width, height);
      }

      if (step >= 1) {
        // Draw quantum waves
        drawQuantumWaves(ctx, width, height);
      }

      if (step >= 2) {
        // Draw quantum cat outline
        drawQuantumCatOutline(ctx, width, height);
      }
    }
  };

  // Draw Bitcoin data visualized as waves
  const drawBitcoinWaves = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.strokeStyle = '#F7931A'; // Bitcoin orange
    ctx.lineWidth = 2;

    const priceFactor = bitcoinData.price / 70000; // Normalize
    const amplitude = height / 4 * priceFactor;
    const frequency = 0.01 * bitcoinData.volatility;

    ctx.beginPath();
    for (let x = 0; x < width; x += 1) {
      const y = height / 2 + Math.sin(x * frequency + quantum.wave.phase) * amplitude;

      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();

    // Add bitcoin symbol
    ctx.fillStyle = '#F7931A';
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText('₿', 20, 30);

    // Add block info
    ctx.font = '14px sans-serif';
    ctx.fillStyle = '#F7931A';
    ctx.fillText(`Block: ${bitcoinData.block}`, 50, 30);
  };

  // Draw quantum physics visualized as interference patterns
  const drawQuantumWaves = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const { superposition, entanglement, wave } = quantum;

    // Quantum wave pattern
    ctx.strokeStyle = '#8A2BE2'; // Purple
    ctx.lineWidth = 2;

    // Draw horizontal wave
    ctx.beginPath();
    for (let x = 0; x < width; x += 1) {
      const waveY = height / 2 - 40 + Math.sin(x * wave.frequency + wave.phase * 1.5) * wave.amplitude * superposition;

      if (x === 0) {
        ctx.moveTo(x, waveY);
      } else {
        ctx.lineTo(x, waveY);
      }
    }
    ctx.stroke();

    // Draw vertical wave if entangled
    if (quantumState === 'entangled' || quantumState === 'observed') {
      ctx.strokeStyle = '#4682B4'; // Steel blue
      ctx.beginPath();
      for (let y = 0; y < height; y += 1) {
        const waveX = width / 2 + 40 + Math.sin(y * wave.frequency + wave.phase) * wave.amplitude * entanglement;

        if (y === 0) {
          ctx.moveTo(waveX, y);
        } else {
          ctx.lineTo(waveX, y);
        }
      }
      ctx.stroke();

      // Draw "entanglement lines" connecting the waves
      if (quantumState === 'entangled') {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.setLineDash([5, 5]);

        for (let i = 0; i < 5; i++) {
          const x1 = width / 4 + i * width / 10;
          const y1 = height / 2 - 40 + Math.sin(x1 * wave.frequency + wave.phase * 1.5) * wave.amplitude * superposition;
          const y2 = height / 2 + i * height / 10;
          const x2 = width / 2 + 40 + Math.sin(y2 * wave.frequency + wave.phase) * wave.amplitude * entanglement;

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }

        ctx.setLineDash([]); // Reset line dash
      }
    }

    // Draw "observation" effect
    if (quantumState === 'observed' || quantumState === 'collapsed') {
      const observeX = width / 2;
      const observeY = height / 2;
      const observeRadius = 80 * (quantumState === 'collapsed' ? 1.5 : 1);

      // Draw observation circle
      const gradient = ctx.createRadialGradient(
        observeX, observeY, 0,
        observeX, observeY, observeRadius
      );
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
      gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.2)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(observeX, observeY, observeRadius, 0, Math.PI * 2);
      ctx.fill();
    }

    // Add quantum state info
    ctx.font = '14px sans-serif';
    ctx.fillStyle = '#8A2BE2';
    ctx.fillText(`Quantum State: ${quantumState}`, 20, 60);
  };

  // Draw the quantum cat outline before it's fully formed
  const drawQuantumCatOutline = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const size = Math.min(width, height) * 0.4;

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 2;

    // Add some quantum fuzziness to the outline
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#8A2BE2';

    // Head
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, size * 0.8, size * 0.7, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Ears
    const earHeight = size * 0.6;
    const earWidth = size * 0.4;
    const earSpacing = size * 0.7;

    // Left ear - with quantum wobble
    ctx.beginPath();
    const leftEarX = centerX - earSpacing / 2;
    const leftEarTipX = leftEarX - earWidth / 2 + Math.sin(quantum.wave.phase) * 5;
    ctx.moveTo(leftEarX, centerY - size * 0.3);
    ctx.lineTo(leftEarTipX, centerY - earHeight);
    ctx.lineTo(leftEarX + earWidth, centerY - size * 0.3);
    ctx.stroke();

    // Right ear - with quantum wobble
    ctx.beginPath();
    const rightEarX = centerX + earSpacing / 2;
    const rightEarTipX = rightEarX + earWidth / 2 + Math.sin(quantum.wave.phase + 1) * 5;
    ctx.moveTo(rightEarX, centerY - size * 0.3);
    ctx.lineTo(rightEarTipX, centerY - earHeight);
    ctx.lineTo(rightEarX - earWidth, centerY - size * 0.3);
    ctx.stroke();

    // Eyes - with quantum glow effect
    ctx.fillStyle = quantumState === 'observed' ? '#00ff00' : '#ffffff';
    ctx.beginPath();
    ctx.ellipse(centerX - size * 0.25, centerY - size * 0.1, size * 0.12, size * 0.1, 0, 0, Math.PI * 2);
    ctx.ellipse(centerX + size * 0.25, centerY - size * 0.1, size * 0.12, size * 0.1, 0, 0, Math.PI * 2);
    ctx.fill();

    // Pupils - change size with quantum state
    ctx.fillStyle = '#000';
    const pupilSize = quantumState === 'observed' ? size * 0.04 : size * 0.08;
    ctx.beginPath();
    ctx.arc(centerX - size * 0.25, centerY - size * 0.1, pupilSize, 0, Math.PI * 2);
    ctx.arc(centerX + size * 0.25, centerY - size * 0.1, pupilSize, 0, Math.PI * 2);
    ctx.fill();

    // Reset shadow
    ctx.shadowBlur = 0;
  };

  // Draw the final cat
  const drawCat = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const size = Math.min(width, height) * 0.4;

    // Head
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, size * 0.8, size * 0.7, 0, 0, Math.PI * 2);
    ctx.fill();

    // Ears
    const earHeight = size * 0.6;
    const earWidth = size * 0.4;
    const earSpacing = size * 0.7;

    // Left ear
    ctx.beginPath();
    const leftEarX = centerX - earSpacing / 2;
    ctx.moveTo(leftEarX, centerY - size * 0.3);
    ctx.lineTo(leftEarX - earWidth / 2, centerY - earHeight);
    ctx.lineTo(leftEarX + earWidth, centerY - size * 0.3);
    ctx.fill();

    // Right ear
    ctx.beginPath();
    const rightEarX = centerX + earSpacing / 2;
    ctx.moveTo(rightEarX, centerY - size * 0.3);
    ctx.lineTo(rightEarX + earWidth / 2, centerY - earHeight);
    ctx.lineTo(rightEarX - earWidth, centerY - size * 0.3);
    ctx.fill();

    // Eyes
    ctx.fillStyle = catTraits.eyeColor;
    ctx.beginPath();
    ctx.ellipse(centerX - size * 0.25, centerY - size * 0.1, size * 0.12, size * 0.1, 0, 0, Math.PI * 2);
    ctx.ellipse(centerX + size * 0.25, centerY - size * 0.1, size * 0.12, size * 0.1, 0, 0, Math.PI * 2);
    ctx.fill();

    // Pupils
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(centerX - size * 0.25, centerY - size * 0.1, size * 0.05, 0, Math.PI * 2);
    ctx.arc(centerX + size * 0.25, centerY - size * 0.1, size * 0.05, 0, Math.PI * 2);
    ctx.fill();

    // Nose
    ctx.fillStyle = '#FF69B4';
    ctx.beginPath();
    ctx.arc(centerX, centerY + size * 0.1, size * 0.06, 0, Math.PI * 2);
    ctx.fill();

    // Whiskers
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;

    // Left whiskers
    ctx.beginPath();
    ctx.moveTo(centerX - size * 0.2, centerY + size * 0.15);
    ctx.lineTo(centerX - size * 0.7, centerY + size * 0.1);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(centerX - size * 0.2, centerY + size * 0.15);
    ctx.lineTo(centerX - size * 0.7, centerY + size * 0.2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(centerX - size * 0.2, centerY + size * 0.15);
    ctx.lineTo(centerX - size * 0.7, centerY + size * 0.3);
    ctx.stroke();

    // Right whiskers
    ctx.beginPath();
    ctx.moveTo(centerX + size * 0.2, centerY + size * 0.15);
    ctx.lineTo(centerX + size * 0.7, centerY + size * 0.1);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(centerX + size * 0.2, centerY + size * 0.15);
    ctx.lineTo(centerX + size * 0.7, centerY + size * 0.2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(centerX + size * 0.2, centerY + size * 0.15);
    ctx.lineTo(centerX + size * 0.7, centerY + size * 0.3);
    ctx.stroke();

    // Mouth
    ctx.beginPath();
    ctx.arc(centerX, centerY + size * 0.25, size * 0.15, 0.1, Math.PI - 0.1);
    ctx.stroke();

    // Add pattern if it's striped
    if (catTraits.pattern === 'striped') {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 5;

      for (let i = -5; i <= 5; i += 2) {
        ctx.beginPath();
        ctx.moveTo(centerX - size, centerY + i * size * 0.1);
        ctx.lineTo(centerX + size, centerY + i * size * 0.1);
        ctx.stroke();
      }
    }
  };

  // Draw binary patterns for special cats
  const drawBinaryPattern = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';

    const binaryString = bitcoinData.block.toString(2) + bitcoinData.transactions.toString(2);

    for (let i = 0; i < binaryString.length; i++) {
      const x = (i % 20) * (width / 20);
      const y = Math.floor(i / 20) * 20 + 100;

      if (binaryString[i] === '1') {
        ctx.fillRect(x, y, 10, 10);
      }
    }
  };

  // Helper function to adjust color brightness
  const adjustColor = (color: string, amount: number) => {
    // Hex to RGB
    let r = parseInt(color.substring(1, 3), 16);
    let g = parseInt(color.substring(3, 5), 16);
    let b = parseInt(color.substring(5, 7), 16);

    // Adjust
    r = Math.max(0, Math.min(255, r + amount));
    g = Math.max(0, Math.min(255, g + amount));
    b = Math.max(0, Math.min(255, b + amount));

    // RGB to Hex
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  // Start the visualization process
  const startVisualizer = () => {
    setIsPlaying(true);
    setStep(0);
    setQuantumState('superposition');

    // Reset the cat traits but preserve the rarity if provided as a prop
    setCatTraits({
      rarity: rarity || 'Unknown',
      color: '#333',
      eyeColor: '#00ff00',
      pattern: 'none',
      special: false,
    });

    // Generate new random Bitcoin data
    setBitcoinData({
      block: 830000 + Math.floor(Math.random() * 2000),
      transactions: 2500 + Math.floor(Math.random() * 2000),
      fees: 0.5 + Math.random() * 3,
      price: 60000 + Math.floor(Math.random() * 5000),
      volatility: 0.3 + Math.random() * 0.7,
    });

    // Reset quantum state
    setQuantum({
      superposition: Math.random(),
      entanglement: Math.random(),
      wave: {
        amplitude: 30,
        frequency: 0.02,
        phase: 0
      }
    });
  };

  // Reset the visualizer
  const resetVisualizer = () => {
    setIsPlaying(false);
    setStep(0);
    setQuantumState('superposition');

    // Also update the bitcoin data to use the provided blockHeight if available
    if (blockHeight) {
      setBitcoinData(prev => ({
        ...prev,
        block: blockHeight
      }));
    }

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  // Get step description
  const getStepDescription = () => {
    switch (step) {
      case 0:
        return "Extracting Bitcoin block data and price movements...";
      case 1:
        return "Computing quantum superposition and entanglement states...";
      case 2:
        return "Observing quantum state to collapse wave function...";
      case 3:
        return "Ordinal cat successfully generated!";
      default:
        return "";
    }
  };

  // Initialize canvas when component mounts
  useEffect(() => {
    drawCanvas();
  }, []);

  return (
    <div>
      {/* ASCII Art Visualizer Modal */}
      {showAsciiVisualizer && (
        <AsciiArtVisualizer
          isFullscreen={true}
          onClose={() => setShowAsciiVisualizer(false)}
          blockHeight={bitcoinData.block}
          rarity={catTraits.rarity}
          ordinalId={ordinalId}
          name={name}
        />
      )}

      {/* Main Visualizer Component */}
      <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center' : ''}`}>
        <div className={`bg-black rounded-xl overflow-hidden ${isFullscreen ? 'w-[90vw] max-w-5xl' : 'w-full'}`}>
        <div className="p-4 border-b border-white/10 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Atom className="h-5 w-5 text-purple-500" />
            <h2 className="text-xl font-bold text-white">Quantum Cat Ordinal Visualizer</h2>
          </div>

          {isFullscreen && (
            <Button variant="ghost" className="text-white hover:bg-white/10" onClick={onClose}>
              <span className="text-xl">×</span>
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          <div className="md:col-span-2">
            <div className="relative bg-black rounded-lg overflow-hidden">
              <canvas 
                ref={canvasRef} 
                width={600} 
                height={400} 
                className="w-full h-auto bg-black"
              />

              {!isPlaying && step === 0 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 text-white text-center p-6">
                  <Atom className="h-16 w-16 text-purple-500 mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Quantum Ordinal Generator</h3>
                  <p className="mb-6 max-w-md">
                    Watch how we create our unique cat ordinals using Bitcoin blockchain data and 
                    quantum mechanics principles inspired by Schrödinger's famous thought experiment.
                  </p>
                  <Button onClick={startVisualizer} className="bg-purple-600 hover:bg-purple-700 text-white">
                    Start Visualization
                  </Button>
                </div>
              )}

              {isPlaying && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-white font-medium">{getStepDescription()}</p>
                      {step < 3 && (
                        <Progress value={(step / 3) * 100} className="h-1 mt-2 bg-white/20" />
                      )}
                    </div>

                    {step === 3 && (
                      <Button onClick={resetVisualizer} size="sm" variant="outline" className="text-white border-white/20 hover:bg-white/10">
                        Reset
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {step === 3 && (
              <div className="mt-4 bg-muted/10 rounded-lg p-4 text-white">
                <h3 className="font-bold mb-2">Generated Cat Ordinal</h3>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                  <div>
                    <span className="text-xs text-white/60">Rarity</span>
                    <p className="font-medium">{catTraits.rarity}</p>
                  </div>

                  <div>
                    <span className="text-xs text-white/60">Block Height</span>
                    <p className="font-medium">{bitcoinData.block}</p>
                  </div>

                  <div>
                    <span className="text-xs text-white/60">Special Features</span>
                    <p className="font-medium">{catTraits.special ? 'Yes' : 'No'}</p>
                  </div>

                  <div>
                    <span className="text-xs text-white/60">Pattern</span>
                    <p className="font-medium">{catTraits.pattern.charAt(0).toUpperCase() + catTraits.pattern.slice(1)}</p>
                  </div>
                </div>

                <Alert className="mt-4 bg-purple-950 border-purple-500 text-white">
                  <Box className="h-4 w-4" />
                  <AlertTitle>Schrödinger's Cat Principle Applied</AlertTitle>
                  <AlertDescription>
                    This ordinal existed in multiple potential states until it was "observed"                    during the generation process, at which point its quantum wave function collapsed 
                    into a single state with defined properties.
                  </AlertDescription>
                </Alert>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="quantum" className="text-white data-[state=active]:bg-purple-900">
                  Quantum
                </TabsTrigger>
                <TabsTrigger value="bitcoin" className="text-white data-[state=active]:bg-amber-800">
                  Bitcoin
                </TabsTrigger>
                <TabsTrigger value="process" className="text-white data-[state=active]:bg-blue-900">
                  Process
                </TabsTrigger>
                <TabsTrigger value="ascii" className="text-white data-[state=active]:bg-green-900">
                  <Terminal className="h-4 w-4 mr-1 inline-block" />
                  ASCII
                </TabsTrigger>
              </TabsList>

              <TabsContent value="quantum" className="p-4 bg-purple-950/50 rounded-lg border border-purple-900 text-white">
                <h3 className="font-bold mb-3">Quantum Mechanics in Ordinals</h3>
                <div className="space-y-4">
                  <p className="text-sm">
                    Our cat ordinals are inspired by Schrödinger's famous thought experiment, 
                    where a cat in a box can exist in multiple states simultaneously until observed.
                  </p>

                  <div>
                    <h4 className="text-sm font-medium mb-1">Quantum States</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-purple-500 flex-shrink-0 mt-0.5"></div>
                        <div>
                          <span className="font-medium">Superposition</span>
                          <p className="text-xs text-white/70">Exists in multiple potential states simultaneously</p>
                        </div>
                      </li>

                      <li className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-blue-500 flex-shrink-0 mt-0.5"></div>
                        <div>
                          <span className="font-medium">Entanglement</span>
                          <p className="text-xs text-white/70">Connected to Bitcoin blockchain data in non-local ways</p>
                        </div>
                      </li>

                      <li className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-green-500 flex-shrink-0 mt-0.5"></div>
                        <div>
                          <span className="font-medium">Observation</span>
                          <p className="text-xs text-white/70">The act of measuring forces a definite state</p>
                        </div>
                      </li>

                      <li className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-amber-500 flex-shrink-0 mt-0.5"></div>
                        <div>
                          <span className="font-medium">Collapse</span>
                          <p className="text-xs text-white/70">Final determined state with fixed properties</p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="w-full mt-2 text-white border-white/20 hover:bg-white/10">
                        Learn More About Quantum Principles
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                      <DialogHeader>
                        <DialogTitle>Quantum Principles in Ordinals</DialogTitle>
                        <DialogDescription>
                          How we apply quantum physics to blockchain collectibles
                        </DialogDescription>
                      </DialogHeader>

                      <div className="space-y-4">
                        <p>
                          Schrödinger's cat is a thought experiment devised by physicist Erwin Schrödinger in 1935. 
                          In this experiment, a cat is placed in a sealed box with a radioactive atom, a Geiger counter, 
                          and a poison. If the atom decays, the Geiger counter detects it and triggers the release of poison, killing the cat.
                        </p>

                        <p>
                          According to quantum mechanics, until the box is opened and the cat is observed, the 
                          atom exists in a superposition of both decayed and not decayed states. Consequently, 
                          the cat would be both alive and dead at the same time - existing in multiple states simultaneously.
                        </p>

                        <p>
                          We apply this concept to our ordinals. Each cat ordinal exists in multiple potential 
                          states until it's "observed" (purchased or minted), at which point its attributes become fixed.
                          The quantum states are influenced by real Bitcoin blockchain data, creating unique collectibles 
                          that represent a fusion of quantum physics and blockchain technology.
                        </p>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </TabsContent>

              <TabsContent value="bitcoin" className="p-4 bg-amber-950/50 rounded-lg border border-amber-900 text-white">
                <h3 className="font-bold mb-3">Bitcoin Data Sources</h3>
                <div className="space-y-4">
                  <p className="text-sm">
                    Our cat ordinals draw data from significant Bitcoin blocks and market events to 
                    influence their properties and rarity.
                  </p>

                  <div>
                    <h4 className="text-sm font-medium mb-1">Key Bitcoin Metrics Used</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                        <span>Block height and hash</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                        <span>Transaction count and fees</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                        <span>Price and volatility at block time</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                        <span>Merkle root entropy</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-1">Notable Bitcoin Events</h4>
                    <div className="max-h-40 overflow-y-auto pr-2 space-y-2">
                      {BITCOIN_HEADLINES.map((event, index) => (
                        <div key={index} className="text-xs p-2 bg-black/20 rounded">
                          <span className="font-medium">{event.date}</span>
                          <p>{event.headline}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <p className="text-xs text-white/70">
                      These Bitcoin events and metrics directly influence the rarity, 
                      appearance, and special properties of each cat ordinal.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="process" className="p-4 bg-blue-950/50 rounded-lg border border-blue-900 text-white">
                <h3 className="font-bold mb-3">The Creation Process</h3>
                <div className="space-y-4">
                  <p className="text-sm">
                    How we transform Bitcoin data and quantum mechanics into unique cat ordinals:
                  </p>

                  <div>
                    <h4 className="text-sm font-medium mb-1">Creation Steps</h4>
                    <ol className="space-y-3 relative border-l border-blue-800 pl-6 ml-3">
                      <li className="relative">
                        <div className="absolute -left-[27px] mt-1.5 w-4 h-4 rounded-full bg-blue-600"></div>
                        <h5 className="font-medium">Bitcoin Data Extraction</h5>
                        <p className="text-xs text-white/70">
                          We pull data from significant Bitcoin blocks that represent important moments
                          in cryptocurrency history.
                        </p>
                      </li>

                      <li className="relative">
                        <div className="absolute -left-[27px] mt-1.5 w-4 h-4 rounded-full bg-blue-600"></div>
                        <h5 className="font-medium">Quantum Algorithm Application</h5>
                        <p className="text-xs text-white/70">
                          The data enters a quantum-inspired algorithm that maintains multiple potential 
                          states until observation.
                        </p>
                      </li>

                      <li className="relative">
                        <div className="absolute -left-[27px] mt-1.5 w-4 h-4 rounded-full bg-blue-600"></div>
                        <h5 className="font-medium">State Collapse</h5>
                        <p className="text-xs text-white/70">
                          Upon inscription to the blockchain, the quantum state collapses into a 
                          unique cat ordinal with defined attributes.
                        </p>
                      </li>

                      <li className="relative">
                        <div className="absolute -left-[27px] mt-1.5 w-4 h-4 rounded-full bg-blue-600"></div>
                        <h5 className="font-medium">Bitcoin Inscription</h5>
                        <p className="text-xs text-white/70">
                          The final cat ordinal is permanently inscribed onto a Bitcoin satoshi, 
                          becoming an immutable digital artifact.
                        </p>
                      </li>
                    </ol>
                  </div>

                  <div className="pt-2">
                    <p className="text-xs text-white/70">
                      Each of the 3,333 cat ordinals is created using this meticulous process, 
                      ensuring uniqueness and cryptographic provenance.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="ascii" className="p-4 bg-green-950/50 rounded-lg border border-green-900 text-white">
                <h3 className="font-bold mb-3">ASCII Art Visualization</h3>
                <div className="space-y-4">
                  <p className="text-sm">
                    Each cat ordinal can be represented as ASCII art, preserving its unique attributes
                    and blockchain-derived properties in text form.
                  </p>

                  {step === 3 ? (
                    <div className="bg-black/50 p-4 rounded-lg font-mono text-xs text-green-400 overflow-auto max-h-60">
                      <pre>
                        {generateAdvancedCatASCII(catTraits.rarity, bitcoinData.block, quantumState)}
                      </pre>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center p-8 bg-black/50 rounded-lg">
                      <p className="text-gray-400 italic">
                        Complete the visualization process to generate ASCII art
                      </p>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="pt-2 space-y-4">
                      <p className="text-xs text-white/70">
                        ASCII art preserves the cryptographic properties of the ordinal in a format
                        that's viewable on any device, even those without graphical interfaces.
                      </p>

                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full text-white border-white/20 hover:bg-white/10"
                        onClick={() => setShowAsciiVisualizer(true)}
                      >
                        <Terminal className="h-4 w-4 mr-2" />
                        Open Full ASCII Art Visualizer
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            {isPlaying && step < 3 && (
              <div className="bg-black/50 border border-white/10 rounded-lg p-4">
                <h3 className="font-bold text-white mb-2">Live Data</h3>

                <div className="space-y-3">
                  <div>
                    <span className="text-xs text-white/60">Bitcoin Block</span>
                    <p className="font-medium text-white">{bitcoinData.block}</p>
                  </div>

                  <div>
                    <span className="text-xs text-white/60">Transactions</span>
                    <p className="font-medium text-white">{bitcoinData.transactions.toLocaleString()}</p>
                  </div>

                  <div>
                    <span className="text-xs text-white/60">Price at Block</span>
                    <p className="font-medium text-white">${bitcoinData.price.toLocaleString()}</p>
                  </div>

                  <div>
                    <span className="text-xs text-white/60">Quantum State</span>
                    <p className="font-medium text-white capitalize">{quantumState}</p>
                  </div>
                </div>
              </div>
            )}

            <Button 
              onClick={isPlaying ? resetVisualizer : startVisualizer} 
              className={`w-full ${
                isPlaying 
                  ? 'bg-red-600 hover:bg-red-700 text-white' 
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {isPlaying ? 'Stop Visualization' : 'Start Visualization'}
            </Button>
          </div>
        </div>

        <div className="p-4 border-t border-white/10 text-center text-white/60 text-sm">
          <p>A product of CatDAO.org - Bringing quantum principles to Bitcoin ordinals</p>
        </div>
      </div>
    </div>
  );
}