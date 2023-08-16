import { Box, Brush, Dumbbell, Home, Joystick, Shirt, Tv } from "lucide-react";

export const categories = [
  { title: "Beauty", value: "BEAUTY", icon: Brush, color: "#f43f5e" },
  { title: "Clothing", value: "CLOTHING", icon: Shirt, color: "#7c3aed" },
  { title: "Electronics", value: "ELECTRONICS", icon: Tv, color: "#38bdf8" },
  { title: "Home", value: "HOME", icon: Home, color: "#14b8a6" },
  {
    title: "Toys & Collectibles",
    value: "TOYS",
    icon: Joystick,
    color: "#fbbf24",
  },
  { title: "Sports", value: "SPORTS", icon: Dumbbell, color: "#16a34a" },
  { title: "Other", value: "OTHER", icon: Box, color: "#a1a1aa" },
];

export const sources = [
  { title: "Garage Sale", value: "GARAGE_SALE", icon: "🏠", color: "#f43f5e" },
  {
    title: "Thrift Store",
    value: "THRIFT_STORE",
    icon: "👕",
    color: "#7c3aed",
  },
  { title: "Online", value: "ONLINE", icon: "📹", color: "#38bdf8" },
  { title: "Other", value: "OTHER", icon: "📦", color: "#a1a1aa" },
];

export const channels = [
  { title: "eBay", value: "EBAY", icon: "🏠", color: "#f43f5e" },
  { title: "Etsy", value: "ETSY", icon: "👕", color: "#7c3aed" },
  { title: "Mercari", value: "MERCARI", icon: "📹", color: "#38bdf8" },
  { title: "Poshmark", value: "POSHMARK", icon: "📦", color: "#a1a1aa" },
  { title: "Other", value: "OTHER", icon: "📦", color: "#a1a1aa" },
];

export type Categories = typeof categories;
