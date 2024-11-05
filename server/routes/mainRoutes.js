const express = require("express");
const path = require("path");

const router = express.Router();

router.get("^/$|/index(.html)?", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/index.html"));
});

router.get("/posts/:slug", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/post.html"));
});

router.get("/posts(.html)?", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/posts.html"));
});

router.get("/minigame(.html)?", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/miniGame.html"));
});

router.all('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, "../../public/404.html"));
});

module.exports = router;
