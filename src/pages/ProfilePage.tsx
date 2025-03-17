
import { useState } from "react";
import { useParams } from "react-router-dom";
import { users, recipes, getUserById } from "@/lib/data";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/common/Footer";
import RecipeCard from "@/components/recipe/RecipeCard";
import UserAvatar from "@/components/ui/UserAvatar";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { UserPlus, Settings, Mail } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import NotFound from "./NotFound";

const ProfilePage = () => {
  const { username } = useParams<{ username: string }>();
  
  // If no username is provided, use the first user for demo (as if it's the logged-in user)
  const user = username ? users.find(u => u.username === username) : users[0];
  
  const [following, setFollowing] = useState(false);
  
  if (!user) {
    return <NotFound />;
  }
  
  // Get user's recipes
  const userRecipes = recipes.filter(recipe => recipe.userId === user.id);
  
  // Handle follow button click
  const handleFollow = () => {
    setFollowing(!following);
    toast(following ? `Unfollowed ${user.name}` : `Now following ${user.name}`);
  };
  
  // Calculate if this is the current user's profile
  const isCurrentUser = user.id === users[0].id;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Profile header */}
        <div className="bg-gradient-to-r from-foodie-primary/20 to-foodie-secondary/20 py-10">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <UserAvatar user={user} size="lg" />
              
              <div className="flex-1 text-center md:text-left">
                <h1 className="font-display text-3xl font-bold">{user.name}</h1>
                <p className="text-gray-600 mb-4">@{user.username}</p>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4">
                  <div>
                    <span className="font-bold text-lg">{userRecipes.length}</span>
                    <span className="text-gray-600 ml-1">Recipes</span>
                  </div>
                  <div>
                    <span className="font-bold text-lg">142</span>
                    <span className="text-gray-600 ml-1">Followers</span>
                  </div>
                  <div>
                    <span className="font-bold text-lg">56</span>
                    <span className="text-gray-600 ml-1">Following</span>
                  </div>
                </div>
                
                <div className="flex justify-center md:justify-start gap-3">
                  {isCurrentUser ? (
                    <Button variant="outline" className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Edit Profile
                    </Button>
                  ) : (
                    <>
                      <Button 
                        variant={following ? "default" : "outline"}
                        className={following ? "bg-foodie-primary hover:bg-foodie-primary/80" : ""}
                        onClick={handleFollow}
                      >
                        <UserPlus className="h-4 w-4 mr-2" />
                        {following ? "Following" : "Follow"}
                      </Button>
                      <Button variant="outline">
                        <Mail className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Profile content */}
        <div className="container-custom py-8">
          <Tabs defaultValue="recipes">
            <TabsList className="w-full max-w-md mx-auto mb-8">
              <TabsTrigger value="recipes" className="flex-1">Recipes</TabsTrigger>
              <TabsTrigger value="saved" className="flex-1">Saved</TabsTrigger>
              <TabsTrigger value="liked" className="flex-1">Liked</TabsTrigger>
            </TabsList>
            
            <TabsContent value="recipes">
              {userRecipes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userRecipes.map(recipe => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-bold mb-2">No recipes yet</h3>
                  <p className="text-gray-600 mb-6">
                    {isCurrentUser ? "You haven't shared any recipes yet." : `${user.name} hasn't shared any recipes yet.`}
                  </p>
                  {isCurrentUser && (
                    <Button 
                      className="bg-foodie-primary hover:bg-foodie-primary/80"
                      onClick={() => window.location.href = '/create'}
                    >
                      Create Your First Recipe
                    </Button>
                  )}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="saved">
              <div className="text-center py-12">
                <h3 className="text-xl font-bold mb-2">No saved recipes</h3>
                <p className="text-gray-600 mb-6">
                  {isCurrentUser ? "You haven't saved any recipes yet." : `${user.name} hasn't saved any recipes yet.`}
                </p>
                {isCurrentUser && (
                  <Button 
                    className="bg-foodie-primary hover:bg-foodie-primary/80"
                    onClick={() => window.location.href = '/'}
                  >
                    Discover Recipes
                  </Button>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="liked">
              <div className="text-center py-12">
                <h3 className="text-xl font-bold mb-2">No liked recipes</h3>
                <p className="text-gray-600 mb-6">
                  {isCurrentUser ? "You haven't liked any recipes yet." : `${user.name} hasn't liked any recipes yet.`}
                </p>
                {isCurrentUser && (
                  <Button 
                    className="bg-foodie-primary hover:bg-foodie-primary/80"
                    onClick={() => window.location.href = '/'}
                  >
                    Discover Recipes
                  </Button>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProfilePage;
