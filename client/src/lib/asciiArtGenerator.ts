/**
 * Advanced ASCII Art Generator for Cat Ordinals
 * 
 * This utility creates high-quality ASCII art representations of cats with different
 * traits, expressions, and characteristics based on blockchain data and quantum states.
 */

type CatTrait = {
  rarity: string;              // Common, Rare, Epic, Legendary
  pattern: string;             // striped, spotted, tabby, calico, quantum, none
  eyeStyle: string;            // normal, quantum, binary, slit, wide
  whiskerStyle: string;        // straight, curly, long, short, quantum
  special: boolean;            // true/false - has special traits
  expression: string;          // happy, sad, surprised, grumpy, wise, mischievous, neutral
  accessories: string[];       // hat, bowtie, glasses, collar, etc.
  furLength?: string;          // short, medium, long, fluffy
  earShape?: string;           // pointed, rounded, folded, tufted
  tailType?: string;           // long, short, fluffy, curled
  pawStyle?: string;           // normal, mittened, polydactyl, gradient
  muzzleShape?: string;        // round, square, elongated, heart
  facialMarkings?: string[];   // mask, stripe, spot, blaze, none
  bitcoinFeatures?: boolean;   // true/false - has Bitcoin-specific features
  quantumState?: string;       // observed, unobserved, superposition, entangled
  blockhash?: string;          // Bitcoin block hash for generation
  cypherpunkTraits?: string[]; // privacy, encryption, resistance, anonymity traits
};

type ASCIIOptions = {
  width: number;
  colorMode: 'none' | 'ansi' | 'html';
  detailLevel: 'low' | 'medium' | 'high';
  frameStyle?: string;
};

/**
 * Generate a complete ASCII art representation of a cat with specified traits
 */
export function generateCatASCII(traits: Partial<CatTrait> = {}, options: Partial<ASCIIOptions> = {}): string {
  // Default options if not provided
  const finalOptions: ASCIIOptions = {
    width: options.width || 50,
    colorMode: options.colorMode || 'none',
    detailLevel: options.detailLevel || 'medium',
    frameStyle: options.frameStyle || 'simple'
  };
  
  // Default traits if not provided
  const finalTraits: CatTrait = {
    rarity: traits.rarity || 'Common',
    pattern: traits.pattern || 'none',
    eyeStyle: traits.eyeStyle || 'normal',
    whiskerStyle: traits.whiskerStyle || 'short',
    special: traits.special || false,
    expression: traits.expression || 'neutral',
    accessories: traits.accessories || [],
    furLength: traits.furLength || 'medium',
    earShape: traits.earShape || 'pointed',
    tailType: traits.tailType || 'long',
    pawStyle: traits.pawStyle || 'normal',
    muzzleShape: traits.muzzleShape || 'round',
    facialMarkings: traits.facialMarkings || ['none'],
    bitcoinFeatures: traits.bitcoinFeatures || false,
    quantumState: traits.quantumState || 'unobserved',
    blockhash: traits.blockhash || '',
    cypherpunkTraits: traits.cypherpunkTraits || []
  };
  
  // Generate the ASCII art
  let asciiArt = '';
  
  // Add top frame
  asciiArt += generateFrame('top', finalOptions.frameStyle, finalOptions.width) + '\n';
  
  // Add cat head
  asciiArt += generateHead(finalTraits, finalOptions) + '\n';
  
  // Add cat body
  asciiArt += generateBody(finalTraits, finalOptions) + '\n';
  
  // Add accessories if any
  if (finalTraits.accessories.length > 0) {
    asciiArt += generateAccessories(finalTraits, finalOptions) + '\n';
  }
  
  // Add traits info
  asciiArt += generateTraitsInfo(finalTraits, finalOptions) + '\n';
  
  // Add bottom frame
  asciiArt += generateFrame('bottom', finalOptions.frameStyle, finalOptions.width);
  
  return asciiArt;
}

/**
 * Generate ASCII frame around the cat
 */
