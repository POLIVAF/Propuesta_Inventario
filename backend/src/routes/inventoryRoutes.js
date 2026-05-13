const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

// All routes here are protected by authMiddleware in app.js
router.get('/', inventoryController.getAllItems);
router.post('/', inventoryController.createItem);
router.put('/:id', inventoryController.updateItem);
router.delete('/:id', inventoryController.deleteItem);

module.exports = router;
