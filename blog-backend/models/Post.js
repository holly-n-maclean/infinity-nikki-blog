// code defining mongoose schema for nikki blog posts
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: String,
    content: String,
    tags: [String],
    image: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

model.exports = mongoose.model('Post', PostSchema);
    