function generateFrame(position: 'top' | 'bottom', style: string, width: number): string {
  let frame = '';
  
  switch (style) {
    case 'double':
      frame = position === 'top' ? '╔' + '═'.repeat(width - 2) + '╗' : '╚' + '═'.repeat(width - 2) + '╝';
      break;
    case 'rounded':
      frame = position === 'top' ? '╭' + '─'.repeat(width - 2) + '╮' : '╰' + '─'.repeat(width - 2) + '╯';
      break;
    case 'quantum':
      // A special frame with quantum-inspired characters
      if (position === 'top') {
        frame = '┌' + '─'.repeat(Math.floor((width - 12) / 2)) + ' QUANTUM CAT ' + '─'.repeat(Math.ceil((width - 12) / 2)) + '┐';
      } else {
        frame = '└' + '─'.repeat(Math.floor((width - 20) / 2)) + ' SCHRÖDINGER\'S BOX ' + '─'.repeat(Math.ceil((width - 20) / 2)) + '┘';
      }
      break;
    case 'bitcoin':
      // A Bitcoin-themed frame
      if (position === 'top') {
        frame = '┌' + '─'.repeat(Math.floor((width - 8) / 2)) + ' ₿ITCAT ' + '─'.repeat(Math.ceil((width - 8) / 2)) + '┐';
      } else {
        frame = '└' + '─'.repeat(Math.floor((width - 16) / 2)) + ' BLOCK #' + Math.floor(Math.random() * 1000000) + ' ' + '─'.repeat(Math.ceil((width - 16) / 2)) + '┘';
      }
      break;
    case 'simple':
    default:
      frame = position === 'top' ? '+' + '-'.repeat(width - 2) + '+' : '+' + '-'.repeat(width - 2) + '+';
      break;
  }
  
  return frame;
}

/**
 * Generate ASCII art for cat head based on traits
 */
function generateHead(traits: CatTrait, options: ASCIIOptions): string {
  const { width, detailLevel } = options;
  const { eyeStyle, expression, rarity } = traits;
  
  let head = '';
  let ears = '';
  let face = '';
  let eyes = '';
  let nose = '';
  let mouth = '';
  let whiskers = '';
  
  // Generate ears based on rarity
  switch (rarity) {
    case 'Legendary':
      ears = '    /\\___/\\    ';
      break;
    case 'Epic':
      ears = '   /\\\\___/\\\\   ';
      break;
    case 'Rare':
      ears = '    /\\~~/\\    ';
      break;
    case 'Common':
    default:
      ears = '    /\\   /\\    ';
      break;
  }
  
  // Generate face
  face = '   /       \\   ';
  
  // Generate eyes based on eyeStyle
  switch (eyeStyle) {
    case 'quantum':
      eyes = '  ⊛  ⦿  ⊛  ';
      break;
    case 'binary':
      eyes = '  1  ⋄  0  ';
      break;
    case 'slit':
      eyes = '  >  ⋄  <  ';
      break;
    case 'wide':
      eyes = '  ⦿  ⋄  ⦿  ';
      break;
    case 'normal':
    default:
      eyes = '  •  ⋄  •  ';
      break;
  }
  
  // Generate nose
  nose = '     ▼     ';
  
  // Generate mouth based on expression
  switch (expression) {
    case 'happy':
      mouth = '    ⟋⌓⟍    ';
      break;
    case 'sad':
      mouth = '    ⌒︿⌒    ';
      break;
    case 'surprised':
      mouth = '     O     ';
      break;
    case 'grumpy':
      mouth = '    ﹏﹏    ';
      break;
    case 'wise':
      mouth = '    =ω=    ';
      break;
    case 'mischievous':
      mouth = '    ⌒ω⌒    ';
      break;
    case 'neutral':
    default:
      mouth = '    =⌓=    ';
      break;
  }
  
  // Generate whiskers
  if (detailLevel === 'high') {
    whiskers = ' \\==// \\==// ';
  } else {
    whiskers = ' \\=/ ● \\=/ ';
  }
  
  // Combine parts to form head based on detail level
  if (detailLevel === 'high') {
    head = centerLine(ears, width) + '\n' + 
           centerLine(face, width) + '\n' + 
           centerLine(eyes, width) + '\n' + 
           centerLine(nose, width) + '\n' + 
           centerLine(mouth, width) + '\n' + 
           centerLine(whiskers, width);
  } else if (detailLevel === 'medium') {
    head = centerLine(ears, width) + '\n' + 
           centerLine(face, width) + '\n' + 
           centerLine(eyes, width) + '\n' + 
           centerLine(nose, width) + '\n' + 
           centerLine(mouth, width);
  } else {
    head = centerLine(ears, width) + '\n' + 
           centerLine(face, width) + '\n' + 
           centerLine(eyes, width) + '\n' + 
           centerLine(mouth, width);
  }
  
  return head;
}

/**
 * Generate ASCII art for cat body based on traits
 */
