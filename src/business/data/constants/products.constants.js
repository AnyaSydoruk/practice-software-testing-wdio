/** Product used by the catalog scenarios: search, category, brand, favorites. */
export const CATALOG_PRODUCT = {
  name: "Thor Hammer",
  categorySlug: "hand-tools",
  brand: "ForgeFlex Tools",
};

/** Product used by the basket and checkout scenarios; unlike the hammer it is not quantity-limited. */
export const CART_PRODUCT = {
  name: "Pliers",
};

export const HAND_TOOLS_SUBCATEGORIES = [
  "Hammer",
  "Hand Saw",
  "Wrench",
  "Screwdriver",
  "Pliers",
  "Chisels",
  "Measures",
];
