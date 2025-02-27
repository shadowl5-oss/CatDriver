/**
 * Advanced ASCII Art Generator for Cat Ordinals
 * 
 * This utility creates high-quality ASCII art representations of cats with different
 * traits, expressions, and characteristics based on blockchain data and quantum states.
 */

type CatTrait = {
  rarity: string;
  pattern: string;
  eyeStyle: string;
  whiskerStyle: string;
  special: boolean;
  expression: string;
  accessories: string[];
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
  // Default options
  const finalOptions: ASCIIOptions = {
    width: 40,
    colorMode: 'none',
    detailLevel: 'medium',
    frameStyle: 'quantum',
    ...options
  };

  // Default traits
  const finalTraits: CatTrait = {
    rarity: 'common',
    pattern: 'solid',
    eyeStyle: 'normal',
    whiskerStyle: 'standard',
    special: false,
    expression: 'neutral',
    accessories: [],
    ...traits
  };

  // Build the ASCII art cat
  let result = '';

  // Add frame top if requested
  if (finalOptions.frameStyle) {
    result += generateFrame('top', finalOptions.frameStyle, finalOptions.width);
  }

  // Generate the main cat components
  const head = generateHead(finalTraits, finalOptions);
  const body = generateBody(finalTraits, finalOptions);
  const accessories = generateAccessories(finalTraits, finalOptions);

  // Combine all components
  result += head + body + accessories;

  // Add traits info
  result += generateTraitsInfo(finalTraits, finalOptions);
  
  // Add frame bottom if requested
  if (finalOptions.frameStyle) {
    result += generateFrame('bottom', finalOptions.frameStyle, finalOptions.width);
  }

  return result;
}

/**
 * Generate ASCII frame around the cat
 */
function generateFrame(position: 'top' | 'bottom', style: string, width: number): string {
  switch (style) {
    case 'quantum':
      if (position === 'top') {
        let frame = '╭' + '─'.repeat(width - 2) + '╮\n';
        frame += '│' + ' '.repeat(width - 2) + '│\n';
        frame += '│' + centerText('QUANTUM CAT ORDINAL', width - 2) + '│\n';
        frame += '│' + ' '.repeat(width - 2) + '│\n';
        return frame;
      } else {
        let frame = '│' + ' '.repeat(width - 2) + '│\n';
        frame += '╰' + '─'.repeat(width - 2) + '╯\n';
        return frame;
      }
    case 'blockchain':
      if (position === 'top') {
        let frame = '┌' + '━'.repeat(width - 2) + '┐\n';
        frame += '┃' + ' '.repeat(width - 2) + '┃\n';
        frame += '┃' + centerText('BITCOIN BLOCK #831045', width - 2) + '┃\n';
        frame += '┃' + ' '.repeat(width - 2) + '┃\n';
        return frame;
      } else {
        let frame = '┃' + ' '.repeat(width - 2) + '┃\n';
        frame += '└' + '━'.repeat(width - 2) + '┘\n';
        return frame;
      }
    case 'simple':
      if (position === 'top') {
        return '+' + '-'.repeat(width - 2) + '+\n';
      } else {
        return '+' + '-'.repeat(width - 2) + '+\n';
      }
    default:
      return '';
  }
}

/**
 * Generate ASCII art for cat head based on traits
 */
function generateHead(traits: CatTrait, options: ASCIIOptions): string {
  const { eyeStyle, expression, rarity } = traits;
  const { width } = options;
  let head = '';

  // Generate ears based on rarity
  switch (rarity.toLowerCase()) {
    case 'legendary':
      head += centerLine('  /\\___/\\  ', width) + '\n';
      head += centerLine(' /   ∆   \\ ', width) + '\n';
      break;
    case 'epic':
      head += centerLine('  /\\   /\\  ', width) + '\n';
      head += centerLine(' /  \\_/  \\ ', width) + '\n';
      break;
    case 'rare':
      head += centerLine('  /\\___/\\  ', width) + '\n';
      head += centerLine(' /  o o  \\ ', width) + '\n';
      break;
    default: // common
      head += centerLine('  /\\___/\\  ', width) + '\n';
      head += centerLine(' /       \\ ', width) + '\n';
  }

  // Generate eyes based on eye style
  let eyes = '';
  switch (eyeStyle) {
    case 'wide':
      eyes = ' O     O ';
      break;
    case 'squint':
      eyes = ' -     - ';
      break;
    case 'wink':
      eyes = ' O     - ';
      break;
    case 'quantum':
      eyes = ' @     @ ';
      break;
    default:
      eyes = ' *     * ';
  }
  head += centerLine(eyes, width) + '\n';

  // Generate expression
  let expressionLine = '';
  switch (expression) {
    case 'happy':
      expressionLine = '   \\_^_^_/   ';
      break;
    case 'sad':
      expressionLine = '   \\_v_v_/   ';
      break;
    case 'surprised':
      expressionLine = '   \\_o_o_/   ';
      break;
    case 'angry':
      expressionLine = '   \\_>_<_/   ';
      break;
    default:
      expressionLine = '   \\_u_u_/   ';
  }
  head += centerLine(expressionLine, width) + '\n';

  return head;
}

