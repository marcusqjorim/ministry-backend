const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide event title'],
        trim: true,
        maxlength: [200, 'Title cannot be more than 200 characters']
    },
    description: {
        type: String,
        required: [true, 'Please provide event description'],
        maxlength: [5000, 'Description cannot be more than 5000 characters']
    },
    location: {
        type: String,
        required: [true, 'Please provide event location']
    },
    date: {
        type: Date,
        required: [true, 'Please provide event date']
    },
    time: {
        type: String,
        required: [true, 'Please provide event time']
    },
    endDate: {
        type: Date
    },
    category: {
        type: String,
        enum: ['worship', 'conference', 'seminar', 'workshop', 'youth', 'children', 'women', 'men', 'outreach', 'other'],
        default: 'other'
    },
    image: {
        type: String
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    registrationRequired: {
        type: Boolean,
        default: false
    },
    registrationLink: {
        type: String
    },
    contactEmail: {
        type: String
    },
    contactPhone: {
        type: String
    },
    attendees: {
        type: Number,
        default: 0
    },
    maxAttendees: {
        type: Number
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

eventSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Virtual for checking if event is upcoming
eventSchema.virtual('isUpcoming').get(function() {
    return this.date > new Date();
});

module.exports = mongoose.model('Event', eventSchema);