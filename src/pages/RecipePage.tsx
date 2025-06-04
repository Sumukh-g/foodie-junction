import Footer from "@/components/common/Footer";
import Navbar from "@/components/layout/Navbar";
import RecipeDetail from "@/components/recipe/RecipeDetail";
import { recipes } from "@/lib/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";

const RecipePage = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      recipes.getOne(id)
        .then(res => {
          setRecipe(res.data);
          setLoading(false);
        })
        .catch(() => {
          setRecipe(null);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!recipe) return <NotFound />;

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
