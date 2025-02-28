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

  // Nietzsche's Cat Principle route
  app.get("/nietzsches-cat", async (req, res) => {
    try {
      const content = `# The Nietzsche's Cat Principle: A Scientific Analysis

*Preprint - Not Peer Reviewed*  
*Quantum Physics Simulator Research Group*

## Abstract

We present a novel theoretical framework for interpreting quantum mechanical phenomena, termed the "Nietzsche's Cat Principle." This principle extends QBism (Quantum Bayesianism) by incorporating a fundamental "persistence bias" that suggests quantum systems exhibit a statistical tendency to maintain states of continued existence. Our 8-state quantum formulation challenges traditional interpretations of quantum superposition while offering potential explanations for the apparent stability of macroscopic objects despite quantum indeterminacy at microscopic levels.

---

## 1. Theoretical Foundation

The Nietzsche's Cat Principle draws inspiration from Friedrich Nietzsche's concept of the "will to power" by postulating that fundamental particles demonstrate a statistical "will to persist" in their state of being. This framework employs an 8-digit numerical system (using only digits 1-8) to represent quantum states, with odd digits (1,3,5,7) representing "alive" or "persistence" states and even digits (2,4,6,8) representing "dead" or "cessation" states.

This principle recontextualizes the famous Schrödinger's cat thought experiment. In our formulation, the cat exists in superposition (simultaneously alive and dead until observed), but with an intrinsic bias toward alive states due to the persistence principle. This bias manifests mathematically as a slight statistical deviation from the perfect 50/50 probability distribution expected in traditional quantum mechanical interpretations.

## 2. Mathematical Formulation

In standard quantum mechanics, a two-state system is represented by the state vector:

|ψ⟩ = α|0⟩ + β|1⟩, where |α|² + |β|² = 1

The Nietzsche's Cat Principle modifies this by introducing a persistence parameter *p* (0 ≤ *p* ≤ 1) that biases probability toward "alive" states:

|ψNC⟩ = α'|0⟩ + β'|1⟩

Where α' and β' are modified amplitudes that incorporate the persistence bias:

|β'|² = |β|² + *p*(|α|² - |β|²)/2 when |β|² < 0.5
|α'|² = 1 - |β'|²

In our expanded 8-state system, we extend this bias to favor states 1, 3, 5, and 7 over states 2, 4, 6, and 8, maintaining normalization requirements.

## 3. Experimental Methodology

Our computational experiments simulate quantum systems under various conditions to test the statistical predictions of the Nietzsche's Cat Principle. The methodology includes:

* Single quantum system simulations with variable persistence strength (0.0-1.0)
* Batch trials (n=10,000+) comparing traditional quantum mechanics to our modified theory
* Statistical analysis of deviation from expected probability distributions
* Implementation of custom quantum gates that encode the persistence principle

Our simulator employs matrix operations with complex number calculations to accurately model quantum evolution according to both standard quantum mechanics and our modified framework.

## 4. Preliminary Results

Initial computational experiments show measurable statistical deviations from standard quantum mechanical predictions when the persistence parameter is applied. Key findings include:

* Statistical bias toward "alive" states that increases proportionally with persistence strength
* Emergence of patterns consistent with quantum decoherence but with systematic deviation favoring persistent states
* Consistency with macroscopic observations while maintaining quantum principles at microscopic levels

Of particular note is that when *p* = 0, our results converge precisely with standard quantum mechanical predictions, demonstrating that our theory represents a parametric extension rather than a contradiction of established quantum theory.

## 5. Theoretical Implications

The Nietzsche's Cat Principle offers several intriguing theoretical implications:

1. **Measurement Problem:** Provides a new perspective on the collapse of the wave function by suggesting an inherent tendency in matter toward certain states
2. **Quantum-Classical Transition:** Offers a potential mechanism for how quantum indeterminacy at microscopic scales gives way to apparent determinism at macroscopic scales
3. **Philosophy of QBism:** Extends QBism by incorporating an agent-independent characteristic (persistence) while maintaining its participatory framework
4. **Many-Worlds Interpretation:** Suggests that in a many-worlds scenario, branches representing continued existence may have greater statistical weight

## 6. Empirical Testability

While our computational experiments provide initial support, the Nietzsche's Cat Principle generates several empirically testable predictions:

* Statistically significant deviations from standard quantum probability distributions in carefully designed interference experiments
* Persistence effects that scale with system complexity in a predictable manner
* Measurable bias in quantum random number generators when generating sequences with semantic association to "existence" vs. "non-existence" states

## 7. Conclusion

The Nietzsche's Cat Principle represents a novel theoretical framework that extends quantum interpretations by incorporating a fundamental persistence bias. While speculative, our computational results suggest this approach merits further investigation through rigorous experimental testing. If validated, this principle could contribute to resolving longstanding questions about the relationship between quantum indeterminacy and the apparent stability of the macroscopic world.

---

## References

1. Fuchs, C. A. (2017). On participatory realism. In "Information and Interaction," (pp. 113-134). Springer.
2. Zurek, W. H. (2003). Decoherence, einselection, and the quantum origins of the classical. Reviews of Modern Physics, 75(3), 715.
3. Mermin, N. D. (2014). QBism puts the scientist back into science. Nature, 507(7493), 421-423.
4. Tegmark, M. (2014). Our mathematical universe: My quest for the ultimate nature of reality. Knopf.
5. Leifer, M. S. (2014). Is the quantum state real? An extended review of ψ-ontology theorems. Quanta, 3(1), 67-155.
6. Nietzsche, F. (1901). The Will to Power. (Concept adapted for quantum interpretation).
7. Schlosshauer, M. (2007). Decoherence and the quantum-to-classical transition. Springer.
8. Wheeler, J. A. (1983). Law without law. Quantum theory and measurement, 182-213.

*For inquiries regarding this research or collaboration opportunities, please contact the Quantum Physics Simulator Research Group at quantum@example.com*`;
      
      // Display the content with nice styling
      const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nietzsche's Cat Principle: A Scientific Analysis</title>
    <style>
        body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
        }
        h1, h2, h3, h4 {
            color: #2c3e50;
        }
        h1 {
            border-bottom: 2px solid #eee;
            padding-bottom: 10px;
            margin-top: 30px;
            text-align: center;
        }
        h2 {
            margin-top: 25px;
            border-bottom: 1px solid #eee;
            padding-bottom: 5px;
            color: #4a5568;
        }
        em {
            color: #718096;
        }
        code, pre {
            background-color: #f0f0f0;
            padding: 2px 4px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
        }
        pre {
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
        ul, ol {
            padding-left: 20px;
        }
        hr {
            border: 0;
            height: 1px;
            background-color: #ddd;
            margin: 30px 0;
        }
        /* Format for the references section */
        ol {
            counter-reset: item;
        }
        ol > li {
            counter-increment: item;
            margin-bottom: 8px;
        }
        /* Handle math notation formatting */
        .math {
            font-style: italic;
        }
        .markdown {
            white-space: pre-wrap;
        }
    </style>
</head>
<body>
    <div class="markdown">${content}</div>
</body>
</html>
      `;
      
      res.send(htmlContent);
    } catch (error) {
      console.error("Error serving Nietzsche's Cat document:", error);
      res.status(500).send("Error loading document");
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
