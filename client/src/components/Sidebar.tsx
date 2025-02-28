
import { Link, useLocation } from 'wouter';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Home, Cat, LayoutDashboard, ShoppingBag, Settings, 
  Users, Bell, Cpu, Brain, PieChart
} from 'lucide-react';
import CatLogo from './CatLogo';

interface SidebarProps {
  visible: boolean;
}

export default function Sidebar({ visible }: SidebarProps) {
  const [location] = useLocation();
  const [expanded, setExpanded] = useState<string | null>(null);

  const mainLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Ordinals', href: '/ordinals', icon: Cat },
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Marketplace', href: '/marketplace', icon: ShoppingBag },
  ];

  const adminLinks = [
    { name: 'Ordinal Generator', href: '/admin/generator', icon: Cpu },
  ];

  const toggleSubmenu = (name: string) => {
    if (expanded === name) {
      setExpanded(null);
    } else {
      setExpanded(name);
    }
  };

  const isActive = (href: string) => {
    return location === href;
  };

  return (
    <motion.aside 
      initial={{ x: -280 }}
      animate={{ x: visible ? 0 : -280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed left-0 top-0 z-40 h-screen w-[280px] border-r border-border/30 backdrop-blur-lg bg-background/80"
    >
      <div className="flex h-full flex-col px-4">
        <div className="py-6 flex items-center">
          <CatLogo size={32} />
          <span className="ml-3 text-xl font-bold text-gradient">CatDAO</span>
        </div>

        <div className="mt-2 space-y-1.5">
          {mainLinks.map((link) => {
            const LinkIcon = link.icon;
            return (
              <Link key={link.href} href={link.href}>
                <a className={`flex items-center rounded-lg py-2.5 px-3.5 transition-colors ${
                  isActive(link.href) 
                    ? "bg-secondary text-primary font-medium" 
                    : "text-muted-foreground hover:bg-secondary/40"
                }`}>
                  <LinkIcon className={`mr-3 h-5 w-5 ${isActive(link.href) ? "text-primary" : ""}`} />
                  {link.name}
                </a>
              </Link>
            );
          })}
        </div>

        <div className="mt-6">
          <div className="px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Administration
          </div>
          <div className="mt-2 space-y-1.5">
            {adminLinks.map((link) => {
              const LinkIcon = link.icon;
              return (
                <Link key={link.href} href={link.href}>
                  <a className={`flex items-center rounded-lg py-2.5 px-3.5 transition-colors ${
                    isActive(link.href) 
                      ? "bg-secondary text-primary font-medium" 
                      : "text-muted-foreground hover:bg-secondary/40"
                  }`}>
                    <LinkIcon className={`mr-3 h-5 w-5 ${isActive(link.href) ? "text-primary" : ""}`} />
                    {link.name}
                  </a>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-auto pb-8">
          <div className="glass rounded-lg p-4 my-4">
            <div className="flex items-center mb-3">
              <Brain size={18} className="text-primary mr-2" />
              <h3 className="text-sm font-medium">CatDAO Intelligence</h3>
            </div>
            <p className="text-xs text-muted-foreground">
              Quantum analysis indicates a 24% increase in ordinal rarity metrics over the last epoch.
            </p>
            <button className="mt-3 text-xs font-medium text-primary hover:underline">
              Learn more
            </button>
          </div>

          <div className="border-t border-border/30 pt-4 px-3">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center text-primary-foreground font-bold">
                C
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">Quantum Observer</p>
                <p className="text-xs text-muted-foreground">Advanced Access</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
