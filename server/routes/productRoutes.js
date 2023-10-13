const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// GET all products
router.get('/products', productController.getAllProducts);

// GET a specific product
router.post('/products/:id', productController.getProduct);

// Search a specific product by string
router.get('/products/search/:medicine', productController.searchProduct);

// CREATE a product
router.post('/products', productController.createProduct);

// // Delete a product
// router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
