
import { useState } from "react";
import { recipes } from "@/lib/data";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/common/Footer";
import RecipeCard from "@/components/recipe/RecipeCard";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";

const Index = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  // Get unique categories
  const categories = Array.from(new Set(recipes.map(recipe => recipe.category)));
  
  // Filter recipes by category
  const filteredRecipes = activeTab === "all" 
    ? recipes 
    : recipes.filter(recipe => recipe.category === activeTab);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero section */}
        <section className="relative h-80 md:h-96 overflow-hidden">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1543352634-99a5d50ae78e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80"
            alt="Cooking hero" 
            className="w-full h-full object-cover"
          />
          <div className="container-custom relative z-20 h-full flex flex-col justify-center items-center text-center text-white">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Share Your Culinary Masterpieces
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl">
              Join our community of food enthusiasts and discover amazing recipes from around the world
            </p>
            <Button 
              size="lg" 
              className="bg-foodie-primary hover:bg-foodie-primary/80 text-white"
              onClick={() => window.location.href = '/create'}
            >
              Share Your Recipe
            </Button>
          </div>
        </section>
        
        {/* Recipe section */}
        <section className="container-custom py-12">
          <h2 className="font-display text-3xl font-bold mb-8 text-center">
            Discover Delicious Recipes
          </h2>
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-center mb-8">
              <TabsList className="bg-gray-100">
                <TabsTrigger value="all">All</TabsTrigger>
                {categories.map(category => (
                  <TabsTrigger key={category} value={category}>
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            <TabsContent value={activeTab}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRecipes.map(recipe => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>
        
        {/* CTA Section */}
        <section className="bg-foodie-primary/10 py-12">
          <div className="container-custom text-center">
            <h2 className="font-display text-3xl font-bold mb-4 text-foodie-primary">
              Ready to share your own recipe?
            </h2>
            <p className="text-lg mb-8 max-w-xl mx-auto">
              Join our community of food lovers and share your favorite recipes with the world.
            </p>
            <Button 
              size="lg" 
              className="bg-foodie-primary hover:bg-foodie-primary/80 text-white"
              onClick={() => window.location.href = '/create'}
            >
              Create Recipe
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
