// JobPost.js (Model)
const mongoose = require('mongoose');

const jobPostSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  role: {type: String, required: true},
  jobLocation: {type: String, required: true},
  jobType: {type: String, required: true},
  timing: {type: String, required: true},
  salary: {type: String, required: true},
  jobDescription: {type: String, required: true},
  qualification: {type: String, required: true},
  requirements: {type: String, required: true},
  skills: {type: String, required: true},
  companyname: {type: String},
  createdAt: {type: Date, default: Date.now}
})

const JobPost = mongoose.model('JobPost', jobPostSchema);

module.exports = JobPost;
