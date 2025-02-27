import { apiRequest } from "@/lib/queryClient";

// User services
export const fetchCurrentUser = async () => {
  const res = await apiRequest("GET", "/api/current-user", undefined);
  return res.json();
};

export const createUser = async (userData: any) => {
  const res = await apiRequest("POST", "/api/users", userData);
  return res.json();
};

// Asset services
export const fetchAssetsByUserId = async (userId: number) => {
  const res = await apiRequest("GET", `/api/assets/${userId}`, undefined);
  return res.json();
};

export const createAsset = async (assetData: any) => {
  const res = await apiRequest("POST", "/api/assets", assetData);
  return res.json();
};

// NFT services
export const fetchAllNfts = async () => {
  const res = await apiRequest("GET", "/api/cat-nfts", undefined);
  return res.json();
};

export const fetchUserNfts = async (userId: number) => {
  const res = await apiRequest("GET", `/api/cat-nfts/user/${userId}`, undefined);
  return res.json();
};

export const createNft = async (nftData: any) => {
  const res = await apiRequest("POST", "/api/cat-nfts", nftData);
  return res.json();
};

// Governance services
export const fetchAllProposals = async () => {
  const res = await apiRequest("GET", "/api/proposals", undefined);
  return res.json();
};

export const fetchActiveProposals = async () => {
  const res = await apiRequest("GET", "/api/proposals/active", undefined);
  return res.json();
};

export const createProposal = async (proposalData: any) => {
  const res = await apiRequest("POST", "/api/proposals", proposalData);
  return res.json();
};

export const voteOnProposal = async (proposalId: number, voteFor: boolean) => {
  const res = await apiRequest("POST", `/api/proposals/${proposalId}/vote`, { voteFor });
  return res.json();
};

// Portfolio services
export const fetchUserPortfolio = async (userId: number) => {
  const res = await apiRequest("GET", `/api/portfolio/${userId}`, undefined);
  return res.json();
};

// Token price services
export const fetchTokenPrices = async (symbol: string, limit: number = 30) => {
  const res = await apiRequest("GET", `/api/token-prices/${symbol}?limit=${limit}`, undefined);
  return res.json();
};

// Utility services
export const generateCatImage = async (type: string) => {
  const res = await apiRequest("POST", "/api/generate-cat", { type });
  return res.json();
};

export type UserProfile = {
  id: number;
  username: string;
  displayName: string;
  profileImage: string;
  isConnected: boolean;
};

export type Asset = {
  id: number;
  name: string;
  symbol: string;
  price: number;
  priceChange: number;
  quantity: number;
  userId: number;
  icon: string;
  iconColor: string;
};

export type CatNft = {
  id: number;
  name: string;
  rarity: string;
  image: string;
  price: number;
  ownerId: number;
  tokenId: string;
};

export type Proposal = {
  id: number;
  title: string;
  description: string;
  votesFor: number;
  votesAgainst: number;
  endDate: string;
  status: string;
};

export type Portfolio = {
  id: number;
  userId: number;
  totalValue: number;
  growth: number;
  growthChange: number;
  stakingRewards: number;
};

export type TokenPrice = {
  id: number;
  symbol: string;
  price: number;
  timestamp: string;
  volume: number;
};
