
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useBrandKit, ColorPalette, Typography, BrandAssets } from '@/lib/canva-integration';
import { RefreshCw, Save, Upload, PaintBucket, Type, Image, Link as LinkIcon } from 'lucide-react';

export default function BrandManager() {
  const { brandKit, loading, error } = useBrandKit();
  const [isConnected, setIsConnected] = useState(false);
  const [apiKey, setApiKey] = useState('');
  
  // Form states that would normally be connected to Canva
  const [colorPalette, setColorPalette] = useState<ColorPalette | null>(null);
  const [typography, setTypography] = useState<Typography | null>(null);
  const [assets, setAssets] = useState<BrandAssets | null>(null);
  
  // Connect to Canva (simulated)
  const handleConnect = () => {
    if (apiKey) {
      setIsConnected(true);
      // In a real implementation, this would fetch the actual brand kit from Canva
      if (brandKit) {
        setColorPalette(brandKit.colors);
        setTypography(brandKit.typography);
        setAssets(brandKit.assets);
      }
    }
  };
  
  // Simulate syncing with Canva
  const handleSync = () => {
    alert('Syncing with Canva...');
    // In a real implementation, this would pull the latest brand kit from Canva
  };
  
  // Simulate saving changes back to Canva
  const handleSave = () => {
    alert('Saving changes to Canva...');
    // In a real implementation, this would push changes back to Canva
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p>Loading brand assets...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-destructive mb-4">Error loading brand assets</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Brand Manager</h1>
          <p className="text-muted-foreground">Manage your CatDAO brand assets with Canva integration</p>
        </div>
        
        <div className="mt-4 md:mt-0">
          {isConnected ? (
            <div className="flex space-x-3">
              <Button variant="outline" onClick={handleSync}>
                <RefreshCw className="mr-2 h-4 w-4" /> Sync with Canva
              </Button>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" /> Save Changes
              </Button>
            </div>
          ) : (
            <Card className="w-full md:w-auto">
              <CardContent className="p-4">
                <div className="flex space-x-2">
                  <Input 
                    placeholder="Canva API Key" 
                    value={apiKey} 
                    onChange={(e) => setApiKey(e.target.value)}
                  />
                  <Button onClick={handleConnect}>Connect</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      
      {isConnected ? (
        <Tabs defaultValue="colors">
          <TabsList className="mb-8">
            <TabsTrigger value="colors">
              <PaintBucket className="h-4 w-4 mr-2" /> Colors
            </TabsTrigger>
            <TabsTrigger value="typography">
              <Type className="h-4 w-4 mr-2" /> Typography
            </TabsTrigger>
            <TabsTrigger value="assets">
              <Image className="h-4 w-4 mr-2" /> Assets
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="colors" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Color Palette</CardTitle>
                <CardDescription>Manage your brand colors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {colorPalette && Object.entries(colorPalette).map(([name, color]) => (
                    <div key={name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium capitalize">{name}</label>
                        <div className="flex items-center space-x-2">
                          <div 
                            className="h-6 w-6 rounded-full border border-border"
                            style={{ backgroundColor: color }}
                          />
                          <span className="text-xs text-muted-foreground">{color}</span>
                        </div>
                      </div>
                      <Input
                        type="color"
                        value={color}
                        onChange={(e) => {
                          if (colorPalette) {
                            setColorPalette({
                              ...colorPalette,
                              [name]: e.target.value
                            });
                          }
                        }}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Reset to Defaults</Button>
                <Button>Save Colors</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="typography" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Typography</CardTitle>
                <CardDescription>Manage fonts and text styles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {typography && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Heading Font</label>
                          <Input value={typography.heading} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Body Font</label>
                          <Input value={typography.body} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Monospace Font</label>
                          <Input value={typography.mono} />
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <h3 className="text-sm font-medium mb-3">Font Sizes</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                          {Object.entries(typography.sizes).map(([key, size]) => (
                            <div key={key} className="space-y-2">
                              <label className="text-xs font-medium capitalize">{key}</label>
                              <Input value={size} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Reset to Defaults</Button>
                <Button>Save Typography</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="assets" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Brand Assets</CardTitle>
                <CardDescription>Manage logos, illustrations, and icons</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {assets && (
                    <>
                      <div>
                        <h3 className="text-lg font-medium mb-4">Logo</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <div className="h-32 bg-secondary/50 rounded-lg flex items-center justify-center">
                              <img 
                                src={assets.logo || 'https://placehold.co/200x100/png?text=Logo'} 
                                alt="Logo" 
                                className="max-h-24"
                              />
                            </div>
                            <div className="flex">
                              <Button variant="outline" size="sm" className="w-full">
                                <Upload className="h-4 w-4 mr-2" /> Upload
                              </Button>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <div className="h-32 bg-secondary/50 rounded-lg flex items-center justify-center p-4">
                              <div className="grid grid-cols-3 gap-2 w-full">
                                {Object.entries(assets.logoVariants).map(([variant, url]) => (
                                  <div 
                                    key={variant} 
                                    className="flex flex-col items-center text-center"
                                  >
                                    <div className="h-12 w-12 bg-background/50 rounded flex items-center justify-center mb-1">
                                      <img 
                                        src={url || 'https://placehold.co/40x40/png'} 
                                        alt={variant} 
                                        className="max-h-8 max-w-8"
                                      />
                                    </div>
                                    <span className="text-xs text-muted-foreground">{variant}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div>
                              <Button variant="outline" size="sm" className="w-full">
                                <LinkIcon className="h-4 w-4 mr-2" /> Manage Variants
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-4">Illustrations</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {Object.entries(assets.illustrations).map(([name, url]) => (
                            <div key={name} className="space-y-2">
                              <div className="aspect-square bg-secondary/50 rounded-lg flex items-center justify-center p-4">
                                <img 
                                  src={url || 'https://placehold.co/100x100/png'} 
                                  alt={name} 
                                  className="max-h-full max-w-full object-contain"
                                />
                              </div>
                              <div className="text-sm">{name}</div>
                            </div>
                          ))}
                          <div className="space-y-2">
                            <div className="aspect-square border-2 border-dashed border-border rounded-lg flex items-center justify-center bg-secondary/20 cursor-pointer hover:bg-secondary/30 transition-colors">
                              <Upload className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <div className="text-sm text-center">Add New</div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-4">Icons</h3>
                        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                          {Object.entries(assets.icons).map(([name, url]) => (
                            <div key={name} className="space-y-2">
                              <div className="aspect-square bg-secondary/50 rounded-lg flex items-center justify-center p-3">
                                <img 
                                  src={url || 'https://placehold.co/40x40/png'} 
                                  alt={name} 
                                  className="max-h-full max-w-full object-contain"
                                />
                              </div>
                              <div className="text-xs text-center">{name}</div>
                            </div>
                          ))}
                          <div className="space-y-2">
                            <div className="aspect-square border-2 border-dashed border-border rounded-lg flex items-center justify-center bg-secondary/20 cursor-pointer hover:bg-secondary/30 transition-colors">
                              <Upload className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <div className="text-xs text-center">Add New</div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Save All Assets</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      ) : (
        <div className="glass p-12 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Connect with Canva</h2>
            <p className="text-muted-foreground mb-8">
              Integrating with Canva allows you to manage your brand assets, color palettes, and typography in one place. 
              Any changes made in Canva can be synchronized with your CatDAO website.
            </p>
            <div className="flex justify-center">
              <Button size="lg">
                <LinkIcon className="mr-2 h-4 w-4" /> Connect with Canva
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
