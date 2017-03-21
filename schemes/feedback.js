var mongoose = require('mongoose');

var feedbackSchema = new mongoose.Schema
({
    courseId: {
      type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    title: {
      type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    rating: {
        type: Number
    },
    date: {
        type: String,
        required: true
    }
});

module.exports= mongoose.model("Feedback", feedbackSchema);