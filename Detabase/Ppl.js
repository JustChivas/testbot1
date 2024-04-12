const mongoose = require("mongoose");

const pplSchema = new mongoose.Schema({
    guildID: String,
    User: String,
    Coins: Number,
});

const MessageModel = module.exports = mongoose.model("ppl", pplSchema)