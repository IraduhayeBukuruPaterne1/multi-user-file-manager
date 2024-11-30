const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    filepath: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    language: { type: String, default: "en" },
}, { timestamps: true });

const File = mongoose.model("File", fileSchema);

module.exports = File;