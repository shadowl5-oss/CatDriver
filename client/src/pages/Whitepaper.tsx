import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';

export default function Whitepaper() {
  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <div className="mb-6">
        <Link to="/" className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>
      </div>
      
      <h1 className="text-4xl font-bold mb-2">CatDAO Whitepaper</h1>
      <p className="text-muted-foreground mb-8">A technical overview of the CatDAO ecosystem</p>
      
      <Separator className="my-6" />
      
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="mb-4">
                CatDAO represents a paradigm shift in digital pet collectibles, combining quantum-inspired blockchain technology with a decentralized community-driven approach to lost pet services.
              </p>
              <p>
                This whitepaper outlines the technical architecture, tokenomics, governance structure, and roadmap for the CatDAO ecosystem, providing a comprehensive overview of our vision and implementation.
              </p>
            </CardContent>
          </Card>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-4">2. Technical Architecture</h2>
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-3">2.1 Quantum-Inspired Blockchain</h3>
              <p className="mb-4">
                Our infrastructure leverages quantum computing principles to create a unique consensus mechanism called Quantum State Verification (QSV). This allows for:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Superposition state for collectibles - existing in multiple states until observed</li>
                <li>Quantum entropy for true randomness in trait generation</li>
                <li>Entanglement between related digital assets</li>
                <li>Quantum-resistant cryptography ensuring future-proof security</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">2.2 Dual-Chain Architecture</h3>
              <p className="mb-4">
                CatDAO operates on both Bitcoin and Ethereum networks:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Bitcoin Ordinals for unique, immutable cat collectibles</li>
                <li>Ethereum smart contracts for governance, staking, and marketplace functionality</li>
                <li>Cross-chain bridge ensuring seamless interoperability</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">2.3 Visualization Technology</h3>
              <p className="mb-4">
                Our platform features advanced visualization capabilities:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>ASCII art representation for chain-embedded metadata</li>
                <li>Canvas-based dynamic rendering of pet collectibles</li>
                <li>On-chain SVG generation for guaranteed perpetual access</li>
                <li>Audio integration for personalized pet music themes</li>
              </ul>
            </CardContent>
          </Card>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-4">3. Tokenomics</h2>
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-3">3.1 CDV Token</h3>
              <p className="mb-4">
                The native utility token of the CatDAO ecosystem functions as:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Governance - voting rights proportional to token holdings</li>
                <li>Fee distribution - platform fees distributed to token stakers</li>
                <li>Access - token-gated premium features and early access</li>
                <li>Incentives - rewards for active participation in pet recovery</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-3">3.2 Token Distribution</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="font-medium">Initial Supply: 100,000,000 CDV</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
                    <li>Community Treasury: 40%</li>
                    <li>Core Team: 15%</li>
                    <li>Early Backers: 10%</li>
                    <li>Ecosystem Development: 20%</li>
                    <li>Liquidity Provision: 15%</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium">Vesting Schedule</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
                    <li>Community Treasury: 4-year linear vesting</li>
                    <li>Core Team: 3-year linear vesting, 1-year cliff</li>
                    <li>Early Backers: 2-year linear vesting, 6-month cliff</li>
                    <li>Ecosystem: 3-year linear vesting</li>
                    <li>Liquidity: 50% unlocked, 50% 1-year vesting</li>
                  </ul>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-3">3.3 Deflationary Mechanisms</h3>
              <p className="mb-4">
                CatDAO implements several mechanisms to ensure long-term token value:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Buy and burn - 30% of marketplace fees used to buy and burn CDV</li>
                <li>Staking rewards - tiered rewards for locking tokens</li>
                <li>Quantum halving - token emission rate halves every 42,000 blocks</li>
                <li>Marketplace royalties - 5% of secondary sales contribute to treasury</li>
              </ul>
            </CardContent>
          </Card>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-4">4. Governance</h2>
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-3">4.1 DAO Structure</h3>
              <p className="mb-4">
                CatDAO governance follows a multi-tiered approach:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Token holders - vote on proposals proportional to holdings</li>
                <li>Cat Council - elected representatives for day-to-day decisions</li>
                <li>Technical Committee - oversees protocol upgrades and security</li>
                <li>Community Guardians - ensures alignment with core values</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-3">4.2 Proposal Process</h3>
              <p className="mb-4">
                Proposals follow a structured lifecycle:
              </p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Ideation - community discussion and refinement</li>
                <li>Formal submission - requires 1% of token supply to submit</li>
                <li>Voting period - 7-day voting window with 66% quorum</li>
                <li>Implementation - executed automatically via smart contracts</li>
                <li>Review - post-implementation analysis and feedback</li>
              </ol>
            </CardContent>
          </Card>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-4">5. Lost Pet Recovery Network</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="mb-4">
                A core component of the CatDAO ecosystem is our revolutionary approach to lost pet recovery:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Decentralized alert system - broadcasts to community members in vicinity</li>
                <li>Incentivized reporting - token rewards for verified sightings</li>
                <li>AI-assisted identification - matches photos to lost pet database</li>
                <li>Permanent blockchain record - immutable history of pet ownership</li>
                <li>Music themes - personalized audio profiles to enhance engagement</li>
              </ul>
              
              <p>
                The network leverages both blockchain technology and real-world community action to create the most effective pet recovery system ever developed.
              </p>
            </CardContent>
          </Card>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-4">6. Roadmap</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold">Q1 2025: Genesis</h3>
                  <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1">
                    <li>Initial collection of 3,333 quantum cat ordinals</li>
                    <li>Core platform launch with marketplace</li>
                    <li>CDV token generation event</li>
                    <li>Governance framework implementation</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold">Q2 2025: Expansion</h3>
                  <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1">
                    <li>Lost pet recovery network beta launch</li>
                    <li>Staking and rewards mechanism activation</li>
                    <li>Mobile application release</li>
                    <li>Cross-chain bridge deployment</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold">Q3 2025: Integration</h3>
                  <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1">
                    <li>Partnerships with animal shelters and rescue organizations</li>
                    <li>API release for third-party developers</li>
                    <li>Advanced visualization tools and creator studio</li>
                    <li>Enhanced music theme library and creator tools</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold">Q4 2025: Evolution</h3>
                  <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1">
                    <li>Quantum-resistant cryptography upgrade</li>
                    <li>Global expansion of lost pet network</li>
                    <li>Advanced DAO voting mechanisms</li>
                    <li>Metaverse integration for virtual pet spaces</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold">2026 and Beyond</h3>
                  <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1">
                    <li>Full transition to community governance</li>
                    <li>Integration with real-world pet services</li>
                    <li>Expansion to additional pet species</li>
                    <li>Implementation of true quantum computation elements</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-4">7. Conclusion</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="mb-4">
                CatDAO represents a revolutionary convergence of blockchain technology, quantum principles, and community-driven pet services. By creating both a vibrant digital collectible ecosystem and a practical real-world utility, we establish a new paradigm for how blockchain can positively impact society.
              </p>
              <p className="mb-4">
                Our commitment to technological innovation, community governance, and animal welfare positions CatDAO at the forefront of meaningful blockchain applications. We invite you to join us in this journey toward a more connected and compassionate future.
              </p>
              <p className="text-sm text-muted-foreground italic">
                This whitepaper is a living document that will evolve alongside the CatDAO ecosystem. All technical specifications are subject to change based on governance decisions and technological advancements.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
      
      <div className="flex justify-center mt-12 mb-8">
        <p className="text-sm text-muted-foreground">© 2025 CatDAO. All rights reserved.</p>
      </div>
    </div>
  );
}