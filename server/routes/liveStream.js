const express = require('express');
const router = express.Router();
const {
  createLiveStream,
  getAllLiveStreams,
  deleteLiveStream,
  updateLiveStreamStatus,
} = require('../controllers/liveStreaming');

// Create a new live stream
router.post('/create', createLiveStream);

// Get all live streams
router.get('/getAll', getAllLiveStreams);

// Delete a live stream by ID
router.delete('/delete/:id', deleteLiveStream);

// Update live stream status by ID
router.put('/update/:id', updateLiveStreamStatus);

module.exports = router;