function generateBody(traits: CatTrait, options: ASCIIOptions): string {
  const { width, detailLevel } = options;
  const { pattern, rarity, special } = traits;
  
  let body = '';
  let patternChars = '';
  let bodyLines = [];
  
  // Generate pattern characters based on pattern type
  switch (pattern) {
    case 'striped':
      patternChars = '~~~~~~~~~';
      break;
    case 'spotted':
      patternChars = '• • • • •';
      break;
    case 'tabby':
      patternChars = '≈≈≈≈≈≈≈≈≈';
      break;
    case 'quantum':
      patternChars = '⌁⌁⌁⌁⌁⌁⌁⌁⌁';
      break;
    case 'calico':
      patternChars = '░▒░▒░▒░▒░';
      break;
    case 'none':
    default:
      patternChars = '         ';
      break;
  }
  
  // Add special traits for rare and legendary cats
  if (special) {
    patternChars = '★' + patternChars.substring(1, patternChars.length - 1) + '★';
  }
  
  // Different body shapes based on rarity
  let neckLine, bodyLine, bellyLine, pawsLine, tailLine;
  
  // Neck connection
  neckLine = '   \\_____/   ';
  
  // Body shape based on rarity
  switch (rarity) {
    case 'Legendary':
      bodyLine = '  ╱|' + patternChars + '|╲  ';
      bellyLine = ' ╱ |_______| ╲ ';
      break;
    case 'Epic':
      bodyLine = '  /|' + patternChars + '|\\  ';
      bellyLine = ' / |_______| \\ ';
      break;
    case 'Rare':
      bodyLine = '   |' + patternChars + '|   ';
      bellyLine = '   |_______|   ';
      break;
    case 'Common':
    default:
      bodyLine = '   |' + patternChars + '|   ';
      bellyLine = '   \\_______/   ';
      break;
  }
  
  // Paws
  if (detailLevel === 'high') {
    pawsLine = ' ᶠᶠᶠ     ᶠᶠᶠ ';
    tailLine = '     (_____)  ';
  } else {
    pawsLine = '  UU     UU  ';
    tailLine = '     (~~)    ';
  }
  
  // Assemble the body based on detail level
  if (detailLevel === 'high') {
    body = centerLine(neckLine, width) + '\n' + 
           centerLine(bodyLine, width) + '\n' + 
           centerLine('   |  ฅ^•ﻌ•^ฅ |   ', width) + '\n' + 
           centerLine(bellyLine, width) + '\n' + 
           centerLine(pawsLine, width) + '\n' + 
           centerLine(tailLine, width);
  } else if (detailLevel === 'medium') {
    body = centerLine(neckLine, width) + '\n' + 
           centerLine(bodyLine, width) + '\n' + 
           centerLine('   | =(^.^)= |   ', width) + '\n' + 
           centerLine(bellyLine, width) + '\n' + 
           centerLine(pawsLine, width);
  } else {
    body = centerLine(neckLine, width) + '\n' + 
           centerLine(bodyLine, width) + '\n' + 
           centerLine(bellyLine, width);
  }
  
  return body;
}

/**
 * Generate ASCII art for cat accessories based on traits
 */
function generateAccessories(traits: CatTrait, options: ASCIIOptions): string {
  const { width } = options;
  const { accessories } = traits;
  
  let accessoryArt = '';
  
  if (accessories.includes('hat')) {
    accessoryArt += centerLine('   _____   ', width) + '\n' + 
                   centerLine('  /     \\  ', width) + '\n';
  }
  
  if (accessories.includes('bowtie')) {
    accessoryArt += centerLine('  \\/\\_/\\/  ', width) + '\n';
  }
  
  if (accessories.includes('glasses')) {
    accessoryArt += centerLine('  ⊙---⊙  ', width) + '\n';
  }
  
  return accessoryArt;
}

/**
 * Generate text info for cat traits
 */
function generateTraitsInfo(traits: CatTrait, options: ASCIIOptions): string {
  const { width } = options;
  const { 
    rarity, pattern, special, 
    furLength, earShape, tailType, 
    pawStyle, quantumState, bitcoinFeatures 
  } = traits;
  
  const rarityInfo = `Rarity: ${rarity}`;
  const patternInfo = `Pattern: ${capitalize(pattern)}`;
  const specialInfo = special ? 'Special: Yes' : '';
  
  // Primary trait line (always shown)
  let info = centerText(`${rarityInfo} | ${patternInfo}${special ? ' | ' + specialInfo : ''}`, width);
  
  // Additional trait lines based on detail level
  if (options.detailLevel === 'high') {
    // Physical traits
    const physicalTraits = [
      furLength ? `Fur: ${capitalize(furLength)}` : null,
      earShape ? `Ears: ${capitalize(earShape)}` : null,
      tailType ? `Tail: ${capitalize(tailType)}` : null,
      pawStyle ? `Paws: ${capitalize(pawStyle)}` : null
    ].filter(Boolean).join(' | ');
    
    if (physicalTraits) {
      info += '\n' + centerText(physicalTraits, width);
    }
    
    // Special features based on cat type
    if (bitcoinFeatures) {
      info += '\n' + centerText('Bitcoin Feature: Satoshi Ordinal', width);
    }
    
    if (quantumState && quantumState !== 'unobserved') {
      info += '\n' + centerText(`Quantum State: ${capitalize(quantumState)}`, width);
    }
    
    if (traits.facialMarkings && traits.facialMarkings.length > 0 && !traits.facialMarkings.includes('none')) {
      info += '\n' + centerText(`Markings: ${traits.facialMarkings.map(capitalize).join(', ')}`, width);
    }
    
    if (traits.cypherpunkTraits && traits.cypherpunkTraits.length > 0) {
      info += '\n' + centerText(`Cypherpunk: ${traits.cypherpunkTraits.map(capitalize).join(', ')}`, width);
    }
  }
  
  return info;
}

