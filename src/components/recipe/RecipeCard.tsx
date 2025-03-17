
import { Recipe, getUserById } from "@/lib/data";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Users, Heart, MessageSquare } from "lucide-react";
import UserAvatar from "@/components/ui/UserAvatar";

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const user = getUserById(recipe.userId);
  
  if (!user) return null;
  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/recipe/${recipe.id}`}>
        <div className="relative h-48 sm:h-56 md:h-64 w-full overflow-hidden">
          <img 
            src={recipe.image} 
            alt={recipe.title} 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <span className="text-xs font-medium px-2 py-1 bg-foodie-primary text-white rounded-full">
              {recipe.category}
            </span>
          </div>
        </div>
      </Link>
      
      <CardContent className="p-4">
        <Link to={`/recipe/${recipe.id}`}>
          <h3 className="font-display text-lg font-bold mb-1 hover:text-foodie-primary transition-colors">
            {recipe.title}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{recipe.description}</p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Link to={`/profile/${user.username}`}>
              <UserAvatar user={user} size="sm" />
            </Link>
            <Link to={`/profile/${user.username}`} className="text-sm font-medium hover:underline">
              {user.name}
            </Link>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="h-4 w-4" /> 
            <span>{recipe.prepTime + recipe.cookTime} min</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
          <div className="flex items-center gap-1 text-sm">
            <Users className="h-4 w-4 text-gray-500" />
            <span>{recipe.servings} servings</span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4 text-foodie-primary" />
              <span className="text-sm">{recipe.likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4 text-foodie-secondary" />
              <span className="text-sm">{recipe.comments.length}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
