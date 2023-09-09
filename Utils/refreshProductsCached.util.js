const { redisClient } = require("../Config/redis.config");
const { Product } = require("../Model/product.model");


const refreshCacheForKey = async (key, fetchFromDatabase) => {
    try {
        const newData = await fetchFromDatabase();
        await redisClient.set(key, JSON.stringify(newData));
        return newData;
    } catch (error) {
        console.error(`Error refreshing cache for key ${key}:`, error);
    }
};


const fetchProductsFromDatabase = async () => {
    const products = await Product.find();
    return products || [];
};


const refreshProductsCache = () => {
    refreshCacheForKey('products', fetchProductsFromDatabase)
        .then((data) => {
            // console.log("data: ", data);
            console.log("New Data");
        })
        .catch((error) => {
            console.error("Error: ", error);
        });
};


const refreshInterval = 30 * 60 * 1000;

setInterval(refreshProductsCache, refreshInterval); // each 30 minutes 

refreshProductsCache(); // initial