/**
 * Utility to center text in a given width
 */
function centerText(text: string, width: number): string {
  const padding = Math.max(0, Math.floor((width - text.length) / 2));
  return ' '.repeat(padding) + text + ' '.repeat(width - text.length - padding);
}

/**
 * Utility to center a line in the ASCII art
 */
function centerLine(line: string, width: number): string {
  const padding = Math.max(0, Math.floor((width - line.length) / 2));
  return ' '.repeat(padding) + line + ' '.repeat(width - line.length - padding);
}

/**
 * Utility to capitalize first letter of a string
 */
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Generate more complex and advanced ASCII cats for high-tier ordinals
 */
export function generateAdvancedCatASCII(
  traits: Partial<CatTrait> = {},
  options: Partial<ASCIIOptions> = {}
): string {
  const width = options.width || 60;
  const detailLevel = options.detailLevel || 'medium';
  const colorMode = options.colorMode || 'none';
  
  // Generate a more complex and detailed ASCII art
  let art = '';
  
  // Create a frame with quantum-themed characters
  art += generateFrame('top', 'quantum', width) + '\n';
  
  // Add Bitcoin block-inspired binary data at the top
  if (traits.special) {
    art += ' ' + generateCodePattern(Math.floor(Math.random() * 1000000)) + '\n';
  }
  
  // Create a more detailed cat drawing
  const headHeight = detailLevel === 'high' ? 6 : (detailLevel === 'medium' ? 5 : 4);
  for (let i = 0; i < headHeight; i++) {
    let line = '';
    const entropy = Math.random();
    
    // Add more complex patterns based on rarity
    if (traits.rarity === 'Legendary') {
      line = ' ' + '✧'.repeat(5) + eyeSymbol(entropy + i) + '✧'.repeat(5) + ' ';
    } else if (traits.rarity === 'Epic') {
      line = ' ' + '✦'.repeat(4) + eyeSymbol(entropy + i) + '✦'.repeat(4) + ' ';
    } else if (traits.rarity === 'Rare') {
      line = ' ' + '✺'.repeat(3) + eyeSymbol(entropy + i) + '✺'.repeat(3) + ' ';
    } else {
      line = ' ' + '✹'.repeat(2) + eyeSymbol(entropy + i) + '✹'.repeat(2) + ' ';
    }
    
    art += centerLine(line, width) + '\n';
  }
  
  // Add a pattern line with the cat's pattern
  art += centerLine(patternLine(Math.random()), width) + '\n';
  
  // Add paws
  const pawLine = '   ⟨⦿⦿⦿⟩   ⟨⦿⦿⦿⟩   ';
  art += centerLine(pawLine, width) + '\n';
  
  // Add quantum state info
  const quantumState = Math.random() > 0.5 ? 'Observed' : 'Superposition';
  art += centerLine(`Quantum State: ${quantumState}`, width) + '\n';
  
  // Add detailed traits info
  art += centerLine(`Rarity: ${traits.rarity || 'Common'} | Pattern: ${capitalize(traits.pattern || 'none')}`, width) + '\n';
  
  // Add accessories info if present
  if (traits.accessories && traits.accessories.length > 0) {
    art += centerLine(`Accessories: ${traits.accessories.map(capitalize).join(', ')}`, width) + '\n';
  }
  
  // Add bottom frame
  art += generateFrame('bottom', 'quantum', width);
  
  return art;
}

/**
 * Generate a binary/hex pattern based on the block height
 */
