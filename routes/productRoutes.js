const express = require('express');
const router = express.Router();

// Product routes
router.get('/', (req, res) => {
    res.send('List of products');
});

router.post('/', (req, res) => {
    res.send('Add a new product');
});

router.get('/:id', (req, res) => {
    res.send(`Get product with ID: ${req.params.id}`);
});

module.exports = router;
