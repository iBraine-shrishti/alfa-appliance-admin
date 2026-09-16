import { adminCollections } from "./adminCollections";

export const productCollectionOptions = [
  ...adminCollections.map((c) => c.title),
  "Summer Sale 2024",
  "Energy Efficient Series",
  "Smart Home Enabled",
  "Clearance",
];