function generateCodePattern(blockHeight: number): string {
  const blockHex = blockHeight.toString(16).padStart(8, '0');
  const pattern = [];
  
  for (let i = 0; i < 8; i++) {
    // Convert each hex digit to a 4-character binary representation
    const hexDigit = blockHex[i];
    const binary = parseInt(hexDigit, 16).toString(2).padStart(4, '0');
    pattern.push(binary);
  }
  
  return pattern.join(' ');
}

/**
 * Generate eye symbol based on entropy
 */
function eyeSymbol(entropy: number): string {
  const symbols = ['⫘', '⫛', '⫠', '⫯', '⧗', '◉', '◎', '○', '◌', '⨁'];
  const index = Math.floor(entropy * symbols.length) % symbols.length;
  return symbols[index];
}

/**
 * Generate pattern line based on entropy
 */
function patternLine(entropy: number): string {
  const patterns = [
    '▁▂▃▄▅▆▇█▇▆▅▄▃▂▁',
    '▂▃▁▃▂▄▂▇▂▄▂▃▁▃▂',
    '▔▀▔▀▔▀▔▀▔▀▔▀▔▀▔',
    '▒░▒░▒░▒░▒░▒░▒░▒░',
    '═╬═╬═╬═╬═╬═╬═╬═╬',
    '⍡⍢⍣⍤⍥⍦⍧⍨⍩⍪⍫⍬⍭⍮⍯',
    '⌁⌁⌁⎍⌁⌁⌁⎍⌁⌁⌁⎍⌁⌁⌁'
  ];
  
  const index = Math.floor(entropy * patterns.length) % patterns.length;
  return patterns[index];
}

/**
 * Specialized ASCII artists for different cat types
 */
export function generateCatTypeASCII(
  traits: Record<string, any>,
  options: Partial<ASCIIOptions> = {}
): string {
  const type = traits.type || 'quantum';
  
  switch (type) {
    case 'quantum':
      return generateQuantumCatASCII(traits);
    case 'bitcoin':
      return generateBitcoinCatASCII(traits);
    case 'cypherpunk':
      return generateCypherpunkCatASCII(traits);
    case 'schrodinger':
      return generateSchrodingerCatASCII(traits);
    default:
      return generateQuantumCatASCII(traits);
  }
}

/**
 * Generate ASCII art for quantum-state cats
 */
function generateQuantumCatASCII(traits: Record<string, any>): string {
  const width = traits.width || 60;
  const art = `
  ╭${'─'.repeat(width - 4)}╮
  │${' '.repeat(Math.floor((width - 26) / 2))}QUANTUM SUPERPOSITION CAT${' '.repeat(Math.ceil((width - 26) / 2))}│
  ├${'─'.repeat(width - 4)}┤
  │${' '.repeat(Math.floor((width - 10) / 2))}⟨Ψ|Ψ⟩ = 1${' '.repeat(Math.ceil((width - 10) / 2))}│
  │${' '.repeat(width - 4)}│
  │${' '.repeat(Math.floor((width - 18) / 2))}    /\\_____/\\    ${' '.repeat(Math.ceil((width - 18) / 2))}│
  │${' '.repeat(Math.floor((width - 18) / 2))}   /  ⊛   ⊛  \\   ${' '.repeat(Math.ceil((width - 18) / 2))}│
  │${' '.repeat(Math.floor((width - 18) / 2))}  |   >  ⦿  <   |  ${' '.repeat(Math.ceil((width - 18) / 2))}│
  │${' '.repeat(Math.floor((width - 18) / 2))}  |      ▼      |  ${' '.repeat(Math.ceil((width - 18) / 2))}│
  │${' '.repeat(Math.floor((width - 18) / 2))}   \\    =ω=    /   ${' '.repeat(Math.ceil((width - 18) / 2))}│
  │${' '.repeat(Math.floor((width - 18) / 2))}    \\==// \\==//    ${' '.repeat(Math.ceil((width - 18) / 2))}│
  │${' '.repeat(Math.floor((width - 18) / 2))}     \\_____/     ${' '.repeat(Math.ceil((width - 18) / 2))}│
  │${' '.repeat(Math.floor((width - 18) / 2))}   ╱|⌁⌁⌁⌁⌁⌁⌁|╲   ${' '.repeat(Math.ceil((width - 18) / 2))}│
  │${' '.repeat(Math.floor((width - 18) / 2))}  |  ฅ^•ﻌ•^ฅ  |  ${' '.repeat(Math.ceil((width - 18) / 2))}│
  │${' '.repeat(Math.floor((width - 18) / 2))}  ╱ |_______| ╲  ${' '.repeat(Math.ceil((width - 18) / 2))}│
  │${' '.repeat(Math.floor((width - 18) / 2))}  ᶠᶠᶠ    ᶠᶠᶠ  ${' '.repeat(Math.ceil((width - 18) / 2))}│
  │${' '.repeat(Math.floor((width - 18) / 2))}     (_____)     ${' '.repeat(Math.ceil((width - 18) / 2))}│
  │${' '.repeat(width - 4)}│
  │${' '.repeat(Math.floor((width - 49) / 2))}This cat exists in both alive and dead states simultaneously${' '.repeat(Math.ceil((width - 49) / 2))}│
  │${' '.repeat(Math.floor((width - 36) / 2))}until the block hash is observed by miners${' '.repeat(Math.ceil((width - 36) / 2))}│
  │${' '.repeat(width - 4)}│
  │${' '.repeat(Math.floor((width - 21) / 2))}Block: ${traits.blockHeight || '831045'}${' '.repeat(Math.ceil((width - 21) / 2))}│
  │${' '.repeat(Math.floor((width - 20) / 2))}Rarity: ${traits.rarity || 'Common'}${' '.repeat(Math.ceil((width - 20) / 2))}│
  │${' '.repeat(Math.floor((width - 27) / 2))}Quantum State: Superposition${' '.repeat(Math.ceil((width - 27) / 2))}│
  ╰${'─'.repeat(width - 4)}╯
`.trimStart();
  
  return art;
}

