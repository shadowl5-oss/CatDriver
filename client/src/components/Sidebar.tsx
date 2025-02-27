import { useLocation, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";

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
    { path: "/presentation", label: "Presentation", icon: "fa-file-powerpoint" },
  ];

  // If not visible on mobile, hide completely
  const visibilityClass = isVisible ? "block" : "hidden md:block";

  return (
    <aside className={`bg-card w-64 flex-shrink-0 ${visibilityClass} border-r border-border`}>
      <div className="h-full flex flex-col">
        {/* Logo */}
        <div className="p-4 flex items-center space-x-2 border-b border-border">
          <div className="cat-gradient text-white p-2 rounded-lg">
            <i className="fas fa-cat text-xl"></i>
          </div>
          <h1 className="font-bold text-xl text-white">Catz<span className="text-secondary">3</span></h1>
        </div>
        
        {/* Nav Links */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              href={item.path}
            >
              <a 
                className={`flex items-center px-4 py-3 rounded-lg mb-1 hover:bg-muted ${
                  location === item.path ? "text-white bg-muted" : "text-muted-foreground"
                }`}
              >
                <i className={`fas ${item.icon} w-6`}></i>
                <span className="ml-3">{item.label}</span>
              </a>
            </Link>
          ))}
        </nav>
        
        {/* User Info */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              <i className="fas fa-user"></i>
            </div>
            <div className="ml-3">
              <p className="text-sm text-white font-medium">
                {currentUser?.displayName || "Crypto Kitten"}
              </p>
              <p className="text-xs text-muted-foreground">
                {currentUser?.isConnected ? "Connected" : "Disconnected"}
              </p>
            </div>
            <button className="ml-auto text-muted-foreground hover:text-white">
              <i className="fas fa-cog"></i>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
