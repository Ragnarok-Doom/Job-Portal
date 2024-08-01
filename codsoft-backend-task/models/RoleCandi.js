const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    contact: {type: Number, required: true},
    headline: {type: String, required: true},
    interest: {type: String, required: true},
    qualification: {type: String, required: true},
    course: {type: String, required: true},
    percentage: {type: String, required: true},
    position: {type: String, required: true},
    country: {type: String, required: true},
    state: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model("Rolecandi", userSchema)
