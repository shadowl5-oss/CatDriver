import { useLocation, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import CatLogo from "@/components/CatLogo";

type SidebarProps = {
  isVisible?: boolean;
};

export default function Sidebar({ isVisible = true }: SidebarProps) {
  const [location] = useLocation();
  
  const { data: currentUser } = useQuery({
    queryKey: ['/api/current-user'],
  });

  const navItems = [
    { path: "/", label: "Dashboard", icon: "fa-chart-line" },
    { path: "/portfolio", label: "Portfolio", icon: "fa-briefcase" },
    { path: "/marketplace", label: "Marketplace", icon: "fa-store" },
    { path: "/governance", label: "Governance", icon: "fa-vote-yea" },
    { path: "/staking", label: "Staking", icon: "fa-layer-group" },
    { path: "/lost-pets", label: "Lost Pets", icon: "fa-paw" },
    { path: "/presentation", label: "Presentation", icon: "fa-file-powerpoint" },
  ];

  // If not visible on mobile, hide completely
  const visibilityClass = isVisible ? "block" : "hidden md:block";

  return (
    <aside className={`bg-card w-64 flex-shrink-0 ${visibilityClass} border-r border-border`}>
      <div className="h-full flex flex-col">
        {/* Logo */}
        <div className="p-4 flex items-center space-x-2 border-b border-border">
          <div className="text-primary p-1 rounded-lg">
            <CatLogo width={36} height={36} />
          </div>
          <h1 className="font-bold text-xl font-[Orbitron]">Cat<span className="text-primary">Driven</span></h1>
        </div>
        
        {/* Nav Links */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              href={item.path}
              className={`flex items-center px-4 py-3 rounded-lg mb-1 transition-colors duration-200 
              ${location === item.path 
                ? "text-primary bg-primary/10 font-medium" 
                : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <i className={`fas ${item.icon} w-6`}></i>
              <span className="ml-3 font-[Space_Grotesk]">{item.label}</span>
              {location === item.path && (
                <div className="ml-auto w-1.5 h-8 bg-primary rounded-full"></div>
              )}
            </Link>
          ))}
        </nav>
        
        {/* User Info */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center text-primary">
              <i className="fas fa-user"></i>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">
                {currentUser?.displayName || "Crypto Kitten"}
              </p>
              <p className="text-xs text-muted-foreground">
                {currentUser?.isConnected 
                  ? <span className="flex items-center"><span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>Connected</span> 
                  : <span className="flex items-center"><span className="inline-block w-2 h-2 rounded-full bg-amber-500 mr-1"></span>Disconnected</span>
                }
              </p>
            </div>
            <button className="ml-auto text-muted-foreground hover:text-foreground">
              <i className="fas fa-cog"></i>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
