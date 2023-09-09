const express = require('express');


const { productController } = require('../../Controller/index.controller');


const router = express.Router();


router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.get('/filter', productController.filterProductsByColor);
router.post('/create', productController.createProduct);
router.patch('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);



module.exports = router;