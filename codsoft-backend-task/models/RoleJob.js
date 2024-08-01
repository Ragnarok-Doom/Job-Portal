const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    companyLogo: {type: String, default: ''},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    companyName: {type: String, required: true},
    companyDescription: {type: String, default: ''},
    companyRole: {type: String, required: true},
    companyFounder: {type: String, default: ''},
    companyCEO: {type: String, default: ''},
    companyEmail: {type: String, required: true, default: ''},
    companyContact: {type: Number, required: true, default: ''},
    companyAddress: {type: String, required: true, default: ''},
    city: {type: String, default: ''},
    country: {type: String, required: true},
    state: {type: String, required: true},
    companyStartedYear: {type: String, default: ''},
    createdAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model("Rolejob", userSchema)
