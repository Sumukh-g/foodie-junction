
import { useParams } from "react-router-dom";
import { getRecipeById } from "@/lib/data";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/common/Footer";
import RecipeDetail from "@/components/recipe/RecipeDetail";
import NotFound from "./NotFound";

const RecipePage = () => {
  const { id } = useParams<{ id: string }>();
  const recipe = id ? getRecipeById(id) : undefined;
  
  if (!recipe) {
    return <NotFound />;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container-custom py-8">
        <RecipeDetail recipe={recipe} />
      </main>
      
      <Footer />
    </div>
  );
};

export default RecipePage;
