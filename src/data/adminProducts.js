
import product1Image from "../assets/products/product1/product1.png";
import product2Image from "../assets/products/product2/product2.png";
import product3Image from "../assets/products/product3/product3.png";
import product4Image from "../assets/products/product4/product4.png";

const PRODUCT_IMAGES = [product1Image, product2Image, product3Image, product4Image];

export const adminProducts = [
  { id: "samsung-ecobubble-washing-machine", name: "Samsung EcoBubble Washing Machine", category: "Laundry", inventory: 42, price: 1299, status: "On Sale", image: PRODUCT_IMAGES[0] },
  { id: "lg-instaview-refrigerator", name: "LG InstaView Refrigerator", category: "Refrigeration", inventory: 0, price: 2450, status: "On Sale", image: PRODUCT_IMAGES[1] },
  { id: "miele-convection-oven", name: "Miele Convection Oven", category: "Cooking", inventory: 3, price: 3100, status: "On Sale", image: PRODUCT_IMAGES[2] },
  { id: "bosch-serie-6-dishwasher", name: "Bosch Serie 6 Dishwasher", category: "Dishwashers", inventory: 89, price: 899, status: "On Sale", image: PRODUCT_IMAGES[3] },
  { id: "panasonic-inverter-microwave", name: "Panasonic Inverter Microwave", category: "Microwaves", inventory: 15, price: 250, status: "Active", image: PRODUCT_IMAGES[0] },
  { id: "whirlpool-induction-cooktop", name: "Whirlpool Induction Cooktop", category: "Cooking", inventory: 22, price: 1050, status: "Active", image: PRODUCT_IMAGES[1] },
  { id: "electrolux-heat-pump-dryer", name: "Electrolux Heat Pump Dryer", category: "Laundry", inventory: 18, price: 1450, status: "Active", image: PRODUCT_IMAGES[2] },
  { id: "kitchenaid-wall-mount-range-hood", name: "KitchenAid Wall-Mount Range Hood", category: "Ventilation", inventory: 5, price: 850, status: "Active", image: PRODUCT_IMAGES[3] },
  { id: "haier-chest-freezer", name: "Haier Chest Freezer", category: "Refrigeration", inventory: 12, price: 450, status: "Active", image: PRODUCT_IMAGES[0] },
  { id: "sub-zero-wine-cooler", name: "Sub-Zero Wine Cooler", category: "Refrigeration", inventory: 2, price: 3800, status: "Active", image: PRODUCT_IMAGES[1] },
];
