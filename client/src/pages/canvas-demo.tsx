import { useState } from 'react';
import CatCanvasEditor from '@/components/CatCanvasEditor';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CatTraits, BlockchainData } from '@/lib/canvasGenerator';

export default function CanvasDemo() {
  const { toast } = useToast();
  const [savedImages, setSavedImages] = useState<Array<{
    id: number;
    imageData: string;
    traits: CatTraits;
    blockchainData?: BlockchainData;
  }>>([]);
  
  const handleSaveImage = (imageData: string, traits: CatTraits, blockchainData?: BlockchainData) => {
    setSavedImages(prev => [
      ...prev,
      {
        id: Date.now(),
        imageData,
        traits,
        blockchainData
      }
    ]);
    
    toast({
      title: 'Ordinal Saved',
      description: `Your ${traits.rarity} ${traits.type} cat has been saved to the gallery.`,
    });
  };
  
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">Cat Ordinal Canvas Demo</h1>
        <p className="text-lg text-muted-foreground">
          Create and customize unique cat ordinals using our advanced Canvas generator
        </p>
      </div>
      
      <Tabs defaultValue="editor" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="editor">Canvas Editor</TabsTrigger>
          <TabsTrigger value="gallery">Saved Gallery ({savedImages.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="editor">
          <CatCanvasEditor onSave={handleSaveImage} />
        </TabsContent>
        
        <TabsContent value="gallery">
          {savedImages.length === 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>No Saved Ordinals</CardTitle>
                <CardDescription>
                  Create and save cat ordinals using the Canvas Editor to see them in your gallery.
                </CardDescription>
              </CardHeader>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedImages.map(image => (
                <Card key={image.id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="capitalize">
                      {image.traits.rarity} {image.traits.type} Cat
                    </CardTitle>
                    <CardDescription>
                      Block: {image.blockchainData?.blockHeight || 'Unknown'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-square w-full overflow-hidden rounded-lg">
                      <img 
                        src={image.imageData} 
                        alt={`${image.traits.rarity} ${image.traits.type} cat`} 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      <p>Expression: {image.traits.expression}</p>
                      <p>Accessories: {image.traits.accessories.length ? image.traits.accessories.join(', ') : 'None'}</p>
                      <p>Quantum State: {image.blockchainData?.quantumState || 'Unknown'}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}