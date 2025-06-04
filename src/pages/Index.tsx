import Footer from "@/components/common/Footer";
import Navbar from "@/components/layout/Navbar";
import RecipeCard from "@/components/recipe/RecipeCard";
import { Button } from "@/components/ui/button";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs";
import { recipes as recipesApi } from "@/lib/api";
import { Award, Camera, ChefHat, Clock, Heart, Sparkles, Star, TrendingUp, Users, Zap } from "lucide-react";
import { useEffect, useState } from "react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [recipeList, setRecipeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    recipesApi
      .getAll()
      .then((res) => {
        setRecipeList(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load recipes");
        setLoading(false);
      });
  }, []);

  // Get unique categories
  const categories = Array.from(
    new Set(recipeList.map((recipe: any) => recipe.category).filter(Boolean))
  );
  
  // Filter recipes by category
  const filteredRecipes =
    activeTab === "all"
      ? recipeList
      : recipeList.filter((recipe: any) => recipe.category === activeTab);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Creative Hero Section */}
        <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            {/* Floating Food Icons */}
            <div className="absolute top-20 left-10 animate-bounce opacity-20">
              <div className="w-16 h-16 bg-orange-200 rounded-full flex items-center justify-center">
                🍕
              </div>
            </div>
            <div className="absolute top-40 right-20 animate-pulse opacity-30">
              <div className="w-12 h-12 bg-red-200 rounded-full flex items-center justify-center">
                🍔
              </div>
            </div>
            <div className="absolute bottom-40 left-20 animate-bounce delay-300 opacity-25">
              <div className="w-14 h-14 bg-yellow-200 rounded-full flex items-center justify-center">
                🍰
              </div>
            </div>
            <div className="absolute top-60 left-1/3 animate-pulse delay-500 opacity-20">
              <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center">
                🥗
              </div>
            </div>
            <div className="absolute bottom-60 right-1/4 animate-bounce delay-700 opacity-30">
              <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center">
                🍜
              </div>
            </div>
            
            {/* Geometric Shapes */}
            <div className="absolute top-32 right-32 w-20 h-20 bg-gradient-to-r from-orange-300 to-red-300 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute bottom-32 left-32 w-16 h-16 bg-gradient-to-r from-green-300 to-blue-300 rotate-45 opacity-15 animate-spin-slow"></div>
            <div className="absolute top-1/2 right-10 w-24 h-24 bg-gradient-to-r from-purple-300 to-pink-300 rounded-lg opacity-10 animate-bounce"></div>
          </div>

          {/* Main Hero Content */}
          <div className="relative z-10 container-custom min-h-screen flex items-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
              
              {/* Left Side - Text Content */}
              <div className="space-y-8 text-center lg:text-left">
                {/* Brand Badge */}
                <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-orange-200 shadow-lg">
                  <Award className="h-5 w-5 text-orange-500" />
                  <span className="text-sm font-medium text-gray-700">#1 Recipe Platform</span>
                </div>

                {/* Main Title */}
                <div className="space-y-4">
                  <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                    <span className="bg-gradient-to-r from-orange-600 via-red-500 to-pink-500 bg-clip-text text-transparent">
                      Foodie
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                      Junction
                    </span>
                  </h1>
                  
                  {/* Animated Underline */}
                  <div className="flex items-center justify-center lg:justify-start gap-2">
                    <div className="h-1 w-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full animate-pulse"></div>
                    <ChefHat className="h-6 w-6 text-orange-500 animate-bounce" />
                    <div className="h-1 w-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse delay-300"></div>
                  </div>
                </div>

                {/* Subtitle with Typewriter Effect */}
                <div className="space-y-2">
                  <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
                    Where Culinary Dreams Come True
                  </h2>
                  <p className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
                    Join our vibrant community of food enthusiasts. Discover AI-powered recipes, 
                    share your masterpieces, and revolutionize your cooking journey.
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
                  <div className="text-center p-3 bg-white/60 backdrop-blur-sm rounded-lg border border-orange-100">
                    <div className="text-2xl font-bold text-orange-600">10K+</div>
                    <div className="text-xs text-gray-600">Recipes</div>
                  </div>
                  <div className="text-center p-3 bg-white/60 backdrop-blur-sm rounded-lg border border-green-100">
                    <div className="text-2xl font-bold text-green-600">50K+</div>
                    <div className="text-xs text-gray-600">Chefs</div>
                  </div>
                  <div className="text-center p-3 bg-white/60 backdrop-blur-sm rounded-lg border border-blue-100">
                    <div className="text-2xl font-bold text-blue-600">1M+</div>
                    <div className="text-xs text-gray-600">Meals</div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-4 text-lg font-semibold shadow-2xl transform hover:scale-105 transition-all duration-300 group"
                    onClick={() => window.location.href = '/create'}
                  >
                    <ChefHat className="h-5 w-5 mr-2 group-hover:animate-bounce" />
                    Start Cooking
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="bg-white/80 backdrop-blur-sm border-2 border-purple-300 text-purple-700 hover:bg-purple-100 px-8 py-4 text-lg font-semibold shadow-xl transform hover:scale-105 transition-all duration-300 group"
                    onClick={() => window.location.href = '/ai-recommendations'}
                  >
                    <Sparkles className="h-5 w-5 mr-2 group-hover:animate-spin" />
                    AI Chef Magic
                  </Button>
                </div>
              </div>

              {/* Right Side - Interactive Visual Elements */}
              <div className="relative">
                {/* Main Feature Card */}
                <div className="relative z-10 bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/50 transform hover:scale-105 transition-all duration-500">
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                        <Zap className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl">AI Recipe Engine</h3>
                        <p className="text-sm text-gray-600">Powered by advanced algorithms</p>
                      </div>
                    </div>

                    {/* Mock Interface */}
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">🥕 Carrots</span>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">🧄 Garlic</span>
                        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">🍅 Tomatoes</span>
                      </div>
                      
                      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-xl border border-green-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-green-800">Perfect Match!</span>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-bold text-green-600">98% Match</span>
                          </div>
                        </div>
                        <p className="text-sm text-green-700">Mediterranean Quinoa Bowl</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-green-600">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            25 min
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            4 servings
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-purple-600">
                        <TrendingUp className="h-4 w-4 animate-pulse" />
                        <span className="text-sm">Analyzing 10,000+ recipes...</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Cards */}
                <div className="absolute -top-6 -right-6 bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-orange-200 animate-float">
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    <div>
                      <div className="text-sm font-bold">2.5K</div>
                      <div className="text-xs text-gray-600">Likes Today</div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-6 -left-6 bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-blue-200 animate-float delay-300">
                  <div className="flex items-center gap-2">
                    <Camera className="h-5 w-5 text-blue-500" />
                    <div>
                      <div className="text-sm font-bold">847</div>
                      <div className="text-xs text-gray-600">Photos Shared</div>
                    </div>
                  </div>
                </div>

                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-pink-200 rounded-3xl blur-3xl opacity-30 -z-10 animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </section>
        
        {/* Recipe section */}
        <section className="container-custom py-12">
          <h2 className="font-display text-3xl font-bold mb-8 text-center">
            Discover Delicious Recipes
          </h2>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="flex justify-center mb-8">
              <TabsTrigger value="all">All</TabsTrigger>
              {categories.map((cat) => (
                <TabsTrigger key={cat} value={cat}>
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <TabsContent value={activeTab} forceMount>
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-foodie-primary mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading delicious recipes...</p>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <div className="text-red-500 mb-4">{error}</div>
                  <Button 
                    onClick={() => window.location.reload()}
                    className="bg-foodie-primary hover:bg-foodie-primary/80"
                  >
                    Try Again
                  </Button>
                </div>
              ) : filteredRecipes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRecipes.map((recipe: any) => (
                    <RecipeCard key={recipe._id} recipe={recipe} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-bold mb-2">No recipes found</h3>
                  <p className="text-gray-600 mb-6">
                    Try a different category or create a new recipe.
                  </p>
                  <Button 
                    size="lg" 
                    className="bg-foodie-primary hover:bg-foodie-primary/80 text-white"
                    onClick={() => window.location.href = '/create'}
                  >
                    Create Recipe
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </section>
        
        {/* Enhanced CTA Section */}
        <section className="bg-gradient-to-r from-foodie-primary/10 via-foodie-secondary/10 to-foodie-primary/10 py-16">
          <div className="container-custom text-center">
            <h2 className="font-display text-4xl font-bold mb-4 bg-gradient-to-r from-foodie-primary to-foodie-secondary bg-clip-text text-transparent">
              Ready to share your own recipe?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-700">
              Join our community of food lovers and share your favorite recipes with the world. 
              Get AI-powered insights and connect with fellow cooking enthusiasts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-foodie-primary hover:bg-foodie-primary/80 text-white px-8 py-3"
                onClick={() => window.location.href = '/create'}
              >
                <ChefHat className="h-5 w-5 mr-2" />
                Create Recipe
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-foodie-primary text-foodie-primary hover:bg-foodie-primary hover:text-white px-8 py-3"
                onClick={() => window.location.href = '/ai-recommendations'}
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Explore AI Features
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
