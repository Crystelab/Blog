require('dotenv').config();
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');

const jwtSecret = process.env.JWT_SECRET;
const userSecret = process.env.USER_NAME;

// Check Login
const authMiddleware = (req, res, next ) => {
    const token = req.cookies.token;
  
    if(!token) {
      return res.status(401).json( { message: 'Unauthorized'} );
    }
  
    try {
      const decoded = jwt.verify(token, jwtSecret);
      req.userId = decoded.userId;
      next();
    } catch(error) {
      res.status(401).json( { message: 'Unauthorized'} );
    }
  }

router.get("^/$|/index(.html)?", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/admin/index.html"));
});

router.get("/dashboard(.html)?", authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/admin/dashboard.html"));
});
router.get('/add-post', authMiddleware, async (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/admin/add-post.html"));
});
router.get("/edit-post/:slug", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/admin/edit-post.html"));
});

// Login
router.post('/connect', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (username !== userSecret) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
      return res.status(401).json( { message: 'Invalid credentials' } );
    }

    const token = jwt.sign({ userId: user._id}, jwtSecret );
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/admin/dashboard');
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Register user
/*router.post('/register', async (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
  
    try {
      // Check if the username already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(409).json({ message: 'Username already in use' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create the new user
      await User.create({ username, password: hashedPassword });
  
      res.status(201).json({ message: 'User created successfully' });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });*/

  //Create post
  router.post('/add-post', authMiddleware, async (req, res) => {
    try {
      try {
        const newPost = new Post({
          slug: req.body.slug,
          title: req.body.title,
          description: req.body.description,
          tags: req.body.tags,
          content: req.body.content,
          date: Date.now()
        });
  
        await Post.create(newPost);
        res.redirect('/admin/dashboard');
      } catch (error) {
        console.log(error);
      }
  
    } catch (error) {
      console.log(error);
    }
  });

  //Edit post
  router.put('/edit-post/:slug', authMiddleware, async (req, res) => {
    try {
        const tagsArray = req.body.tags.split(',').map(tag => tag.trim());

        await Post.findOneAndUpdate({ slug: req.params.slug }, {
            slug: req.body.slug,
            title: req.body.title,
            description: req.body.description,
            tags: tagsArray,
            content: req.body.content,
            updatedAt: Date.now()
        });

        res.redirect(`/admin/dashboard`);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//Delete post
router.delete('/delete-post/:slug', authMiddleware, async (req, res) => {
  try {
      await Post.deleteOne({ slug: req.params.slug });
      res.redirect('/admin/dashboard');
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

//Logout
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
});

module.exports = router;