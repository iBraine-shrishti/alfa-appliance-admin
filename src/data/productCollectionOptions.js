import { adminCollections } from "./adminCollections";

export const productCollectionOptions = Array.from(
  new Set(
    [
      ...adminCollections.map((c) =>
        c.title === "Cooker Hoods" ? "Cooker Hoods / Extractor Fans" : c.title
      ),
      "Summer Sale 2024",
      "Energy Efficient Series",
      "Smart Home Enabled",
      "Clearance",
    ]
  )
).filter((title) => title !== "Cooker Hoods");
