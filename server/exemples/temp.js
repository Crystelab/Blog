require('dotenv').config();
const mongoose = require('mongoose'); // Add this line
const Post = require('../models/Post');
const connectDB = require('../data/mongodb');

async function updateAllPosts() {
    try {
        await connectDB();
        console.log('Connected to MongoDB');
        
        // Update all posts that don't have visible field set
        const result = await Post.updateMany(
            { visible: { $exists: false } },
            { $set: { visible: true } }
        );
        
        console.log(`Updated ${result.modifiedCount} posts`); // Fixed: added parentheses
        
        await mongoose.connection.close();
        console.log('Done!');
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

updateAllPosts();