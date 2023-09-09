const express = require('express');

const productRoutes = require('./product/productIndex.routes');


const router = express.Router();


router.use('/product', productRoutes);



module.exports = router;