const mongoose = require('mongoose')

const subsSchema = mongoose.Schema({
  email: String,
});

const Subscriber = mongoose.model("user-subscribers", subsSchema)

module.exports =  Subscriber