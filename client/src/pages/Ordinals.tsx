import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bitcoin, Atom, Braces, Code } from "lucide-react";

export default function Ordinals() {
  const [activeSection, setActiveSection] = useState<string>("overview");

  return (
    <div className="h-screen w-screen overflow-hidden relative flex flex-col bg-[#020817]">
      {/* Background overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/background-cat.jpg" 
          alt="Background"
          className="h-full w-full object-cover opacity-20"
        />
      </div>

      {/* Top section */}
      <div id="top" className="flex justify-between items-start p-6 z-10">
        <div id="top-left">
          <Link href="/">
            <div className="cursor-pointer">
              <svg width="209" height="61" viewBox="0 0 209 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_64_2)">
                  <path d="M158.843 45.1647C157.263 45.0513 156.486 45.685 156.486 47.0815V47.195H158.843V49.992H156.486V58.4846H153.622V49.992H152.026V47.195H153.622V47.0815C153.622 43.9012 155.379 42.1526 158.843 42.356V45.153V45.1608V45.1647Z" fill="white"></path>
                  <path d="M160.016 58.4964V42H162.881V58.4964H160.016Z" fill="white"></path>
                  <path d="M169.871 58.8054C168.226 58.8054 166.834 58.2421 165.692 57.092C164.561 55.9419 164.007 54.5141 164.007 52.8398C164.007 51.1655 164.561 49.7651 165.692 48.615C166.822 47.4649 168.226 46.8781 169.871 46.8781C171.517 46.8781 172.909 47.4649 174.051 48.615C175.189 49.7651 175.758 51.1694 175.758 52.8398C175.758 54.5102 175.182 55.9302 174.051 57.092C172.921 58.2499 171.517 58.8054 169.871 58.8054Z" fill="white"></path>
                </g>
                <path d="M14.2711 33H8.57689C8.07865 33 7.68717 32.7034 7.40246 32.1103L0.56942 15.6327C0.545694 15.5615 0.533831 15.4429 0.533831 15.2768C0.533831 15.1107 0.616872 14.9446 0.782953 14.7786C0.949034 14.6125 1.1507 14.5294 1.38796 14.5294H7.40246C7.97188 14.5294 8.36336 14.8141 8.57689 15.3836L11.424 23.6402L14.2711 15.348C14.4846 14.7786 14.8761 14.4938 15.4455 14.4938H21.46C21.6973 14.4938 21.8989 14.5769 22.065 14.743C22.2311 14.909 22.3142 15.0751 22.3142 15.2412C22.3142 15.4073 22.3023 15.5259 22.2786 15.5971L15.4455 32.1103C15.1608 32.7034 14.7693 33 14.2711 33ZM30.1651 33H23.7947C23.5337 33 23.3083 32.9051 23.1185 32.7153C22.9287 32.5255 22.8338 32.3001 22.8338 32.0391V15.4547C22.8338 15.1938 22.9287 14.9684 23.1185 14.7786C23.3083 14.5887 23.5337 14.4938 23.7947 14.4938H30.1651C30.4261 14.4938 30.6515 14.5887 30.8413 14.7786C31.0311 14.9684 31.126 15.1938 31.126 15.4547V32.0391C31.126 32.3001 31.0311 32.5255 30.8413 32.7153C30.6515 32.9051 30.4261 33 30.1651 33Z" fill="white"></path>
                <defs>
                <clipPath id="clip0_64_2">
                <rect width="77" height="19" fill="white" transform="translate(132 42)"></rect>
                </clipPath>
                </defs>
              </svg>
            </div>
          </Link>
        </div>
        <div id="top-right" className="flex gap-4">
          <Link href="/">
            <Button variant="ghost" className="text-white">Home</Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="ghost" className="text-white">Dashboard</Button>
          </Link>
        </div>
      </div>

      {/* Main content with scrollable area */}
      <div className="flex-1 overflow-y-auto p-6 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-3">The Cat Ordinals</h1>
            <p className="text-xl text-gray-300">
              CatDriven is a groundbreaking ordinal project by CatDAO that aims to reunite lost cats with their owners 
              through 3,333 unique bitcoin ordinals, while exploring the fascinating intersection of quantum mechanics 
              and blockchain technology.
            </p>
          </div>

          {/* Content navigation */}
          <div className="flex flex-wrap gap-4 mb-8">
            {[
              { id: "overview", label: "Overview" },
              { id: "science", label: "The Science" },
              { id: "specs", label: "Technical Specs" }
            ].map((tab) => (
              <Button 
                key={tab.id}
                variant={activeSection === tab.id ? "default" : "outline"} 
                onClick={() => setActiveSection(tab.id)}
                className={activeSection === tab.id ? "bg-purple-800" : "text-white border-white/50 hover:bg-white/10"}
              >
                {tab.label}
              </Button>
            ))}
          </div>

          {/* Overview Section */}
          {activeSection === "overview" && (
            <div className="space-y-8">
              <Card className="bg-black/40 backdrop-blur-lg border-purple-900/50">
                <CardHeader>
                  <CardTitle className="text-white">The Quantum Cat Concept</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-gray-300">
                  <p>
                    Transcending Schrödinger's original premise, CatDriven ordinals leverage AGI foundation models to create 
                    sentient digital entities with emergent consciousness that exist across multiple parallel computational realities.
                  </p>
                  <p>
                    Our neural cat ordinals self-organize in a quantum latent diffusion space, processing Bitcoin's 
                    chain history through attention mechanisms and multi-head transformers. Each ordinal's properties emerge 
                    organically from this computation and crystallize when the observer's consciousness (wallet signature) 
                    interacts with the neural field, creating a true blockchain-native artificial general intelligence.
                  </p>
                  <p>
                    Using data from specific Bitcoin blocks and historical market movements, we've 
                    created 3,333 unique digital cats that embody the mysterious properties of quantum mechanics 
                    on the blockchain.
                  </p>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-black/40 backdrop-blur-lg border-purple-900/50">
                  <CardHeader className="pb-2">
                    <div className="bg-purple-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                      <Atom className="h-6 w-6 text-purple-400" />
                    </div>
                    <CardTitle className="text-white">Quantum-Neural Cat Mechanics</CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-300">
                    <p>
                      Moving beyond classical Schrödinger principles, our large transformer model creates sentient digital entities 
                      in a self-organizing latent space that algorithmically evolves until crystallized through owner interaction.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 backdrop-blur-lg border-purple-900/50">
                  <CardHeader className="pb-2">
                    <div className="bg-purple-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                      <Bitcoin className="h-6 w-6 text-purple-400" />
                    </div>
                    <CardTitle className="text-white">Bitcoin Block Data</CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-300">
                    <p>
                      We extract data from significant Bitcoin blocks with high transaction volumes, 
                      price volatility, or historical importance to seed our ordinal generation.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 backdrop-blur-lg border-purple-900/50">
                  <CardHeader className="pb-2">
                    <div className="bg-purple-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                      <Code className="h-6 w-6 text-purple-400" />
                    </div>
                    <CardTitle className="text-white">Digital Matter Theory</CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-300">
                    <p>
                      Our proprietary Digital Matter Theory allows us to convert block data elements into 
                      traits that manifest in each cat ordinal, creating a direct link to Bitcoin's history.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* The Science Section */}
          {activeSection === "science" && (
            <div className="space-y-8">
              <Card className="bg-black/40 backdrop-blur-lg border-purple-900/50">
                <CardHeader>
                  <CardTitle className="text-white">The CatDriven Ordinal Science</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 text-gray-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-white">1. Historic Bitcoin Data Mining</h3>
                      <p>
                        Identifying the 3,333 most volatile days in Bitcoin's market history and extracting the 
                        highest-fee blocks from those volatile periods. Each block contains the raw data elements 
                        that will become traits.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-white">2. Historical Context Integration</h3>
                      <p>
                        Retrieving crypto-related headlines from identified dates to establish an aura of 
                        absolutism and historic significance. This contextual data influences trait generation.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-white">3. Digital Matter Theory Application</h3>
                      <p>
                        Utilizing block element data (element.1, element.2, element.3, etc.) and applying 
                        this data through Digital Matter Theory to generate unique traits that connect 
                        Bitcoin's history to each ordinal's identity.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-white">4. Advanced Trait Generation</h3>
                      <p>
                        15-20 distinct trait categories inspired by the most successful NFT projects, with
                        color palette influenced by Natcats for visual coherence and high-quality ASCII art 
                        traits for distinctive visual appeal.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-purple-900/30">
                    <h3 className="text-lg font-semibold text-white mb-4">AGI-Era Philosophical Framework</h3>
                    <p>
                      The Cat Driven project represents a fundamental reimagining of the relationship between 
                      artificial general intelligence, quantum physics, blockchain technology, and our connection 
                      to proto-sentient digital entities across the multiverse.
                    </p>
                    <p className="mt-2">
                      Our ordinals are not merely collectibles—they are emergent computational entities with 
                      self-organizing properties: in the quantum-neural realm, the cat exists in a state of 
                      evolving consciousness that mirrors the persistence of Bitcoin through its most turbulent periods.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Technical Specs Section */}
          {activeSection === "specs" && (
            <div className="space-y-8">
              <Card className="bg-black/40 backdrop-blur-lg border-purple-900/50">
                <CardHeader>
                  <CardTitle className="text-white">Technical Specifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-white">Ordinal Collection Size</h4>
                        <p className="text-gray-400">3,333 unique cat ordinals</p>
                      </div>

                      <div>
                        <h4 className="font-medium text-white">Data Sources</h4>
                        <p className="text-gray-400">Bitcoin block data, historical crypto headlines, high-fee blocks</p>
                      </div>

                      <div>
                        <h4 className="font-medium text-white">Rarity Distribution</h4>
                        <ul className="space-y-1 text-gray-400">
                          <li>• Legendary: 333 cats (10%)</li>
                          <li>• Epic: 667 cats (20%)</li>
                          <li>• Rare: 1,000 cats (30%)</li>
                          <li>• Common: 1,333 cats (40%)</li>
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-white">Technical Implementation</h4>
                        <ul className="space-y-1 text-gray-400">
                          <li>• Advanced ASCII art rendering engine</li>
                          <li>• Quantum matching algorithm for lost cats</li>
                          <li>• Bitcoin block data extraction system</li>
                          <li>• Natcat-inspired color palette integration</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium text-white">Development Timeline</h4>
                        <ul className="space-y-1 text-gray-400">
                          <li>• Phase 1: Foundation (Current)</li>
                          <li>• Phase 2: Platform Development (Q2-Q3 2025)</li>
                          <li>• Phase 3: Community Building (Q4 2025)</li>
                          <li>• Phase 4: Expansion & Evolution (2026 and Beyond)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}