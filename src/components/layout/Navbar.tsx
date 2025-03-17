
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  PlusCircle, 
  Home, 
  User, 
  Bookmark,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import { users } from "@/lib/data";
import UserAvatar from "@/components/ui/UserAvatar";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  
  // Assuming the first user is the logged-in user for demo purposes
  const currentUser = users[0];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container-custom py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-foodie-primary text-2xl font-display font-bold">Foodie</span>
            <span className="text-foodie-secondary text-2xl font-display font-bold">Junction</span>
          </Link>

          {/* Search bar - hidden on mobile */}
          {!isMobile && (
            <div className="hidden md:flex relative max-w-md w-full mx-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                type="search" 
                placeholder="Search recipes..." 
                className="pl-10 bg-gray-100 border-0"
              />
            </div>
          )}

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="hidden md:flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="icon">
                  <Home className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/create">
                <Button variant="ghost" size="icon">
                  <PlusCircle className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/saved">
                <Button variant="ghost" size="icon">
                  <Bookmark className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/profile">
                <UserAvatar user={currentUser} size="sm" />
              </Link>
            </nav>
          )}

          {/* Mobile hamburger menu */}
          {isMobile && (
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          )}
        </div>

        {/* Mobile menu overlay */}
        {isMobile && isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
            <div className="py-4 px-6 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                  type="search" 
                  placeholder="Search recipes..." 
                  className="pl-10 bg-gray-100 border-0"
                />
              </div>
              
              <nav className="flex flex-col space-y-2">
                <Link 
                  to="/"
                  className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Home className="h-5 w-5" />
                  <span>Home</span>
                </Link>
                <Link 
                  to="/create"
                  className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <PlusCircle className="h-5 w-5" />
                  <span>Create Recipe</span>
                </Link>
                <Link 
                  to="/saved"
                  className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Bookmark className="h-5 w-5" />
                  <span>Saved Recipes</span>
                </Link>
                <Link 
                  to="/profile"
                  className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </Link>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
