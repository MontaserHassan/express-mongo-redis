const express = require('express');
require('dotenv').config();
require('./Utils/refreshProductsCached.util');

const { connectDB } = require('./Config/database.config');
const router = require('./Routes/index.routes');


const app = express();

app.use(express.json());

app.use(router);


connectDB(app);