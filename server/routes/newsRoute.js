// routesRoutes.js
const express = require('express');
const router = express.Router();
const {
  createNews,
  updateNewsById,
  toggleActive,
  getAllNews,
  deleteNewsById,
  getNewsById,
  getAllNotifications
} = require('../controllers/news');

router.post('/create', createNews);

router.put('/update', updateNewsById);

router.put('/toggleActive', toggleActive);

router.get('/all', getAllNews);

router.delete('/delete', deleteNewsById);

router.get('/:newsId', getNewsById);



router.get('/notifications', getAllNotifications);


module.exports = router;
