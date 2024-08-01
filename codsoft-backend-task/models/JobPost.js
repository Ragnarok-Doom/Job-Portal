// JobPost.js (Model)
const mongoose = require('mongoose');

const jobPostSchema = new mongoose.Schema({
  _id: String, // Use String type for _id
  role: String,
  jobLocation: String,
  timing: String,
  salary: String,
  jobDescription: String,
  qualification: String,
  requirements: String,
  skills: String,
  userId: String // Ensure userId is stored as well
}, { _id: false }); // Disable automatic _id creation

const JobPost = mongoose.model('JobPost', jobPostSchema);

module.exports = JobPost;
