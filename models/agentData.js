const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const Agent = new Schema({
});

Agent.plugin(passportLocalMongoose);

module.exports = mongoose.model('agent',Agent);