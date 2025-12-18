const express = require('express');
const router = express.Router();

// Health check endpoint to verify server status
router.get('/health', (req, res) => {
  res.json({ status: "ok" });
});

module.exports = router;