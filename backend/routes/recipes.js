const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const auth = require('../middleware/auth');

// Get all recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find().populate('author', 'username');
    res.json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single recipe
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('author', 'username');
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (error) {
    console.error('Error fetching recipe:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create recipe
router.post('/', async (req, res) => {
  try {
    // If user is authenticated, set author, else null
    let author = null;
    if (req.headers.authorization) {
      try {
        const jwt = require('jsonwebtoken');
        const token = req.headers.authorization.replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        author = decoded.userId;
      } catch (e) {
        // ignore invalid token, treat as anonymous
      }
    }
    // Validate required fields
    const { title, description, ingredients, instructions, cookingTime, difficulty, imageUrl } = req.body;
    if (!title || !description || !ingredients || !instructions || !cookingTime || !difficulty || !imageUrl) {
      return res.status(400).json({ 
        message: 'Missing required fields',
        required: {
          title: !title,
          description: !description,
          ingredients: !ingredients,
          instructions: !instructions,
          cookingTime: !cookingTime,
          difficulty: !difficulty,
          imageUrl: !imageUrl
        }
      });
    }
    // Create new recipe
    const recipe = new Recipe({
      title,
      description,
      ingredients: Array.isArray(ingredients) ? ingredients : [ingredients],
      instructions: Array.isArray(instructions) ? instructions : [instructions],
      cookingTime: Number(cookingTime),
      difficulty,
      imageUrl,
      author: author // can be null
    });
    // Save recipe
    const savedRecipe = await recipe.save();
    // Populate author information
    const populatedRecipe = await Recipe.findById(savedRecipe._id).populate('author', 'username');
    res.status(201).json(populatedRecipe);
  } catch (error) {
    console.error('Error creating recipe:', error);
    res.status(500).json({ 
      message: 'Error creating recipe', 
      error: error.message,
      details: error.errors // Include validation errors if any
    });
  }
});

// Update recipe
router.put('/:id', auth, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Check if user is the author
    if (recipe.author.toString() !== req.user.userId) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('author', 'username');

    res.json(updatedRecipe);
  } catch (error) {
    console.error('Error updating recipe:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete recipe
router.delete('/:id', auth, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Check if user is the author
    if (recipe.author.toString() !== req.user.userId) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ message: 'Recipe removed' });
  } catch (error) {
    console.error('Error deleting recipe:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Like/Unlike recipe
router.put('/:id/like', auth, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    const likeIndex = recipe.likes.indexOf(req.user.userId);
    if (likeIndex === -1) {
      recipe.likes.push(req.user.userId);
    } else {
      recipe.likes.splice(likeIndex, 1);
    }

    await recipe.save();
    res.json(recipe);
  } catch (error) {
    console.error('Error liking/unliking recipe:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router; 