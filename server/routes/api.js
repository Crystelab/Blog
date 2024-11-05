const express = require("express");
const path = require("path");
const fs = require("fs");
//const Post = require('../models/Post');

const router = express.Router();


//See list of posts
router.get("/posts", (req, res) => {
    const postFilePath = path.join(__dirname, "../data/posts.json");

    fs.readFile(postFilePath, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error reading posts data." });
        }

        const posts = JSON.parse(data);
        res.json(posts);
    });
});


//insert data in db
/*function insertPostData () {
       Post.insertMany([
         {
           title: "Building APIs with Node.js",
           body: "Learn how to use Node.js to build RESTful APIs using frameworks like Express.js"
         },
         
       ])
     }
    
 insertPostData(); 
*/
module.exports = router;
