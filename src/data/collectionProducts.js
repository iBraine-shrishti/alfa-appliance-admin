// TODO: replace with real API data (products filtered by collection).
// Keyed by collection slug - each collection detail page looks up its own list.
export const collectionProducts = {
  "washing-machines": [
    { id: "bosch-serie4-wan28281gb", model: "Serie 4 WAN28281GB", brand: "Bosch", price: 429, stockStatus: "In Stock" },
    { id: "samsung-ww90t534daw-s1", model: "WW90T534DAW/S1", brand: "Samsung", price: 549, stockStatus: "Low Stock", stockCount: 3 },
    { id: "whirlpool-freshcare-ffb9469", model: "FreshCare+ FFB 9469", brand: "Whirlpool", price: 379, stockStatus: "In Stock" },
    { id: "miele-w1-wea025", model: "W1 WEA025", brand: "Miele", price: 899, stockStatus: "Out of Stock" },
  ],
};

export const getCollectionProducts = (slug) => collectionProducts[slug] ?? [];
