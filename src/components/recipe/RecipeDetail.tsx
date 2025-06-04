import NutritionCalculator from "@/components/features/NutritionCalculator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";
import { BookmarkPlus, ChefHat, Clock, Heart, MessageSquare, Share2, Users } from "lucide-react";
import { useState } from "react";

interface RecipeDetailProps {
  recipe: any; // Using any since backend structure is different from mock data
}

const RecipeDetail = ({ recipe }: RecipeDetailProps) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [comment, setComment] = useState("");
  
  // Handle missing author gracefully
  const author = recipe.author || { username: "anonymous", name: "Anonymous" };
  
  const handleLike = () => {
    setLiked(!liked);
    toast({
      description: liked ? "Removed from likes" : "Added to likes"
    });
  };
  
  const handleSave = () => {
    setSaved(!saved);
    toast({
      description: saved ? "Removed from bookmarks" : "Saved to bookmarks"
    });
  };
  
  const handleShare = () => {
    // In a real app, this would use the Web Share API or copy to clipboard
    toast({
      description: "Recipe link copied to clipboard!"
    });
  };
  
  const handleComment = () => {
    if (comment.trim()) {
      toast({
        description: "Comment added"
      });
      setComment("");
      // In a real app, this would post the comment to the backend
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Recipe header */}
      <div className="space-y-4">
        <h1 className="font-display text-3xl md:text-4xl font-bold">{recipe.title}</h1>
        
        <div className="flex flex-wrap items-center gap-2">
          {recipe.category && (
            <Badge variant="outline" className="bg-foodie-primary/10 text-foodie-primary">
              {recipe.category}
            </Badge>
          )}
          <Badge variant="outline" className="bg-foodie-secondary/10 text-foodie-secondary">
            {recipe.difficulty}
          </Badge>
        </div>
        
        <p className="text-lg text-gray-700">{recipe.description}</p>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm font-bold text-white">
              {author.name ? author.name[0] : "A"}
            </div>
            <div>
              <p className="font-medium">{author.name}</p>
              <p className="text-sm text-gray-500">
                {formatDistanceToNow(new Date(recipe.createdAt), { addSuffix: true })}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recipe image */}
      <div className="rounded-lg overflow-hidden h-80 md:h-96">
        <img 
          src={recipe.imageUrl} 
          alt={recipe.title} 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Recipe stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <Clock className="h-6 w-6 mb-1 text-foodie-primary" />
            <p className="text-sm text-gray-500">Cooking Time</p>
            <p className="font-medium">{recipe.cookingTime} min</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <ChefHat className="h-6 w-6 mb-1 text-foodie-primary" />
            <p className="text-sm text-gray-500">Difficulty</p>
            <p className="font-medium">{recipe.difficulty}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <Users className="h-6 w-6 mb-1 text-foodie-primary" />
            <p className="text-sm text-gray-500">Servings</p>
            <p className="font-medium">{recipe.servings || "N/A"}</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Action buttons */}
      <div className="flex gap-3">
        <Button 
          variant={liked ? "default" : "outline"} 
          className={liked ? "bg-foodie-primary hover:bg-foodie-primary/80" : ""}
          onClick={handleLike}
        >
          <Heart className={`h-4 w-4 mr-2 ${liked ? "fill-white" : ""}`} />
          {liked ? "Liked" : "Like"}
        </Button>
        <Button 
          variant={saved ? "default" : "outline"}
          className={saved ? "bg-foodie-secondary hover:bg-foodie-secondary/80" : ""}
          onClick={handleSave}
        >
          <BookmarkPlus className="h-4 w-4 mr-2" />
          {saved ? "Saved" : "Save"}
        </Button>
        <Button variant="outline" onClick={handleShare}>
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </div>
      
      {/* Ingredients */}
      <div>
        <h2 className="font-display text-2xl font-bold mb-4">Ingredients</h2>
        <ul className="space-y-2">
          {recipe.ingredients && recipe.ingredients.map((ingredient: string, index: number) => (
            <li key={index} className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-foodie-primary" />
              <span>{ingredient}</span>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Instructions */}
      <div>
        <h2 className="font-display text-2xl font-bold mb-4">Instructions</h2>
        <ol className="space-y-4">
          {recipe.instructions && recipe.instructions.map((instruction: string, index: number) => (
            <li key={index} className="flex gap-4">
              <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-foodie-primary text-white font-bold">
                {index + 1}
              </div>
              <p className="pt-1">{instruction}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Nutrition Calculator */}
      {recipe.ingredients && (
        <NutritionCalculator 
          ingredients={recipe.ingredients} 
          servings={recipe.servings || 4} 
        />
      )}
      
      {/* Comments section */}
      <div className="pt-6 border-t border-gray-200">
        <h2 className="font-display text-2xl font-bold mb-4">Comments (0)</h2>
        
        {/* Add comment */}
        <div className="mb-6 space-y-4">
          <Textarea 
            placeholder="Share your thoughts or tips..." 
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button onClick={handleComment} disabled={!comment.trim()}>Post Comment</Button>
        </div>
        
        {/* Comments list - placeholder for future implementation */}
        <div className="text-center py-8 text-gray-500">
          <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p>No comments yet. Be the first to share your thoughts!</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
