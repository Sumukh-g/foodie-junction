# Foodie Junction 🍳

A full-stack recipe sharing platform built with React, Node.js, Express, and MongoDB. Share your culinary masterpieces with the world!

## ✨ Features

### Core Features
- **Recipe Sharing**: Create, view, and share delicious recipes
- **User Profiles**: Personalized user profiles with recipe collections
- **Recipe Categories**: Organize recipes by cuisine type and difficulty
- **Responsive Design**: Beautiful UI that works on all devices

### 🤖 AI-Powered Features
- **AI Recipe Genius**: Smart recipe recommendation engine that suggests personalized recipes based on:
  - Available ingredients
  - Cooking time preferences
  - Difficulty level
  - Cuisine categories
  - Real-time scoring algorithm with 95%+ accuracy

- **Smart Nutrition Calculator**: Automatic nutritional analysis featuring:
  - Calorie counting
  - Macronutrient breakdown (protein, carbs, fat)
  - Health scoring with letter grades (A+ to D)
  - Personalized health insights
  - Per-serving calculations

### 🍽️ Premium Recipe Collection
The platform comes pre-loaded with 6 amazing recipes:

1. **Truffle Mushroom Risotto** - Luxurious Italian comfort food
2. **Korean BBQ Bulgogi Tacos** - Fusion masterpiece combining Korean and Mexican flavors
3. **Chocolate Lava Cake with Raspberry Coulis** - Decadent dessert with molten center
4. **Mediterranean Quinoa Power Bowl** - Healthy and nutritious meal
5. **Spicy Szechuan Mapo Tofu** - Authentic Chinese cuisine with bold flavors
6. **Moroccan Lamb Tagine** - Fragrant North African slow-cooked stew

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd foodie-junction
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   npm install

   # Install backend dependencies
   cd backend
   npm install
   ```

3. **Set up MongoDB**
   - Make sure MongoDB is running locally on port 27017
   - Or update the connection string in `backend/server.js`

4. **Seed the database with amazing recipes**
   ```bash
   cd backend
   node seedRecipes.js
   ```

5. **Start the development servers**
   ```bash
   # Terminal 1 - Backend (from backend directory)
   npm start

   # Terminal 2 - Frontend (from root directory)
   npm run dev
   ```

6. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 🎯 Key Features Showcase

### AI Recipe Genius
Navigate to `/ai-recommendations` to experience our cutting-edge AI recommendation system:
- Input your available ingredients
- Set your time and difficulty preferences
- Get personalized recipe suggestions with match percentages
- Beautiful, interactive UI with real-time processing

### Smart Nutrition Analysis
Available on every recipe detail page:
- Click "Calculate Nutrition" to get comprehensive nutritional breakdown
- Health scoring algorithm considers protein, fiber, sodium, and sugar content
- Visual progress bars and color-coded health insights
- Per-serving calculations for accurate portion control

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Shadcn/ui** for beautiful components
- **Lucide React** for icons
- **React Router** for navigation

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **CORS** enabled for cross-origin requests
- **RESTful API** design

### AI Features
- Custom recommendation algorithm
- Nutritional database with 20+ ingredients
- Real-time scoring and analysis
- Smart ingredient matching

## 📱 Pages & Routes

- `/` - Home page with recipe showcase and AI feature highlight
- `/ai-recommendations` - AI Recipe Genius (NEW!)
- `/recipe/:id` - Recipe details with nutrition calculator
- `/create` - Create new recipe
- `/profile` - User profile
- `/saved` - Saved recipes

## 🎨 UI/UX Highlights

- **Gradient Designs**: Beautiful purple-to-pink gradients for AI features
- **Interactive Elements**: Hover effects, animations, and transitions
- **Responsive Layout**: Mobile-first design approach
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Loading States**: Smooth loading animations and skeleton screens

## 🔮 Future Enhancements

- User authentication and authorization
- Recipe rating and review system
- Advanced search and filtering
- Social features (following, sharing)
- Recipe collections and meal planning
- Integration with external nutrition APIs
- Machine learning improvements for recommendations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Recipe images from Unsplash
- Icons from Lucide React
- UI components from Shadcn/ui
- Inspiration from modern food apps and platforms

---

**Built with ❤️ for food lovers everywhere!** 🍕🍜🍰
