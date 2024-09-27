
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { sequelize } = require('./config/database');
const authRouter = require('./routes/auth');
const taskRouter = require('./routes/tasks');

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cookieParser());
app.use(express.json()); // Parse JSON bodies
// Configure CORS
app.use(cors({
    origin: 'http://localhost:3000', // Allow frontend
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

// Sample route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use('/auth', authRouter); // Auth router - [ Sighup , Login ]
app.use('/task', taskRouter); // Task router - [ CRUD ]

sequelize.sync({ alter: true }).then(() =>
    app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))
).catch(err => console.log(err));