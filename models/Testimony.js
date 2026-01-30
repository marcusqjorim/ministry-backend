const mongoose = require('mongoose');

const testimonySchema = new mongoose.Schema({
    author: {
        name: {
            type: String,
            required: [true, 'Please provide author name'],
            trim: true
        },
        email: {
            type: String,
            required: [true, 'Please provide author email']
        },
        phone: {
            type: String
        },
        photo: {
            type: String
        }
    },
    title: {
        type: String,
        required: [true, 'Please provide a title'],
        trim: true,
        maxlength: [200, 'Title cannot be more than 200 characters']
    },
    content: {
        type: String,
        required: [true, 'Please provide testimony content'],
        maxlength: [5000, 'Content cannot be more than 5000 characters']
    },
    category: {
        type: String,
        enum: ['healing', 'provision', 'salvation', 'delivery', 'faith', 'family', 'ministry', 'other'],
        default: 'other'
    },
    isAnonymous: {
        type: Boolean,
        default: false
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

testimonySchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Testimony', testimonySchema);