/**
 * Generate ASCII art for Bitcoin-themed cats
 */
function generateBitcoinCatASCII(traits: Record<string, any>): string {
  const width = traits.width || 60;
  const art = `
  ╭${'─'.repeat(width - 4)}╮
  │${' '.repeat(Math.floor((width - 19) / 2))}BITCOIN ORDINAL CAT${' '.repeat(Math.ceil((width - 19) / 2))}│
  ├${'─'.repeat(width - 4)}┤
  │${' '.repeat(Math.floor((width - 12) / 2))}₿₿₿₿₿₿₿₿₿₿₿₿${' '.repeat(Math.ceil((width - 12) / 2))}│
  │${' '.repeat(width - 4)}│
  │${' '.repeat(Math.floor((width - 18) / 2))}    /\\_____/\\    ${' '.repeat(Math.ceil((width - 18) / 2))}│
  │${' '.repeat(Math.floor((width - 18) / 2))}   /  ₿   ₿  \\   ${' '.repeat(Math.ceil((width - 18) / 2))}│
  │${' '.repeat(Math.floor((width - 18) / 2))}  |   ฿  *  ฿   |  ${' '.repeat(Math.ceil((width - 18) / 2))}│
  │${' '.repeat(Math.floor((width - 18) / 2))}  |      ▼      |  ${' '.repeat(Math.ceil((width - 18) / 2))}│
  │${' '.repeat(Math.floor((width - 18) / 2))}   \\    ≈₿≈    /   ${' '.repeat(Math.ceil((width - 18) / 2))}│
  │${' '.repeat(Math.floor((width - 18) / 2))}    \\=// ₿ \\=//    ${' '.repeat(Math.ceil((width - 18) / 2))}│
  │${' '.repeat(Math.floor((width - 18) / 2))}     \\_______/     ${' '.repeat(Math.ceil((width - 18) / 2))}│
  │${' '.repeat(Math.floor((width - 18) / 2))}    /|₿₿₿₿₿₿₿|\\    ${' '.repeat(Math.ceil((width - 18) / 2))}│
  │${' '.repeat(Math.floor((width - 18) / 2))}   / |₿ ₿ ₿ ₿ ₿| \\   ${' '.repeat(Math.ceil((width - 18) / 2))}│
  │${' '.repeat(Math.floor((width - 18) / 2))}  /  |_______|  \\  ${' '.repeat(Math.ceil((width - 18) / 2))}│
  │${' '.repeat(Math.floor((width - 18) / 2))}    /ƒƒƒ  ƒƒƒ\\    ${' '.repeat(Math.ceil((width - 18) / 2))}│
  │${' '.repeat(Math.floor((width - 18) / 2))}      (~~~)      ${' '.repeat(Math.ceil((width - 18) / 2))}│
  │${' '.repeat(width - 4)}│
  │${' '.repeat(Math.floor((width - 47) / 2))}HODL this rare cat and watch your portfolio moon!${' '.repeat(Math.ceil((width - 47) / 2))}│
  │${' '.repeat(width - 4)}│
  │${' '.repeat(Math.floor((width - 21) / 2))}Block: ${traits.blockHeight || '831045'}${' '.repeat(Math.ceil((width - 21) / 2))}│
  │${' '.repeat(Math.floor((width - 20) / 2))}Rarity: ${traits.rarity || 'Common'}${' '.repeat(Math.ceil((width - 20) / 2))}│
  │${' '.repeat(Math.floor((width - 22) / 2))}Token ID: ${traits.tokenId || '0x1234'}${' '.repeat(Math.ceil((width - 22) / 2))}│
  │${' '.repeat(Math.floor((width - 17) / 2))}Value: ${Math.floor(Math.random() * 10) + 1}.${Math.floor(Math.random() * 100)} BTC${' '.repeat(Math.ceil((width - 17) / 2))}│
  ╰${'─'.repeat(width - 4)}╯
`.trimStart();
  
  return art;
}

