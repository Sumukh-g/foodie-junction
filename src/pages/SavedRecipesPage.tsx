
import { useState } from "react";
import { recipes } from "@/lib/data";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/common/Footer";
import RecipeCard from "@/components/recipe/RecipeCard";
import { Button } from "@/components/ui/button";
import { BookmarkPlus } from "lucide-react";

const SavedRecipesPage = () => {
  // In a real app, this would be fetched from a database
  // For now, we'll just show some mock recipes as if they were saved
  const [savedRecipes] = useState(recipes.slice(0, 3));
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container-custom py-8">
        <h1 className="font-display text-3xl font-bold mb-8">Saved Recipes</h1>
        
        {savedRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedRecipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookmarkPlus className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">No saved recipes</h3>
            <p className="text-gray-600 mb-6">
              You haven't saved any recipes yet.
            </p>
            <Button 
              className="bg-foodie-primary hover:bg-foodie-primary/80"
              onClick={() => window.location.href = '/'}
            >
              Discover Recipes
            </Button>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default SavedRecipesPage;
