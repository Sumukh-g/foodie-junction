import { Button } from "@/components/ui/button";
import { ChefHat, Home, Search } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <div className="text-center space-y-6 max-w-md mx-auto px-6">
        {/* 404 Icon */}
        <div className="relative">
          <div className="text-8xl font-bold text-gray-200">404</div>
          <ChefHat className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-16 w-16 text-foodie-primary" />
        </div>
        
        {/* Brand */}
        <div className="mb-4">
          <h1 className="font-display text-2xl font-bold">
            <span className="text-foodie-primary">Foodie</span>
            <span className="text-foodie-secondary"> Junction</span>
          </h1>
        </div>
        
        {/* Error message */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-800">Recipe Not Found!</h2>
          <p className="text-gray-600">
            Looks like this recipe has gone missing from our kitchen. 
            Let's get you back to cooking something delicious!
          </p>
        </div>
        
        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/">
            <Button className="bg-foodie-primary hover:bg-foodie-primary/80 text-white">
              <Home className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <Link to="/ai-recommendations">
            <Button variant="outline" className="border-foodie-secondary text-foodie-secondary hover:bg-foodie-secondary hover:text-white">
              <Search className="h-4 w-4 mr-2" />
              Find Recipes
            </Button>
          </Link>
        </div>
        
        {/* Fun cooking tip */}
        <div className="mt-8 p-4 bg-white/50 rounded-lg border border-orange-200">
          <p className="text-sm text-gray-600">
            <strong>Chef's Tip:</strong> While you're here, why not try our AI Recipe Genius to discover new recipes based on your ingredients?
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
