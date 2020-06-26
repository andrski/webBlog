'use strict'
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    titleText: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    published: {
        type: Date,
    },
});

let Post = mongoose.model('Post', postSchema);

module.exports = Post;