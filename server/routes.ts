import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertAssetSchema, insertCatNftSchema, insertProposalSchema, insertLostPetSchema, insertLostPetSightingSchema } from "@shared/schema";
import { z } from "zod";
import * as fs from "fs";
import * as path from "path";

export async function registerRoutes(app: Express): Promise<Server> {
  // Users routes
  app.get("/api/users/:id", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Don't return the password
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Failed to get user" });
    }
  });
  
  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      
      // Don't return the password
      const { password, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid user data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create user" });
    }
  });
  
  // Assets routes
  app.get("/api/assets/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const assets = await storage.getAssetsByUserId(userId);
      res.json(assets);
    } catch (error) {
      res.status(500).json({ message: "Failed to get assets" });
    }
  });
  
  app.post("/api/assets", async (req, res) => {
    try {
      const assetData = insertAssetSchema.parse(req.body);
      const asset = await storage.createAsset(assetData);
      res.status(201).json(asset);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid asset data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create asset" });
    }
  });
  
  // Cat NFTs routes
  app.get("/api/cat-nfts", async (req, res) => {
    try {
      const nfts = await storage.getAllCatNfts();
      res.json(nfts);
    } catch (error) {
      res.status(500).json({ message: "Failed to get NFTs" });
    }
  });
  
  // Get count of existing cat NFTs
  app.get("/api/cat-nfts/count", async (req, res) => {
    try {
      const nfts = await storage.getAllCatNfts();
      res.json(nfts.length);
    } catch (error) {
      res.status(500).json({ message: "Failed to get NFT count" });
    }
  });
  
  app.get("/api/cat-nfts/user/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const nfts = await storage.getCatNftsByOwnerId(userId);
      res.json(nfts);
    } catch (error) {
      res.status(500).json({ message: "Failed to get user NFTs" });
    }
  });
  
  app.post("/api/cat-nfts", async (req, res) => {
    try {
      const nftData = insertCatNftSchema.parse(req.body);
      const nft = await storage.createCatNft(nftData);
      res.status(201).json(nft);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid NFT data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create NFT" });
    }
  });
  
  // Batch create NFTs for ordinal generation
  app.post("/api/cat-nfts/batch", async (req, res) => {
    try {
      if (!Array.isArray(req.body)) {
        return res.status(400).json({ message: "Request body must be an array of NFTs" });
      }
      
      // Validate each NFT in the batch
      const nftDataArray = req.body.map(nft => insertCatNftSchema.parse(nft));
      
      // Create NFTs one by one
      const createdNfts = [];
      for (const nftData of nftDataArray) {
        const nft = await storage.createCatNft(nftData);
        createdNfts.push(nft);
      }
      
      res.status(201).json(createdNfts);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid NFT data in batch", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create NFT batch" });
    }
  });
  
  // Proposals routes
  app.get("/api/proposals", async (req, res) => {
    try {
      const proposals = await storage.getAllProposals();
      res.json(proposals);
    } catch (error) {
      res.status(500).json({ message: "Failed to get proposals" });
    }
  });
  
  app.get("/api/proposals/active", async (req, res) => {
    try {
      const proposals = await storage.getActiveProposals();
      res.json(proposals);
    } catch (error) {
      res.status(500).json({ message: "Failed to get active proposals" });
    }
  });
  
  app.post("/api/proposals", async (req, res) => {
    try {
      const proposalData = insertProposalSchema.parse(req.body);
      const proposal = await storage.createProposal(proposalData);
      res.status(201).json(proposal);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid proposal data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create proposal" });
    }
  });
  
  app.post("/api/proposals/:id/vote", async (req, res) => {
    try {
      const proposalId = parseInt(req.params.id);
      const { voteFor } = req.body;
      
      if (typeof voteFor !== "boolean") {
        return res.status(400).json({ message: "Invalid vote data. 'voteFor' must be a boolean." });
      }
      
      const updatedProposal = await storage.voteOnProposal(proposalId, voteFor);
      res.json(updatedProposal);
    } catch (error) {
      res.status(500).json({ message: "Failed to cast vote" });
    }
  });

  // Whitepaper route
  app.get("/whitepaper", async (req, res) => {
    try {
      const whitepaperPath = path.resolve(__dirname, "../whitepaper.md");
      const whitepaperContent = fs.readFileSync(whitepaperPath, "utf-8");
      
      // Convert markdown to HTML for better display
      const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cat Driven by CatDAO: Whitepaper</title>
    <style>
        body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
        }
        h1, h2, h3, h4 {
            color: #2c3e50;
        }
        h1 {
            border-bottom: 2px solid #eee;
            padding-bottom: 10px;
            margin-top: 30px;
        }
        h2 {
            margin-top: 25px;
            border-bottom: 1px solid #eee;
            padding-bottom: 5px;
        }
        code {
            background-color: #f0f0f0;
            padding: 2px 4px;
            border-radius: 3px;
        }
        pre {
            background-color: #f0f0f0;
            padding: 10px;
            border-radius: 5px;
            overflow-x: auto;
        }
        blockquote {
            border-left: 4px solid #ccc;
            padding-left: 15px;
            color: #555;
            margin-left: 0;
        }
        a {
            color: #3498db;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        /* Convert markdown to simple HTML */
        .markdown {
            white-space: pre-wrap;
        }
    </style>
</head>
<body>
    <div class="markdown">${whitepaperContent}</div>
</body>
</html>
      `;
      
      res.send(htmlContent);
    } catch (error) {
      console.error("Error serving whitepaper:", error);
      res.status(500).send("Error loading whitepaper");
    }
  });

  
  // Portfolio routes
  app.get("/api/portfolio/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const portfolio = await storage.getPortfolioByUserId(userId);
      
      if (!portfolio) {
        return res.status(404).json({ message: "Portfolio not found" });
      }
      
      res.json(portfolio);
    } catch (error) {
      res.status(500).json({ message: "Failed to get portfolio" });
    }
  });
  
  // Token price history
  app.get("/api/token-prices/:symbol", async (req, res) => {
    try {
      const { symbol } = req.params;
      const limit = parseInt(req.query.limit as string) || 30;
      
      const tokenPrices = await storage.getTokenPrices(symbol, limit);
      res.json(tokenPrices);
    } catch (error) {
      res.status(500).json({ message: "Failed to get token price history" });
    }
  });
  
  // Lost Pet routes
  app.get("/api/lost-pets", async (req, res) => {
    try {
      const lostPets = await storage.getAllLostPets();
      res.json(lostPets);
    } catch (error) {
      res.status(500).json({ message: "Failed to get lost pets" });
    }
  });
  
  app.get("/api/lost-pets/:id", async (req, res) => {
    try {
      const petId = parseInt(req.params.id);
      const lostPet = await storage.getLostPet(petId);
      
      if (!lostPet) {
        return res.status(404).json({ message: "Lost pet not found" });
      }
      
      res.json(lostPet);
    } catch (error) {
      res.status(500).json({ message: "Failed to get lost pet details" });
    }
  });
  
  app.get("/api/lost-pets/user/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const lostPets = await storage.getLostPetsByUserId(userId);
      res.json(lostPets);
    } catch (error) {
      res.status(500).json({ message: "Failed to get user's lost pets" });
    }
  });
  
  app.post("/api/lost-pets", async (req, res) => {
    try {
      const lostPetData = insertLostPetSchema.parse(req.body);
      const lostPet = await storage.createLostPet(lostPetData);
      res.status(201).json(lostPet);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid lost pet data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create lost pet report" });
    }
  });
  
  app.patch("/api/lost-pets/:id/status", async (req, res) => {
    try {
      const petId = parseInt(req.params.id);
      const { isFound } = req.body;
      
      if (typeof isFound !== "boolean") {
        return res.status(400).json({ message: "Invalid status data. 'isFound' must be a boolean." });
      }
      
      const updatedPet = await storage.updateLostPetStatus(petId, isFound);
      res.json(updatedPet);
    } catch (error) {
      res.status(500).json({ message: "Failed to update lost pet status" });
    }
  });
  
  app.patch("/api/lost-pets/:id/music-theme", async (req, res) => {
    try {
      const petId = parseInt(req.params.id);
      const { musicThemeId } = req.body;
      
      if (typeof musicThemeId !== "string") {
        return res.status(400).json({ message: "Invalid music theme data. 'musicThemeId' must be a string." });
      }
      
      const updatedPet = await storage.updateLostPetMusicTheme(petId, musicThemeId);
      res.json(updatedPet);
    } catch (error) {
      res.status(500).json({ message: "Failed to update lost pet music theme" });
    }
  });
  
  // Lost Pet Sighting routes
  app.get("/api/lost-pet-sightings/:lostPetId", async (req, res) => {
    try {
      const lostPetId = parseInt(req.params.lostPetId);
      const sightings = await storage.getLostPetSightingsByLostPetId(lostPetId);
      res.json(sightings);
    } catch (error) {
      res.status(500).json({ message: "Failed to get pet sightings" });
    }
  });
  
  app.post("/api/lost-pet-sightings", async (req, res) => {
    try {
      const sightingData = insertLostPetSightingSchema.parse(req.body);
      const sighting = await storage.createLostPetSighting(sightingData);
      res.status(201).json(sighting);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid sighting data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create pet sighting" });
    }
  });
  
  app.patch("/api/lost-pet-sightings/:id/verify", async (req, res) => {
    try {
      const sightingId = parseInt(req.params.id);
      const { isVerified } = req.body;
      
      if (typeof isVerified !== "boolean") {
        return res.status(400).json({ message: "Invalid verification data. 'isVerified' must be a boolean." });
      }
      
      const updatedSighting = await storage.verifyLostPetSighting(sightingId, isVerified);
      res.json(updatedSighting);
    } catch (error) {
      res.status(500).json({ message: "Failed to verify sighting" });
    }
  });

  // Current user (for testing purposes)
  app.get("/api/current-user", async (req, res) => {
    try {
      // Return the first user (would normally use sessions/auth)
      const user = await storage.getUserByUsername("cryptokitten");
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Don't return the password
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Failed to get current user" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
