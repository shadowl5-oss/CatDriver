
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
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
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center z-10 px-4">
        <div className="max-w-md text-center mb-12 bg-black/40 backdrop-blur-lg p-8 rounded-lg border border-purple-900/50">
          <h1 className="text-6xl font-bold text-white mb-6">404</h1>
          <p className="text-xl text-gray-300 mb-8">
            This cat seems to have quantum tunneled to another dimension.
          </p>
          <Link href="/">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-6 py-4">
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
