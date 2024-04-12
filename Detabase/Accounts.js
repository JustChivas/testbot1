const mongoose = require("mongoose");

const AccountsSchema = new mongoose.Schema({
    GuildId: String,
    type: String,
    Link: String,
    email: String,
    password: String,
    Number: String,
    Time: String,
    CVV: String,
    price: Number,
});

const MessageModel = module.exports = mongoose.model("Accounts", AccountsSchema)