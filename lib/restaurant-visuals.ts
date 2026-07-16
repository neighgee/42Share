export type RestaurantVisual = {
  imageSrc: string;
  imageAlt: string;
  objectPosition?: string;
};

const RESTAURANT_VISUALS: ReadonlyArray<{
  keywords: readonly string[];
  visual: RestaurantVisual;
}> = [
  {
    keywords: ["wingstop", "wing stop", "wings"],
    visual: {
      imageSrc: "/images/food-wings.webp",
      imageAlt: "A platter of glazed chicken wings",
      objectPosition: "center 62%",
    },
  },
  {
    keywords: ["chicha", "chi cha", "bubble tea", "boba", "tea"],
    visual: {
      imageSrc: "/images/food-bubble-tea.webp",
      imageAlt: "Three cups of bubble tea",
    },
  },
  {
    keywords: ["ramen", "noodle soup"],
    visual: {
      imageSrc: "/images/food-ramen.webp",
      imageAlt: "A bowl of ramen with prawns and eggs",
    },
  },
  {
    keywords: ["noodle", "char kway teow", "wok"],
    visual: {
      imageSrc: "/images/food-local-noodles.webp",
      imageAlt: "A plate of wok-fried noodles",
    },
  },
  {
    keywords: ["taco", "mexican"],
    visual: {
      imageSrc: "/images/food-tacos.webp",
      imageAlt: "A row of freshly prepared tacos",
    },
  },
];

export function getRestaurantVisual(restaurant: string): RestaurantVisual | null {
  const normalizedRestaurant = restaurant.toLowerCase();

  return (
    RESTAURANT_VISUALS.find(({ keywords }) =>
      keywords.some((keyword) => normalizedRestaurant.includes(keyword)),
    )?.visual ?? null
  );
}
