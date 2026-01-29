/*require('dotenv').config();

const fs = require('fs');
const Picture = require('../models/Picture');
const connectDB = require('../data/mongodb');

async function insertPictureData() {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    // Check if picture already exists
    const existing = await Picture.findOne({ slug: "hello-world-image" });
    if (existing) {
      console.log('Picture already exists, deleting it first...');
      await Picture.deleteOne({ slug: "hello-world-image" });
    }

    // Read image file
    const imageData = fs.readFileSync('./hello.jpg');

    const newPicture = await Picture.create({
      slug: "hello-world-image",
      title: "Hello, World!",
      description: "First image.",
      image: {
        data: imageData,
        contentType: 'image/jpeg'
      }
    });

    console.log('Picture inserted successfully!');
    console.log('Inserted ID:', newPicture._id);

    // Verify it was saved
    const verify = await Picture.findOne({ slug: "hello-world-image" });
    console.log('Verification - Found in DB:', verify ? 'YES' : 'NO');
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

insertPostData();
*/