const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const postRoutes = require('./routes/posts');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api/posts', postRoutes);

mongoose.connect('mongodb:localhost:27017/blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
    app.listen(5000, () => {
        console.log('Server is running on port 5000');
      });
}).catch(err => console.error('MongoDB connection error:', err));