/*require('dotenv').config({ path: '../.env' });

const Post = require('../models/Post');
const connectDB = require('../data/mongodb');

async function migrate() {
    try {
        await connectDB();
        console.log('Connected to MongoDB');
        
        const result = await Post.updateMany(
            { visible: { $exists: false } },  // only posts missing the field
            { $set: { visible: true } }
        );
        console.log(`Updated ${result.modifiedCount} posts`);
        mongoose.disconnect();
    } catch (error) {
        console.error('Migration failed:', error);
        mongoose.disconnect();
    }
}

migrate();
*/