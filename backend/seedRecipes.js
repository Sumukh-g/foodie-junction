const mongoose = require('mongoose');
const Recipe = require('./models/Recipe');
const User = require('./models/User');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/foodie-junction');
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const createDefaultUser = async () => {
  try {
    // Check if default user already exists
    let defaultUser = await User.findOne({ email: 'chef@foodiejunction.com' });
    
    if (!defaultUser) {
      defaultUser = new User({
        username: 'FoodieChef',
        email: 'chef@foodiejunction.com',
        password: 'defaultpassword123' // This will be hashed automatically
      });
      await defaultUser.save();
      console.log('Default user created successfully');
    } else {
      console.log('Default user already exists');
    }
    
    return defaultUser._id;
  } catch (error) {
    console.error('Error creating default user:', error);
    throw error;
  }
};

const seedRecipes = async () => {
  try {
    await connectDB();
    
    // Create default user first
    const defaultUserId = await createDefaultUser();
    
    // Clear existing recipes
    await Recipe.deleteMany({});
    console.log('Existing recipes cleared');

    const recipes = [
      // Original Premium Recipes
      {
        title: "Truffle Mushroom Risotto",
        description: "A luxurious Italian risotto featuring wild mushrooms and aromatic truffle oil, creating an elegant and sophisticated dining experience.",
        ingredients: [
          "1½ cups Arborio rice",
          "4 cups warm vegetable broth",
          "8 oz mixed wild mushrooms (shiitake, oyster, cremini)",
          "1 medium onion, finely diced",
          "3 cloves garlic, minced",
          "½ cup dry white wine",
          "3 tbsp truffle oil",
          "½ cup grated Parmesan cheese",
          "2 tbsp butter",
          "2 tbsp olive oil",
          "Salt and black pepper to taste",
          "Fresh parsley for garnish"
        ],
        instructions: [
          "Heat olive oil in a large pan and sauté mushrooms until golden. Set aside.",
          "In the same pan, cook onion until translucent, add garlic and cook 1 minute.",
          "Add Arborio rice, stirring to coat with oil for 2 minutes.",
          "Pour in white wine and stir until absorbed.",
          "Add warm broth one ladle at a time, stirring constantly until absorbed.",
          "Continue for 18-20 minutes until rice is creamy and al dente.",
          "Stir in cooked mushrooms, butter, Parmesan, and truffle oil.",
          "Season with salt and pepper, garnish with parsley and serve immediately."
        ],
        cookingTime: 35,
        difficulty: "Medium",
        imageUrl: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=500&h=300&fit=crop",
        author: defaultUserId
      },
      {
        title: "Korean BBQ Bulgogi Tacos",
        description: "A fusion masterpiece combining tender Korean marinated beef with Mexican-style soft tacos, topped with kimchi slaw and spicy mayo.",
        ingredients: [
          "1 lb thinly sliced ribeye or sirloin",
          "¼ cup soy sauce",
          "2 tbsp brown sugar",
          "1 tbsp sesame oil",
          "3 cloves garlic, minced",
          "1 Asian pear, grated",
          "8 small corn tortillas",
          "1 cup kimchi, chopped",
          "2 cups cabbage slaw mix",
          "3 green onions, sliced",
          "2 tbsp mayonnaise",
          "1 tbsp sriracha",
          "1 tsp rice vinegar",
          "Sesame seeds for garnish"
        ],
        instructions: [
          "Marinate sliced beef in soy sauce, brown sugar, sesame oil, garlic, and grated pear for 2 hours.",
          "Mix kimchi with cabbage slaw, rice vinegar, and half the green onions.",
          "Combine mayonnaise and sriracha for spicy mayo sauce.",
          "Heat a grill pan or skillet over high heat.",
          "Cook marinated beef for 2-3 minutes per side until caramelized.",
          "Warm tortillas in a dry pan or microwave.",
          "Assemble tacos with beef, kimchi slaw, and spicy mayo.",
          "Garnish with remaining green onions and sesame seeds."
        ],
        cookingTime: 25,
        difficulty: "Medium",
        imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500&h=300&fit=crop",
        author: defaultUserId
      },
      {
        title: "Chocolate Lava Cake with Raspberry Coulis",
        description: "Decadent individual chocolate cakes with molten centers, served with a vibrant raspberry coulis and vanilla ice cream.",
        ingredients: [
          "4 oz dark chocolate (70% cocoa)",
          "4 tbsp unsalted butter",
          "2 large eggs",
          "2 large egg yolks",
          "¼ cup granulated sugar",
          "2 tbsp all-purpose flour",
          "Pinch of salt",
          "Butter for ramekins",
          "Cocoa powder for dusting",
          "1 cup fresh raspberries",
          "3 tbsp powdered sugar",
          "1 tbsp lemon juice",
          "Vanilla ice cream for serving"
        ],
        instructions: [
          "Preheat oven to 425°F. Butter and dust 4 ramekins with cocoa powder.",
          "Melt chocolate and butter in a double boiler until smooth.",
          "Whisk whole eggs, egg yolks, and granulated sugar until thick and pale.",
          "Fold melted chocolate mixture into egg mixture.",
          "Gently fold in flour and salt until just combined.",
          "Divide batter among prepared ramekins.",
          "Bake for 12-14 minutes until edges are firm but centers jiggle slightly.",
          "For coulis: blend raspberries, powdered sugar, and lemon juice until smooth.",
          "Let cakes cool for 1 minute, then invert onto plates and serve with coulis and ice cream."
        ],
        cookingTime: 30,
        difficulty: "Hard",
        imageUrl: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&h=300&fit=crop",
        author: defaultUserId
      },
      {
        title: "Mediterranean Quinoa Power Bowl",
        description: "A nutritious and colorful bowl packed with protein-rich quinoa, fresh vegetables, olives, feta cheese, and a zesty lemon-herb dressing.",
        ingredients: [
          "1 cup quinoa, rinsed",
          "2 cups vegetable broth",
          "1 cucumber, diced",
          "1 cup cherry tomatoes, halved",
          "½ red onion, thinly sliced",
          "½ cup Kalamata olives, pitted",
          "4 oz feta cheese, crumbled",
          "¼ cup fresh parsley, chopped",
          "2 tbsp fresh mint, chopped",
          "3 tbsp olive oil",
          "2 tbsp lemon juice",
          "1 clove garlic, minced",
          "1 tsp dried oregano",
          "Salt and pepper to taste"
        ],
        instructions: [
          "Cook quinoa in vegetable broth according to package directions. Let cool.",
          "Prepare all vegetables and herbs while quinoa cools.",
          "Whisk together olive oil, lemon juice, garlic, oregano, salt, and pepper for dressing.",
          "In a large bowl, combine cooled quinoa with cucumber, tomatoes, and red onion.",
          "Add olives, feta cheese, parsley, and mint.",
          "Pour dressing over the bowl and toss gently to combine.",
          "Let marinate for 15 minutes before serving.",
          "Serve chilled or at room temperature."
        ],
        cookingTime: 25,
        difficulty: "Easy",
        imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=300&fit=crop",
        author: defaultUserId
      },
      {
        title: "Spicy Szechuan Mapo Tofu",
        description: "An authentic Chinese dish featuring silky tofu in a fiery, numbing sauce with ground pork and Szechuan peppercorns.",
        ingredients: [
          "1 lb soft tofu, cut into cubes",
          "4 oz ground pork",
          "2 tbsp Szechuan bean paste (doubanjiang)",
          "1 tbsp fermented black beans, minced",
          "3 cloves garlic, minced",
          "1 tbsp fresh ginger, minced",
          "2 green onions, chopped",
          "1 tsp Szechuan peppercorns, ground",
          "1 tbsp soy sauce",
          "1 tsp sugar",
          "1 cup chicken broth",
          "1 tbsp cornstarch mixed with 2 tbsp water",
          "2 tbsp vegetable oil",
          "Steamed rice for serving"
        ],
        instructions: [
          "Heat oil in a wok or large pan over medium-high heat.",
          "Add ground pork and cook until browned and crispy.",
          "Add garlic, ginger, and bean paste. Stir-fry for 1 minute until fragrant.",
          "Add black beans and half the green onions.",
          "Pour in chicken broth, soy sauce, and sugar. Bring to a simmer.",
          "Gently add tofu cubes and simmer for 3-4 minutes.",
          "Stir in cornstarch slurry to thicken the sauce.",
          "Sprinkle with ground Szechuan peppercorns and remaining green onions.",
          "Serve immediately over steamed rice."
        ],
        cookingTime: 20,
        difficulty: "Medium",
        imageUrl: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=500&h=300&fit=crop",
        author: defaultUserId
      },
      {
        title: "Moroccan Lamb Tagine",
        description: "A fragrant North African stew with tender lamb, dried fruits, warm spices, and vegetables, slow-cooked to perfection.",
        ingredients: [
          "2 lbs lamb shoulder, cut into chunks",
          "1 large onion, sliced",
          "3 cloves garlic, minced",
          "1 tsp ground cinnamon",
          "1 tsp ground ginger",
          "1 tsp ground cumin",
          "½ tsp ground turmeric",
          "½ tsp ground coriander",
          "1 can diced tomatoes",
          "1 cup dried apricots",
          "½ cup pitted dates",
          "2 cups beef broth",
          "1 can chickpeas, drained",
          "2 tbsp olive oil",
          "Salt and pepper to taste",
          "Fresh cilantro for garnish",
          "Couscous for serving"
        ],
        instructions: [
          "Heat olive oil in a large tagine or Dutch oven over medium-high heat.",
          "Season lamb with salt and pepper, then brown on all sides.",
          "Remove lamb and sauté onions until softened.",
          "Add garlic and all spices, cook for 1 minute until fragrant.",
          "Return lamb to pot, add tomatoes, broth, apricots, and dates.",
          "Bring to a boil, then reduce heat and simmer covered for 1.5 hours.",
          "Add chickpeas and continue cooking for 30 minutes until lamb is tender.",
          "Adjust seasoning and garnish with fresh cilantro.",
          "Serve over fluffy couscous."
        ],
        cookingTime: 150,
        difficulty: "Medium",
        imageUrl: "https://images.unsplash.com/photo-1574653853027-5d6b2708f4d0?w=500&h=300&fit=crop",
        author: defaultUserId
      },

      // New Vegan & Vegetarian Recipes
      {
        title: "Creamy Cashew Alfredo with Roasted Vegetables",
        description: "A rich and creamy vegan pasta dish featuring cashew-based alfredo sauce with perfectly roasted seasonal vegetables.",
        ingredients: [
          "1 lb fettuccine pasta",
          "1 cup raw cashews, soaked for 2 hours",
          "1 cup unsweetened almond milk",
          "3 cloves garlic, minced",
          "2 tbsp nutritional yeast",
          "1 tbsp lemon juice",
          "1 zucchini, sliced",
          "1 bell pepper, strips",
          "1 cup cherry tomatoes",
          "8 oz mushrooms, sliced",
          "2 tbsp olive oil",
          "1 tsp dried basil",
          "1 tsp dried oregano",
          "Salt and pepper to taste",
          "Fresh parsley for garnish"
        ],
        instructions: [
          "Preheat oven to 425°F. Toss vegetables with olive oil, salt, and pepper.",
          "Roast vegetables for 20-25 minutes until tender and slightly caramelized.",
          "Cook pasta according to package directions. Reserve 1 cup pasta water.",
          "Drain and rinse soaked cashews.",
          "Blend cashews, almond milk, garlic, nutritional yeast, and lemon juice until smooth.",
          "Heat the cashew sauce in a large pan over medium heat.",
          "Add cooked pasta and roasted vegetables to the sauce.",
          "Toss with herbs, adding pasta water if needed for consistency.",
          "Serve immediately garnished with fresh parsley."
        ],
        cookingTime: 35,
        difficulty: "Easy",
        imageUrl: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=500&h=300&fit=crop",
        author: defaultUserId
      },
      {
        title: "Thai Green Curry with Tofu and Vegetables",
        description: "An aromatic and spicy vegan Thai curry with crispy tofu, fresh vegetables, and creamy coconut milk.",
        ingredients: [
          "14 oz firm tofu, cubed",
          "1 can coconut milk",
          "2 tbsp green curry paste",
          "1 Thai eggplant, cubed",
          "1 bell pepper, sliced",
          "1 cup green beans, trimmed",
          "1 onion, sliced",
          "3 kaffir lime leaves",
          "1 tbsp coconut oil",
          "2 tbsp soy sauce",
          "1 tbsp brown sugar",
          "1 tbsp lime juice",
          "Thai basil leaves",
          "Red chilies for garnish",
          "Jasmine rice for serving"
        ],
        instructions: [
          "Press tofu to remove excess water, then cube and pan-fry until golden.",
          "Heat coconut oil in a large pan or wok over medium heat.",
          "Add curry paste and cook for 1 minute until fragrant.",
          "Pour in thick coconut milk and simmer for 2 minutes.",
          "Add remaining coconut milk, soy sauce, and brown sugar.",
          "Add eggplant and simmer for 5 minutes.",
          "Add bell pepper, green beans, and onion. Cook for 5 minutes.",
          "Stir in fried tofu, lime leaves, and lime juice.",
          "Garnish with Thai basil and chilies. Serve over jasmine rice."
        ],
        cookingTime: 30,
        difficulty: "Medium",
        imageUrl: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=500&h=300&fit=crop",
        author: defaultUserId
      },
      {
        title: "Stuffed Portobello Mushrooms with Quinoa",
        description: "Large portobello mushroom caps stuffed with a savory quinoa mixture, herbs, and melted cheese for a satisfying vegetarian meal.",
        ingredients: [
          "4 large portobello mushroom caps",
          "1 cup cooked quinoa",
          "½ cup sun-dried tomatoes, chopped",
          "½ cup mozzarella cheese, shredded",
          "¼ cup Parmesan cheese, grated",
          "2 cloves garlic, minced",
          "1 small onion, diced",
          "2 tbsp pine nuts",
          "2 tbsp fresh basil, chopped",
          "2 tbsp olive oil",
          "1 tbsp balsamic vinegar",
          "Salt and pepper to taste",
          "Fresh arugula for serving"
        ],
        instructions: [
          "Preheat oven to 400°F. Remove mushroom stems and scrape out gills.",
          "Brush mushroom caps with olive oil and balsamic vinegar.",
          "Season with salt and pepper, then bake gill-side up for 10 minutes.",
          "Sauté onion and garlic in olive oil until softened.",
          "Mix cooked quinoa, sautéed onion, sun-dried tomatoes, pine nuts, and basil.",
          "Season quinoa mixture with salt and pepper.",
          "Fill mushroom caps with quinoa mixture and top with cheeses.",
          "Bake for 15-20 minutes until cheese is melted and golden.",
          "Serve over fresh arugula with a drizzle of balsamic vinegar."
        ],
        cookingTime: 40,
        difficulty: "Easy",
        imageUrl: "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=500&h=300&fit=crop",
        author: defaultUserId
      },
      {
        title: "Lentil and Sweet Potato Shepherd's Pie",
        description: "A hearty vegan comfort food featuring protein-rich lentils and vegetables topped with creamy mashed sweet potatoes.",
        ingredients: [
          "2 lbs sweet potatoes, peeled and cubed",
          "1 cup green lentils, cooked",
          "1 onion, diced",
          "2 carrots, diced",
          "2 celery stalks, diced",
          "8 oz mushrooms, chopped",
          "3 cloves garlic, minced",
          "2 tbsp tomato paste",
          "1 cup vegetable broth",
          "2 tbsp olive oil",
          "1 tsp dried thyme",
          "1 tsp dried rosemary",
          "½ cup unsweetened almond milk",
          "2 tbsp vegan butter",
          "Salt and pepper to taste"
        ],
        instructions: [
          "Preheat oven to 400°F. Boil sweet potatoes until tender, about 15 minutes.",
          "Mash sweet potatoes with almond milk, vegan butter, salt, and pepper.",
          "Heat olive oil in a large pan and sauté onion, carrots, and celery.",
          "Add mushrooms and garlic, cook until mushrooms release their moisture.",
          "Stir in tomato paste, herbs, cooked lentils, and vegetable broth.",
          "Simmer for 10 minutes until mixture thickens. Season with salt and pepper.",
          "Transfer lentil mixture to a baking dish.",
          "Spread mashed sweet potatoes evenly over the top.",
          "Bake for 25-30 minutes until top is lightly golden."
        ],
        cookingTime: 60,
        difficulty: "Medium",
        imageUrl: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=500&h=300&fit=crop",
        author: defaultUserId
      },
      {
        title: "Mediterranean Chickpea Salad",
        description: "A refreshing and protein-packed vegetarian salad with chickpeas, fresh vegetables, herbs, and a tangy lemon dressing.",
        ingredients: [
          "2 cans chickpeas, drained and rinsed",
          "1 cucumber, diced",
          "1 cup cherry tomatoes, halved",
          "½ red onion, thinly sliced",
          "½ cup Kalamata olives, pitted and halved",
          "4 oz feta cheese, crumbled",
          "¼ cup fresh parsley, chopped",
          "2 tbsp fresh dill, chopped",
          "3 tbsp extra virgin olive oil",
          "2 tbsp lemon juice",
          "1 clove garlic, minced",
          "1 tsp dried oregano",
          "Salt and pepper to taste",
          "Pita bread for serving"
        ],
        instructions: [
          "In a large bowl, combine chickpeas, cucumber, tomatoes, and red onion.",
          "Add olives, feta cheese, parsley, and dill.",
          "Whisk together olive oil, lemon juice, garlic, oregano, salt, and pepper.",
          "Pour dressing over the salad and toss gently to combine.",
          "Let marinate in refrigerator for at least 30 minutes.",
          "Taste and adjust seasoning as needed.",
          "Serve chilled with warm pita bread.",
          "Can be stored in refrigerator for up to 3 days."
        ],
        cookingTime: 15,
        difficulty: "Easy",
        imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&h=300&fit=crop",
        author: defaultUserId
      },
      {
        title: "Vegan Buddha Bowl with Tahini Dressing",
        description: "A nourishing and colorful vegan bowl featuring roasted vegetables, quinoa, avocado, and a creamy tahini dressing.",
        ingredients: [
          "1 cup quinoa, cooked",
          "1 sweet potato, cubed and roasted",
          "1 cup broccoli florets, roasted",
          "1 cup Brussels sprouts, halved and roasted",
          "1 avocado, sliced",
          "1 cup red cabbage, shredded",
          "¼ cup pumpkin seeds",
          "2 tbsp tahini",
          "2 tbsp lemon juice",
          "1 tbsp maple syrup",
          "1 clove garlic, minced",
          "2-3 tbsp water",
          "2 tbsp olive oil",
          "Salt and pepper to taste",
          "Fresh cilantro for garnish"
        ],
        instructions: [
          "Preheat oven to 425°F. Toss vegetables with olive oil, salt, and pepper.",
          "Roast sweet potato for 25 minutes, Brussels sprouts and broccoli for 20 minutes.",
          "Cook quinoa according to package directions and let cool slightly.",
          "Whisk together tahini, lemon juice, maple syrup, garlic, and water until smooth.",
          "Adjust tahini dressing consistency with more water if needed.",
          "Arrange quinoa, roasted vegetables, avocado, and cabbage in bowls.",
          "Drizzle with tahini dressing and sprinkle with pumpkin seeds.",
          "Garnish with fresh cilantro and serve immediately."
        ],
        cookingTime: 35,
        difficulty: "Easy",
        imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=300&fit=crop",
        author: defaultUserId
      },
      {
        title: "Eggplant Parmesan Stack",
        description: "A elegant vegetarian dish featuring layers of crispy breaded eggplant, marinara sauce, and melted cheese.",
        ingredients: [
          "2 large eggplants, sliced into ½-inch rounds",
          "2 cups marinara sauce",
          "8 oz fresh mozzarella, sliced",
          "½ cup Parmesan cheese, grated",
          "1 cup all-purpose flour",
          "3 eggs, beaten",
          "2 cups panko breadcrumbs",
          "½ cup olive oil",
          "2 tbsp fresh basil, chopped",
          "2 cloves garlic, minced",
          "Salt and pepper to taste",
          "Fresh basil leaves for garnish"
        ],
        instructions: [
          "Salt eggplant slices and let drain for 30 minutes. Pat dry.",
          "Set up breading station: flour, beaten eggs, and panko breadcrumbs.",
          "Dredge eggplant slices in flour, then egg, then breadcrumbs.",
          "Heat olive oil in a large skillet and fry eggplant until golden brown.",
          "Preheat oven to 375°F. Mix garlic into marinara sauce.",
          "In a baking dish, layer eggplant, marinara, and mozzarella.",
          "Repeat layers and top with Parmesan cheese.",
          "Bake for 25-30 minutes until cheese is bubbly and golden.",
          "Let rest for 5 minutes, garnish with fresh basil, and serve."
        ],
        cookingTime: 75,
        difficulty: "Medium",
        imageUrl: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=500&h=300&fit=crop",
        author: defaultUserId
      },
      {
        title: "Spicy Black Bean and Quinoa Burgers",
        description: "Hearty vegan burgers packed with black beans, quinoa, and spices, perfect for grilling or pan-frying.",
        ingredients: [
          "1 can black beans, drained and rinsed",
          "1 cup cooked quinoa",
          "½ cup rolled oats",
          "1 small onion, finely diced",
          "2 cloves garlic, minced",
          "1 jalapeño, seeded and minced",
          "2 tbsp ground flaxseed mixed with 6 tbsp water",
          "1 tsp cumin",
          "1 tsp chili powder",
          "½ tsp smoked paprika",
          "2 tbsp olive oil",
          "Salt and pepper to taste",
          "Burger buns and toppings for serving"
        ],
        instructions: [
          "Let flaxseed mixture sit for 10 minutes to thicken.",
          "Pulse oats in food processor until coarsely ground.",
          "Mash black beans in a large bowl, leaving some chunks for texture.",
          "Sauté onion, garlic, and jalapeño until softened.",
          "Mix mashed beans, quinoa, ground oats, sautéed vegetables, and flax mixture.",
          "Add spices, salt, and pepper. Mix well and let rest for 15 minutes.",
          "Form mixture into 6 patties. Chill for 30 minutes.",
          "Heat oil in a skillet and cook patties for 4-5 minutes per side.",
          "Serve on buns with your favorite toppings."
        ],
        cookingTime: 45,
        difficulty: "Medium",
        imageUrl: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500&h=300&fit=crop",
        author: defaultUserId
      },
      {
        title: "Roasted Vegetable and Goat Cheese Tart",
        description: "An elegant vegetarian tart featuring seasonal roasted vegetables and creamy goat cheese in a flaky pastry crust.",
        ingredients: [
          "1 pre-made pie crust",
          "1 zucchini, sliced",
          "1 yellow squash, sliced",
          "1 red bell pepper, strips",
          "1 red onion, sliced",
          "8 oz cherry tomatoes, halved",
          "4 oz goat cheese, crumbled",
          "3 eggs",
          "½ cup heavy cream",
          "2 tbsp olive oil",
          "2 tbsp fresh thyme",
          "1 tbsp fresh rosemary",
          "Salt and pepper to taste",
          "Mixed greens for serving"
        ],
        instructions: [
          "Preheat oven to 425°F. Roll out pie crust in a tart pan.",
          "Toss vegetables with olive oil, herbs, salt, and pepper.",
          "Roast vegetables for 20-25 minutes until tender and lightly caramelized.",
          "Reduce oven temperature to 375°F.",
          "Whisk together eggs and cream. Season with salt and pepper.",
          "Arrange roasted vegetables in the tart shell.",
          "Sprinkle goat cheese over vegetables.",
          "Pour egg mixture over the filling.",
          "Bake for 30-35 minutes until set and golden. Serve with mixed greens."
        ],
        cookingTime: 65,
        difficulty: "Medium",
        imageUrl: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500&h=300&fit=crop",
        author: defaultUserId
      },
      {
        title: "Coconut Curry Lentil Soup",
        description: "A warming and aromatic vegan soup featuring red lentils, coconut milk, and fragrant spices for a comforting meal.",
        ingredients: [
          "1 cup red lentils, rinsed",
          "1 can coconut milk",
          "3 cups vegetable broth",
          "1 onion, diced",
          "3 cloves garlic, minced",
          "1 tbsp fresh ginger, minced",
          "1 tbsp curry powder",
          "1 tsp ground turmeric",
          "1 tsp ground cumin",
          "1 can diced tomatoes",
          "2 cups spinach, chopped",
          "2 tbsp coconut oil",
          "1 tbsp lime juice",
          "Salt and pepper to taste",
          "Fresh cilantro for garnish",
          "Naan bread for serving"
        ],
        instructions: [
          "Heat coconut oil in a large pot over medium heat.",
          "Sauté onion until translucent, about 5 minutes.",
          "Add garlic, ginger, curry powder, turmeric, and cumin. Cook for 1 minute.",
          "Add lentils, coconut milk, vegetable broth, and diced tomatoes.",
          "Bring to a boil, then reduce heat and simmer for 20-25 minutes.",
          "Stir occasionally until lentils are tender and soup has thickened.",
          "Add chopped spinach and cook until wilted.",
          "Season with salt, pepper, and lime juice.",
          "Serve hot garnished with cilantro and warm naan bread."
        ],
        cookingTime: 35,
        difficulty: "Easy",
        imageUrl: "https://images.unsplash.com/photo-1547592180-85f173990554?w=500&h=300&fit=crop",
        author: defaultUserId
      }
    ];

    // Insert all recipes
    const insertedRecipes = await Recipe.insertMany(recipes);
    console.log(`Successfully seeded ${insertedRecipes.length} recipes!`);
    
    // Display summary
    console.log('\n=== RECIPE SEEDING SUMMARY ===');
    console.log(`Total recipes added: ${insertedRecipes.length}`);
    console.log('Recipe categories:');
    console.log('- Original Premium Recipes: 6');
    console.log('- New Vegan Recipes: 6');
    console.log('- New Vegetarian Recipes: 4');
    console.log('\nAll recipes have been successfully added to the database!');
    
  } catch (error) {
    console.error('Error seeding recipes:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedRecipes(); 