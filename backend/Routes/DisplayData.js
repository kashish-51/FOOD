
const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');

router.post('/foodData', async (req, res) => {
    try {
        const collection = mongoose.connection.db.collection("food_items");
        const data = await collection.find({}).toArray();
        const foodCategory = mongoose.connection.db.collection("foodCategories");
        const catdata = await foodCategory.find({}).toArray();
        global.food_items = data;
        global.foodCategories = catdata;
     
        
        // Send data as a array
        res.send([ global.food_items,global.foodCategories ]);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;


