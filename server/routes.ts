import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertAssetSchema, insertCatNftSchema, insertProposalSchema } from "@shared/schema";
import { z } from "zod";

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
