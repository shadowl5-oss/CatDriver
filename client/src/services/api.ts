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

// Lost Pet services
export const fetchAllLostPets = async () => {
  const res = await apiRequest("GET", "/api/lost-pets", undefined);
  return res.json();
};

export const fetchLostPet = async (id: number) => {
  const res = await apiRequest("GET", `/api/lost-pets/${id}`, undefined);
  return res.json();
};

export const fetchUserLostPets = async (userId: number) => {
  const res = await apiRequest("GET", `/api/lost-pets/user/${userId}`, undefined);
  return res.json();
};

export const createLostPet = async (lostPetData: any) => {
  const res = await apiRequest("POST", "/api/lost-pets", lostPetData);
  return res.json();
};

export const updateLostPetStatus = async (id: number, isFound: boolean) => {
  const res = await apiRequest("PATCH", `/api/lost-pets/${id}/status`, { isFound });
  return res.json();
};

export const updateLostPetMusicTheme = async (id: number, musicThemeId: string) => {
  const res = await apiRequest("PATCH", `/api/lost-pets/${id}/music-theme`, { musicThemeId });
  return res.json();
};

// Lost Pet Sighting services
export const fetchLostPetSightings = async (lostPetId: number) => {
  const res = await apiRequest("GET", `/api/lost-pet-sightings/${lostPetId}`, undefined);
  return res.json();
};

export const createLostPetSighting = async (sightingData: any) => {
  const res = await apiRequest("POST", "/api/lost-pet-sightings", sightingData);
  return res.json();
};

export const verifyLostPetSighting = async (id: number, isVerified: boolean) => {
  const res = await apiRequest("PATCH", `/api/lost-pet-sightings/${id}/verify`, { isVerified });
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

export type LostPet = {
  id: number;
  name: string;
  species: string;
  breed: string;
  color: string;
  age: number;
  gender: string;
  lastSeenDate: string;
  lastSeenLocation: string;
  contactPhone: string;
  contactEmail: string;
  description: string;
  photo: string;
  isFound: boolean;
  microchipId: string | null;
  reward: number | null;
  userId: number;
  musicThemeId?: string | null;
};

export type LostPetSighting = {
  id: number;
  lostPetId: number;
  sightingDate: string;
  sightingLocation: string;
  description: string;
  photo: string | null;
  contactPhone: string;
  contactEmail: string;
  isVerified: boolean;
  reportedBy: string;
};
