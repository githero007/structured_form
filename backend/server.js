const express = require('express');
const app = express();
const router = require('./routes/route');
const connectToMongo = require('./db');
const User = require('./models/user');
const bcrypt = require('bcrypt');
const connectRedis = require('./redis');
const formHandler = require('./sockethandlers/formHandler')
const cors = require('cors');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173', // your React app origin
        methods: ['GET', 'POST'],
        credentials: true,
    }
})
app.use(cors());
app.use(express.json());
app.use('/', router);
connectToMongo();
let client;
(async () => {
    client = await connectRedis();
    if (!client) {
        console.error('Redis client not initialized');
        return;
    }

})()

app.post('/signin', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
        return res.status(400).json({ error: "All fields are required" });
    try {
        const existingUser = await User.findOne({ email });

        if (existingUser)
            return res.status(409).json({ error: "Email already registered" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword,
        });

        await user.save();
        res.status(201).json({ message: "User registered successfully", userId: user._id, username: user.name });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error" });

    }
});
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    if (!email || !password)
        return res.status(400).json({ error: "Email and password required" });

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });
        res.json({ userId: user._id, username: user.name });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error" });
    }
})
io.on('connection', (socket) => {
    formHandler(io, socket, client);
});
server.listen(3000, () => {
    console.log("server is running on port 3000")
});