
import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import OrdinalVisualizer from "@/components/OrdinalVisualizer";
import CatCollection from "@/components/dashboard/CatCollection";
import TokenPriceCard from "@/components/dashboard/TokenPriceCard";
import ProposalList from "@/components/dashboard/ProposalList";
import { AtomIcon } from "lucide-react";

export default function Dashboard() {
  const [activeSound, setActiveSound] = useState<string | null>(null);
  const [volumes, setVolumes] = useState<{[key: string]: number}>({});
  
  const toggleSound = (sound: string) => {
    if (activeSound === sound) {
      setActiveSound(null);
    } else {
      setActiveSound(sound);
    }
  };

  const adjustVolume = (sound: string, volume: number) => {
    setVolumes({...volumes, [sound]: volume});
  };

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
          <Link href="/ordinals">
            <Button variant="ghost" className="text-white">Ordinals</Button>
          </Link>
        </div>
      </div>

      {/* Main content with scrollable area */}
      <div className="flex-1 overflow-y-auto p-6 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            <div className="lg:col-span-3">
              <OrdinalVisualizer className="h-full min-h-[300px] bg-black/40 backdrop-blur-lg border border-purple-900/50 rounded-lg" />
            </div>
            <div>
              <TokenPriceCard />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <CatCollection />
            </div>
            <div>
              <ProposalList />
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom section */}
      <div id="bottom" className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 z-10">
        <div id="bottom-left" className="bg-black/30 backdrop-blur-sm rounded-lg p-4">
          <h3 className="text-white text-lg mb-3">Currently Playing</h3>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded bg-purple-800/50 flex items-center justify-center">
              <AtomIcon className="text-white" />
            </div>
            <div>
              <p className="text-white font-medium">Quantum Purr</p>
              <p className="text-gray-400 text-sm">Neural Resonance Frequency</p>
            </div>
          </div>
        </div>
        
        <div id="bottom-right" className="bg-black/30 backdrop-blur-sm rounded-lg p-4">
          <h3 className="text-white text-lg mb-3">Ambient Sounds</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { emoji: "🧠", name: "Neural Net", sound: "NeuralNet" },
              { emoji: "⚛️", name: "Quantum Field", sound: "QuantumField" },
              { emoji: "🔮", name: "Probability Wave", sound: "ProbabilityWave" },
              { emoji: "🌌", name: "Cosmic Purr", sound: "CosmicPurr" }
            ].map((item) => (
              <div key={item.sound} className="sound-control">
                <button 
                  onClick={() => toggleSound(item.sound)}
                  className={`flex flex-col items-center justify-center p-2 rounded-md w-full ${activeSound === item.sound ? 'bg-purple-900/80' : 'bg-black/40 hover:bg-black/60'}`}
                >
                  <span className="text-2xl mb-1">{item.emoji}</span>
                  <span className="text-white text-xs">{item.name}</span>
                </button>
                {activeSound === item.sound && (
                  <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.05" 
                    value={volumes[item.sound] || 0.5}
                    onChange={(e) => adjustVolume(item.sound, parseFloat(e.target.value))}
                    className="w-full mt-2 accent-purple-500" 
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
