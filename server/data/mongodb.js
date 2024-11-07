require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = async () => {
  try {
      mongoose.set('strictQuery', false);
      const conn = await mongoose.connect(process.env.MONGODB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
      });
      console.log(`Database Connected: ${conn.connection.host}`);
  } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1);
  }
}
module.exports = connectDB;