/**
 * Generate ASCII art for cat body based on traits
 */
function generateBody(traits: CatTrait, options: ASCIIOptions): string {
  const { pattern, special } = traits;
  const { width, detailLevel } = options;
  let body = '';

  // Different body patterns
  switch (pattern) {
    case 'striped':
      body += centerLine('  /       \\  ', width) + '\n';
      body += centerLine(' /  =====  \\ ', width) + '\n';
      body += centerLine('/  =======  \\', width) + '\n';
      if (detailLevel !== 'low') {
        body += centerLine('|  =======  |', width) + '\n';
        body += centerLine('\\  =====  / ', width) + '\n';
      }
      break;
    case 'spotted':
      body += centerLine('  /       \\  ', width) + '\n';
      body += centerLine(' /  o o o  \\ ', width) + '\n';
      body += centerLine('/  o o o o  \\', width) + '\n';
      if (detailLevel !== 'low') {
        body += centerLine('|  o o o o  |', width) + '\n';
        body += centerLine('\\  o o o  / ', width) + '\n';
      }
      break;
    case 'binary':
      if (special) {
        body += centerLine('  /       \\  ', width) + '\n';
        body += centerLine(' / 10110011 \\ ', width) + '\n';
        body += centerLine('/ 01001010  \\', width) + '\n';
        if (detailLevel !== 'low') {
          body += centerLine('| 11001101  |', width) + '\n';
          body += centerLine('\\ 01010101 / ', width) + '\n';
        }
      } else {
        body += centerLine('  /       \\  ', width) + '\n';
        body += centerLine(' /         \\ ', width) + '\n';
        body += centerLine('/           \\', width) + '\n';
        if (detailLevel !== 'low') {
          body += centerLine('|           |', width) + '\n';
          body += centerLine('\\         / ', width) + '\n';
        }
      }
      break;
    default: // solid
      body += centerLine('  /       \\  ', width) + '\n';
      body += centerLine(' /         \\ ', width) + '\n';
      body += centerLine('/           \\', width) + '\n';
      if (detailLevel !== 'low') {
        body += centerLine('|           |', width) + '\n';
        body += centerLine('\\         / ', width) + '\n';
      }
  }

  // Add tail
  if (detailLevel === 'high') {
    body += centerLine('  -------() ', width) + '\n';
  } else {
    body += centerLine('  -------~ ', width) + '\n';
  }

  return body;
}

/**
 * Generate ASCII art for cat accessories based on traits
 */
function generateAccessories(traits: CatTrait, options: ASCIIOptions): string {
  const { accessories, special } = traits;
  const { width } = options;
  let result = '';

  // Add accessories
  if (accessories.includes('hat')) {
    result += centerLine('    _===_    ', width) + '\n';
  }
  
  if (accessories.includes('bowtie')) {
    result += centerLine('    >X<    ', width) + '\n';
  }
  
  if (accessories.includes('glasses')) {
    // Replace the eyes line with glasses
    result += centerLine(' B=====B ', width) + '\n';
  }

  // Add special quantum effects for special cats
  if (special) {
    result += centerLine('  ~*~*~*~  ', width) + '\n';
  }

  return result;
}

/**
 * Generate text info for cat traits
 */
function generateTraitsInfo(traits: CatTrait, options: ASCIIOptions): string {
  const { width } = options;
  let result = '\n';
  
  result += centerLine('=== TRAITS ===', width) + '\n';
  result += centerLine(`Rarity: ${capitalize(traits.rarity)}`, width) + '\n';
  result += centerLine(`Pattern: ${capitalize(traits.pattern)}`, width) + '\n';
  
  if (traits.special) {
    result += centerLine('✧ Quantum Infused ✧', width) + '\n';
  }
  
  return result;
}

