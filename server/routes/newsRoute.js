// routesRoutes.js
const express = require('express');
const router = express.Router();
const {
  createNews,
  updateNewsById,
  toggleActive,
  getAllNews,
  deleteNewsById,
  getNewsById
} = require('../controllers/news');

// Create a new news article
router.post('/create', createNews);

// Update news article by ID
router.put('/update', updateNewsById);

// Toggle active status of news article
router.put('/toggleActive', toggleActive);

// Get all news articles
router.get('/all', getAllNews);

// Delete news article by ID
router.delete('/delete', deleteNewsById);

// Get news article by ID
router.get('/:newsId', getNewsById);

module.exports = router;
