const express = require("express");
const path = require("path");
const Visit = require('../models/Visit');

const router = express.Router();

//Block me
const BLOCKED_IPS = [
    "::1",
    "127.0.0.1",
    process.env.MY_IP
];

// Log every page visit
router.use(async (req, res, next) => {
    // Only log HTML page loads, skip assets if any pass through here
    if (req.method !== "GET") return next();
    
    const ip = req.headers["x-forwarded-for"]?.split(",")[0].trim() || req.ip;

    if (!BLOCKED_IPS.includes(ip)) {
        try {
            await Visit.create({
                date: new Date(),
                path: req.path,
                ip,
                userAgent: req.headers["user-agent"],
                referrer: req.headers["referer"] || req.headers["referrer"] || null,
            });
        } catch (error) {
            console.log(error); // Don't block the page load if logging fails
        }
    }

    next();
});

router.get("/{index}{.html}", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/index.html"));
});

router.get("/{index}{.html}", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/index.html"));
});

router.get("/posts/:slug", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/post.html"));
});

router.get("/posts{.html}", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/posts.html"));
});

router.get("/minigame{.html}", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/miniGame.html"));
});

router.all("/{*splat}", (req, res) => {
    res.status(404).sendFile(path.join(__dirname, "../../public/404.html"));
});

module.exports = router;