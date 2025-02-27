import { pgTable, text, serial, integer, boolean, doublePrecision, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  displayName: text("display_name"),
  profileImage: text("profile_image"),
  isConnected: boolean("is_connected").default(true)
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  displayName: true,
  profileImage: true,
  isConnected: true
});

// Assets table
export const assets = pgTable("assets", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  symbol: text("symbol").notNull(),
  price: doublePrecision("price").notNull(),
  priceChange: doublePrecision("price_change"),
  quantity: doublePrecision("quantity").notNull(),
  userId: integer("user_id").notNull(),
  icon: text("icon"),
  iconColor: text("icon_color")
});

export const insertAssetSchema = createInsertSchema(assets).pick({
  name: true,
  symbol: true,
  price: true,
  priceChange: true,
  quantity: true,
  userId: true,
  icon: true,
  iconColor: true
});

// Cat NFT table
export const catNfts = pgTable("cat_nfts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  rarity: text("rarity").notNull(),
  image: text("image").notNull(),
  price: doublePrecision("price").notNull(),
  ownerId: integer("owner_id"),
  tokenId: text("token_id").notNull()
});

export const insertCatNftSchema = createInsertSchema(catNfts).pick({
  name: true,
  rarity: true,
  image: true,
  price: true,
  ownerId: true,
  tokenId: true
});

// Governance proposals table
export const proposals = pgTable("proposals", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  votesFor: integer("votes_for").default(0),
  votesAgainst: integer("votes_against").default(0),
  endDate: timestamp("end_date").notNull(),
  status: text("status").notNull()
});

export const insertProposalSchema = createInsertSchema(proposals).pick({
  title: true,
  description: true,
  votesFor: true,
  votesAgainst: true,
  endDate: true,
  status: true
});

// Portfolio data
export const portfolios = pgTable("portfolios", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  totalValue: doublePrecision("total_value").notNull(),
  growth: doublePrecision("growth").notNull(),
  growthChange: doublePrecision("growth_change"),
  stakingRewards: doublePrecision("staking_rewards")
});

export const insertPortfolioSchema = createInsertSchema(portfolios).pick({
  userId: true,
  totalValue: true,
  growth: true,
  growthChange: true,
  stakingRewards: true
});

// TokenPrice history for charts
export const tokenPrices = pgTable("token_prices", {
  id: serial("id").primaryKey(),
  symbol: text("symbol").notNull(),
  price: doublePrecision("price").notNull(),
  timestamp: timestamp("timestamp").notNull(),
  volume: doublePrecision("volume")
});

export const insertTokenPriceSchema = createInsertSchema(tokenPrices).pick({
  symbol: true,
  price: true,
  timestamp: true,
  volume: true
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Asset = typeof assets.$inferSelect;
export type InsertAsset = z.infer<typeof insertAssetSchema>;

export type CatNft = typeof catNfts.$inferSelect;
export type InsertCatNft = z.infer<typeof insertCatNftSchema>;

export type Proposal = typeof proposals.$inferSelect;
export type InsertProposal = z.infer<typeof insertProposalSchema>;

export type Portfolio = typeof portfolios.$inferSelect;
export type InsertPortfolio = z.infer<typeof insertPortfolioSchema>;

export type TokenPrice = typeof tokenPrices.$inferSelect;
export type InsertTokenPrice = z.infer<typeof insertTokenPriceSchema>;
