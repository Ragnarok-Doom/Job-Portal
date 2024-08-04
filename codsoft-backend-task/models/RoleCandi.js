const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    photo: { type: String, default: '' },
    firstName: {type: String},
    lastName: {type: String},
    email: {type: String},
    contact: {type: Number},
    headline: {type: String},
    description: { type: String, default: '' },
    skills: { type: String, default: '' },
    interest: {type: String},
    qualification: {type: String},
    course: {type: String},
    percentage: {type: String},
    position: {type: String},
    city: { type: String, default: '' },
    state: {type: String},
    country: {type: String},
    college: {type: String},
    createdAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model("Rolecandi", userSchema)
