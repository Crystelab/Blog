const express = require("express");
const Post = require('../models/Post');
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