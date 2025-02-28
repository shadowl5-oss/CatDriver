
import React from 'react';
import { Link } from 'wouter';
import { Github, Twitter } from 'lucide-react';
import CatLogo from "@/components/CatLogo";

export default function Footer() {
  return (
    <footer className="border-t border-border/30 backdrop-blur-sm bg-background/60 mt-auto">
      <div className="container px-4 mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <CatLogo size={32} />
              <span className="text-xl font-bold text-gradient">CatDAO</span>
            </div>
            <p className="text-sm text-muted-foreground">
              The future of feline-powered digital collectibles on the blockchain
            </p>
            <div className="flex space-x-3">
              <a href="https://twitter.com/catdao" className="hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="https://github.com/catdao" className="hover:text-primary transition-colors" aria-label="GitHub">
                <Github size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/ordinals" className="text-muted-foreground hover:text-foreground transition-colors">Ordinals</Link></li>
              <li><Link href="/marketplace" className="text-muted-foreground hover:text-foreground transition-colors">Marketplace</Link></li>
              <li><Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Community</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Discord</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Forum</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Docs</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Updates</h3>
            <p className="text-sm text-muted-foreground mb-2">Stay up to date with CatDAO</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-background border border-border rounded-l-md px-3 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button 
                type="submit" 
                className="bg-primary text-primary-foreground rounded-r-md px-3 py-2 text-sm font-medium btn-glow"
              >
                Join
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-border/30 flex flex-col md:flex-row justify-between text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} CatDAO. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
