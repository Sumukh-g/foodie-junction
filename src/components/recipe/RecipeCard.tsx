import { Card, CardContent } from "@/components/ui/card";
import { Clock, Heart, MessageSquare, Users } from "lucide-react";
import { Link } from "react-router-dom";

interface RecipeCardProps {
  recipe: any;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  // Handle missing user gracefully (for anonymous recipes)
  const user = recipe.author || { username: "anonymous", name: "Anonymous" };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/recipe/${recipe._id}`}> {/* Use _id from backend */}
        <div className="relative h-48 sm:h-56 md:h-64 w-full overflow-hidden">
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            {recipe.category && (
              <span className="text-xs font-medium px-2 py-1 bg-foodie-primary text-white rounded-full">
                {recipe.category}
              </span>
            )}
          </div>
        </div>
      </Link>

      <CardContent className="p-4">
        <Link to={`/recipe/${recipe._id}`}> {/* Use _id from backend */}
          <h3 className="font-display text-lg font-bold mb-1 hover:text-foodie-primary transition-colors">
            {recipe.title}
          </h3>
        </Link>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{recipe.description}</p>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Link to={`/profile/${user.username}`}>
              {/* Optionally, add a default avatar for anonymous */}
              <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold text-white">
                {user.name ? user.name[0] : "A"}
              </div>
            </Link>
            <Link to={`/profile/${user.username}`} className="text-sm font-medium hover:underline">
              {user.name}
            </Link>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>{recipe.cookingTime} min</span>
          </div>
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
          <div className="flex items-center gap-1 text-sm">
            <Users className="h-4 w-4 text-gray-500" />
            <span>{recipe.servings ? `${recipe.servings} servings` : ""}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4 text-foodie-primary" />
              <span className="text-sm">{Array.isArray(recipe.likes) ? recipe.likes.length : 0}</span>
            </div>
            {/* Comments are not in backend, so hide or show 0 */}
            <div className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4 text-foodie-secondary" />
              <span className="text-sm">0</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
