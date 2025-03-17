
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/common/Footer";
import RecipeForm from "@/components/recipe/RecipeForm";

const CreateRecipePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container-custom py-8">
        <h1 className="font-display text-3xl font-bold mb-8">Create New Recipe</h1>
        <RecipeForm />
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateRecipePage;
