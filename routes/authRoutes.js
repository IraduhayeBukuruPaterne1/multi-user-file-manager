const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/user');

// User Registration Route
router.post("/register", async(req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully!" });
    } catch (err) {
        console.error("Error during user registration:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});


// User Login Route
router.post("/login", async(req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, "secret", { expiresIn: "1h" });
        res.status(200).json({ message: "Logged in successfully", token });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
});