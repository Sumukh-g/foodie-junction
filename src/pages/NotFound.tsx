
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/common/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-6xl font-display font-bold text-foodie-primary mb-6">404</h1>
          <p className="text-2xl font-display font-bold mb-4">Oops! Page not found</p>
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            We couldn't find the recipe you were looking for. Maybe it's time to cook up something new!
          </p>
          <Link to="/">
            <Button size="lg" className="bg-foodie-primary hover:bg-foodie-primary/80">
              Back to Home
            </Button>
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
