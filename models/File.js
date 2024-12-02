const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
    filename: String,
    filepath: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Assuming you have a User model
});

module.exports = mongoose.model("File", fileSchema);