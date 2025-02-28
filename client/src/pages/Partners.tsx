import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

// Partner data structure
type Partner = {
  name: string;
  category: 'technology' | 'animal-welfare' | 'blockchain' | 'community';
  logo: React.ReactNode;
  description: string;
  website: string;
};

// Partner data
const partners: Partner[] = [
  {
    name: 'Ethereum Foundation',
    category: 'blockchain',
    logo: <div className="h-12 w-12 rounded-full bg-[#627EEA] flex items-center justify-center text-white font-bold">ETH</div>,
    description: 'Providing technical guidance and grant support for our smart contract infrastructure and governance system.',
    website: 'https://ethereum.org',
  },
  {
    name: 'Bitcoin Ordinals Working Group',
    category: 'blockchain',
    logo: <div className="h-12 w-12 rounded-full bg-[#F7931A] flex items-center justify-center text-white font-bold">BTC</div>,
    description: 'Collaboration on ordinal standards and best practices for our unique cat collectibles.',
    website: 'https://ordinals.com',
  },
  {
    name: 'Global Pet Rescue Network',
    category: 'animal-welfare',
    logo: <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-400 to-teal-400 flex items-center justify-center text-white font-bold">PR</div>,
    description: 'International partner providing real-world support for pet recovery and welfare initiatives.',
    website: 'https://petrescue.org',
  },
  {
    name: 'TechCats Innovation Lab',
    category: 'technology',
    logo: <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold">TC</div>,
    description: 'Research partner for quantum computing implementation and advanced visualization techniques.',
    website: 'https://techcats.org',
  },
  {
    name: 'Feline Future Foundation',
    category: 'animal-welfare',
    logo: <div className="h-12 w-12 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 flex items-center justify-center text-white font-bold">FFF</div>,
    description: 'Non-profit focused on cat welfare and adoption, receiving proceeds from our marketplace fees.',
    website: 'https://felinefuture.org',
  },
  {
    name: 'IPFS Consortium',
    category: 'technology',
    logo: <div className="h-12 w-12 rounded-full bg-[#65C2CB] flex items-center justify-center text-white font-bold">IPFS</div>,
    description: 'Infrastructure partner ensuring decentralized storage for all cat ordinals and platform metadata.',
    website: 'https://ipfs.tech',
  },
  {
    name: 'Quantum Cats University',
    category: 'community',
    logo: <div className="h-12 w-12 rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400 flex items-center justify-center text-white font-bold">QCU</div>,
    description: 'Educational partner providing resources and learning opportunities about blockchain and quantum computing.',
    website: 'https://qcats.edu',
  },
  {
    name: 'Web3 Meow Alliance',
    category: 'blockchain',
    logo: <div className="h-12 w-12 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold">W3M</div>,
    description: 'Industry alliance promoting ethical standards and best practices in pet-related NFT projects.',
    website: 'https://web3meow.org',
  },
  {
    name: 'CloudFlare',
    category: 'technology',
    logo: <div className="h-12 w-12 rounded-full bg-[#F38020] flex items-center justify-center text-white font-bold">CF</div>,
    description: 'Security and infrastructure partner ensuring platform stability and protection against attacks.',
    website: 'https://cloudflare.com',
  },
  {
    name: 'AWS',
    category: 'technology',
    logo: <div className="h-12 w-12 rounded-full bg-[#FF9900] flex items-center justify-center text-white font-bold">AWS</div>,
    description: 'Cloud infrastructure provider for high-performance computing and AI capabilities.',
    website: 'https://aws.amazon.com',
  },
  {
    name: 'Prisma',
    category: 'technology',
    logo: <div className="h-12 w-12 rounded-full bg-[#2D3748] flex items-center justify-center text-white font-bold">PRM</div>,
    description: 'Database partner providing optimized ORM solutions for our platform.',
    website: 'https://prisma.io',
  },
  {
    name: 'Vercel',
    category: 'technology',
    logo: <div className="h-12 w-12 rounded-full bg-black flex items-center justify-center text-white font-bold">▲</div>,
    description: 'Deployment partner providing edge network capabilities for our frontend applications.',
    website: 'https://vercel.com',
  },
];

export default function Partners() {
  // Group partners by category
  const partnersByCategory = partners.reduce((acc, partner) => {
    if (!acc[partner.category]) {
      acc[partner.category] = [];
    }
    acc[partner.category].push(partner);
    return acc;
  }, {} as Record<string, Partner[]>);

  // Category display names
  const categoryNames = {
    'blockchain': 'Blockchain Partners',
    'technology': 'Technology Partners',
    'animal-welfare': 'Animal Welfare Partners',
    'community': 'Community Partners'
  };

  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <div className="mb-6">
        <Link to="/" className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>
      </div>
      
      <h1 className="text-4xl font-bold mb-2">Our Partners</h1>
      <p className="text-muted-foreground mb-8">Organizations working together with CatDAO to build a better future</p>
      
      <Separator className="my-6" />
      
      <div className="space-y-12">
        {Object.entries(partnersByCategory).map(([category, partners]) => (
          <section key={category}>
            <h2 className="text-2xl font-bold mb-6">{categoryNames[category as keyof typeof categoryNames]}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {partners.map((partner) => (
                <Card key={partner.name} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center">
                        {partner.logo}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{partner.name}</h3>
                        <p className="text-sm text-muted-foreground">{categoryNames[partner.category as keyof typeof categoryNames]}</p>
                      </div>
                    </div>
                    <p className="mt-4">{partner.description}</p>
                    <div className="mt-4">
                      <a href={partner.website} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm">Visit Website</Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>
      
      <section className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Become a Partner</h2>
        <p className="max-w-2xl mx-auto mb-6">
          CatDAO is always looking for strategic partners who share our vision for 
          blockchain innovation and animal welfare. If you're interested in partnering with us, 
          please reach out to discuss collaboration opportunities.
        </p>
        <a href="mailto:partnerships@catdao.org" className="inline-block">
          <Button>Contact Partnerships Team</Button>
        </a>
      </section>
      
      <div className="flex justify-center mt-12 mb-8">
        <p className="text-sm text-muted-foreground">© 2025 CatDAO. All rights reserved.</p>
      </div>
    </div>
  );
}