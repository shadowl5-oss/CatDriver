import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

type Slide = {
  id: number;
  title: string;
  content: string;
  type: "intro" | "metrics" | "roadmap" | "team" | "tokenomics";
};

export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [presentationMode, setPresentationMode] = useState<"edit" | "present">("edit");
  const { toast } = useToast();

  // Mock presentation slides
  const slides: Slide[] = [
    {
      id: 1,
      title: "Cat Driven Value (CDV)",
      content: "Revolutionizing the crypto market with feline-inspired innovation",
      type: "intro"
    },
    {
      id: 2,
      title: "Problem Statement",
      content: "Traditional crypto lacks engaging experiences and community-driven features that appeal to mainstream users",
      type: "intro"
    },
    {
      id: 3,
      title: "Our Solution",
      content: "CDV combines NFT collectibles, governance, and staking in a cat-themed ecosystem that's both fun and profitable",
      type: "intro"
    },
    {
      id: 4,
      title: "Market Opportunity",
      content: "The NFT market reached $40B in 2022, with pet-themed collectibles growing at 85% annually",
      type: "metrics"
    },
    {
      id: 5,
      title: "Token Metrics",
      content: "Total Supply: 1,000,000,000 CDV\nCirculating Supply: 250,000,000 CDV\nCurrent Price: $0.0734\nMarket Cap: $18,350,000",
      type: "tokenomics"
    },
    {
      id: 6,
      title: "Roadmap",
      content: "Q2 2023: Marketplace Beta\nQ3 2023: Governance Launch\nQ4 2023: Mobile App\nQ1 2024: Metaverse Integration",
      type: "roadmap"
    },
    {
      id: 7,
      title: "Team",
      content: "Jane Whiskers - CEO (Ex-Coinbase)\nMike Pawson - CTO (Previously at Dapper Labs)\nLisa Meowski - Head of Design (Worked on CryptoKitties)",
      type: "team"
    },
    {
      id: 8,
      title: "Investment Opportunity",
      content: "Raising $5M at $50M valuation\nFunds will be used for: Marketing (40%), Development (35%), Operations (15%), Reserve (10%)",
      type: "metrics"
    },
    {
      id: 9,
      title: "Thank You!",
      content: "Join us in creating the future of cat-driven value\nwww.catdrivenvalue.com\ncontact@catdrivenvalue.com",
      type: "intro"
    }
  ];

  // Auto-advance slides during presentation mode
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && presentationMode === "present") {
      interval = setInterval(() => {
        setCurrentSlide(prev => (prev < slides.length - 1 ? prev + 1 : 0));
      }, 5000); // Advance every 5 seconds
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, presentationMode, slides.length]);

  // Toggle fullscreen mode
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        toast({
          title: "Fullscreen Error",
          description: `Error attempting to enable fullscreen: ${err.message}`,
          variant: "destructive"
        });
      });
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };

  // Handle slide navigation
  const goToNextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const goToPrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  // Handle key presses for navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (presentationMode === "present") {
        if (event.key === "ArrowRight" || event.key === " ") {
          goToNextSlide();
        } else if (event.key === "ArrowLeft") {
          goToPrevSlide();
        } else if (event.key === "Escape") {
          if (isFullScreen) {
            document.exitFullscreen();
            setIsFullScreen(false);
          }
          setPresentationMode("edit");
        } else if (event.key === "p") {
          setIsPlaying(!isPlaying);
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentSlide, presentationMode, isPlaying, isFullScreen]);

  // Export presentation as PDF
  const exportToPDF = () => {
    toast({
      title: "Export Initiated",
      description: "Your presentation is being exported to PDF. Check your downloads folder."
    });
  };

  // Share presentation
  const sharePresentation = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      toast({
        title: "Link Copied!",
        description: "Presentation link copied to clipboard."
      });
    }).catch(() => {
      toast({
        title: "Copy Failed",
        description: "Failed to copy the link. Please try again.",
        variant: "destructive"
      });
    });
  };

  // Render presentation controls
  const renderControls = () => (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentSlide(0)}
          disabled={currentSlide === 0}
        >
          <i className="fas fa-step-backward mr-1"></i> First
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={goToPrevSlide}
          disabled={currentSlide === 0}
        >
          <i className="fas fa-chevron-left mr-1"></i> Prev
        </Button>
        <span className="mx-2 text-muted-foreground">
          {currentSlide + 1} / {slides.length}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={goToNextSlide}
          disabled={currentSlide === slides.length - 1}
        >
          Next <i className="fas fa-chevron-right ml-1"></i>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentSlide(slides.length - 1)}
          disabled={currentSlide === slides.length - 1}
        >
          Last <i className="fas fa-step-forward ml-1"></i>
        </Button>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant={isPlaying ? "default" : "outline"}
          size="sm"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          <i className={`fas ${isPlaying ? "fa-pause" : "fa-play"} mr-1`}></i>
          {isPlaying ? "Pause" : "Play"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={toggleFullScreen}
        >
          <i className={`fas ${isFullScreen ? "fa-compress" : "fa-expand"} mr-1`}></i>
          {isFullScreen ? "Exit Fullscreen" : "Fullscreen"}
        </Button>
      </div>
    </div>
  );

  // Render edit mode
  const renderEditMode = () => (
    <div className="px-4 py-6 md:px-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Investor Presentation</h1>
          <p className="text-muted-foreground mt-1">Create and present your CDV pitch to investors</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex space-x-3">
          <Button onClick={() => setPresentationMode("present")}>
            <i className="fas fa-play mr-2"></i> Start Presentation
          </Button>
          <Button variant="outline" onClick={exportToPDF}>
            <i className="fas fa-file-pdf mr-2"></i> Export PDF
          </Button>
          <Button variant="outline" onClick={sharePresentation}>
            <i className="fas fa-share-alt mr-2"></i> Share
          </Button>
        </div>
      </div>

      <Tabs defaultValue="slides" className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="slides">All Slides</TabsTrigger>
          <TabsTrigger value="edit">Edit Current Slide</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        
        <TabsContent value="slides">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {slides.map((slide, index) => (
              <Card 
                key={slide.id} 
                className={`cursor-pointer hover:border-secondary transition-all ${
                  index === currentSlide ? "border-secondary" : ""
                }`}
                onClick={() => setCurrentSlide(index)}
              >
                <CardContent className="p-4">
                  <p className="text-xs text-muted-foreground mb-1">Slide {index + 1}</p>
                  <h3 className="text-sm font-semibold mb-2">{slide.title}</h3>
                  <p className="text-xs text-muted-foreground truncate">{slide.content}</p>
                  <div className="mt-2">
                    <Badge variant="outline" className="text-xs">
                      {slide.type}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="edit">
          <Card>
            <CardHeader>
              <CardTitle>Edit Slide {currentSlide + 1}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Slide Title</label>
                  <input
                    className="w-full p-2 rounded-md bg-muted border border-border"
                    value={slides[currentSlide].title}
                    // In a real app, we would update the slide title here
                    readOnly
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Slide Content</label>
                  <textarea
                    className="w-full p-2 rounded-md bg-muted border border-border min-h-[200px]"
                    value={slides[currentSlide].content}
                    // In a real app, we would update the slide content here
                    readOnly
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Slide Type</label>
                  <select 
                    className="w-full p-2 rounded-md bg-muted border border-border"
                    value={slides[currentSlide].type}
                    // In a real app, we would update the slide type here
                    disabled
                  >
                    <option value="intro">Introduction</option>
                    <option value="metrics">Metrics</option>
                    <option value="roadmap">Roadmap</option>
                    <option value="team">Team</option>
                    <option value="tokenomics">Tokenomics</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="preview">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              {renderControls()}
              <div className="aspect-video bg-black relative flex items-center justify-center p-8">
                <div className="text-center max-w-2xl">
                  <h2 className="text-4xl font-bold mb-6 text-white">
                    {slides[currentSlide].title}
                  </h2>
                  <div className="text-xl text-white whitespace-pre-line">
                    {slides[currentSlide].content}
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 cat-gradient text-white p-2 rounded-lg opacity-50">
                  <i className="fas fa-cat text-xl"></i>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );

  // Render presentation mode
  const renderPresentMode = () => (
    <div className={`fixed inset-0 z-50 bg-black ${isFullScreen ? "pt-0" : "pt-16"}`}>
      {!isFullScreen && (
        <div className="absolute top-0 left-0 right-0 h-16 bg-card flex items-center justify-between px-4 border-b border-border">
          <span className="text-muted-foreground">
            Slide {currentSlide + 1} of {slides.length}
          </span>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => setIsPlaying(!isPlaying)}>
              <i className={`fas ${isPlaying ? "fa-pause" : "fa-play"} mr-1`}></i>
              {isPlaying ? "Pause" : "Play"}
            </Button>
            <Button variant="outline" size="sm" onClick={toggleFullScreen}>
              <i className={`fas ${isFullScreen ? "fa-compress" : "fa-expand"} mr-1`}></i>
              {isFullScreen ? "Exit Fullscreen" : "Fullscreen"}
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              onClick={() => {
                setPresentationMode("edit");
                if (isFullScreen && document.exitFullscreen) {
                  document.exitFullscreen();
                  setIsFullScreen(false);
                }
              }}
            >
              <i className="fas fa-times mr-1"></i> Exit
            </Button>
          </div>
        </div>
      )}
      
      <div className="flex items-center justify-center h-full" onClick={goToNextSlide}>
        <div className="text-center max-w-4xl px-4">
          <h2 className="text-4xl md:text-6xl font-bold mb-10 text-white cat-gradient bg-clip-text text-transparent">
            {slides[currentSlide].title}
          </h2>
          <div className="text-xl md:text-3xl text-white whitespace-pre-line">
            {slides[currentSlide].content.split('\n').map((line, index) => (
              <p key={index} className="mb-6">{line}</p>
            ))}
          </div>
          
          <div className="mt-12 text-sm text-muted-foreground">
            Click anywhere or use arrow keys to navigate
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-1">
        {slides.map((_, index) => (
          <div 
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentSlide ? "bg-secondary" : "bg-muted"
            }`}
          ></div>
        ))}
      </div>
      
      <div className="absolute bottom-4 right-4 cat-gradient text-white p-2 rounded-lg opacity-40">
        <i className="fas fa-cat text-xl"></i>
      </div>
    </div>
  );

  return presentationMode === "edit" ? renderEditMode() : renderPresentMode();
}
