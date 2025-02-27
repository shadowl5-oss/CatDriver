import {
  users, User, InsertUser,
  assets, Asset, InsertAsset,
  catNfts, CatNft, InsertCatNft,
  proposals, Proposal, InsertProposal,
  portfolios, Portfolio, InsertPortfolio,
  tokenPrices, TokenPrice, InsertTokenPrice,
  lostPets, LostPet, InsertLostPet,
  lostPetSightings, LostPetSighting, InsertLostPetSighting
} from "@shared/schema";
import { eq, desc } from "drizzle-orm";
import { db } from "./db";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Asset methods
  getAssetsByUserId(userId: number): Promise<Asset[]>;
  createAsset(asset: InsertAsset): Promise<Asset>;
  
  // Cat NFT methods
  getAllCatNfts(): Promise<CatNft[]>;
  getCatNftsByOwnerId(ownerId: number): Promise<CatNft[]>;
  createCatNft(nft: InsertCatNft): Promise<CatNft>;
  
  // Proposal methods
  getAllProposals(): Promise<Proposal[]>;
  getActiveProposals(): Promise<Proposal[]>;
  createProposal(proposal: InsertProposal): Promise<Proposal>;
  voteOnProposal(proposalId: number, voteFor: boolean): Promise<Proposal>;
  
  // Portfolio methods
  getPortfolioByUserId(userId: number): Promise<Portfolio | undefined>;
  createPortfolio(portfolio: InsertPortfolio): Promise<Portfolio>;
  
  // Token price methods
  getTokenPrices(symbol: string, limit: number): Promise<TokenPrice[]>;
  addTokenPrice(tokenPrice: InsertTokenPrice): Promise<TokenPrice>;
  
  // Lost Pet methods
  getLostPet(id: number): Promise<LostPet | undefined>;
  getAllLostPets(): Promise<LostPet[]>;
  getLostPetsByUserId(userId: number): Promise<LostPet[]>;
  createLostPet(lostPet: InsertLostPet): Promise<LostPet>;
  updateLostPetStatus(id: number, isFound: boolean): Promise<LostPet>;
  
  // Lost Pet Sightings methods
  getLostPetSighting(id: number): Promise<LostPetSighting | undefined>;
  getLostPetSightingsByLostPetId(lostPetId: number): Promise<LostPetSighting[]>;
  createLostPetSighting(sighting: InsertLostPetSighting): Promise<LostPetSighting>;
  verifyLostPetSighting(id: number, isVerified: boolean): Promise<LostPetSighting>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private assets: Map<number, Asset>;
  private catNfts: Map<number, CatNft>;
  private proposals: Map<number, Proposal>;
  private portfolios: Map<number, Portfolio>;
  private tokenPrices: Map<number, TokenPrice>;
  private lostPets: Map<number, LostPet>;
  private lostPetSightings: Map<number, LostPetSighting>;
  
  private currentUserId: number;
  private currentAssetId: number;
  private currentNftId: number;
  private currentProposalId: number;
  private currentPortfolioId: number;
  private currentTokenPriceId: number;
  private currentLostPetId: number;
  private currentLostPetSightingId: number;
  
  constructor() {
    this.users = new Map();
    this.assets = new Map();
    this.catNfts = new Map();
    this.proposals = new Map();
    this.portfolios = new Map();
    this.tokenPrices = new Map();
    this.lostPets = new Map();
    this.lostPetSightings = new Map();
    
    this.currentUserId = 1;
    this.currentAssetId = 1;
    this.currentNftId = 1;
    this.currentProposalId = 1;
    this.currentPortfolioId = 1;
    this.currentTokenPriceId = 1;
    this.currentLostPetId = 1;
    this.currentLostPetSightingId = 1;
    
    // Initialize with mock data
    this.initMockData();
  }
  
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  
  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user = { 
      ...insertUser, 
      id,
      displayName: insertUser.displayName || null,
      profileImage: insertUser.profileImage || null,
      isConnected: insertUser.isConnected ?? true
    };
    this.users.set(id, user);
    return user;
  }
  
  // Asset methods
  async getAssetsByUserId(userId: number): Promise<Asset[]> {
    return Array.from(this.assets.values()).filter(
      (asset) => asset.userId === userId
    );
  }
  
  async createAsset(insertAsset: InsertAsset): Promise<Asset> {
    const id = this.currentAssetId++;
    const asset = { 
      ...insertAsset, 
      id,
      priceChange: insertAsset.priceChange || null,
      icon: insertAsset.icon || null,
      iconColor: insertAsset.iconColor || null
    };
    this.assets.set(id, asset);
    return asset;
  }
  
  // Cat NFT methods
  async getAllCatNfts(): Promise<CatNft[]> {
    return Array.from(this.catNfts.values());
  }
  
  async getCatNftsByOwnerId(ownerId: number): Promise<CatNft[]> {
    return Array.from(this.catNfts.values()).filter(
      (nft) => nft.ownerId === ownerId
    );
  }
  
  async createCatNft(insertNft: InsertCatNft): Promise<CatNft> {
    const id = this.currentNftId++;
    const nft = { 
      ...insertNft, 
      id,
      ownerId: insertNft.ownerId || null
    };
    this.catNfts.set(id, nft);
    return nft;
  }
  
  // Proposal methods
  async getAllProposals(): Promise<Proposal[]> {
    return Array.from(this.proposals.values());
  }
  
  async getActiveProposals(): Promise<Proposal[]> {
    return Array.from(this.proposals.values()).filter(
      (proposal) => proposal.status === "Voting"
    );
  }
  
  async createProposal(insertProposal: InsertProposal): Promise<Proposal> {
    const id = this.currentProposalId++;
    const proposal = { 
      ...insertProposal, 
      id,
      votesFor: insertProposal.votesFor || 0,
      votesAgainst: insertProposal.votesAgainst || 0
    };
    this.proposals.set(id, proposal);
    return proposal;
  }
  
  async voteOnProposal(proposalId: number, voteFor: boolean): Promise<Proposal> {
    const proposal = this.proposals.get(proposalId);
    if (!proposal) {
      throw new Error(`Proposal with ID ${proposalId} not found`);
    }
    
    if (voteFor) {
      proposal.votesFor = (proposal.votesFor || 0) + 1;
    } else {
      proposal.votesAgainst = (proposal.votesAgainst || 0) + 1;
    }
    
    this.proposals.set(proposalId, proposal);
    return proposal;
  }
  
  // Portfolio methods
  async getPortfolioByUserId(userId: number): Promise<Portfolio | undefined> {
    return Array.from(this.portfolios.values()).find(
      (portfolio) => portfolio.userId === userId
    );
  }
  
  async createPortfolio(insertPortfolio: InsertPortfolio): Promise<Portfolio> {
    const id = this.currentPortfolioId++;
    const portfolio = { 
      ...insertPortfolio, 
      id,
      growthChange: insertPortfolio.growthChange || null,
      stakingRewards: insertPortfolio.stakingRewards || null
    };
    this.portfolios.set(id, portfolio);
    return portfolio;
  }
  
  // Token price methods
  async getTokenPrices(symbol: string, limit: number): Promise<TokenPrice[]> {
    return Array.from(this.tokenPrices.values())
      .filter((tp) => tp.symbol === symbol)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);
  }
  
  async addTokenPrice(insertTokenPrice: InsertTokenPrice): Promise<TokenPrice> {
    const id = this.currentTokenPriceId++;
    const tokenPrice = { 
      ...insertTokenPrice, 
      id,
      volume: insertTokenPrice.volume || null
    };
    this.tokenPrices.set(id, tokenPrice);
    return tokenPrice;
  }
  
  // Lost Pet methods
  async getLostPet(id: number): Promise<LostPet | undefined> {
    return this.lostPets.get(id);
  }
  
  async getAllLostPets(): Promise<LostPet[]> {
    return Array.from(this.lostPets.values())
      .sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      });
  }
  
  async getLostPetsByUserId(userId: number): Promise<LostPet[]> {
    return Array.from(this.lostPets.values())
      .filter(lostPet => lostPet.userId === userId);
  }
  
  async createLostPet(insertLostPet: InsertLostPet): Promise<LostPet> {
    const id = this.currentLostPetId++;
    const now = new Date();
    const lostPet: LostPet = {
      ...insertLostPet,
      id,
      imageUrl: insertLostPet.imageUrl || null,
      rewardAmount: insertLostPet.rewardAmount || null,
      isFound: insertLostPet.isFound ?? false,
      createdAt: now,
      updatedAt: now
    };
    this.lostPets.set(id, lostPet);
    return lostPet;
  }
  
  async updateLostPetStatus(id: number, isFound: boolean): Promise<LostPet> {
    const lostPet = this.lostPets.get(id);
    
    if (!lostPet) {
      throw new Error(`Lost pet with ID ${id} not found`);
    }
    
    const updatedLostPet = {
      ...lostPet,
      isFound,
      updatedAt: new Date()
    };
    
    this.lostPets.set(id, updatedLostPet);
    return updatedLostPet;
  }
  
  // Lost Pet Sightings methods
  async getLostPetSighting(id: number): Promise<LostPetSighting | undefined> {
    return this.lostPetSightings.get(id);
  }
  
  async getLostPetSightingsByLostPetId(lostPetId: number): Promise<LostPetSighting[]> {
    return Array.from(this.lostPetSightings.values())
      .filter(sighting => sighting.lostPetId === lostPetId)
      .sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      });
  }
  
  async createLostPetSighting(insertSighting: InsertLostPetSighting): Promise<LostPetSighting> {
    const id = this.currentLostPetSightingId++;
    const now = new Date();
    const sighting: LostPetSighting = {
      ...insertSighting,
      id,
      imageUrl: insertSighting.imageUrl || null,
      isVerified: insertSighting.isVerified ?? false,
      createdAt: now
    };
    this.lostPetSightings.set(id, sighting);
    return sighting;
  }
  
  async verifyLostPetSighting(id: number, isVerified: boolean): Promise<LostPetSighting> {
    const sighting = this.lostPetSightings.get(id);
    
    if (!sighting) {
      throw new Error(`Sighting with ID ${id} not found`);
    }
    
    const updatedSighting = {
      ...sighting,
      isVerified
    };
    
    this.lostPetSightings.set(id, updatedSighting);
    return updatedSighting;
  }
  
  // Initialize mock data
  private initMockData() {
    // Create a default user
    const user: User = {
      id: this.currentUserId++,
      username: "cryptokitten",
      password: "password", // In a real app, this would be hashed
      displayName: "Crypto Kitten",
      profileImage: "",
      isConnected: true
    };
    this.users.set(user.id, user);
    
    // Create some assets
    const assets: InsertAsset[] = [
      {
        name: "CDV Token",
        symbol: "CDV",
        price: 0.0734,
        priceChange: 0.032,
        quantity: 1530782,
        userId: user.id,
        icon: "fa-cat",
        iconColor: "gradient"
      },
      {
        name: "Bitcoin",
        symbol: "BTC",
        price: 64000,
        priceChange: 0.012,
        quantity: 0.4523,
        userId: user.id,
        icon: "fa-bitcoin",
        iconColor: "#F7931A"
      },
      {
        name: "Ethereum",
        symbol: "ETH",
        price: 4066,
        priceChange: -0.008,
        quantity: 2.145,
        userId: user.id,
        icon: "fa-ethereum",
        iconColor: "#627EEA"
      },
      {
        name: "Tether",
        symbol: "USDT",
        price: 1,
        priceChange: 0.000,
        quantity: 2457.27,
        userId: user.id,
        icon: "text-USDT",
        iconColor: "#26A17B"
      }
    ];
    
    assets.forEach((asset) => {
      this.createAsset(asset);
    });
    
    // Create some NFTs
    const nfts: InsertCatNft[] = [
      {
        name: "Legendary Sphinx Cat #042",
        rarity: "Legendary",
        image: "https://i.pravatar.cc/300?img=1",
        price: 7.5,
        ownerId: user.id,
        tokenId: "CAT042"
      },
      {
        name: "Epic Maine Coon #108",
        rarity: "Epic",
        image: "https://i.pravatar.cc/300?img=2",
        price: 3.2,
        ownerId: user.id,
        tokenId: "CAT108"
      },
      {
        name: "Rare Siamese #291",
        rarity: "Rare",
        image: "https://i.pravatar.cc/300?img=3",
        price: 1.8,
        ownerId: user.id,
        tokenId: "CAT291"
      },
      {
        name: "Common Tabby #573",
        rarity: "Common",
        image: "https://i.pravatar.cc/300?img=4",
        price: 0.5,
        ownerId: user.id,
        tokenId: "CAT573"
      }
    ];
    
    nfts.forEach((nft) => {
      this.createCatNft(nft);
    });
    
    // Create some proposals
    const today = new Date();
    const proposals: InsertProposal[] = [
      {
        title: "CDVP-42: Increase Staking Rewards",
        description: "Proposal to increase staking rewards by 5% to encourage long-term holding.",
        votesFor: 680,
        votesAgainst: 320,
        endDate: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000), // +3 days
        status: "Voting"
      },
      {
        title: "CDVP-41: Add New Cat Traits Collection",
        description: "Introduce a new collection of cat traits that can be applied to existing NFTs.",
        votesFor: 750,
        votesAgainst: 250,
        endDate: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000), // +5 days
        status: "Voting"
      },
      {
        title: "CDVP-40: Reduce Marketplace Fees to 1.5%",
        description: "Lower the marketplace transaction fees from 2.5% to 1.5% to boost trading volume.",
        votesFor: 820,
        votesAgainst: 180,
        endDate: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000), // +7 days
        status: "Voting"
      }
    ];
    
    proposals.forEach((proposal) => {
      this.createProposal(proposal);
    });
    
    // Create portfolio
    const portfolio: InsertPortfolio = {
      userId: user.id,
      totalValue: 152483.56,
      growth: 18.7,
      growthChange: 5.1,
      stakingRewards: 121
    };
    
    this.createPortfolio(portfolio);
    
    // Create token price history (last 30 days)
    const tokenPrices: InsertTokenPrice[] = [];
    const basePrice = 0.05;
    let currentPrice = basePrice;
    
    for (let i = 30; i >= 0; i--) {
      // Random price change between -5% and 10%
      const change = Math.random() * 0.15 - 0.05;
      currentPrice = Math.max(0.01, currentPrice * (1 + change));
      
      tokenPrices.push({
        symbol: "CDV",
        price: currentPrice,
        timestamp: new Date(today.getTime() - i * 24 * 60 * 60 * 1000),
        volume: Math.random() * 1000000 + 500000
      });
    }
    
    tokenPrices.forEach((tp) => {
      this.addTokenPrice(tp);
    });
    
    // Create some lost pet reports
    const lostPets: InsertLostPet[] = [
      {
        userId: user.id,
        catName: "Whiskers",
        description: "Adult male orange tabby with white paws and chest. Friendly and responds to his name.",
        lastSeenLocation: "Central Park, near the East 72nd entrance",
        lastSeenDate: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        contactInfo: "Call or text 555-123-4567",
        imageUrl: "https://i.pravatar.cc/300?img=5",
        rewardAmount: 100,
        isFound: false
      },
      {
        userId: user.id,
        catName: "Luna",
        description: "Young female black cat with yellow eyes. Very shy and might hide if approached.",
        lastSeenLocation: "Brooklyn Heights, near the promenade",
        lastSeenDate: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        contactInfo: "Email: findluna@example.com",
        imageUrl: "https://i.pravatar.cc/300?img=6",
        rewardAmount: 200,
        isFound: false
      }
    ];
    
    // Add lost pets
    const createdLostPets = lostPets.map(pet => this.createLostPet(pet));
    
    // Add some sightings for the first lost pet
    Promise.all(createdLostPets).then(pets => {
      if (pets.length > 0) {
        const firstPet = pets[0];
        
        const sightings: InsertLostPetSighting[] = [
          {
            lostPetId: firstPet.id,
            reportedByUserId: user.id,
            location: "Central Park, near Bethesda Fountain",
            sightingDate: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
            description: "Saw an orange cat that matches the description. It ran off when I approached.",
            contactInfo: "Call me at 555-987-6543",
            isVerified: false
          },
          {
            lostPetId: firstPet.id,
            reportedByUserId: user.id,
            location: "East 70th Street and 5th Avenue",
            sightingDate: new Date(today.getTime() - 12 * 60 * 60 * 1000), // 12 hours ago
            description: "Orange tabby with white paws spotted in the morning, was eating from a food bowl left on a porch.",
            imageUrl: "https://i.pravatar.cc/300?img=7",
            contactInfo: "Email: catlover@example.com",
            isVerified: true
          }
        ];
        
        sightings.forEach(sighting => {
          this.createLostPetSighting(sighting);
        });
      }
    });
  }
}

