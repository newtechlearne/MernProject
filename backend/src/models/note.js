const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
    },

    content: {
        type: String,
        required: true,
        trim: true,
    },
    owner: {
        //stores object id of one user
        //links note model to user model
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        //user is collection of users
        ref: "User",
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;