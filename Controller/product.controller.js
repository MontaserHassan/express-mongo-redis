const { Product } = require("../Model/product.model");
const { redisClient } = require('../Config/redis.config');


// --------------------------- create product ---------------------------


const createProduct = async (req, res) => {
    try {
        const existingName = await Product.findOne({ name: req.body.name });
        if (existingName) return res.status(400).send({ message: 'Product name already exists' });
        const newProduct = new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock,
            color: req.body.color
        });
        const savedProduct = await newProduct.save();
        return res.status(201).send({ message: 'Product created successfully', product: savedProduct });
    } catch (error) {
        console.error('Error creating product:', error);
        return res.status(500).send({ message: 'Internal Server Error' });
    };
};


// --------------------------- get all products ---------------------------


const getProducts = async (req, res) => {
    try {
        const cachedProducts = await redisClient.get('products');
        if (cachedProducts) return res.status(200).send({ message: "Fetching all products from Redis cache", products: JSON.parse(cachedProducts) });
        const products = await Product.find();
        if (!products || products.length === 0) return res.status(404).send({ message: 'No products found' });
        return res.status(200).send({ message: "These are all products", products: products });
    } catch (error) {
        return res.status(500).send({ message: 'Internal Server Error', error });
    };
};


// --------------------------- get product by id ---------------------------


const getProductById = async (req, res) => {
    try {
        const cachedProducts = await redisClient.get('products');
        if (cachedProducts) {
            const products = JSON.parse(cachedProducts);
            const product = products.find((product) => product._id === req.params.id);
            if (product.stock <= 0) return res.status(200).send({ cache: "Fetching product from Redis", message: "This product doesn't exist now, check it soon", product: product });
            if (product) return res.status(200).send({ cache: "Fetching product from Redis", message: "You can buy this product now, try it", product: product });
        };
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).send({ message: 'Product not found' });
        if (product.stock <= 0) return res.status(200).send({ cache: "Fetching product from database", message: "This product doesn't exist now, check it soon", product: product });
        return res.status(200).send({ cache: "Fetching product from database", message: "You can buy this product now, try it", product: product });
    } catch (error) {
        return res.status(500).send({ message: 'Internal Server Error', error: error.message });
    };
};


// --------------------------- update product by id ---------------------------


const updateProduct = async (req, res) => {
    try {
        const checkExistingProduct = await Product.findById(req.params.id);
        if (!checkExistingProduct) return res.status(404).send({ message: 'Product not found' });
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).send({ message: 'Product updated successfully', product: product });
    } catch (error) {
        return res.status(500).send({ message: 'Internal Server Error', error });
    };
};


// --------------------------- delete product by id ---------------------------


const deleteProduct = async (req, res) => {
    try {
        const checkExistingProduct = await Product.findById(req.params.id);
        if (!checkExistingProduct) return res.status(404).send({ message: 'Product not found' });
        const product = await Product.findByIdAndDelete(req.params.id);
        return res.status(200).send({ message: 'Product deleted successfully', productDeleted: product.name });
    } catch (error) {
        return res.status(500).send({ message: 'Internal Server Error', error });
    };
};


// --------------------------- filter product by color ---------------------------


const filterProductsByColor = async (req, res) => {
    try {
        const products = await Product.find({ color: req.query.color });
        if (!products) return res.status(404).send({ message: 'No products have this color' });
        return res.status(200).send({ message: `These are products that color is ${req.query.color}`, products: products });
    } catch (error) {
        return res.status(500).send({ message: 'Internal Server Error', error });
    }
};



module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    filterProductsByColor,
};