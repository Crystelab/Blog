const express = require("express");
const Post = require('../models/Post');
const Picture = require('../models/Picture');
const { marked } = require("marked");

const router = express.Router();

//Get all posts
router.get('/posts', async (req, res) => {
    try {
        const data = await Post.find();
        res.json(data);
    }catch(error){
        console.log(error);
    }
});

//Get a single post by slug
router.get("/posts/:slug", async (req, res) => {
    try {
        const post = await Post.findOne({ slug: req.params.slug });
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.json(post);
    } catch (error) {
        console.error("Error fetching post:", error);
        res.status(500).json({ error: "Error fetching post data" });
    }
});

// convert Markdown to HTML
router.post("/marked", (req, res) => {
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ error: "Content is required" });
    }

    try {
        const htmlContent = marked(content);
        res.json({ html: htmlContent });
    } catch (error) {
        console.error("Error converting Markdown:", error);
        res.status(500).json({ error: "Error converting Markdown" });
    }
});

// Previous and next post
router.get('/posts/:slug/adjacent', async (req, res) => {
    const { slug } = req.params;
    
    try {
        const currentPost = await Post.findOne({ slug });
        if (!currentPost) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Fetch the previous post
        const previousPost = await Post.findOne({ date: { $lt: currentPost.date } })
            .sort({ date: -1 })
            .exec();

        // Fetch the next post
        const nextPost = await Post.findOne({ date: { $gt: currentPost.date } })
            .sort({ date: 1 })
            .exec();

        res.json({ previous: previousPost, next: nextPost });
    } catch (error) {
        console.error('Error fetching adjacent posts:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

//Link to image
router.get('/pictures/:slug/image', async (req, res) => {
  try {
    const picture = await Picture.findOne({ slug: req.params.slug });
    
    if (!picture) {
      return res.status(404).send('Image not found');
    }
    
    res.contentType(picture.image.contentType);
    res.send(picture.image.data);
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;


//insert data in db
/*function insertPostData () {
       Post.insertMany([
          {
              "slug": "hello-world",
              "date": "2024-09-02T00:00:00Z",
              "title": "Hello, World!",
              "description": "First blog post.",
              "tags": ["meta"],
              "content": "It's a tradition in programming to start with 'Hello, World!' So welcome to my personal space on the internet. Here I will document my experiences, challenges, and probably other unrelated stuff."
            }
       ])
     }
    
 insertPostData(); 
*/