const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    companyLogo: {type: String, default: ''},
    firstName: {type: String},
    lastName: {type: String},
    companyName: {type: String},
    companyDescription: {type: String, default: ''},
    companyRole: {type: String},
    companyFounder: {type: String, default: ''},
    companyCEO: {type: String, default: ''},
    companyEmail: {type: String, default: ''},
    companyContact: {type: Number, default: ''},
    companyAddress: {type: String, default: ''},
    city: {type: String, default: ''},
    country: {type: String},
    state: {type: String},
    companyStartedYear: {type: String, default: ''},
    createdAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model("Rolejob", userSchema)