/**
 * Generate ASCII art for cypherpunk-themed cats
 */
function generateCypherpunkCatASCII(traits: Record<string, any>): string {
  const width = traits.width || 60;
  const art = `
  ╭${'─'.repeat(width - 4)}╮
  │${' '.repeat(Math.floor((width - 16) / 2))}CYPHERPUNK CAT${' '.repeat(Math.ceil((width - 16) / 2))}│
  ├${'─'.repeat(width - 4)}┤
  │${' '.repeat(Math.floor((width - 32) / 2))}0x${Math.random().toString(16).substr(2, 24)}${' '.repeat(Math.ceil((width - 32) / 2))}│
  │${' '.repeat(width - 4)}│
  │${' '.repeat(Math.floor((width - 18) / 2))}    /\\___/\\    ${' '.repeat(Math.ceil((width - 18) / 2))}│
  │${' '.repeat(Math.floor((width - 18) / 2))}   /  ▓▓ ▓▓  \\   ${' '.repeat(Math.ceil((width - 18) / 2))}│
  │${' '.repeat(Math.floor((width - 18) / 2))}  |   §  §  §   |  ${' '.repeat(Math.ceil((width - 18) / 2))}│
  │${' '.repeat(Math.floor((width - 18) / 2))}  |      ▼      |  ${' '.repeat(Math.ceil((width - 18) / 2))}│
  │${' '.repeat(Math.floor((width - 18) / 2))}   \\    ▓▓▓    /   ${' '.repeat(Math.ceil((width - 18) / 2))}│
  │${' '.repeat(Math.floor((width - 18) / 2))}    \\==╳╳╳╳==//    ${' '.repeat(Math.ceil((width - 18) / 2))}│
  │${' '.repeat(Math.floor((width - 18) / 2))}     \\_______/     ${' '.repeat(Math.ceil((width - 18) / 2))}│
  │${' '.repeat(Math.floor((width - 18) / 2))}   ╱|░▒▓█▓▒░|╲   ${' '.repeat(Math.ceil((width - 18) / 2))}│
  │${' '.repeat(Math.floor((width - 18) / 2))}  |  |▓▒░░▒▓░|  |  ${' '.repeat(Math.ceil((width - 18) / 2))}│
  │${' '.repeat(Math.floor((width - 18) / 2))}  ╱ |_______| ╲  ${' '.repeat(Math.ceil((width - 18) / 2))}│
  │${' '.repeat(Math.floor((width - 18) / 2))}  ▓▓▓     ▓▓▓  ${' '.repeat(Math.ceil((width - 18) / 2))}│
  │${' '.repeat(Math.floor((width - 18) / 2))}     (—_—)     ${' '.repeat(Math.ceil((width - 18) / 2))}│
  │${' '.repeat(width - 4)}│
  │${' '.repeat(Math.floor((width - 43) / 2))}Privacy is necessary for an open society${' '.repeat(Math.ceil((width - 43) / 2))}│
  │${' '.repeat(Math.floor((width - 34) / 2))}in the electronic age. - 94${' '.repeat(Math.ceil((width - 34) / 2))}│
  │${' '.repeat(width - 4)}│
  │${' '.repeat(Math.floor((width - 21) / 2))}Block: ${traits.blockHeight || '831045'}${' '.repeat(Math.ceil((width - 21) / 2))}│
  │${' '.repeat(Math.floor((width - 20) / 2))}Rarity: ${traits.rarity || 'Common'}${' '.repeat(Math.ceil((width - 20) / 2))}│
  │${' '.repeat(Math.floor((width - 28) / 2))}PGP Key: ${Math.random().toString(16).substr(2, 8).toUpperCase()}${' '.repeat(Math.ceil((width - 28) / 2))}│
  ╰${'─'.repeat(width - 4)}╯
`.trimStart();
  
  return art;
}

/**
 * Generate ASCII art for Schrodinger's cat
 */
