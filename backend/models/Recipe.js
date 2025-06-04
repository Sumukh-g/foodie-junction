const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters long']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    minlength: [10, 'Description must be at least 10 characters long']
  },
  ingredients: [{
    type: String,
    required: [true, 'Ingredients are required'],
    trim: true
  }],
  instructions: [{
    type: String,
    required: [true, 'Instructions are required'],
    trim: true
  }],
  cookingTime: {
    type: Number,
    required: [true, 'Cooking time is required'],
    min: [1, 'Cooking time must be at least 1 minute']
  },
  difficulty: {
    type: String,
    enum: {
      values: ['Easy', 'Medium', 'Hard'],
      message: 'Difficulty must be Easy, Medium, or Hard'
    },
    required: [true, 'Difficulty is required']
  },
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required'],
    trim: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Add index for better query performance
recipeSchema.index({ title: 'text', description: 'text' });

// Add method to check if user has liked the recipe
recipeSchema.methods.isLikedBy = function(userId) {
  return this.likes.includes(userId);
};

// Add method to get like count
recipeSchema.virtual('likeCount').get(function() {
  return this.likes.length;
});

// Ensure virtuals are included when converting to JSON
recipeSchema.set('toJSON', { virtuals: true });
recipeSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Recipe', recipeSchema); 