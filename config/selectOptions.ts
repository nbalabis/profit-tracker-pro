export const categories = [
  { title: "Beauty", icon: "💄", color: "#f43f5e" },
  { title: "Clothing", icon: "👕", color: "#7c3aed" },
  { title: "Electronics", icon: "📹", color: "#38bdf8" },
  { title: "Home", icon: "🏠", color: "#14b8a6" },
  { title: "Toys & Collectibles", icon: "🧸", color: "#fbbf24" },
  { title: "Sports", icon: "⚽️", color: "#16a34a" },
  { title: "Other", icon: "📦", color: "#a1a1aa" },
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

export type Categories = typeof categories;
