import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Brain, Sparkles, Star, TrendingUp, Wand2 } from "lucide-react";
import { Link } from "react-router-dom";

const AIFeatureShowcase = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 opacity-50" />
      
      {/* Floating elements */}
      <div className="absolute top-10 left-10 animate-bounce">
        <div className="w-4 h-4 bg-purple-400 rounded-full opacity-60" />
      </div>
      <div className="absolute top-20 right-20 animate-pulse">
        <div className="w-6 h-6 bg-pink-400 rounded-full opacity-40" />
      </div>
      <div className="absolute bottom-20 left-20 animate-bounce delay-300">
        <div className="w-3 h-3 bg-blue-400 rounded-full opacity-50" />
      </div>

      <div className="relative container-custom py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 text-sm font-medium">
                <Sparkles className="h-4 w-4 mr-2" />
                NEW FEATURE
              </Badge>
              
              <h2 className="font-display text-4xl md:text-5xl font-bold">
                Meet Your
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent block">
                  AI Recipe Genius
                </span>
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Discover personalized recipes based on your ingredients, preferences, and cooking time. 
                Our AI chef analyzes thousands of combinations to find your perfect match!
              </p>
            </div>

            {/* Features list */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Brain className="h-4 w-4 text-purple-600" />
                </div>
                <span className="text-gray-700">Smart ingredient matching</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                  <Wand2 className="h-4 w-4 text-pink-600" />
                </div>
                <span className="text-gray-700">Personalized recommendations</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                </div>
                <span className="text-gray-700">Real-time scoring algorithm</span>
              </div>
            </div>

            <Link to="/ai-recommendations">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg font-semibold group"
              >
                Try AI Chef Now
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Right side - Interactive demo */}
          <div className="relative">
            {/* Main demo card */}
            <Card className="border-2 border-purple-200 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-300">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                      <Brain className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="font-bold text-lg">AI Analysis</h3>
                  </div>
                  
                  {/* Simulated ingredients */}
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Your ingredients:</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="bg-purple-50 text-purple-700">chicken</Badge>
                      <Badge variant="outline" className="bg-purple-50 text-purple-700">mushrooms</Badge>
                      <Badge variant="outline" className="bg-purple-50 text-purple-700">garlic</Badge>
                    </div>
                  </div>

                  {/* Simulated recommendation */}
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-green-800">Perfect Match Found!</h4>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-bold text-green-600">95% Match</span>
                      </div>
                    </div>
                    <p className="text-sm text-green-700">Truffle Mushroom Risotto</p>
                    <p className="text-xs text-green-600 mt-1">35 min • Medium difficulty</p>
                  </div>

                  {/* Processing animation */}
                  <div className="flex items-center gap-2 text-purple-600">
                    <Sparkles className="h-4 w-4 animate-spin" />
                    <span className="text-sm">AI processing...</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Floating stats */}
            <div className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg border-2 border-yellow-200">
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-600">6</p>
                <p className="text-xs text-gray-600">Recipes</p>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-white rounded-full p-3 shadow-lg border-2 border-green-200">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">92%</p>
                <p className="text-xs text-gray-600">Accuracy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIFeatureShowcase; 