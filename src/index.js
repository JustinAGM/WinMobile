require('dotenv').config(); // Load .env variables

const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const collection = require('./config'); // Mongoose model & connection

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

// View engine
app.set('view engine', 'ejs');

// Routes
app.get("/", (req, res) => {
    res.render("login", { success: null, error: null });
});

app.get("/signup", (req, res) => {
    res.render("signup", { success: null, error: null });
});

// Register
app.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.render("signup", { error: "All fields are required.", success: null });
    }

    try {
        const existingUser = await collection.findOne({ email });
        if (existingUser) {
            return res.render("signup", { error: "User with this email already exists.", success: null });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = { name, email, password: hashedPassword };

        await collection.create(userData);
        return res.render("login", { success: "User successfully registered! Please login.", error: null });

    } catch (err) {
        console.error("Signup error:", err);
        res.render("signup", { error: "An error occurred during registration.", success: null });
    }
});

// Login
app.post("/login", async (req, res) => {
    try {
        const user = await collection.findOne({ email: req.body.email });

        if (!user) {
            return res.render("login", { error: "User does not exist.", success: null });
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);

        if (!isPasswordMatch) {
            return res.render("login", { error: "Wrong password.", success: null });
        }

        return res.redirect("/home"); // or render home page directly

    } catch (err) {
        console.error("Login error:", err);
        res.render("login", { error: "An error occurred. Please try again.", success: null });
    }
});

// Home page
app.get("/home", (req, res) => {
    res.render("home");
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
