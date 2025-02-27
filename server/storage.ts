import {
  users, User, InsertUser,
  assets, Asset, InsertAsset,
  catNfts, CatNft, InsertCatNft,
  proposals, Proposal, InsertProposal,
  portfolios, Portfolio, InsertPortfolio,
  tokenPrices, TokenPrice, InsertTokenPrice
} from "@shared/schema";
import { eq, desc, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import "dotenv/config";

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
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private assets: Map<number, Asset>;
  private catNfts: Map<number, CatNft>;
  private proposals: Map<number, Proposal>;
  private portfolios: Map<number, Portfolio>;
  private tokenPrices: Map<number, TokenPrice>;
  
  private currentUserId: number;
  private currentAssetId: number;
  private currentNftId: number;
  private currentProposalId: number;
  private currentPortfolioId: number;
  private currentTokenPriceId: number;
  
  constructor() {
    this.users = new Map();
    this.assets = new Map();
    this.catNfts = new Map();
    this.proposals = new Map();
    this.portfolios = new Map();
    this.tokenPrices = new Map();
    
    this.currentUserId = 1;
    this.currentAssetId = 1;
    this.currentNftId = 1;
    this.currentProposalId = 1;
    this.currentPortfolioId = 1;
    this.currentTokenPriceId = 1;
    
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
    const user: User = { ...insertUser, id };
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
    const asset: Asset = { ...insertAsset, id };
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
    const nft: CatNft = { ...insertNft, id };
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
    const proposal: Proposal = { ...insertProposal, id };
    this.proposals.set(id, proposal);
    return proposal;
  }
  
  async voteOnProposal(proposalId: number, voteFor: boolean): Promise<Proposal> {
    const proposal = this.proposals.get(proposalId);
    if (!proposal) {
      throw new Error(`Proposal with ID ${proposalId} not found`);
    }
    
    if (voteFor) {
      proposal.votesFor += 1;
    } else {
      proposal.votesAgainst += 1;
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
    const portfolio: Portfolio = { ...insertPortfolio, id };
    this.portfolios.set(id, portfolio);
    return portfolio;
  }
  
  // Token price methods
  async getTokenPrices(symbol: string, limit: number): Promise<TokenPrice[]> {
    return Array.from(this.tokenPrices.values())
      .filter((tp) => tp.symbol === symbol)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }
  
  async addTokenPrice(insertTokenPrice: InsertTokenPrice): Promise<TokenPrice> {
    const id = this.currentTokenPriceId++;
    const tokenPrice: TokenPrice = { ...insertTokenPrice, id };
    this.tokenPrices.set(id, tokenPrice);
    return tokenPrice;
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
      const id = this.currentAssetId++;
      this.assets.set(id, { ...asset, id });
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
      const id = this.currentNftId++;
      this.catNfts.set(id, { ...nft, id });
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
      const id = this.currentProposalId++;
      this.proposals.set(id, { ...proposal, id });
    });
    
    // Create portfolio
    const portfolio: InsertPortfolio = {
      userId: user.id,
      totalValue: 152483.56,
      growth: 18.7,
      growthChange: 5.1,
      stakingRewards: 121
    };
    
    const portfolioId = this.currentPortfolioId++;
    this.portfolios.set(portfolioId, { ...portfolio, id: portfolioId });
    
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
      const id = this.currentTokenPriceId++;
      this.tokenPrices.set(id, { ...tp, id });
    });
  }
}

// PostgreSQL storage implementation
export class PgStorage implements IStorage {
  private db: ReturnType<typeof drizzle>;
  private client: postgres.Sql;
  
  constructor() {
    // Connect to PostgreSQL using the environment variables
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL environment variable is required');
    }
    
