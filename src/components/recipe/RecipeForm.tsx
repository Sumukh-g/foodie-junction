
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { X, Plus, Upload, ChefHat, Clock } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const RecipeForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [prepTime, setPrepTime] = useState(0);
  const [cookTime, setCookTime] = useState(0);
  const [servings, setServings] = useState(1);
  const [difficulty, setDifficulty] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([""]);
  const [instructions, setInstructions] = useState<string[]>([""]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const handleAddIngredient = () => {
    setIngredients([...ingredients, ""]);
  };
  
  const handleRemoveIngredient = (index: number) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };
  
  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };
  
  const handleAddInstruction = () => {
    setInstructions([...instructions, ""]);
  };
  
  const handleRemoveInstruction = (index: number) => {
    const newInstructions = [...instructions];
    newInstructions.splice(index, 1);
    setInstructions(newInstructions);
  };
  
  const handleInstructionChange = (index: number, value: string) => {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    setInstructions(newInstructions);
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!title || !description || !category || !difficulty || !imagePreview) {
      toast({
        variant: "destructive",
        description: "Please fill in all required fields"
      });
      return;
    }
    
    if (ingredients.some(i => !i) || instructions.some(i => !i)) {
      toast({
        variant: "destructive",
        description: "Please fill in all ingredients and instructions"
      });
      return;
    }
    
    // In a real app, this would submit to a backend
    toast({
      description: "Recipe published successfully!"
    });
    
    // Navigate to the recipe detail page or home
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <h2 className="font-display text-2xl font-bold">Basic Information</h2>
        
        <div className="space-y-2">
          <Label htmlFor="title">Recipe Title *</Label>
          <Input 
            id="title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="E.g., Homemade Chocolate Chip Cookies"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description *</Label>
          <Textarea 
            id="description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your recipe in a few sentences"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Breakfast">Breakfast</SelectItem>
                <SelectItem value="Lunch">Lunch</SelectItem>
                <SelectItem value="Dinner">Dinner</SelectItem>
                <SelectItem value="Appetizer">Appetizer</SelectItem>
                <SelectItem value="Dessert">Dessert</SelectItem>
                <SelectItem value="Snack">Snack</SelectItem>
                <SelectItem value="Drink">Drink</SelectItem>
                <SelectItem value="Pasta">Pasta</SelectItem>
                <SelectItem value="Soup">Soup</SelectItem>
                <SelectItem value="Salad">Salad</SelectItem>
                <SelectItem value="Baking">Baking</SelectItem>
                <SelectItem value="Main Course">Main Course</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="difficulty">Difficulty *</Label>
            <Select value={difficulty} onValueChange={setDifficulty} required>
              <SelectTrigger id="difficulty">
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Easy">Easy</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="prepTime" className="flex items-center gap-1">
              <Clock className="h-4 w-4" /> Prep Time (minutes)
            </Label>
            <Input 
              id="prepTime" 
              type="number" 
              min={0}
              value={prepTime || ""}
              onChange={(e) => setPrepTime(parseInt(e.target.value) || 0)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cookTime" className="flex items-center gap-1">
              <ChefHat className="h-4 w-4" /> Cook Time (minutes)
            </Label>
            <Input 
              id="cookTime" 
              type="number"
              min={0}
              value={cookTime || ""}
              onChange={(e) => setCookTime(parseInt(e.target.value) || 0)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="servings">Servings</Label>
            <Input 
              id="servings" 
              type="number"
              min={1}
              value={servings || ""}
              onChange={(e) => setServings(parseInt(e.target.value) || 1)}
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h2 className="font-display text-2xl font-bold">Recipe Image *</h2>
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          {imagePreview ? (
            <div className="space-y-4">
              <img src={imagePreview} alt="Recipe Preview" className="mx-auto max-h-64 rounded-lg" />
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setImagePreview(null)}
              >
                Change Image
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="h-12 w-12 mx-auto text-gray-400" />
              <p className="text-gray-500">Upload a delicious photo of your dish</p>
              <Input 
                id="image" 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleImageChange}
              />
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => document.getElementById("image")?.click()}
              >
                Upload Image
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-4">
        <h2 className="font-display text-2xl font-bold">Ingredients</h2>
        
        {ingredients.map((ingredient, index) => (
          <div key={index} className="flex gap-2">
            <Input 
              value={ingredient}
              onChange={(e) => handleIngredientChange(index, e.target.value)}
              placeholder={`Ingredient ${index + 1}`}
            />
            {ingredients.length > 1 && (
              <Button 
                type="button" 
                variant="outline" 
                size="icon" 
                onClick={() => handleRemoveIngredient(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        
        <Button 
          type="button" 
          variant="outline" 
          className="w-full"
          onClick={handleAddIngredient}
        >
          <Plus className="h-4 w-4 mr-2" /> Add Ingredient
        </Button>
      </div>
      
      <div className="space-y-4">
        <h2 className="font-display text-2xl font-bold">Instructions</h2>
        
        {instructions.map((instruction, index) => (
          <div key={index} className="flex gap-2">
            <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-foodie-primary text-white font-bold">
              {index + 1}
            </div>
            <Textarea 
              value={instruction}
              onChange={(e) => handleInstructionChange(index, e.target.value)}
              placeholder={`Step ${index + 1}`}
            />
            {instructions.length > 1 && (
              <Button 
                type="button" 
                variant="outline" 
                size="icon" 
                onClick={() => handleRemoveInstruction(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        
        <Button 
          type="button" 
          variant="outline" 
          className="w-full"
          onClick={handleAddInstruction}
        >
          <Plus className="h-4 w-4 mr-2" /> Add Step
        </Button>
      </div>
      
      <div className="pt-6 border-t border-gray-200 flex justify-end gap-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => navigate("/")}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          className="bg-foodie-primary hover:bg-foodie-primary/80"
        >
          Publish Recipe
        </Button>
      </div>
    </form>
  );
};

export default RecipeForm;