// Database storage implementation
export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const results = await db.select().from(users).where(eq(users.id, id));
    return results[0];
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    const results = await db.select().from(users).where(eq(users.username, username));
    return results[0];
  }
  
  async createUser(user: InsertUser): Promise<User> {
    const results = await db.insert(users).values(user).returning();
    return results[0];
  }
  
  async getAssetsByUserId(userId: number): Promise<Asset[]> {
    return await db.select().from(assets).where(eq(assets.userId, userId));
  }
  
  async createAsset(asset: InsertAsset): Promise<Asset> {
    const results = await db.insert(assets).values(asset).returning();
    return results[0];
  }
  
  async getAllCatNfts(): Promise<CatNft[]> {
    return await db.select().from(catNfts);
  }
  
  async getCatNftsByOwnerId(ownerId: number): Promise<CatNft[]> {
    return await db.select().from(catNfts).where(eq(catNfts.ownerId, ownerId));
  }
  
  async createCatNft(nft: InsertCatNft): Promise<CatNft> {
    const results = await db.insert(catNfts).values(nft).returning();
    return results[0];
  }
  
  async getAllProposals(): Promise<Proposal[]> {
    return await db.select().from(proposals);
  }
  
  async getActiveProposals(): Promise<Proposal[]> {
    return await db.select().from(proposals).where(eq(proposals.status, "Voting"));
  }
  
  async createProposal(proposal: InsertProposal): Promise<Proposal> {
    const results = await db.insert(proposals).values(proposal).returning();
    return results[0];
  }
  
  async voteOnProposal(proposalId: number, voteFor: boolean): Promise<Proposal> {
    // Get current proposal
    const [currentProposal] = await db.select().from(proposals).where(eq(proposals.id, proposalId));
    
    if (!currentProposal) {
      throw new Error(`Proposal with ID ${proposalId} not found`);
    }
    
    // Update vote counts
    if (voteFor) {
      await db.update(proposals)
        .set({ votesFor: (currentProposal.votesFor || 0) + 1 })
        .where(eq(proposals.id, proposalId));
    } else {
      await db.update(proposals)
        .set({ votesAgainst: (currentProposal.votesAgainst || 0) + 1 })
        .where(eq(proposals.id, proposalId));
    }
    
    // Get updated proposal
    const [updatedProposal] = await db.select().from(proposals).where(eq(proposals.id, proposalId));
    
    if (!updatedProposal) {
      throw new Error(`Failed to retrieve updated proposal with ID ${proposalId}`);
    }
    
    return updatedProposal;
  }
  
  async getPortfolioByUserId(userId: number): Promise<Portfolio | undefined> {
    const results = await db.select().from(portfolios).where(eq(portfolios.userId, userId));
    return results[0];
  }
  
  async createPortfolio(portfolio: InsertPortfolio): Promise<Portfolio> {
    const results = await db.insert(portfolios).values(portfolio).returning();
    return results[0];
  }
  
  async getTokenPrices(symbol: string, limit: number): Promise<TokenPrice[]> {
    return await db.select()
      .from(tokenPrices)
      .where(eq(tokenPrices.symbol, symbol))
      .orderBy(desc(tokenPrices.timestamp))
      .limit(limit);
  }
  
  async addTokenPrice(tokenPrice: InsertTokenPrice): Promise<TokenPrice> {
    const results = await db.insert(tokenPrices).values(tokenPrice).returning();
    return results[0];
  }
  
  // Lost Pet methods
  async getLostPet(id: number): Promise<LostPet | undefined> {
    const results = await db.select().from(lostPets).where(eq(lostPets.id, id));
    return results[0];
  }
  
  async getAllLostPets(): Promise<LostPet[]> {
    return await db.select().from(lostPets).orderBy(desc(lostPets.createdAt));
  }
  
  async getLostPetsByUserId(userId: number): Promise<LostPet[]> {
    return await db.select().from(lostPets).where(eq(lostPets.userId, userId));
  }
  
  async createLostPet(lostPet: InsertLostPet): Promise<LostPet> {
    const results = await db.insert(lostPets).values(lostPet).returning();
    return results[0];
  }
  
  async updateLostPetStatus(id: number, isFound: boolean): Promise<LostPet> {
    await db.update(lostPets)
      .set({ isFound, updatedAt: new Date() })
      .where(eq(lostPets.id, id));
      
    const [updatedLostPet] = await db.select().from(lostPets).where(eq(lostPets.id, id));
    
    if (!updatedLostPet) {
      throw new Error(`Failed to retrieve updated lost pet with ID ${id}`);
    }
    
    return updatedLostPet;
  }
  
  // Lost Pet Sightings methods
  async getLostPetSighting(id: number): Promise<LostPetSighting | undefined> {
    const results = await db.select().from(lostPetSightings).where(eq(lostPetSightings.id, id));
    return results[0];
  }
  
  async getLostPetSightingsByLostPetId(lostPetId: number): Promise<LostPetSighting[]> {
    return await db.select().from(lostPetSightings)
      .where(eq(lostPetSightings.lostPetId, lostPetId))
      .orderBy(desc(lostPetSightings.createdAt));
  }
  
  async createLostPetSighting(sighting: InsertLostPetSighting): Promise<LostPetSighting> {
    const results = await db.insert(lostPetSightings).values(sighting).returning();
    return results[0];
  }
  
  async verifyLostPetSighting(id: number, isVerified: boolean): Promise<LostPetSighting> {
    await db.update(lostPetSightings)
      .set({ isVerified })
      .where(eq(lostPetSightings.id, id));
      
    const [updatedSighting] = await db.select().from(lostPetSightings).where(eq(lostPetSightings.id, id));
    
    if (!updatedSighting) {
      throw new Error(`Failed to retrieve updated sighting with ID ${id}`);
    }
    
    return updatedSighting;
  }
  
  // Method to initialize the database with mock data
  async initializeMockData(): Promise<void> {
    // Create a default user if none exists
    const existingUsers = await db.select().from(users);
    
    if (existingUsers.length === 0) {
      const user = await this.createUser({
        username: "catdao",
        password: "password", // In a real app, this would be hashed
        displayName: "CatDAO Administrator",
        profileImage: "",
        isConnected: true
      });
      
      // Create some assets
      const assets: InsertAsset[] = [
        {
          name: "CDV Token",
          symbol: "CDV",
          price: 0.0734,
          priceChange: 0.032,
          quantity: 1530782,
          userId: user.id,
          icon: "fa-cat",
          iconColor: "gradient"
        },
        {
          name: "Bitcoin",
          symbol: "BTC",
          price: 64000,
          priceChange: 0.012,
          quantity: 0.4523,
          userId: user.id,
          icon: "fa-bitcoin",
          iconColor: "#F7931A"
        },
        {
          name: "Ethereum",
          symbol: "ETH",
          price: 4066,
          priceChange: -0.008,
          quantity: 2.145,
          userId: user.id,
          icon: "fa-ethereum",
          iconColor: "#627EEA"
        },
        {
          name: "Tether",
          symbol: "USDT",
          price: 1,
          priceChange: 0.000,
          quantity: 2457.27,
          userId: user.id,
          icon: "text-USDT",
          iconColor: "#26A17B"
        }
      ];
      
      for (const asset of assets) {
        await this.createAsset(asset);
      }
      
      // Create some NFTs
      const nfts: InsertCatNft[] = [
        {
          name: "Legendary Sphinx Cat #042",
          rarity: "Legendary",
          image: "https://i.pravatar.cc/300?img=1",
          price: 7.5,
          ownerId: user.id,
          tokenId: "CAT042"
        },
        {
          name: "Epic Maine Coon #108",
          rarity: "Epic",
          image: "https://i.pravatar.cc/300?img=2",
          price: 3.2,
          ownerId: user.id,
          tokenId: "CAT108"
        },
        {
          name: "Rare Siamese #291",
          rarity: "Rare",
          image: "https://i.pravatar.cc/300?img=3",
          price: 1.8,
          ownerId: user.id,
          tokenId: "CAT291"
        },
        {
          name: "Common Tabby #573",
          rarity: "Common",
          image: "https://i.pravatar.cc/300?img=4",
          price: 0.5,
          ownerId: user.id,
          tokenId: "CAT573"
        }
      ];
      
      for (const nft of nfts) {
        await this.createCatNft(nft);
      }
      
      // Create some proposals
      const today = new Date();
      const proposalData: InsertProposal[] = [
        {
          title: "CDVP-42: Increase Staking Rewards",
          description: "Proposal to increase staking rewards by 5% to encourage long-term holding.",
          votesFor: 680,
          votesAgainst: 320,
          endDate: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000), // +3 days
          status: "Voting"
        },
        {
          title: "CDVP-41: Add New Cat Traits Collection",
          description: "Introduce a new collection of cat traits that can be applied to existing NFTs.",
          votesFor: 750,
          votesAgainst: 250,
          endDate: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000), // +5 days
          status: "Voting"
        },
        {
          title: "CDVP-40: Reduce Marketplace Fees to 1.5%",
          description: "Lower the marketplace transaction fees from 2.5% to 1.5% to boost trading volume.",
          votesFor: 820,
          votesAgainst: 180,
          endDate: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000), // +7 days
          status: "Voting"
        }
      ];
      
      for (const proposal of proposalData) {
        await this.createProposal(proposal);
      }
      
      // Create portfolio
      await this.createPortfolio({
        userId: user.id,
        totalValue: 152483.56,
        growth: 18.7,
        growthChange: 5.1,
        stakingRewards: 121
      });
      
      // Create token price history (last 30 days)
      const basePrice = 0.05;
      let currentPrice = basePrice;
      
      for (let i = 30; i >= 0; i--) {
        // Random price change between -5% and 10%
        const change = Math.random() * 0.15 - 0.05;
        currentPrice = Math.max(0.01, currentPrice * (1 + change));
        
        await this.addTokenPrice({
          symbol: "CDV",
          price: currentPrice,
          timestamp: new Date(today.getTime() - i * 24 * 60 * 60 * 1000),
          volume: Math.random() * 1000000 + 500000
        });
      }
      
      // Create lost pet reports
      const lostPets: InsertLostPet[] = [
        {
          userId: user.id,
          catName: "Whiskers",
          description: "Adult male orange tabby with white paws and chest. Friendly and responds to his name.",
          lastSeenLocation: "Central Park, near the East 72nd entrance",
          lastSeenDate: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
          contactInfo: "Email: info@catdao.org",
          imageUrl: "https://i.pravatar.cc/300?img=5",
          rewardAmount: 100,
          isFound: false
        },
        {
          userId: user.id,
          catName: "Luna",
          description: "Young female black cat with yellow eyes. Very shy and might hide if approached.",
          lastSeenLocation: "Brooklyn Heights, near the promenade",
          lastSeenDate: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
          contactInfo: "Email: info@catdao.org",
          imageUrl: "https://i.pravatar.cc/300?img=6",
          rewardAmount: 200,
          isFound: false
        }
      ];
      
      // Add lost pets and sightings
      for (const pet of lostPets) {
        const createdPet = await this.createLostPet(pet);
        
        // Add sightings for the first pet (Whiskers)
        if (pet.catName === "Whiskers") {
          const sightings: InsertLostPetSighting[] = [
            {
              lostPetId: createdPet.id,
              reportedByUserId: user.id,
              location: "Central Park, near Bethesda Fountain",
              sightingDate: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
              description: "Saw an orange cat that matches the description. It ran off when I approached.",
              contactInfo: "Email: info@catdao.org",
              isVerified: false
            },
            {
              lostPetId: createdPet.id,
              reportedByUserId: user.id,
              location: "East 70th Street and 5th Avenue",
              sightingDate: new Date(today.getTime() - 12 * 60 * 60 * 1000), // 12 hours ago
              description: "Orange tabby with white paws spotted in the morning, was eating from a food bowl left on a porch.",
              imageUrl: "https://i.pravatar.cc/300?img=7",
              contactInfo: "Email: info@catdao.org",
              isVerified: true
            }
          ];
          
          for (const sighting of sightings) {
            await this.createLostPetSighting(sighting);
          }
        }
      }
    }
  }
}

// Create and export the storage instance
// Using DatabaseStorage for persistent storage with PostgreSQL
const storage = new DatabaseStorage();

// Initialize mock data on startup if needed
if (process.env.DATABASE_URL) {
  console.log("Using PostgreSQL database storage");
  (async () => {
    try {
      await storage.initializeMockData();
      console.log("Database initialized with mock data (if empty)");
    } catch (error) {
      console.error("Error initializing database:", error);
    }
  })();
} else {
  console.warn("DATABASE_URL not found, using in-memory storage");
}

export { storage };