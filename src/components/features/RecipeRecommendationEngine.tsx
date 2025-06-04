import RecipeCard from "@/components/recipe/RecipeCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/hooks/use-toast";
import { recipes } from "@/lib/api";
import {
    Brain,
    ChefHat,
    Clock,
    Heart,
    Plus,
    Sparkles,
    Star,
    TrendingUp,
    Wand2,
    X
} from "lucide-react";
import { useEffect, useState } from "react";

interface RecommendationFilters {
  ingredients: string[];
  maxCookingTime: number;
  difficulty: string;
  category: string;
  dietaryRestrictions: string[];
}

const RecipeRecommendationEngine = () => {
  const [allRecipes, setAllRecipes] = useState<any[]>([]);
  const [recommendedRecipes, setRecommendedRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentIngredient, setCurrentIngredient] = useState("");
  const [filters, setFilters] = useState<RecommendationFilters>({
    ingredients: [],
    maxCookingTime: 60,
    difficulty: "any",
    category: "any",
    dietaryRestrictions: []
  });

  const popularIngredients = [
    "chicken", "beef", "salmon", "tofu", "mushrooms", "tomatoes", 
    "onions", "garlic", "rice", "pasta", "cheese", "eggs"
  ];

  const dietaryOptions = [
    "vegetarian", "vegan", "gluten-free", "dairy-free", "low-carb", "keto"
  ];

  const categories = [
    "Main Course", "Dessert", "Asian", "Fusion", "Healthy", "Middle Eastern"
  ];

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await recipes.getAll();
      setAllRecipes(response.data);
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to load recipes"
      });
    }
  };

  const addIngredient = (ingredient: string) => {
    if (ingredient && !filters.ingredients.includes(ingredient.toLowerCase())) {
      setFilters(prev => ({
        ...prev,
        ingredients: [...prev.ingredients, ingredient.toLowerCase()]
      }));
      setCurrentIngredient("");
    }
  };

  const removeIngredient = (ingredient: string) => {
    setFilters(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter(i => i !== ingredient)
    }));
  };

  const calculateRecommendationScore = (recipe: any) => {
    let score = 0;
    
    // Ingredient matching (highest weight)
    if (filters.ingredients.length > 0) {
      const recipeIngredients = recipe.ingredients.join(" ").toLowerCase();
      const matchingIngredients = filters.ingredients.filter(ingredient =>
        recipeIngredients.includes(ingredient)
      );
      score += (matchingIngredients.length / filters.ingredients.length) * 50;
    } else {
      score += 25; // Base score if no ingredients specified
    }

    // Cooking time preference
    if (recipe.cookingTime <= filters.maxCookingTime) {
      score += 20;
    } else {
      score += Math.max(0, 20 - (recipe.cookingTime - filters.maxCookingTime) / 10);
    }

    // Difficulty preference
    if (filters.difficulty === "any" || recipe.difficulty === filters.difficulty) {
      score += 15;
    }

    // Category preference
    if (filters.category === "any" || recipe.category === filters.category) {
      score += 15;
    }

    // Bonus for popular recipes (simulated)
    score += Math.random() * 10; // Add some randomness for variety

    return Math.round(score);
  };

  const generateRecommendations = () => {
    setLoading(true);
    
    setTimeout(() => {
      const scoredRecipes = allRecipes.map(recipe => ({
        ...recipe,
        recommendationScore: calculateRecommendationScore(recipe)
      }));

      const sortedRecipes = scoredRecipes
        .sort((a, b) => b.recommendationScore - a.recommendationScore)
        .slice(0, 6);

      setRecommendedRecipes(sortedRecipes);
      setLoading(false);

      toast({
        description: `Found ${sortedRecipes.length} personalized recommendations!`
      });
    }, 1500); // Simulate AI processing time
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
            <Brain className="h-8 w-8 text-white" />
          </div>
          <h1 className="font-display text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            AI Recipe Genius
          </h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Tell me what you have, and I'll create the perfect recipe recommendations just for you!
        </p>
      </div>

      {/* Filters Card */}
      <Card className="border-2 border-purple-100 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="h-5 w-5 text-purple-600" />
            Smart Recipe Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          {/* Ingredients Input */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">
              What ingredients do you have?
            </label>
            <div className="flex gap-2">
              <Input
                placeholder="Type an ingredient..."
                value={currentIngredient}
                onChange={(e) => setCurrentIngredient(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addIngredient(currentIngredient)}
                className="flex-1"
              />
              <Button 
                onClick={() => addIngredient(currentIngredient)}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Popular Ingredients */}
            <div className="space-y-2">
              <p className="text-xs text-gray-500">Popular ingredients:</p>
              <div className="flex flex-wrap gap-2">
                {popularIngredients.map(ingredient => (
                  <Badge
                    key={ingredient}
                    variant="outline"
                    className="cursor-pointer hover:bg-purple-100 transition-colors"
                    onClick={() => addIngredient(ingredient)}
                  >
                    {ingredient}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Selected Ingredients */}
            {filters.ingredients.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Selected ingredients:</p>
                <div className="flex flex-wrap gap-2">
                  {filters.ingredients.map(ingredient => (
                    <Badge
                      key={ingredient}
                      className="bg-purple-100 text-purple-800 hover:bg-purple-200"
                    >
                      {ingredient}
                      <X 
                        className="h-3 w-3 ml-1 cursor-pointer" 
                        onClick={() => removeIngredient(ingredient)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Time and Difficulty */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Max Cooking Time: {filters.maxCookingTime} minutes
              </label>
              <Slider
                value={[filters.maxCookingTime]}
                onValueChange={(value) => setFilters(prev => ({ ...prev, maxCookingTime: value[0] }))}
                max={180}
                min={10}
                step={5}
                className="w-full"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <ChefHat className="h-4 w-4" />
                Difficulty Level
              </label>
              <Select value={filters.difficulty} onValueChange={(value) => setFilters(prev => ({ ...prev, difficulty: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Difficulty</SelectItem>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Category */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Cuisine Category</label>
            <Select value={filters.category} onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Category</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Generate Button */}
          <Button 
            onClick={generateRecommendations}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 text-lg font-semibold"
          >
            {loading ? (
              <>
                <Sparkles className="h-5 w-5 mr-2 animate-spin" />
                AI is thinking...
              </>
            ) : (
              <>
                <Brain className="h-5 w-5 mr-2" />
                Generate Smart Recommendations
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Recommendations */}
      {recommendedRecipes.length > 0 && (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-gray-800 mb-2">
              Your Personalized Recommendations
            </h2>
            <p className="text-gray-600">Curated just for you by our AI chef!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedRecipes.map((recipe, index) => (
              <div key={recipe._id} className="relative">
                {/* Recommendation Badge */}
                <div className="absolute -top-2 -right-2 z-10">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    {recipe.recommendationScore}% Match
                  </div>
                </div>
                
                {/* Ranking Badge */}
                {index < 3 && (
                  <div className="absolute top-4 left-4 z-10">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                      index === 0 ? 'bg-yellow-500' : 
                      index === 1 ? 'bg-gray-400' : 'bg-orange-600'
                    }`}>
                      {index + 1}
                    </div>
                  </div>
                )}

                <div className="transform hover:scale-105 transition-transform duration-200">
                  <RecipeCard recipe={recipe} />
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-center gap-8 text-center">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold text-green-600">{recommendedRecipes.length}</p>
                    <p className="text-sm text-gray-600">Recipes Found</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="text-2xl font-bold text-red-500">
                      {Math.round(recommendedRecipes.reduce((acc, r) => acc + r.recommendationScore, 0) / recommendedRecipes.length)}%
                    </p>
                    <p className="text-sm text-gray-600">Avg Match</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold text-blue-600">
                      {Math.round(recommendedRecipes.reduce((acc, r) => acc + r.cookingTime, 0) / recommendedRecipes.length)}
                    </p>
                    <p className="text-sm text-gray-600">Avg Time (min)</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default RecipeRecommendationEngine; 