/**
 * Utility to center text in a given width
 */
function centerText(text: string, width: number): string {
  const padding = Math.max(0, width - text.length);
  const leftPadding = Math.floor(padding / 2);
  return ' '.repeat(leftPadding) + text + ' '.repeat(padding - leftPadding);
}

/**
 * Utility to center a line in the ASCII art
 */
function centerLine(line: string, width: number): string {
  const padding = Math.max(0, width - line.length);
  const leftPadding = Math.floor(padding / 2);
  return ' '.repeat(leftPadding) + line + ' '.repeat(padding - leftPadding);
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
  rarity: string, 
  blockHeight: number, 
  quantumState: string
): string {
  let catArt = '';
  
  // Determine size and complexity based on rarity
  const isLegendary = rarity === 'Legendary';
  const isEpic = rarity === 'Epic';
  const isRare = rarity === 'Rare';
  const entropyFactor = blockHeight % 100 / 100;
  
  // For legendary cats, use more complex ASCII art
  if (isLegendary) {
    catArt = `
          /\\_/\\  ${blockHeight} 
   ______/ o o \\______
 /\\   (  =^=^=  )    /\\
/  \\   (   v   )    /  \\
|    \\  (     )   /    |
|      \\(     )/       |
\\       (     )        /
 \\     (       )      /
  \\___/_________\\____/
      █ ${quantumState} █
${generateCodePattern(blockHeight)}
    `;
  } 
  // For epic cats
  else if (isEpic) {
    catArt = `
     /\\     /\\
    /  \\___/  \\
   /  ${eyeSymbol(entropyFactor)}   ${eyeSymbol(entropyFactor)}  \\
  /     >.<     \\
 /               \\
(   ${blockHeight}   )
(                 )
(  ${patternLine(entropyFactor)}  )
 (      v      )
  \\_${quantumState}_/
    `;
  }
  // For rare cats 
  else if (isRare) {
    catArt = `
    /\\___/\\
   /   o   \\
  /  ${eyeSymbol(entropyFactor)}   ${eyeSymbol(entropyFactor)}  \\
 (     w     )
 (  ${patternLine(entropyFactor)}  )
  \\ ${blockHeight} /
   ------
    `;
  }
  // For common cats
  else {
    catArt = `
   /\\___/\\
  /  o o  \\
 (   >.<   )
 (  ${blockHeight}  )
  ------
   `;
  }
  
  return catArt;
}

/**
 * Generate a binary/hex pattern based on the block height
 */
function generateCodePattern(blockHeight: number): string {
  // Convert block height to binary and take last 32 characters
  const binary = blockHeight.toString(2).padStart(32, '0');
  const lines = [];
  
  // Format into 4 lines of 8 characters
  for (let i = 0; i < 4; i++) {
    const start = i * 8;
    lines.push('    ' + binary.slice(start, start + 8));
  }
  
  return lines.join('\n');
}

/**
 * Generate eye symbol based on entropy
 */
function eyeSymbol(entropy: number): string {
  const symbols = ['o', '*', '@', '0', 'O', '^', '•', '⊙', '☉'];
  const index = Math.floor(entropy * symbols.length);
  return symbols[index];
}

/**
 * Generate pattern line based on entropy
 */
function patternLine(entropy: number): string {
  const patterns = [
    '-------',
    '~~~~~~~',
    '=======',
    '^^^^^^^',
    '*******',
    '#######',
    '·······',
    ':::::::',
    '|||||||'
  ];
  const index = Math.floor(entropy * patterns.length);
  return patterns[index];
}

/**
 * Specialized ASCII artists for different cat types
 */
export function generateCatTypeASCII(
  catType: string, 
  traits: Record<string, any> = {}
): string {
  switch (catType.toLowerCase()) {
    case 'quantum':
      return generateQuantumCatASCII(traits);
    case 'bitcoin':
      return generateBitcoinCatASCII(traits);
    case 'cypherpunk':
      return generateCypherpunkCatASCII(traits);
    case 'schrodinger':
      return generateSchrodingerCatASCII(traits);
    default:
      return generateCatASCII(traits);
  }
}

/**
 * Generate ASCII art for quantum-state cats
 */
