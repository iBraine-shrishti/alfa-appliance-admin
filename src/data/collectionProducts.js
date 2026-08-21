
import product1Image from "../assets/products/product1/product1.png";
import product2Image from "../assets/products/product2/product2.png";
import product3Image from "../assets/products/product3/product3.png";
import product4Image from "../assets/products/product4/product4.png";

export const collectionProducts = {
  "washing-machines": [
    { id: "bosch-serie4-wan28281gb", model: "Serie 4 WAN28281GB", brand: "Bosch", price: 429, stockStatus: "In Stock", image: product1Image },
    { id: "samsung-ww90t534daw-s1", model: "WW90T534DAW/S1", brand: "Samsung", price: 549, stockStatus: "Low Stock", stockCount: 3, image: product2Image },
    { id: "whirlpool-freshcare-ffb9469", model: "FreshCare+ FFB 9469", brand: "Whirlpool", price: 379, stockStatus: "In Stock", image: product3Image },
    { id: "miele-w1-wea025", model: "W1 WEA025", brand: "Miele", price: 899, stockStatus: "Out of Stock", image: product4Image },
  ],
};

const fallbackProducts = [
  { id: "alfa-product-1", model: "Alfa Essential Series", brand: "Alfa", price: 429, stockStatus: "In Stock", image: product1Image },
  { id: "alfa-product-2", model: "Alfa Pro Series", brand: "Alfa", price: 799, stockStatus: "Low Stock", stockCount: 3, image: product2Image },
  { id: "alfa-product-3", model: "Alfa Smart Series", brand: "Alfa", price: 1099, stockStatus: "In Stock", image: product3Image },
];

export const getCollectionProducts = (slug) => collectionProducts[slug] ?? fallbackProducts.map((product) => ({ ...product, id: `${slug}-${product.id}` }));
