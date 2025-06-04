import Footer from "@/components/common/Footer";
import RecipeRecommendationEngine from "@/components/features/RecipeRecommendationEngine";
import Navbar from "@/components/layout/Navbar";

const AIRecommendationsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container-custom py-8">
        <RecipeRecommendationEngine />
      </main>
      
      <Footer />
    </div>
  );
};

export default AIRecommendationsPage; 