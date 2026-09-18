const express = require('express');
const Visit = require('../models/Visit');
require('dotenv').config();

const router = express.Router();

// Get all visits
router.get('/', async (req, res) => {
    try {
        const data = await Visit.find();
        res.json(data);
    }catch(error){
        console.log(error);
    }
});

// Create visit
router.post('/add-visit', async (req, res) => {

  try {
        const newVisit = new Visit({
            date: new Date(),
            path: req.body.path,
            ip: req.headers['x-forwarded-for']?.split(',')[0].trim() || req.ip,
            userAgent: req.headers['user-agent'],
            referrer: req.headers['referer'] || req.headers['referrer'] || null,
        });
        await Visit.create(newVisit);
        res.status(201).json(newVisit);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;