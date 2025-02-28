
import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { Button } from "@/components/ui/button";
import { Bitcoin, Atom, AtomIcon } from "lucide-react";

export default function Home() {
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
                  <path d="M169.871 58.8054C168.226 58.8054 166.834 58.2421 165.692 57.092C164.561 55.9419 164.007 54.5141 164.007 52.8398C164.007 51.1655 164.561 49.7651 165.692 48.615C166.822 47.4649 168.226 46.8781 169.871 46.8781C171.517 46.8781 172.909 47.4649 174.051 48.615C175.189 49.7651 175.758 51.1694 175.758 52.8398C175.758 54.5102 175.182 55.9302 174.051 57.092C172.921 58.2499 171.517 58.8054 169.871 58.8054ZM169.871 55.9576C170.736 55.9576 171.452 55.6642 172.028 55.0774C172.605 54.4906 172.894 53.7474 172.894 52.8437C172.894 51.9401 172.605 51.1968 172.028 50.61C171.452 50.0233 170.736 49.7299 169.871 49.7299C169.006 49.7299 168.291 50.0233 167.714 50.61C167.16 51.1968 166.872 51.9401 166.872 52.8437C166.872 53.7474 167.16 54.4906 167.714 55.0774C168.291 55.6642 169.006 55.9576 169.871 55.9576Z" fill="white"></path>
                  <path d="M178.069 57.092C176.962 55.9419 176.4 54.5376 176.4 52.8398C176.4 51.1421 176.954 49.7494 178.069 48.5876C179.2 47.4375 180.603 46.8742 182.264 46.8742C183.925 46.8742 186.329 48.0087 187.236 49.7886L184.775 51.2555C184.333 50.3245 183.372 49.7455 182.241 49.7455C180.534 49.7455 179.265 51.0364 179.265 52.8359C179.265 54.6354 179.554 54.4593 180.107 55.0461C180.661 55.6094 181.376 55.9028 182.241 55.9028C183.106 55.9028 184.352 55.3395 184.791 54.4085L187.279 55.852C186.302 57.6397 184.414 58.7898 182.257 58.7898C180.588 58.7898 179.192 58.2265 178.062 57.0764L178.069 57.0842V57.092Z" fill="white"></path>
                  <path d="M195.703 47.1989H198.568V58.5003H195.703V57.2368C195.015 58.2969 193.908 58.8211 192.393 58.8211C190.878 58.8211 190.17 58.4142 189.37 57.581C188.594 56.7478 188.19 55.6133 188.19 54.1464V47.1989H191.054V53.7748C191.054 55.2847 191.92 56.0984 193.25 56.0984C194.581 56.0984 195.696 55.1752 195.696 53.3014V47.1989H195.703Z" fill="white"></path>
                  <path d="M205.293 51.6428C206.912 51.987 209.023 52.7694 209 55.1909C209 56.3409 208.573 57.2485 207.708 57.8822C206.866 58.4925 205.801 58.8054 204.532 58.8054C202.248 58.8054 200.691 57.8979 199.864 56.1141L202.352 54.6862C202.69 55.6564 203.394 56.1532 204.524 56.1532C205.655 56.1532 206.055 55.8363 206.055 55.183C206.055 54.5297 205.163 54.2364 204.032 53.943C202.386 53.5087 200.325 52.8163 200.325 50.4692C200.325 48.1221 200.725 48.4781 201.521 47.8522C202.34 47.1989 203.34 46.882 204.543 46.882C206.339 46.882 207.896 47.7387 208.762 49.28L206.316 50.6335C205.962 49.8668 205.362 49.4834 204.536 49.4834C203.709 49.4834 203.244 49.8433 203.244 50.4144C203.244 51.0247 204.136 51.3689 205.266 51.6545L205.289 51.6467L205.293 51.6428Z" fill="white"></path>
                  <path d="M138.533 51.8697C139.206 52.5855 139.56 53.497 139.56 54.5415C139.56 55.586 139.206 56.4974 138.533 57.2446C137.86 57.9605 137.06 58.3204 136.099 58.3204C135.138 58.3204 134.338 57.9605 133.826 57.2759V58.1248H132V48.0908H133.826V51.8032C134.372 51.0873 135.107 50.7587 136.099 50.7587C137.091 50.7587 137.86 51.1186 138.533 51.8658V51.8697ZM135.745 56.5952C136.322 56.5952 136.772 56.3996 137.153 56.0397C137.533 55.6798 137.729 55.1596 137.729 54.5728C137.729 53.986 137.537 53.497 137.153 53.1058C136.768 52.7146 136.318 52.519 135.745 52.519C135.172 52.519 134.719 52.7146 134.338 53.1058C133.953 53.4657 133.792 53.9547 133.792 54.5728C133.792 55.1909 133.984 55.6485 134.338 56.0397C134.722 56.3996 135.172 56.5952 135.745 56.5952Z" fill="white"></path>
                  <path d="M145.45 50.9582H147.404L144.843 58.1248C144.105 60.1785 142.92 61.09 141.128 60.9922V59.267C142.09 59.267 142.632 58.8758 142.986 57.8979L140.102 50.9582H142.086L143.912 55.7815L145.481 50.9582H145.45Z" fill="white"></path>
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
          <Link href="/dashboard">
            <Button variant="ghost" className="text-white">Dashboard</Button>
          </Link>
          <Link href="/ordinals">
            <Button variant="ghost" className="text-white">Ordinals</Button>
          </Link>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center z-10 px-4">
        <div className="max-w-3xl text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Quantum Neural Cat Mechanics</h1>
          <p className="text-xl text-gray-300 mb-8">
            Transcending quantum entanglement through 3,333 unique Bitcoin ordinals. 
            Where blockchain meets consciousness.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/ordinals">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-6 text-lg">
                Explore Ordinals
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                Connect Wallet
              </Button>
            </Link>
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
