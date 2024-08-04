const express = require("express");
const router = express.Router();
const User = require("../models/User");
const postmark = require("postmark");
const JobPost = require("../models/JobPost");
const RoleJob = require("../models/RoleJob");
const RoleCandi = require("../models/RoleCandi");
const multer = require('multer')
const path = require('path');
const fs = require('fs')

// Configure multer storage for Candi
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${Date.now()}${ext}`);
    }
});

// Configure multer storage for hire
// const storagee = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploadshire/');
//     },
//     filename: (req, file, cb) => {
//         const ext = path.extname(file.originalname);
//         cb(null, `${Date.now()}${ext}`);
//     }
// });

const upload = multer({ storage: storage }); //for candi

const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);

// Register
router.post("/register", async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({
            name,
            email,
            password,
            confirmPassword,
        });
        await newUser.save();
        res.status(201).json({ userId: newUser._id });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
        // console.error(error);
    }
});

// Check Email
router.post("/check", async(req, res) => {
    const { email } = req.body
    try {
        const user = await User.findOne({ email })
        if(user){
            return res.status(200).json({ exists: true });
        }
        return res.status(200).json({ exists: false });
    } catch (error) {
        // console.log(error);
    }
})

// Role Hire Form
router.post("/rolehire", async (req, res) => {
    const { firstName, lastName, companyEmail, companyContact, companyName, companyRole, companyAddress, country, state, _id } = req.body;

    const newUser = new RoleJob({
        _id,
        firstName,
        lastName,
        companyEmail,
        companyContact,
        companyName,
        companyRole,
        companyAddress,
        country,
        state
    });

    try {
        await newUser.save();
        res.status(201).json({ message: 'Successfull' });
    } catch (error) {
        // console.log(error);
        res.status(500).json({ error: 'An error occurred while saving the role job' });
    }
});

// Candidate Form
router.post("/rolecandi", async (req, res) => {
    const { firstName, lastName, email, contact, headline, interest, qualification, course, percentage, position, country, state, _id } = req.body
    const newUser = new RoleCandi({
        _id,
        firstName,
        lastName,
        email,
        contact,
        headline,
        interest,
        qualification,
        course,
        percentage,
        position,
        country,
        state,
    })
    try {
        await newUser.save()
        res.status(201).json({ userId: newUser._id, message: 'Successfull' })
    } catch (error) {
        // console.log(error);
        res.status(500).json({ error: 'An error occurred while saving the role job' });
    }
})


// Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // First, find the user in the User collection
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ field: 'email', message: 'Email not found' });
        }

        // Validate the password
        if (user.password !== password) {
            return res.status(401).json({ field: 'password', message: 'Incorrect password' });
        }

        // Check if the user ID is in RoleJob or RoleCandi collections
        const roleJob = await RoleJob.findOne({ _id: user._id });
        const roleCandi = await RoleCandi.findOne({ _id: user._id });

        let userType = 'User'; // Default userType if not found in RoleJob or RoleCandi

        if (roleJob) {
            userType = 'RoleHire';
        } else if (roleCandi) {
            userType = 'RoleCandi';
        }

        res.status(200).json({ message: 'Login successful', userType, userId: user._id });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
        // console.error(error);
    }
});

// Forgot Password
router.post("/forgot", async (req, res) => {
    const { email } = req.body

    try {
        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({field: 'email', message: 'Email not found'})
        }
        res.status(200).json({ message: 'Email Correct' , user})
    } catch (error) {
        res.status(500).json({message: 'Server error'})
        // console.log(error);
    }
})

// Add this route in auth.js
router.get("/rolehire/:id", async (req, res) => {
    try {
        const user = await RoleJob.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        // console.log(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Add this route in auth.js
router.get("/rolecandifetchform/:id", async (req, res) => {
    try {
        const user = await RoleCandi.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        // console.log(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Add this route in auth.js
router.get("/rolecandi/:id", async (req, res) => {
    try {
        const user = await RoleCandi.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        // console.log(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Update RoleJob by ID
router.post("/updaterolehire/:id", upload.single('companyLogo'), async (req, res) => {
    try {
        const { 
            firstName, lastName, companyFounder, companyCEO, 
            companyEmail, companyContact, companyName, companyRole, 
            companyAddress, country, state, city, 
            companyStartedYear, companyDescription 
        } = req.body;
        
        const photo = req.file ? `uploads/${req.file.filename}` : null;

        const existingCandidate = await RoleJob.findById(req.params.id);

        if (!existingCandidate) {
            return res.status(404).json({ message: "RoleJob not found" });
        }

        if (photo) {
            // Remove the old image if a new one is uploaded
            if (existingCandidate.photo) {
                fs.unlink(path.resolve(__dirname, '..', existingCandidate.photo), (err) => {
                    if (err) {
                        console.error("Error deleting old image:", err);
                    }
                });
            }
        }

        const updatedUser = {
            firstName,
            lastName,
            companyFounder,
            companyCEO,
            companyEmail,
            companyContact,
            companyName,
            companyRole,
            companyAddress,
            country,
            state,
            city,
            companyStartedYear,
            companyDescription
        };

        // Only update the photo if a new one is provided
        if (photo) {
            updatedUser.companyLogo = photo;
        }

        const updatedHire = await RoleJob.findByIdAndUpdate(
            req.params.id,
            updatedUser,
            { new: true }
        );

        if (!updatedHire) {
            return res.status(404).json({ message: "RoleJob not found" });
        }

        res.json(updatedHire);
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: "Server error" });
    }
});

// POST route to create or update candidate profile
router.post('/updaterolecandi/:id', upload.single('photo'), async (req, res) => {
    try {
        const { firstName, lastName, email, contact, city, state, country, headline, description, skills, qualification, percentage, position, course, college, interest } = req.body;
        const photo = req.file ? `uploads/${req.file.filename}` : null;

        const existingCandidate = await RoleCandi.findById(req.params.id);

        if (!existingCandidate) {
            return res.status(404).json({ message: "User not found" });
        }

        if (photo) {
            // Remove the old image if a new one is uploaded
            if (existingCandidate.photo) {
                fs.unlink(path.resolve(__dirname, '..', existingCandidate.photo), (err) => {
                    if (err) {
                        console.error("Error deleting old image:", err);
                    }
                });
            }
        }

        const updatedData = {
            firstName,
            lastName,
            email,
            contact,
            city,
            state,
            country,
            headline,
            description,
            skills,
            qualification,
            percentage,
            position,
            course,
            college,
            interest
        };

        // Only update the photo if a new one is provided
        if (photo) {
            updatedData.photo = photo;
        }

        const updatedCandidate = await RoleCandi.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true }
        );

        if (!updatedCandidate) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(updatedCandidate);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Find candi image
router.get('/findcandiphoto/:id', async (req, res) => {
    try {
        const user = await RoleCandi.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user); // Make sure the user object includes the profile image URL
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/jobpost', async (req, res) => {
    const { role, jobLocation, timing, salary, jobType, jobDescription, qualification, requirements, skills, _id, companyname } = req.body;
  
    try {
      const newJobPost = new JobPost({
        userId: _id,
        role,
        jobLocation,
        timing,
        jobType,
        salary,
        jobDescription,
        qualification,
        requirements,
        skills,
        companyname
      });
  
      await newJobPost.save();
      res.status(201).json({ message: "Successfull" });
    } catch (error) {
    //   console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
});

// Route to get user details by ID
router.get('/user/:userId', async (req, res) => {
    try {
        const user = await RoleJob.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        // console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

  // New route to fetch jobs by userId
router.get('/jobposts/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const jobPosts = await JobPost.find({ userId });
        res.status(200).json(jobPosts);
    } catch (error) {
        // console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// DELETE /api/auth/jobposts/:id
router.delete('/jobposts/:id', async (req, res) => {
    try {
        const jobId = req.params.id;
        
        // Find and delete the job post
        const result = await JobPost.findByIdAndDelete(jobId);
        
        if (!result) {
            return res.status(404).json({ message: 'Job post not found' });
        }
        
        res.status(200).json({ message: 'Job post deleted successfully' });
    } catch (error) {
        // console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete User
router.delete('/deleteuser/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        
        // Delete user from User collection
        await User.findByIdAndDelete(userId);
        
        // Remove user from Job collection
        await JobPost.deleteMany({ userId });
    
        // Remove user from Hire collection
        await RoleJob.findByIdAndDelete(userId);

        // Remove user from Hire collection
        await RoleCandi.findByIdAndDelete(userId);

        res.status(200).json({ message: 'User and related records deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error });
    }
});

// Route to get all job posts
router.get('/fetchalljobposts', async (req, res) => {
    try {
        // Fetch all job posts from the JobPost collection
        const jobPosts = await JobPost.find({});
        
        // Send the job posts as a JSON response
        res.status(200).json(jobPosts);
    } catch (error) {
        console.error('Error fetching job posts:', error);
        res.status(500).json({ message: 'An error occurred while fetching job posts', error });
    }
});

// Route for fetching role type
router.get('/roles/:id', async (req, res) => {
    try {

        const userId = req.params.id
        if (!userId) {
            return res.status(401).json({ message: 'Id not found' });
        }

        const roleJob = await RoleJob.findOne({ _id: userId });
        const roleCandi = await RoleCandi.findOne({ _id: userId });
        let userType = '';

        if (roleJob) {
            userType = 'RoleJob';
        } else if (roleCandi) {
            userType = 'RoleCandi';
        }

        res.status(200).json({ message: 'Login successful', userType, userId });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
})

// Route for updating password
router.post('/updatepassword/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const { password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        user.password = password;
        user.confirmPassword = confirmPassword;
        const updatedUser = await user.save();

        if (updatedUser) {
            return res.status(200).json({ message: 'Password updated successfully' });
        } else {
            return res.status(400).json({ message: 'Failed to update password' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});

// Route for get company image for candi dashboard
router.get('/getcompimg/:id', async (req, res) => {
    try {
        const user = await RoleJob.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
})

// Fetch job details by ID
router.get('/fetchjobpost/:id', async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await JobPost.findById(jobId);

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.json(job);
    } catch (error) {
        console.error('Error fetching job details:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router
