import {
  users, User, InsertUser,
  assets, Asset, InsertAsset,
  catNfts, CatNft, InsertCatNft,
  proposals, Proposal, InsertProposal,
  portfolios, Portfolio, InsertPortfolio,
  tokenPrices, TokenPrice, InsertTokenPrice
} from "@shared/schema";

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

export const storage = new MemStorage();
