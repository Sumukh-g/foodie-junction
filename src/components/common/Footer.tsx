
import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-12">
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="inline-block mb-4">
              <span className="text-foodie-primary text-xl font-display font-bold">Foodie</span>
              <span className="text-foodie-secondary text-xl font-display font-bold">Junction</span>
            </Link>
            <p className="text-sm text-gray-600 mb-4">
              Discover, share, and celebrate the joy of cooking with our community of food enthusiasts.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-foodie-primary">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-foodie-primary">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-foodie-primary">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-foodie-primary">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Discover</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-foodie-primary">Home</Link></li>
              <li><Link to="/categories" className="text-gray-600 hover:text-foodie-primary">Categories</Link></li>
              <li><Link to="/popular" className="text-gray-600 hover:text-foodie-primary">Popular Recipes</Link></li>
              <li><Link to="/recent" className="text-gray-600 hover:text-foodie-primary">Recent Recipes</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Community</h3>
            <ul className="space-y-2">
              <li><Link to="/create" className="text-gray-600 hover:text-foodie-primary">Share Recipe</Link></li>
              <li><Link to="/chefs" className="text-gray-600 hover:text-foodie-primary">Top Chefs</Link></li>
              <li><Link to="/events" className="text-gray-600 hover:text-foodie-primary">Events</Link></li>
              <li><Link to="/blog" className="text-gray-600 hover:text-foodie-primary">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-600 hover:text-foodie-primary">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-foodie-primary">Contact</Link></li>
              <li><Link to="/privacy" className="text-gray-600 hover:text-foodie-primary">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-600 hover:text-foodie-primary">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Foodie Junction. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <Link to="/help" className="text-sm text-gray-500 hover:text-foodie-primary mr-6">
              Help Center
            </Link>
            <Link to="/faq" className="text-sm text-gray-500 hover:text-foodie-primary">
              FAQs
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
