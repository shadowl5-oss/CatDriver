
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Cat, Zap, Globe, Shield } from 'lucide-react';
import SimpleAsciiArt from '@/components/SimpleAsciiArt';
import Footer from '@/components/ui/Footer';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  
  // Handle parallax scrolling effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0 opacity-20 pointer-events-none"
          style={{ y: scrollY * 0.2 }}
        >
          <div className="absolute inset-0 grid-pattern"></div>
        </motion.div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-xl"
            >
              <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full mb-6">
                Introducing CatDAO
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight text-gradient">
                The Quantum Feline Collective
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Enter the realm where digital cats transcend blockchains, existing in quantum superposition across the cryptoverse.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button size="lg" className="btn-glow" asChild>
                  <Link href="/ordinals">
                    <span className="flex items-center">
                      Explore Ordinals <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/dashboard">
                    <span>View Dashboard</span>
                  </Link>
                </Button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="w-[320px] h-[320px] glass p-6 relative">
                <div className="text-center text-xs text-muted-foreground mb-2">Quantum Cat #3333</div>
                <SimpleAsciiArt 
                  seed="3333" 
                  size="large"
                  type="quantum"
                  rarity="legendary" 
                />
                <div className="absolute -bottom-3 -right-3 px-2 py-1 text-xs font-semibold bg-primary/20 text-primary rounded-full">
                  Block #777777
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Quantum Blockchain Technology</h2>
            <p className="text-muted-foreground">Our feline-powered system operates beyond the standard blockchain paradigm</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Cat,
                title: "Quantum Cats",
                description: "Cryptographic felines that exist in multiple blockchain states simultaneously"
              },
              {
                icon: Zap,
                title: "Schrödinger Protocol",
                description: "Revolutionary consensus mechanism that leverages quantum uncertainty principles"
              },
              {
                icon: Globe,
                title: "Digital Matter Theory",
                description: "A groundbreaking approach to on-chain assets derived from Bitcoin block data"
              }
            ].map((feature, idx) => (
              <Card key={idx} className="overflow-hidden border-border/30">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Stats */}
      <section className="py-16 bg-secondary/30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "3,333", label: "Total Ordinals" },
              { value: "721", label: "Unique Traits" },
              { value: "9", label: "Dimensions" },
              { value: "∞", label: "Possibilities" }
            ].map((stat, idx) => (
              <div key={idx}>
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="glass p-8 md:p-12 relative overflow-hidden rounded-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary/5 rounded-full -ml-10 -mb-10"></div>
            
            <div className="relative z-10 max-w-3xl">
              <h2 className="text-3xl font-bold mb-4">Join the CatDAO Community</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Become part of a visionary collective exploring the intersection of quantum physics, feline psychology, and blockchain technology.
              </p>
              <Button size="lg" className="btn-glow" asChild>
                <Link href="/marketplace">
                  <span className="flex items-center">
                    Explore Marketplace <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
