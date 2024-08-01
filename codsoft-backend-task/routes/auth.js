const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Rolejob = require("../models/RoleJob");
const Rolecandi = require("../models/RoleCandi");
const postmark = require("postmark");
const JobPost = require("../models/JobPost")

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

        // Send welcome email
        client.sendEmail({
            From: "2021001392.semcom@cvmu.edu.in",
            To: email,
            Subject: "Welcome to Our Application",
            TextBody: `Hello ${name},\n\nThank you for registering at our application.\n\nBest regards,\nTeam`
        }).then(response => {
            console.log('Email sent:', response);
        }).catch(error => {
            console.error('Error sending email:', error);
        });

        res.status(201).json({ userId: newUser._id });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
        console.error(error);
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
        console.log(error);
    }
})

// Role Job Form
router.post("/rolejob", async (req, res) => {
    const { userId, firstName, lastName, companyEmail, companyContact, companyName, companyRole, companyAddress, country, state } = req.body;

    // Check if userId is provided
    if (!userId) {
        return res.status(400).json({ error: 'userId is required' });
    }

    const newUser = new Rolejob({
        userId,  // Add userId to the document
        firstName,
        lastName,
        companyEmail,
        companyContact,
        companyName,
        companyRole,
        companyAddress,
        country,
        state,
    });

    try {
        await newUser.save();
        res.status(201).json({
            userId: newUser._id,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while saving the role job' });
    }
});

// Candidate Form
router.post("/rolecandi", async (req, res) => {
    const { firstName, lastName, email, contact, headline, interest, qualification, course, percentage, position, country, state } = req.body
    const newUser = new Rolecandi({
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
        res.status(201).json({
            userId: newUser._id
        })
    } catch (error) {
        console.log(error);
    }
})


// Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const [user, roleJob, roleCandi] = await Promise.all([
            User.findOne({ email }),
            Rolejob.findOne({ companyEmail }),
            Rolecandi.findOne({ email })
        ]);

        if (!user && !roleJob && !roleCandi) {
            return res.status(401).json({ field: 'email', message: 'Email not found' });
        }

        let userType = null;

        if (roleJob) {
            userType = 'RoleJob';
        } 
        if (roleCandi) {
            userType = 'RoleCandi';
        } 
        if (user && !roleJob && !roleCandi) {
            userType = 'User';
        }

        // Fetch the user details from User collection to compare password
        const userDetails = user || await User.findOne({ email });

        if (!userDetails || userDetails.password !== password) {
            return res.status(401).json({ field: 'password', message: 'Incorrect password' });
        }

        res.status(200).json({ message: 'Login successful', userType });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
        console.error(error);
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
        console.log(error);
    }
})

// Add this route in auth.js
router.get("/rolejob/:id", async (req, res) => {
    try {
        const user = await Rolejob.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Update Rolejob by ID
router.put("/updaterolejob/:id", async (req, res) => {
    const { firstName, lastName, companyFounder, companyCEO, companyEmail, companyContact, companyName, companyRole, companyAddress, country, state, city, companyStartedYear, companyDescription, createdAt } = req.body;

    try {
        const updatedUser = await Rolejob.findByIdAndUpdate(
            req.params.id,
            {
                firstName,
                lastName,
                companyEmail,
                companyContact,
                companyName,
                companyRole,
                companyAddress,
                country,
                state,
                companyFounder,
                companyCEO,
                city,
                companyStartedYear,
                companyDescription,
            },
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(updatedUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.post('/jobpost', async (req, res) => {
    const { role, jobLocation, timing, salary, jobDescription, qualification, requirements, skills, userId } = req.body;
  
    try {
      const newJobPost = new JobPost({
        _id: userId, // Use userId from the request as _id
        role,
        jobLocation,
        timing,
        salary,
        jobDescription,
        qualification,
        requirements,
        skills,
        userId
      });
  
      await newJobPost.save();
      res.status(201).json(newJobPost);
    } catch (error) {
      console.error(error);
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
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});


module.exports = router
