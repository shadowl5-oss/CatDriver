import React from 'react';

interface SimpleAsciiArtProps {
  type?: 'quantum' | 'bitcoin' | 'cypherpunk' | 'schrodinger' | 'generic';
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  showBorder?: boolean;
  isProfileImage?: boolean;
}

const CATS = {
  quantum: `
  ╭────────────────────────────╮
  │   QUANTUM SUPERPOSITION    │
  ├────────────────────────────┤
  │                            │
  │        /\\_____/\\           │
  │       /  ⊛   ⊛  \\          │
  │      |   >  ⦿  <   |       │
  │      |      ▼      |       │
  │       \\    =ω=    /        │
  │       /|⌁⌁⌁⌁⌁⌁⌁|\\          │
  │      |  ฅ^•ﻌ•^ฅ  |          │
  │       \\=//  \\=//           │
  │                            │
  │    Schrödinger's Box       │
  ╰────────────────────────────╯
  `,
  bitcoin: `
  ╭────────────────────────────╮
  │     BITCOIN ORDINAL CAT    │
  ├────────────────────────────┤
  │        ₿₿₿₿₿₿₿₿            │
  │        /\\_____/\\           │
  │       /  ₿   ₿  \\          │
  │      |   ฿  *  ฿   |       │
  │      |      ▼      |       │
  │       \\    ≈₿≈    /        │
  │       /|₿₿₿₿₿₿₿|\\          │
  │      |  ฅ^•ﻌ•^ฅ  |          │
  │       \\=//₿\\=//           │
  │                            │
  │     HODL your CatCoin      │
  ╰────────────────────────────╯
  `,
  cypherpunk: `
  ╭────────────────────────────╮
  │     CYPHERPUNK CAT         │
  ├────────────────────────────┤
  │      0xf91a3bc24e          │
  │        /\\_____/\\           │
  │       /  ▓▓ ▓▓  \\          │
  │      |   §  §  §   |       │
  │      |      ▼      |       │
  │       \\    ▓▓▓    /        │
  │       /|░▒▓█▓▒░|\\          │
  │      |  |▓▒░░▒▓░|  |       │
  │       \\=//╳╳\\=//           │
  │                            │
  │   Privacy is necessary     │
  ╰────────────────────────────╯
  `,
  schrodinger: `
  ╭────────────────────────────╮
  │     SCHRÖDINGER'S CAT      │
  ├────────────────────────────┤
  │        STATE: ALIVE        │
  │        /\\_____/\\           │
  │       /  ◉   ◉  \\          │
  │      |   •  •  •   |       │
  │      |      ▼      |       │
  │       \\    ωωω    /        │
  │       /|_______|\\          │
  │      |  | □□□ |  |         │
  │       \\==//\\==//           │
  │                            │
  │      Quantum State         │
  ╰────────────────────────────╯
  `,
  generic: `
  ╭────────────────────────────╮
  │         CAT ASCII          │
  ├────────────────────────────┤
  │                            │
  │       /\\___/\\              │
  │      /  •   •  \\           │
  │     |          |           │
  │     |     ▼    |           │
  │      \\  =ω=   /            │
  │      /       \\             │
  │     |  =^.^=  |            │
  │      \\_______/             │
  │                            │
  │    Rarity: Legendary       │
  ╰────────────────────────────╯
  `
};

export default function SimpleAsciiArt({
  type = 'generic',
  width = 200,
  height = 200,
  className = '',
  style = {},
  showBorder = false,
  isProfileImage = false
}: SimpleAsciiArtProps) {

  // Styling for the ASCII art display
  const containerStyle: React.CSSProperties = {
    width: `${width}px`,
    height: `${height}px`,
    fontSize: isProfileImage ? '3px' : '6px',
    lineHeight: isProfileImage ? '3px' : '6px',
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
    padding: '2px',
    ...style
  };

  return (
    <div className={className} style={containerStyle}>
      <pre>{CATS[type] || CATS.generic}</pre>
    </div>
  );
}