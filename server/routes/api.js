const express = require("express");
const path = require("path");
const fs = require("fs");

const router = express.Router();

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

module.exports = router;
