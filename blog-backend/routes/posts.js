const express = require('express');
const router = express.Router();
console.log('✅ posts.js router loaded');
const multer = require('multer'); // handle file uploads
const path = require('path'); // handle file paths
const Post = require('../models/Post'); // import Post model

//file storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // save files to uploads directory
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // save files with unique names
    }
});


const upload = multer({ storage });

router.get('/test', (req, res) => {
    res.send('Posts route is working!');
  });

//GET all posts
router.get('/', async (req, res) => {
    try {
        const posts =  await Post.find().sort({ createdAt: -1 }); //find posts, find newest first
        res.json(posts); //send posts to client
    } catch (error) {
        res.status(500).json({ error: 'Error fetching posts' });
    }
});

// POST a new post
router.post('/', upload.single('image'), async (req, res) => {
    const { title,  content, tags } = req.body;

    try {
        const newPost = new Post({
            title,
            content,
            tags: tags.split(',').map(tag => tag.trim()), // convert tags to array
        });

    
        const savedPost = await newPost.save(); // save post to database
        res.json(savedPost); // send saved post to client
    } catch (err) {
        res.status(500).json({ message: 'Error creating post' });
    }    
});

// GET a single post by ID
router.get('/:id', async (req, res) => {

    try {
        const post = await Post.findById(req.params.id); // find post by id
        if (!post) return res.status(404).json({ error: 'Post not found' });
        res.json(post); // send post to client
    } catch (error) {
        res.status(500).json({ error: 'Error fetching post' });
    }
});

// UPDATE a post by ID
router.put('/:id', async (req, res) => {
    const { title, content, tags } = req.body;
  
    try {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        {
          title,
          content,
          tags: tags.split(',').map(tag => tag.trim())
        },
        { new: true } // Return the updated document
      );
  
      if (!updatedPost) return res.status(404).json({ error: 'Post not found' });
      res.json(updatedPost);
    } catch (err) {
      console.error('Error updating post:', err);
      res.status(500).json({ error: 'Failed to update post' });
    }
  });

  // Upload image
  router.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    res.json({ filename: req.file.filename });
  });

  
  // DELETE a post by ID
  router.delete('/:id', async (req, res) => {
    console.log('Received DELETE request for ID:', req.params.id);
    try {
      const deleted = await Post.findByIdAndDelete(req.params.id);
      if (!deleted) return res.status(404).json({ error: 'Post not found' });
      res.json({ message: 'Post successfully deleted' });
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).json({ error: 'Could not delete post' });
    }
  });


module.exports = router; // export router