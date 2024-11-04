const express = require("express");
const path = require("path");
const fs = require("fs");
const { marked } = require("marked");

const router = express.Router();

// Route for the home page (index.html)
router.get("^/$|/index(.html)?", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/index.html"));
});

router.get("/posts(.html)?", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/posts.html"));
});

router.get("/posts/:slug", (req, res) => {
    const slug = req.params.slug;
    const postFilePath = path.join(__dirname, "../../server/data/posts.json");

    fs.readFile(postFilePath, "utf8", (err, data) => {
        if (err) {
            return res.status(500).send("Error reading posts data.");
        }

        const posts = JSON.parse(data);
        const post = posts.find(p => p.slug === slug);

        if (post) {
            const contentHtml = marked(post.content);

            res.send(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link rel="icon" type="image/svg+xml" href="/assets/favicon.ico" />
                    <title>${post.title}</title>
                    <link rel="stylesheet" href="/css/styles.css">
                </head>
                <body>
                    <header>
                        <h1>Crystel Abou-Nahed</h1>
                        <h2>Software Engineering Student</h2>
                    </header>
                    <nav>
                        <a href="/" class="nav-link">Home</a>
                        <a href="/posts" class="nav-link">Posts</a>
                        <a href="/minigame" class="nav-link">Mini Game</a>
                        <a href="https://github.com/Crystelab" class="nav-link">GitHub</a>
                        <a href="https://www.linkedin.com/in/crystel-abou-nahed-7216272ab/" class="nav-link">LinkedIn</a>
                    </nav>
                    <main>
                        <h1>${post.title}</h1>
                        <p><em>${post.date}</em></p>
                        <p>${contentHtml}</p>
                    </main>
                    <script src="/js/top.js"></script>
                </body>
                </html>
            `);
        } else {
            res.status(404).sendFile(path.join(__dirname, "../../public/404.html"));
        }
    });
});

router.get("/api/posts", (req, res) => {
    const postFilePath = path.join(__dirname, "../data/posts.json");

    fs.readFile(postFilePath, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error reading posts data." });
        }

        const posts = JSON.parse(data);
        res.json(posts);
    });
});


router.get("/minigame(.html)?", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/minigame.html"));
});

router.all('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, "../../public/404.html"));
});

module.exports = router;
