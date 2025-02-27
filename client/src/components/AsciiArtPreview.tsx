import React, { useEffect, useState } from 'react';
import { generateCatASCII, generateCatTypeASCII } from '@/lib/asciiArtGenerator';

interface AsciiArtPreviewProps {
  type?: 'quantum' | 'bitcoin' | 'cypherpunk' | 'schrodinger' | 'generic';
  seed?: number;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  showBorder?: boolean;
  rarity?: string;
  isProfileImage?: boolean;
}

export default function AsciiArtPreview({
  type = 'generic',
  seed = Math.floor(Math.random() * 1000),
  width = 200,
  height = 200,
  className = '',
  style = {},
  showBorder = false,
  rarity = 'Common',
  isProfileImage = false
}: AsciiArtPreviewProps) {
  const [asciiArt, setAsciiArt] = useState<string>('');

  useEffect(() => {
    // Generate deterministic random traits based on seed
    const random = (min: number, max: number) => {
      // Ensure seed is a positive integer to avoid issue with negative count
      const safeSeed = Math.abs(seed) || 42;
      const x = Math.sin(safeSeed) * 10000;
      const rand = Math.abs(x - Math.floor(x)); // Ensure rand is positive
      return Math.floor(rand * (max - min + 1)) + min;
    };

    // Generate random traits based on seed
    const eyeStyles = ['normal', 'quantum', 'binary', 'slit', 'wide'];
    const expressions = ['happy', 'neutral', 'wise', 'mischievous', 'surprised', 'grumpy'];
    const patterns = ['none', 'striped', 'spotted', 'tabby', 'calico', 'quantum'];
    const furLengths = ['short', 'medium', 'long', 'fluffy'];
    const earShapes = ['pointed', 'rounded', 'folded', 'tufted'];
    const tailTypes = ['long', 'short', 'fluffy', 'curled'];
    
    const traits = {
      rarity,
      eyeStyle: eyeStyles[random(0, eyeStyles.length - 1)],
      expression: expressions[random(0, expressions.length - 1)],
      pattern: patterns[random(0, patterns.length - 1)],
      special: random(0, 10) > 7,
      accessories: [],
      furLength: furLengths[random(0, furLengths.length - 1)],
      earShape: earShapes[random(0, earShapes.length - 1)],
      tailType: tailTypes[random(0, tailTypes.length - 1)],
      quantumState: random(0, 1) > 0.5 ? 'observed' : 'superposition',
      bitcoinFeatures: type === 'bitcoin' || random(0, 10) > 8
    };

    // Generate ASCII art based on type
    let art: string;
    
    if (type === 'generic') {
      // For standard generic cats
      art = generateCatASCII(traits, { 
        width: isProfileImage ? 24 : 40, 
        detailLevel: isProfileImage ? 'medium' : 'high',
        frameStyle: 'rounded'
      });
    } else {
      // For specialized cat types
      art = generateCatTypeASCII({
        ...traits,
        type,
        blockHeight: seed,
        tokenId: `0x${seed.toString(16)}`,
        width: isProfileImage ? 24 : 40
      });
    }

    setAsciiArt(art);
  }, [type, seed, rarity, isProfileImage]);

  // Styling for the ASCII art display
  const containerStyle: React.CSSProperties = {
    width: `${width}px`,
    height: `${height}px`,
    fontSize: isProfileImage ? '5px' : '8px',
    lineHeight: isProfileImage ? '5px' : '8px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'monospace',
    whiteSpace: 'pre',
    backgroundColor: '#1a1a1a',
    color: '#f0f0f0',
    border: showBorder ? '1px solid #333' : 'none',
    borderRadius: '5px',
    padding: '5px',
    ...style
  };

  return (
    <div className={className} style={containerStyle}>
      <pre>{asciiArt}</pre>
    </div>
  );
}