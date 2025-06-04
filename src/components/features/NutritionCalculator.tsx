import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
    AlertCircle,
    Calculator,
    CheckCircle,
    Flame,
    TrendingUp,
    Zap
} from "lucide-react";
import { useState } from "react";

interface NutritionData {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
  cholesterol: number;
}

interface NutritionCalculatorProps {
  ingredients: string[];
  servings?: number;
}

const NutritionCalculator = ({ ingredients, servings = 4 }: NutritionCalculatorProps) => {
  const [nutritionData, setNutritionData] = useState<NutritionData | null>(null);
  const [loading, setLoading] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  // Simulated nutrition database (in a real app, this would be an API call)
  const nutritionDatabase: { [key: string]: Partial<NutritionData> } = {
    'chicken': { calories: 165, protein: 31, fat: 3.6, carbs: 0 },
    'beef': { calories: 250, protein: 26, fat: 15, carbs: 0 },
    'salmon': { calories: 208, protein: 22, fat: 12, carbs: 0 },
    'tofu': { calories: 76, protein: 8, fat: 4.8, carbs: 1.9 },
    'rice': { calories: 130, protein: 2.7, fat: 0.3, carbs: 28 },
    'pasta': { calories: 131, protein: 5, fat: 1.1, carbs: 25 },
    'mushrooms': { calories: 22, protein: 3.1, fat: 0.3, carbs: 3.3, fiber: 1 },
    'tomatoes': { calories: 18, protein: 0.9, fat: 0.2, carbs: 3.9, fiber: 1.2 },
    'onions': { calories: 40, protein: 1.1, fat: 0.1, carbs: 9.3, fiber: 1.7 },
    'garlic': { calories: 149, protein: 6.4, fat: 0.5, carbs: 33, fiber: 2.1 },
    'cheese': { calories: 113, protein: 7, fat: 9, carbs: 1 },
    'eggs': { calories: 155, protein: 13, fat: 11, carbs: 1.1 },
    'butter': { calories: 717, protein: 0.9, fat: 81, carbs: 0.1 },
    'olive oil': { calories: 884, protein: 0, fat: 100, carbs: 0 },
    'flour': { calories: 364, protein: 10, fat: 1, carbs: 76, fiber: 2.7 },
    'sugar': { calories: 387, protein: 0, fat: 0, carbs: 100 },
    'milk': { calories: 42, protein: 3.4, fat: 1, carbs: 5 },
    'yogurt': { calories: 59, protein: 10, fat: 0.4, carbs: 3.6 },
    'spinach': { calories: 23, protein: 2.9, fat: 0.4, carbs: 3.6, fiber: 2.2 },
    'broccoli': { calories: 34, protein: 2.8, fat: 0.4, carbs: 7, fiber: 2.6 }
  };

  const calculateNutrition = () => {
    setLoading(true);
    
    // Simulate API processing time
    setTimeout(() => {
      let totalNutrition: NutritionData = {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        fiber: 0,
        sugar: 0,
        sodium: 0,
        cholesterol: 0
      };

      // Analyze each ingredient
      ingredients.forEach(ingredient => {
        const cleanIngredient = ingredient.toLowerCase().split(' ').find(word => 
          Object.keys(nutritionDatabase).some(key => word.includes(key) || key.includes(word))
        );
        
        if (cleanIngredient) {
          const matchedKey = Object.keys(nutritionDatabase).find(key => 
            cleanIngredient.includes(key) || key.includes(cleanIngredient)
          );
          
          if (matchedKey) {
            const nutrition = nutritionDatabase[matchedKey];
            // Estimate portion size (simplified calculation)
            const portionMultiplier = 0.3; // Assume 30% of 100g per ingredient
            
            totalNutrition.calories += (nutrition.calories || 0) * portionMultiplier;
            totalNutrition.protein += (nutrition.protein || 0) * portionMultiplier;
            totalNutrition.carbs += (nutrition.carbs || 0) * portionMultiplier;
            totalNutrition.fat += (nutrition.fat || 0) * portionMultiplier;
            totalNutrition.fiber += (nutrition.fiber || 0) * portionMultiplier;
          }
        }
      });

      // Add some randomness for realism and estimate missing values
      totalNutrition.sugar = totalNutrition.carbs * 0.2 + Math.random() * 5;
      totalNutrition.sodium = 200 + Math.random() * 300;
      totalNutrition.cholesterol = totalNutrition.fat * 2 + Math.random() * 20;

      // Round all values
      Object.keys(totalNutrition).forEach(key => {
        totalNutrition[key as keyof NutritionData] = Math.round(totalNutrition[key as keyof NutritionData] * 10) / 10;
      });

      setNutritionData(totalNutrition);
      setAnalyzed(true);
      setLoading(false);
    }, 2000);
  };

  const getNutritionPerServing = (value: number) => {
    return Math.round((value / servings) * 10) / 10;
  };

  const getHealthScore = () => {
    if (!nutritionData) return 0;
    
    let score = 70; // Base score
    
    // Protein bonus
    if (nutritionData.protein > 20) score += 10;
    else if (nutritionData.protein > 15) score += 5;
    
    // Fiber bonus
    if (nutritionData.fiber > 5) score += 10;
    else if (nutritionData.fiber > 3) score += 5;
    
    // Penalty for high sodium
    if (nutritionData.sodium > 800) score -= 15;
    else if (nutritionData.sodium > 600) score -= 10;
    
    // Penalty for high sugar
    if (nutritionData.sugar > 15) score -= 10;
    else if (nutritionData.sugar > 10) score -= 5;
    
    return Math.max(0, Math.min(100, score));
  };

  const getHealthGrade = (score: number) => {
    if (score >= 90) return { grade: 'A+', color: 'text-green-600', bg: 'bg-green-100' };
    if (score >= 80) return { grade: 'A', color: 'text-green-600', bg: 'bg-green-100' };
    if (score >= 70) return { grade: 'B', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (score >= 60) return { grade: 'C', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { grade: 'D', color: 'text-red-600', bg: 'bg-red-100' };
  };

  return (
    <Card className="border-2 border-blue-100 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-blue-600" />
          Smart Nutrition Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {!analyzed ? (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold">Analyze Recipe Nutrition</h3>
            <p className="text-gray-600">
              Get detailed nutritional information for this recipe including calories, macros, and health score.
            </p>
            <Button 
              onClick={calculateNutrition}
              disabled={loading}
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white"
            >
              {loading ? (
                <>
                  <Calculator className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Calculator className="h-4 w-4 mr-2" />
                  Calculate Nutrition
                </>
              )}
            </Button>
          </div>
        ) : nutritionData && (
          <div className="space-y-6">
            {/* Health Score */}
            <div className="text-center">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getHealthGrade(getHealthScore()).bg}`}>
                  <span className={`text-xl font-bold ${getHealthGrade(getHealthScore()).color}`}>
                    {getHealthGrade(getHealthScore()).grade}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Health Score</p>
                  <p className="text-2xl font-bold text-green-600">{getHealthScore()}/100</p>
                </div>
              </div>
            </div>

            {/* Calories */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg border border-orange-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Flame className="h-5 w-5 text-orange-600" />
                  <span className="font-semibold">Calories</span>
                </div>
                <Badge className="bg-orange-100 text-orange-800">
                  {getNutritionPerServing(nutritionData.calories)} per serving
                </Badge>
              </div>
              <p className="text-2xl font-bold text-orange-600">
                {nutritionData.calories} total
              </p>
            </div>

            {/* Macronutrients */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-600">Protein</p>
                <p className="text-xl font-bold text-blue-600">{getNutritionPerServing(nutritionData.protein)}g</p>
                <Progress value={(nutritionData.protein / 50) * 100} className="mt-2 h-2" />
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-gray-600">Carbs</p>
                <p className="text-xl font-bold text-green-600">{getNutritionPerServing(nutritionData.carbs)}g</p>
                <Progress value={(nutritionData.carbs / 100) * 100} className="mt-2 h-2" />
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                <p className="text-sm text-gray-600">Fat</p>
                <p className="text-xl font-bold text-purple-600">{getNutritionPerServing(nutritionData.fat)}g</p>
                <Progress value={(nutritionData.fat / 30) * 100} className="mt-2 h-2" />
              </div>
            </div>

            {/* Additional nutrients */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Fiber</span>
                <span className="font-semibold">{getNutritionPerServing(nutritionData.fiber)}g</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Sugar</span>
                <span className="font-semibold">{getNutritionPerServing(nutritionData.sugar)}g</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Sodium</span>
                <span className="font-semibold">{getNutritionPerServing(nutritionData.sodium)}mg</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Cholesterol</span>
                <span className="font-semibold">{getNutritionPerServing(nutritionData.cholesterol)}mg</span>
              </div>
            </div>

            {/* Health insights */}
            <div className="space-y-2">
              <h4 className="font-semibold flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                Health Insights
              </h4>
              <div className="space-y-2">
                {nutritionData.protein > 15 && (
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    High in protein - great for muscle building
                  </div>
                )}
                {nutritionData.fiber > 3 && (
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    Good source of fiber - supports digestive health
                  </div>
                )}
                {nutritionData.sodium > 600 && (
                  <div className="flex items-center gap-2 text-sm text-orange-600">
                    <AlertCircle className="h-4 w-4" />
                    High in sodium - consider reducing salt
                  </div>
                )}
                {nutritionData.sugar > 10 && (
                  <div className="flex items-center gap-2 text-sm text-orange-600">
                    <AlertCircle className="h-4 w-4" />
                    Contains added sugars - enjoy in moderation
                  </div>
                )}
              </div>
            </div>

            {/* Recalculate button */}
            <Button 
              variant="outline" 
              onClick={() => {
                setAnalyzed(false);
                setNutritionData(null);
              }}
              className="w-full"
            >
              Recalculate Nutrition
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NutritionCalculator; 