const mongoose = require('mongoose');

// MongoDB Atlas URI (replace password if not using .env)
const mongoURI = process.env.MONGO_URI || "mongodb+srv://justinagmachica:Mytulipsss1217!@project-2025.6kfg9ll.mongodb.net/userDB?retryWrites=true&w=majority&appName=Project-2025";

// Connect to MongoDB
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected Successfully"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Define Login Schema
const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {               
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// Create and export the model
const collection = mongoose.model("users", LoginSchema);
module.exports = collection;
