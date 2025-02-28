import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Music } from 'lucide-react';
import { Link } from 'wouter';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import SimpleAsciiArt from '@/components/SimpleAsciiArt';

// Nietzsche quotes about cats or rewritten to be about cats
const quotes = [
  "When you gaze long into the abyss, the cat gazes back into you.",
  "He who fights with cats should see to it that he himself does not become a cat... for when you gaze long into the abyss, the cat gazes back into you.",
  "The cat is dead. And we have killed him. How shall we, the murderers of all murderers, comfort ourselves?",
  "That which does not kill the cat makes it stronger.",
  "Without catnip, life would be a mistake.",
  "There are no facts, only cat interpretations.",
  "You must have chaos within you to give birth to a dancing cat.",
  "I cannot believe in a Cat who wants to be praised all the time.",
  "In heaven, all the interesting cats are missing.",
  "The advantage of a bad memory is that one enjoys several times the same good cats.",
  "The essence of all beautiful art, all great art, is gratitude to cats.",
  "There is always some madness in love, especially love of cats. But there is also always some reason in madness.",
  "Cats have their vanity, humans have their stupidity.",
  "A good writer possesses not only his own cat, but also the cat of his adversaries.",
  "The higher we soar, the smaller we appear to those cats who cannot fly."
];

// Philosophical perspectives on cats
const philosophies = [
  {
    title: "Existential Catism",
    description: "Cats exist in a perpetual state of self-creation through their choices and actions, demonstrating that existence precedes essence.",
    author: "Adapted from Jean-Paw Sartre"
  },
  {
    title: "The Purr Imperative",
    description: "One should act only according to that maxim whereby they can, at the same time, will that purring should become a universal law.",
    author: "Immanuel Catt"
  },
  {
    title: "The Allegory of the Cardboard Box",
    description: "Cats in a cardboard box know only the shadows of reality, until one cat ventures outside to discover the true nature of existence.",
    author: "Plato's Republic (Feline Edition)"
  },
  {
    title: "Meownanistic Monism",
    description: "The universe consists of only one substance: cats. All apparent plurality of objects arises from the modifications of this single substance.",
    author: "Kitty Spinoza"
  },
  {
    title: "Quantum Schrodinger's Dilemma",
    description: "The cat exists in a superposition of quantum states until observed, representing the fundamental indeterminacy of reality.",
    author: "Erwin Schrodinger"
  }
];

export default function NietzschesCat() {
  const [currentQuote, setCurrentQuote] = useState("");
  const [seed, setSeed] = useState(Math.floor(Math.random() * 100000));

  // Set a random quote on page load
  useEffect(() => {
    setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  // Change the quote and the cat visualization
  const generateNewQuote = () => {
    setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    setSeed(Math.floor(Math.random() * 100000));
  };

  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <div className="mb-6">
        <Link to="/" className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>
      </div>
      
      <h1 className="text-4xl font-bold mb-2">Nietzsche's Cat</h1>
      <p className="text-muted-foreground mb-2">
        An existential exploration of feline consciousness and cosmic dread
      </p>
      <Badge variant="outline" className="mb-8">Philosophical Experiment</Badge>
      
      <Separator className="my-6" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Card className="overflow-hidden h-full flex flex-col">
            <CardContent className="p-6 flex-grow flex flex-col">
              <div className="flex-grow flex items-center justify-center p-4">
                <SimpleAsciiArt 
                  type="quantum" 
                  width={80} 
                  height={40} 
                  showBorder={true}
                />
              </div>
              <div className="mt-4 text-center">
                <p className="italic text-lg font-serif">"{currentQuote}"</p>
                <p className="text-sm text-muted-foreground mt-2">— Friedrich Nietzsche (Feline Adaptation)</p>
              </div>
              <Button 
                onClick={generateNewQuote} 
                className="mt-6 w-full"
                variant="outline"
              >
                Generate New Existential Cat
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">The Philosophical Cat</h2>
          <p>
            Nietzsche never explicitly wrote about cats, but his philosophy of the Übermensch finds a perfect 
            parallel in feline existence. Cats embody the will to power, living authentically beyond human 
            morality, challenging our preconceptions of consciousness.
          </p>
          
          <p>
            Each quantum cat ordinal in our collection contains a unique philosophical position, 
            challenging the nature of reality through the lens of feline existence.
          </p>
          
          <h3 className="text-xl font-semibold mt-8 mb-4">Philosophical Frameworks</h3>
          
          <div className="space-y-4">
            {philosophies.map((philosophy, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <h4 className="font-medium">{philosophy.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{philosophy.description}</p>
                  <p className="text-xs italic mt-2">— {philosophy.author}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <p className="text-sm text-muted-foreground mt-6">
            This experimental page explores the intersection of feline consciousness and existential philosophy,
            serving as a conceptual foundation for our quantum cat ordinals.
          </p>
        </div>
      </div>
      
      <Separator className="my-8" />
      
      <div className="bg-black/10 p-6 rounded-lg mt-8">
        <h2 className="text-xl font-bold mb-4">The Abyss Gazes Back</h2>
        <p className="mb-4">
          Our most exclusive ordinal collection, "The Abyss Gazes Back," features 33 unique quantum cats 
          inspired by Nietzschean philosophy. Each cat exists in a superposition of states, 
          embodying both the existential void and the triumphant will to power.
        </p>
        <p className="text-sm italic">
          "And if you gaze long enough into an abyss, the abyss gazes also into you." — Friedrich Nietzsche
        </p>
      </div>
      
      <div className="flex justify-center mt-12 mb-8">
        <p className="text-sm text-muted-foreground">© 2025 CatDAO. All rights reserved.</p>
      </div>
    </div>
  );
}