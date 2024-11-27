const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello, File Manager!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.post('/register', (req, res) => {
    // Simulate user registration
    res.send('User registered!');
});

app.post('/login', (req, res) => {
    // Simulate user login
    res.send('User logged in!');
});