function generateQuantumCatASCII(traits: Record<string, any>): string {
  const state = traits.quantumState || 'superposition';
  let ascii = '';
  
  ascii += '  ╭───── QUANTUM CAT ─────╮\n';
  ascii += '  │     ∿∿∿∿∿∿∿∿∿∿∿∿∿     │\n';
  ascii += '  │      /\\_____/\\        │\n';
  ascii += '  │     /  @   @  \\       │\n';
  
  if (state === 'superposition') {
    ascii += '  │    |  ↑ ↓ ↑ ↓  |       │\n';
    ascii += '  │    |  BOTH/NEITHER |   │\n';
  } else if (state === 'entangled') {
    ascii += '  │    |  ≈≈≈≈≈≈≈  |       │\n';
    ascii += '  │    |   LINKED   |      │\n';
  } else {
    ascii += '  │    |   >---<   |       │\n';
    ascii += '  │    |  OBSERVED  |      │\n';
  }
  
  ascii += '  │     \\  \\_ψ_/  /        │\n';
  ascii += '  │      \\       /         │\n';
  ascii += `  │       STATE: ${state.toUpperCase()}│\n`;
  ascii += '  ╰─────────────────────────╯\n';
  
  return ascii;
}

/**
 * Generate ASCII art for Bitcoin-themed cats
 */
function generateBitcoinCatASCII(traits: Record<string, any>): string {
  const blockHeight = traits.blockHeight || '831045';
  
  let ascii = '';
  ascii += '  ╭───── BITCOIN CAT ─────╮\n';
  ascii += '  │        ₿₿₿₿₿          │\n';
  ascii += '  │      /\\_____/\\        │\n';
  ascii += '  │     /  ₿   ₿  \\       │\n';
  ascii += '  │    |    ===    |       │\n';
  ascii += '  │    |   HODL!   |       │\n';
  ascii += '  │     \\  \\_^_/  /        │\n';
  ascii += '  │      \\       /         │\n';
  ascii += `  │      BLOCK: ${blockHeight}    │\n`;
  ascii += '  ╰─────────────────────────╯\n';
  
  return ascii;
}

/**
 * Generate ASCII art for cypherpunk-themed cats
 */
function generateCypherpunkCatASCII(traits: Record<string, any>): string {
  const isAnonymous = traits.anonymous || true;
  
  let ascii = '';
  ascii += '  ╭──── CYPHERPUNK CAT ────╮\n';
  ascii += '  │       #######          │\n';
  ascii += '  │      /\\_____/\\        │\n';
  ascii += '  │     /  •   •  \\       │\n';
  ascii += '  │    |  ┏━━━━━┓  |       │\n';
  ascii += '  │    |    ▲    |         │\n';
  ascii += '  │     \\  \\_✓_/  /        │\n';
  ascii += '  │      \\       /         │\n';
  ascii += `  │   ${isAnonymous ? 'ANONYMOUS' : 'IDENTIFIED'}      │\n`;
  ascii += '  ╰─────────────────────────╯\n';
  
  return ascii;
}

/**
 * Generate ASCII art for Schrodinger's cat
 */
function generateSchrodingerCatASCII(traits: Record<string, any>): string {
  const isObserved = traits.isObserved || false;
  
  let ascii = '';
  ascii += '  ╭─── SCHRÖDINGER\'S CAT ───╮\n';
  ascii += '  │    ┌───────────┐       │\n';
  
  if (isObserved) {
    ascii += '  │    │  /\\_____/\\  │       │\n';
    ascii += '  │    │ /  ^   ^  \\ │       │\n';
    ascii += '  │    │|    >.<    |│       │\n';
    ascii += '  │    │ \\  \\_^_/  / │       │\n';
    ascii += '  │    │  \\       /  │       │\n';
    ascii += '  │    │   ALIVE!    │       │\n';
  } else {
    ascii += '  │    │             │       │\n';
    ascii += '  │    │   ?????     │       │\n';
    ascii += '  │    │             │       │\n';
    ascii += '  │    │  UNKNOWN    │       │\n';
    ascii += '  │    │             │       │\n';
    ascii += '  │    │             │       │\n';
  }
  
  ascii += '  │    └───────────┘       │\n';
  ascii += `  │    STATUS: ${isObserved ? 'OBSERVED' : 'SUPERPOSITION'}│\n`;
  ascii += '  ╰─────────────────────────╯\n';
  
  return ascii;
}