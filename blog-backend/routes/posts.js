const express = require('express');
const router = express.Router();
const multer = require('multer'); // handle file uploads
const Post = require('../models/Post'); // import Post model

//file storage configuration
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // unique filename
    }
});

const upload = multer({ storage });

//GET all posts
router.get('/', async (req, res) => {
    try {
        const posts =  await Post.find().sort({ createdAt: -1 }); //find posts, find newest first
        res.json(posts); //send posts to client
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts' });
    }
});

// POST a new post with image upload
router.post('/', upload.single('image'), async (req, res) => {
    const { title,  content, tags } = req.body;

    const newPost = new Post({
        title,
        content,
        tags: tags.split(',').map(tag => tag.trim()), // convert tags to array
        image: req.file?.filename // save image filename
    });

    try {
        await newPost.save(); // save post to database
        res.json(newPost); // send saved post to client
    } catch (err) {
        res.status(500).json({ message: 'Error creating post' });
    }    
});