    this.client = postgres(process.env.DATABASE_URL, { max: 10 });
    this.db = drizzle(this.client);
  }
  
  // Expose the DB instance for migrations
  getDb(): ReturnType<typeof drizzle> {
    return this.db;
  }
  
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const results = await this.db.select().from(users).where(eq(users.id, id));
    return results[0];
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    const results = await this.db.select().from(users).where(eq(users.username, username));
    return results[0];
  }
  
  async createUser(user: InsertUser): Promise<User> {
    // Fix nullability issues
    const nullableFields = ['displayName', 'profileImage', 'isConnected'];
    const fixedUser = fixNullability(user, nullableFields);
    
    const results = await this.db.insert(users).values(fixedUser).returning();
    return results[0];
  }
  
  // Asset methods
  async getAssetsByUserId(userId: number): Promise<Asset[]> {
    return await this.db.select().from(assets).where(eq(assets.userId, userId));
  }
  
  async createAsset(asset: InsertAsset): Promise<Asset> {
    // Fix nullability issues
    const nullableFields = ['priceChange', 'icon', 'iconColor'];
    const fixedAsset = fixNullability(asset, nullableFields);
    
    const results = await this.db.insert(assets).values(fixedAsset).returning();
    return results[0];
  }
  
  // Cat NFT methods
  async getAllCatNfts(): Promise<CatNft[]> {
    return await this.db.select().from(catNfts);
  }
  
  async getCatNftsByOwnerId(ownerId: number): Promise<CatNft[]> {
    return await this.db.select().from(catNfts).where(eq(catNfts.ownerId, ownerId));
  }
  
  async createCatNft(nft: InsertCatNft): Promise<CatNft> {
    // Fix nullability issues
    const nullableFields = ['ownerId'];
    const fixedNft = fixNullability(nft, nullableFields);
    
    const results = await this.db.insert(catNfts).values(fixedNft).returning();
    return results[0];
  }
  
  // Proposal methods
  async getAllProposals(): Promise<Proposal[]> {
    return await this.db.select().from(proposals);
  }
  
  async getActiveProposals(): Promise<Proposal[]> {
    return await this.db.select().from(proposals).where(eq(proposals.status, "Voting"));
  }
  
  async createProposal(proposal: InsertProposal): Promise<Proposal> {
    // Fix nullability issues
    const nullableFields = ['votesFor', 'votesAgainst'];
    const fixedProposal = fixNullability(proposal, nullableFields);
    
    const results = await this.db.insert(proposals).values(fixedProposal).returning();
    return results[0];
  }
  
  async voteOnProposal(proposalId: number, voteFor: boolean): Promise<Proposal> {
    // Get current proposal
    const currentProposal = await this.getProposal(proposalId);
    if (!currentProposal) {
      throw new Error(`Proposal with ID ${proposalId} not found`);
    }
    
    // Update vote counts
    if (voteFor) {
      await this.db.update(proposals)
        .set({ votesFor: (currentProposal.votesFor || 0) + 1 })
        .where(eq(proposals.id, proposalId));
    } else {
      await this.db.update(proposals)
        .set({ votesAgainst: (currentProposal.votesAgainst || 0) + 1 })
        .where(eq(proposals.id, proposalId));
    }
    
    // Get updated proposal
    const updatedProposal = await this.getProposal(proposalId);
    if (!updatedProposal) {
      throw new Error(`Failed to retrieve updated proposal with ID ${proposalId}`);
    }
    
    return updatedProposal;
  }
  
  private async getProposal(proposalId: number): Promise<Proposal | undefined> {
    const results = await this.db.select().from(proposals).where(eq(proposals.id, proposalId));
    return results[0];
  }
  
  // Portfolio methods
  async getPortfolioByUserId(userId: number): Promise<Portfolio | undefined> {
    const results = await this.db.select().from(portfolios).where(eq(portfolios.userId, userId));
    return results[0];
  }
  
  async createPortfolio(portfolio: InsertPortfolio): Promise<Portfolio> {
    // Fix nullability issues
    const nullableFields = ['growthChange', 'stakingRewards'];
    const fixedPortfolio = fixNullability(portfolio, nullableFields);
    
    const results = await this.db.insert(portfolios).values(fixedPortfolio).returning();
    return results[0];
  }
  
  // Token price methods
  async getTokenPrices(symbol: string, limit: number): Promise<TokenPrice[]> {
    return await this.db.select()
      .from(tokenPrices)
      .where(eq(tokenPrices.symbol, symbol))
      .orderBy(desc(tokenPrices.timestamp))
      .limit(limit);
  }
  
  async addTokenPrice(tokenPrice: InsertTokenPrice): Promise<TokenPrice> {
    // Fix nullability issues
    const nullableFields = ['volume'];
    const fixedTokenPrice = fixNullability(tokenPrice, nullableFields);
    
    const results = await this.db.insert(tokenPrices).values(fixedTokenPrice).returning();
    return results[0];
  }
  
  // Method to initialize the database with mock data
  async initializeMockData(): Promise<void> {
    // Check if users table is empty
    const userCount = await this.db.select({ count: sql`count(*)` }).from(users);
    if (Number(userCount[0].count) > 0) {
      console.log("Database already contains data - skipping initialization");
      return;
    }
    
    console.log("Initializing database with mock data...");
    
    // Create default user
    const user = await this.createUser({
      username: "cryptokitten",
      password: "password", // In a real app, this would be hashed
      displayName: "Crypto Kitten",
      profileImage: "",
      isConnected: true
    });
    
    // Create assets
    await Promise.all([
      this.createAsset({
        name: "CDV Token",
        symbol: "CDV",
        price: 0.0734,
        priceChange: 0.032,
        quantity: 1530782,
        userId: user.id,
        icon: "fa-cat",
        iconColor: "gradient"
      }),
      this.createAsset({
        name: "Bitcoin",
        symbol: "BTC",
        price: 64000,
        priceChange: 0.012,
        quantity: 0.4523,
        userId: user.id,
        icon: "fa-bitcoin",
        iconColor: "#F7931A"
      }),
      this.createAsset({
        name: "Ethereum",
        symbol: "ETH",
        price: 4066,
        priceChange: -0.008,
        quantity: 2.145,
        userId: user.id,
        icon: "fa-ethereum",
        iconColor: "#627EEA"
      }),
      this.createAsset({
        name: "Tether",
        symbol: "USDT",
        price: 1,
        priceChange: 0.000,
        quantity: 2457.27,
        userId: user.id,
        icon: "text-USDT",
        iconColor: "#26A17B"
      })
    ]);
    
    // Create NFTs
    await Promise.all([
      this.createCatNft({
        name: "Legendary Sphinx Cat #042",
        rarity: "Legendary",
        image: "https://i.pravatar.cc/300?img=1",
        price: 7.5,
        ownerId: user.id,
        tokenId: "CAT042"
      }),
      this.createCatNft({
        name: "Epic Maine Coon #108",
        rarity: "Epic",
        image: "https://i.pravatar.cc/300?img=2",
        price: 3.2,
        ownerId: user.id,
        tokenId: "CAT108"
      }),
      this.createCatNft({
        name: "Rare Siamese #291",
        rarity: "Rare",
        image: "https://i.pravatar.cc/300?img=3",
        price: 1.8,
        ownerId: user.id,
        tokenId: "CAT291"
      }),
      this.createCatNft({
        name: "Common Tabby #573",
        rarity: "Common",
        image: "https://i.pravatar.cc/300?img=4",
        price: 0.5,
        ownerId: user.id,
        tokenId: "CAT573"
      })
    ]);
    
    // Create proposals
    const today = new Date();
    await Promise.all([
      this.createProposal({
        title: "CDVP-42: Increase Staking Rewards",
        description: "Proposal to increase staking rewards by 5% to encourage long-term holding.",
        votesFor: 680,
        votesAgainst: 320,
        endDate: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000), // +3 days
        status: "Voting"
      }),
      this.createProposal({
        title: "CDVP-41: Add New Cat Traits Collection",
        description: "Introduce a new collection of cat traits that can be applied to existing NFTs.",
        votesFor: 750,
        votesAgainst: 250,
        endDate: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000), // +5 days
        status: "Voting"
      }),
      this.createProposal({
        title: "CDVP-40: Reduce Marketplace Fees to 1.5%",
        description: "Lower the marketplace transaction fees from 2.5% to 1.5% to boost trading volume.",
        votesFor: 820,
        votesAgainst: 180,
        endDate: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000), // +7 days
        status: "Voting"
      })
    ]);
    
    // Create portfolio
    await this.createPortfolio({
      userId: user.id,
      totalValue: 152483.56,
      growth: 18.7,
      growthChange: 5.1,
      stakingRewards: 121
    });
    
    // Create token price history
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
    
    // Insert token prices in batches to avoid overwhelming the database
    const batchSize = 10;
    for (let i = 0; i < tokenPrices.length; i += batchSize) {
      const batch = tokenPrices.slice(i, i + batchSize);
      await Promise.all(batch.map(tp => this.addTokenPrice(tp)));
    }
    
    console.log("Database initialization complete!");
  }
  
  // Method to close the database connection
  async close(): Promise<void> {
    await this.client.end();
  }
}

// Fix any schema inconsistencies in the mock data
function fixNullability(obj: any, nullableFields: string[]): any {
  const result = { ...obj };
  
  // Ensure all nullable fields have at least null as a value instead of undefined
  for (const field of nullableFields) {
    if (result[field] === undefined) {
      result[field] = null;
    }
  }
  
  return result;
}

// Create and export the storage instance
// Use PostgreSQL storage if DATABASE_URL is available, otherwise fall back to in-memory
export const storage = new PgStorage();
