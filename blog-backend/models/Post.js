// code defining mongoose schema for nikki blog posts
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        default: [],
    }
}, {
    timestamps: true, 
    
});

module.exports = mongoose.model('Post', PostSchema);
    