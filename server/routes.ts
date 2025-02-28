import { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as schemaImport from "@shared/schema";
import { storage } from "./storage";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function registerRoutes(app: Express): Promise<Server> {
  // Get assets by user id
  app.get("/api/assets/:userId", async (req, res) => {
    const userId = parseInt(req.params.userId);
    try {
      const assets = await storage.getAssetsByUserId(userId);
      res.json(assets);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch assets" });
    }
  });

  // Create asset
  app.post("/api/assets", async (req, res) => {
    try {
      const asset = await storage.createAsset(req.body);
      res.status(201).json(asset);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create asset" });
    }
  });

  // Get all Cat NFTs
  app.get("/api/nfts", async (_req, res) => {
    try {
      const nfts = await storage.getAllCatNfts();
      res.json(nfts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch NFTs" });
    }
  });

  // Get Cat NFTs by owner id
  app.get("/api/nfts/user/:userId", async (req, res) => {
    const ownerId = parseInt(req.params.userId);
    try {
      const nfts = await storage.getCatNftsByOwnerId(ownerId);
      res.json(nfts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch user NFTs" });
    }
  });

  // Create Cat NFT
  app.post("/api/nfts", async (req, res) => {
    try {
      const nft = await storage.createCatNft(req.body);
      res.status(201).json(nft);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create NFT" });
    }
  });

  // Get all proposals
  app.get("/api/proposals", async (_req, res) => {
    try {
      const proposals = await storage.getAllProposals();
      res.json(proposals);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch proposals" });
    }
  });

  // Get active proposals
  app.get("/api/proposals/active", async (_req, res) => {
    try {
      const proposals = await storage.getActiveProposals();
      res.json(proposals);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch active proposals" });
    }
  });

  // Create proposal
  app.post("/api/proposals", async (req, res) => {
    try {
      const proposal = await storage.createProposal(req.body);
      res.status(201).json(proposal);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create proposal" });
    }
  });

  // Vote on proposal
  app.post("/api/proposals/:id/vote", async (req, res) => {
    const proposalId = parseInt(req.params.id);
    const { voteFor } = req.body;
    try {
      const proposal = await storage.voteOnProposal(proposalId, voteFor);
      res.json(proposal);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to vote on proposal" });
    }
  });

  // Get user portfolio
  app.get("/api/portfolios/:userId", async (req, res) => {
    const userId = parseInt(req.params.userId);
    try {
      const portfolio = await storage.getPortfolioByUserId(userId);
      if (!portfolio) {
        return res.status(404).json({ error: "Portfolio not found" });
      }
      res.json(portfolio);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch portfolio" });
    }
  });

  // Create portfolio
  app.post("/api/portfolios", async (req, res) => {
    try {
      const portfolio = await storage.createPortfolio(req.body);
      res.status(201).json(portfolio);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create portfolio" });
    }
  });

  // Get token prices
  app.get("/api/token-prices/:symbol", async (req, res) => {
    const { symbol } = req.params;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 30;
    try {
      const prices = await storage.getTokenPrices(symbol, limit);
      res.json(prices);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch token prices" });
    }
  });

  // Add token price
  app.post("/api/token-prices", async (req, res) => {
    try {
      const price = await storage.addTokenPrice(req.body);
      res.status(201).json(price);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to add token price" });
    }
  });

  // Get all lost pets
  app.get("/api/lost-pets", async (_req, res) => {
    try {
      const pets = await storage.getAllLostPets();
      res.json(pets);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch lost pets" });
    }
  });

  // Get lost pet by id
  app.get("/api/lost-pets/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    try {
      const pet = await storage.getLostPet(id);
      if (!pet) {
        return res.status(404).json({ error: "Lost pet not found" });
      }
      res.json(pet);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch lost pet" });
    }
  });

  // Get lost pets by user id
  app.get("/api/lost-pets/user/:userId", async (req, res) => {
    const userId = parseInt(req.params.userId);
    try {
      const pets = await storage.getLostPetsByUserId(userId);
      res.json(pets);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch user's lost pets" });
    }
  });

  // Create lost pet
  app.post("/api/lost-pets", async (req, res) => {
    try {
      const pet = await storage.createLostPet(req.body);
      res.status(201).json(pet);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create lost pet listing" });
    }
  });

  // Update lost pet status
  app.patch("/api/lost-pets/:id/status", async (req, res) => {
    const id = parseInt(req.params.id);
    const { isFound } = req.body;
    try {
      const pet = await storage.updateLostPetStatus(id, isFound);
      res.json(pet);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update lost pet status" });
    }
  });

  // Update lost pet music theme
  app.patch("/api/lost-pets/:id/music-theme", async (req, res) => {
    const id = parseInt(req.params.id);
    const { musicThemeId } = req.body;
    try {
      const pet = await storage.updateLostPetMusicTheme(id, musicThemeId);
      res.json(pet);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update lost pet music theme" });
    }
  });

  // Get lost pet sightings by lost pet id
  app.get("/api/lost-pet-sightings/:lostPetId", async (req, res) => {
    const lostPetId = parseInt(req.params.lostPetId);
    try {
      const sightings = await storage.getLostPetSightingsByLostPetId(lostPetId);
      res.json(sightings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch lost pet sightings" });
    }
  });

  // Create lost pet sighting
  app.post("/api/lost-pet-sightings", async (req, res) => {
    try {
      const sighting = await storage.createLostPetSighting(req.body);
      res.status(201).json(sighting);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create lost pet sighting" });
    }
  });

  // Verify lost pet sighting
  app.patch("/api/lost-pet-sightings/:id/verify", async (req, res) => {
    const id = parseInt(req.params.id);
    const { isVerified } = req.body;
    try {
      const sighting = await storage.verifyLostPetSighting(id, isVerified);
      res.json(sighting);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to verify lost pet sighting" });
    }
  });

  // Serve the launch plan markdown file
  app.get("/api/launch-plan", (req, res) => {
    try {
      const filePath = path.resolve("cat_driven_executive_launch_plan.md");
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      res.type('text/plain').send(fileContent);
    } catch (error) {
      console.error('Error serving launch plan file:', error);
      res.status(500).json({ error: "Failed to load launch plan document" });
    }
  });

  // Create HTTP server without WebSockets
  const httpServer = createServer(app);
  return httpServer;
}