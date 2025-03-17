
export interface User {
  id: string;
  name: string;
  username: string;
  profileImage: string;
}

export interface Comment {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  ingredients: string[];
  instructions: string[];
  userId: string;
  createdAt: string;
  likes: number;
  comments: Comment[];
}

// Mock Users
export const users: User[] = [
  {
    id: '1',
    name: 'Jamie Oliver',
    username: 'jamieoliver',
    profileImage: 'https://i.pravatar.cc/150?img=1'
  },
  {
    id: '2',
    name: 'Gordon Ramsay',
    username: 'gordonramsay',
    profileImage: 'https://i.pravatar.cc/150?img=2'
  },
  {
    id: '3',
    name: 'Nigella Lawson',
    username: 'nigellalawson',
    profileImage: 'https://i.pravatar.cc/150?img=3'
  },
  {
    id: '4',
    name: 'Ina Garten',
    username: 'inagarten',
    profileImage: 'https://i.pravatar.cc/150?img=4'
  }
];

// Mock Recipes
export const recipes: Recipe[] = [
  {
    id: '1',
    title: 'Creamy Garlic Parmesan Pasta',
    description: 'A rich and creamy pasta dish that\'s perfect for a quick weeknight dinner.',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Pasta',
    prepTime: 10,
    cookTime: 20,
    servings: 4,
    difficulty: 'Easy',
    ingredients: [
      '8 oz fettuccine pasta',
      '2 tbsp olive oil',
      '4 cloves garlic, minced',
      '1 cup heavy cream',
      '1/2 cup grated Parmesan cheese',
      'Salt and pepper to taste',
      '2 tbsp fresh parsley, chopped'
    ],
    instructions: [
      'Cook pasta according to package instructions. Drain and set aside.',
      'In a large skillet, heat olive oil over medium heat. Add minced garlic and sauté until fragrant, about 1 minute.',
      'Pour in heavy cream and bring to a simmer. Cook for 5 minutes until slightly thickened.',
      'Add Parmesan cheese and stir until melted and sauce is smooth.',
      'Season with salt and pepper to taste.',
      'Add cooked pasta to the sauce and toss to coat evenly.',
      'Garnish with chopped parsley and serve immediately.'
    ],
    userId: '1',
    createdAt: '2023-06-15T10:30:00Z',
    likes: 156,
    comments: [
      {
        id: 'c1',
        userId: '2',
        content: 'Delicious! I added some grilled chicken and it was perfect.',
        createdAt: '2023-06-16T14:22:00Z'
      },
      {
        id: 'c2',
        userId: '3',
        content: 'So simple yet so flavorful. My family loved it!',
        createdAt: '2023-06-17T09:15:00Z'
      }
    ]
  },
  {
    id: '2',
    title: 'Spicy Thai Basil Chicken',
    description: 'A flavorful stir-fry that brings the taste of Thailand to your kitchen.',
    image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Main Course',
    prepTime: 15,
    cookTime: 10,
    servings: 3,
    difficulty: 'Medium',
    ingredients: [
      '1 lb ground chicken',
      '4 cloves garlic, minced',
      '3 Thai chili peppers, finely chopped',
      '1 small onion, thinly sliced',
      '1 red bell pepper, sliced',
      '2 tbsp vegetable oil',
      '2 tbsp oyster sauce',
      '1 tbsp soy sauce',
      '1 tsp fish sauce',
      '1 tsp sugar',
      '1 cup Thai basil leaves',
      'Steamed rice for serving'
    ],
    instructions: [
      'Heat oil in a wok or large skillet over high heat.',
      'Add garlic and chili peppers, stir-fry for 30 seconds until fragrant.',
      'Add ground chicken and cook, breaking it up, until no longer pink, about 5 minutes.',
      'Add onion and bell pepper, stir-fry for 2 minutes until slightly softened.',
      'Mix in oyster sauce, soy sauce, fish sauce, and sugar. Stir well.',
      'Turn off heat and fold in Thai basil leaves until wilted.',
      'Serve hot over steamed rice.'
    ],
    userId: '2',
    createdAt: '2023-06-14T18:45:00Z',
    likes: 213,
    comments: [
      {
        id: 'c3',
        userId: '1',
        content: 'The flavors are spot on! I added some green beans too.',
        createdAt: '2023-06-15T20:10:00Z'
      }
    ]
  },
  {
    id: '3',
    title: 'Classic Apple Pie',
    description: 'A timeless dessert with a flaky crust and sweet-tart apple filling.',
    image: 'https://images.unsplash.com/photo-1621743478914-025a742e6e25?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Dessert',
    prepTime: 30,
    cookTime: 50,
    servings: 8,
    difficulty: 'Medium',
    ingredients: [
      '2 1/2 cups all-purpose flour',
      '1 tsp salt',
      '1 tbsp sugar',
      '1 cup cold unsalted butter, cubed',
      '4-6 tbsp ice water',
      '6 large apples, peeled and sliced',
      '3/4 cup sugar',
      '2 tbsp lemon juice',
      '1 tsp cinnamon',
      '1/4 tsp nutmeg',
      '2 tbsp cornstarch',
      '1 egg (for egg wash)',
      'Coarse sugar for sprinkling'
    ],
    instructions: [
      'In a food processor, pulse flour, salt, and sugar. Add butter and pulse until mixture resembles coarse crumbs.',
      'Gradually add ice water and pulse until dough forms. Divide dough in half, form into disks, wrap, and refrigerate for 1 hour.',
      'Preheat oven to 375°F (190°C).',
      'In a large bowl, combine apples, sugar, lemon juice, cinnamon, nutmeg, and cornstarch.',
      'Roll out one disk of dough and place in a 9-inch pie dish. Add apple filling.',
      'Roll out the second disk and place over filling. Trim and crimp edges. Cut slits for steam.',
      'Brush with egg wash and sprinkle with coarse sugar.',
      'Bake for 50 minutes until golden brown. Cool before serving.'
    ],
    userId: '3',
    createdAt: '2023-06-13T14:20:00Z',
    likes: 178,
    comments: [
      {
        id: 'c4',
        userId: '4',
        content: 'This reminds me of my grandmother\'s recipe. Absolutely perfect!',
        createdAt: '2023-06-14T11:05:00Z'
      }
    ]
  },
  {
    id: '4',
    title: 'Avocado Toast with Poached Egg',
    description: 'A nutritious breakfast that\'s as delicious as it is Instagram-worthy.',
    image: 'https://images.unsplash.com/photo-1603046891744-76e6a4f4d716?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Breakfast',
    prepTime: 10,
    cookTime: 5,
    servings: 1,
    difficulty: 'Easy',
    ingredients: [
      '1 slice of sourdough bread',
      '1 ripe avocado',
      '1 egg',
      '1 tbsp white vinegar',
      'Salt and pepper to taste',
      'Red pepper flakes (optional)',
      'Fresh herbs (optional)'
    ],
    instructions: [
      'Toast the bread until golden and crispy.',
      'Cut the avocado in half, remove the pit, and scoop the flesh into a bowl. Mash with a fork and season with salt and pepper.',
      'Bring a small pot of water to a gentle simmer. Add vinegar.',
      'Crack the egg into a small cup and gently slide it into the simmering water.',
      'Cook for 3-4 minutes until the white is set but the yolk is still runny.',
      'Spread mashed avocado on the toast.',
      'Use a slotted spoon to remove the poached egg and place it on top of the avocado.',
      'Season with salt, pepper, and optional red pepper flakes or herbs.'
    ],
    userId: '4',
    createdAt: '2023-06-12T09:10:00Z',
    likes: 124,
    comments: [
      {
        id: 'c5',
        userId: '3',
        content: 'I added a drizzle of olive oil and some microgreens. Delightful!',
        createdAt: '2023-06-12T12:30:00Z'
      }
    ]
  },
  {
    id: '5',
    title: 'Homemade Margherita Pizza',
    description: 'Simple, classic, and bursting with fresh flavors.',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Main Course',
    prepTime: 60,
    cookTime: 15,
    servings: 2,
    difficulty: 'Medium',
    ingredients: [
      '2 1/2 cups all-purpose flour',
      '1 tsp instant yeast',
      '1 tsp salt',
      '1 cup warm water',
      '1 tbsp olive oil',
      '1 cup tomato sauce',
      '8 oz fresh mozzarella cheese, sliced',
      'Fresh basil leaves',
      '2 tbsp extra virgin olive oil',
      'Salt to taste'
    ],
    instructions: [
      'In a large bowl, combine flour, yeast, and salt. Add warm water and olive oil, mix until a dough forms.',
      'Knead on a floured surface for 5-7 minutes until smooth and elastic.',
      'Place in an oiled bowl, cover, and let rise for 1 hour or until doubled in size.',
      'Preheat oven to 475°F (245°C) with a pizza stone or baking sheet inside.',
      'Divide dough into two balls. Roll out one ball on a floured surface to desired thickness.',
      'Spread tomato sauce over the dough, leaving a small border for the crust.',
      'Arrange mozzarella slices over the sauce.',
      'Carefully transfer to the preheated stone or baking sheet. Bake for 12-15 minutes until crust is golden.',
      'Remove from oven, top with fresh basil leaves, and drizzle with olive oil. Season with salt.',
      'Repeat with the second dough ball.'
    ],
    userId: '1',
    createdAt: '2023-06-11T19:30:00Z',
    likes: 192,
    comments: [
      {
        id: 'c6',
        userId: '2',
        content: 'The key is to get the oven as hot as possible. Works perfectly!',
        createdAt: '2023-06-12T08:15:00Z'
      }
    ]
  },
  {
    id: '6',
    title: 'Vegetarian Buddha Bowl',
    description: 'A nourishing bowl packed with colorful vegetables, grains, and protein.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Main Course',
    prepTime: 20,
    cookTime: 30,
    servings: 2,
    difficulty: 'Easy',
    ingredients: [
      '1 cup quinoa, rinsed',
      '2 cups water or vegetable broth',
      '1 sweet potato, cubed',
      '1 tbsp olive oil',
      '1 tsp cumin',
      '1 cup chickpeas, drained and rinsed',
      '2 cups mixed salad greens',
      '1 avocado, sliced',
      '1/2 cup cherry tomatoes, halved',
      '1/4 cup red cabbage, shredded',
      '2 tbsp tahini',
      '1 tbsp lemon juice',
      '1 tbsp maple syrup',
      '2-3 tbsp water',
      'Salt and pepper to taste',
      'Sesame seeds for garnish'
    ],
    instructions: [
      'Preheat oven to 400°F (200°C). Toss sweet potato cubes with olive oil, cumin, salt, and pepper. Roast for 25-30 minutes until tender.',
      'Meanwhile, combine quinoa and water/broth in a pot. Bring to a boil, then reduce heat and simmer for 15 minutes until water is absorbed. Fluff with a fork.',
      'For the dressing, whisk together tahini, lemon juice, maple syrup, water, salt, and pepper until smooth.',
      'Assemble bowls by arranging quinoa, roasted sweet potatoes, chickpeas, mixed greens, avocado, cherry tomatoes, and red cabbage.',
      'Drizzle with tahini dressing and sprinkle with sesame seeds.'
    ],
    userId: '3',
    createdAt: '2023-06-10T12:45:00Z',
    likes: 145,
    comments: [
      {
        id: 'c7',
        userId: '4',
        content: 'So satisfying and versatile! I added some grilled tofu to mine.',
        createdAt: '2023-06-10T18:20:00Z'
      }
    ]
  }
];

// Helper function to get user by ID
export const getUserById = (userId: string): User | undefined => {
  return users.find(user => user.id === userId);
};

// Helper function to get recipe by ID
export const getRecipeById = (recipeId: string): Recipe | undefined => {
  return recipes.find(recipe => recipe.id === recipeId);
};