function generateSchrodingerCatASCII(traits: Record<string, any>): string {
  const width = traits.width || 60;
  const isAlive = Math.random() > 0.5;
  const state = isAlive ? 'ALIVE' : 'DEAD';
  
  const art = `
  ╭${'─'.repeat(width - 4)}╮
  │${' '.repeat(Math.floor((width - 18) / 2))}SCHRÖDINGER'S CAT${' '.repeat(Math.ceil((width - 18) / 2))}│
  ├${'─'.repeat(width - 4)}┤
  │${' '.repeat(Math.floor((width - 10) / 2))}STATE: ${state}${' '.repeat(Math.ceil((width - 10) / 2))}│
  │${' '.repeat(width - 4)}│
${isAlive ? `
  │${' '.repeat(Math.floor((width - 18) / 2))}    /\\_____/\\    ${' '.repeat(Math.ceil((width - 18) / 2))}│
  │${' '.repeat(Math.floor((width - 18) / 2))}   /  ◉   ◉  \\   ${' '.repeat(Math.ceil((width - 18) / 2))}│
  │${' '.repeat(Math.floor((width - 18) / 2))}  |   •  •  •   |  ${' '.repeat(Math.ceil((width - 18) / 2))}│
  │${' '.repeat(Math.floor((width - 18) / 2))}  |      ▼      |  ${' '.repeat(Math.ceil((width - 18) / 2))}│
  │${' '.repeat(Math.floor((width - 18) / 2))}   \\    ωωω    /   ${' '.repeat(Math.ceil((width - 18) / 2))}│
  │${' '.repeat(Math.floor((width - 18) / 2))}    \\=//  \\=//    ${' '.repeat(Math.ceil((width - 18) / 2))}│` : `
  │${' '.repeat(Math.floor((width - 18) / 2))}    /\\_____/\\    ${' '.repeat(Math.ceil((width - 18) / 2))}│
  │${' '.repeat(Math.floor((width - 18) / 2))}   /  X   X  \\   ${' '.repeat(Math.ceil((width - 18) / 2))}│
  │${' '.repeat(Math.floor((width - 18) / 2))}  |   x  x  x   |  ${' '.repeat(Math.ceil((width - 18) / 2))}│
  │${' '.repeat(Math.floor((width - 18) / 2))}  |      ▼      |  ${' '.repeat(Math.ceil((width - 18) / 2))}│
  │${' '.repeat(Math.floor((width - 18) / 2))}   \\    ___    /   ${' '.repeat(Math.ceil((width - 18) / 2))}│
  │${' '.repeat(Math.floor((width - 18) / 2))}    \\=//  \\=//    ${' '.repeat(Math.ceil((width - 18) / 2))}│`}
  │${' '.repeat(Math.floor((width - 18) / 2))}     \\_______/     ${' '.repeat(Math.ceil((width - 18) / 2))}│
  │${' '.repeat(Math.floor((width - 18) / 2))}    |       |    ${' '.repeat(Math.ceil((width - 18) / 2))}│
  │${' '.repeat(Math.floor((width - 18) / 2))}    | □□□□□ |    ${' '.repeat(Math.ceil((width - 18) / 2))}│
  │${' '.repeat(Math.floor((width - 18) / 2))}    |_______|    ${' '.repeat(Math.ceil((width - 18) / 2))}│
  │${' '.repeat(Math.floor((width - 18) / 2))}    /ɯɯɯ ɯɯɯ\\    ${' '.repeat(Math.ceil((width - 18) / 2))}│
  │${' '.repeat(Math.floor((width - 18) / 2))}      (- -)      ${' '.repeat(Math.ceil((width - 18) / 2))}│
  │${' '.repeat(width - 4)}│
  │${' '.repeat(Math.floor((width - 53) / 2))}When you observe the cat, its wave function collapses${' '.repeat(Math.ceil((width - 53) / 2))}│
  │${' '.repeat(Math.floor((width - 49) / 2))}and it exists in one definite state: alive or dead${' '.repeat(Math.ceil((width - 49) / 2))}│
  │${' '.repeat(width - 4)}│
  │${' '.repeat(Math.floor((width - 21) / 2))}Block: ${traits.blockHeight || '831045'}${' '.repeat(Math.ceil((width - 21) / 2))}│
  │${' '.repeat(Math.floor((width - 20) / 2))}Rarity: ${traits.rarity || 'Common'}${' '.repeat(Math.ceil((width - 20) / 2))}│
  │${' '.repeat(Math.floor((width - 25) / 2))}Probability: ${isAlive ? '50%' : '50%'}${' '.repeat(Math.ceil((width - 25) / 2))}│
  ╰${'─'.repeat(width - 4)}╯
`.trimStart();
  
  return art;
}