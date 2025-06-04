const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Recipe = require('../models/Recipe');
const auth = require('../middleware/auth');

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = await User.findById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if username or email is already taken
    if (username !== user.username || email !== user.email) {
      const existingUser = await User.findOne({
        $and: [
          { _id: { $ne: req.user.userId } },
          { $or: [{ username }, { email }] }
        ]
      });

      if (existingUser) {
        return res.status(400).json({ message: 'Username or email already taken' });
      }
    }

    user.username = username || user.username;
    user.email = email || user.email;

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user's saved recipes
router.get('/saved-recipes', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate('savedRecipes');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.savedRecipes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Save/unsave recipe
router.put('/saved-recipes/:recipeId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    const recipe = await Recipe.findById(req.params.recipeId);

    if (!user || !recipe) {
      return res.status(404).json({ message: 'User or recipe not found' });
    }

    const savedIndex = user.savedRecipes.indexOf(recipe._id);
    if (savedIndex === -1) {
      user.savedRecipes.push(recipe._id);
    } else {
      user.savedRecipes.splice(savedIndex, 1);
    }

    await user.save();
    res.json(user.savedRecipes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user's created recipes
router.get('/my-recipes', auth, async (req, res) => {
  try {
    const recipes = await Recipe.find({ author: req.user.userId }).populate('author', 'username');
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router; 