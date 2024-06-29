// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const {
  
    createSubCategory,
    getAllSubCategories,
    getSubCategoriesByCategory
} = require('../controllers/category');





// Subcategories routes
router.post('/create', createSubCategory); // Create a new subcategory
router.get('/all', getAllSubCategories); // Get all subcategories
router.get('/:categoryId', getSubCategoriesByCategory); // Get subcategories by category ID

module.exports = router;
