const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../models/Users');
const { Op } = require('sequelize');
require('dotenv').config();

const router = express.Router();

// Register User
router.post('/register', async (req, res) => {
    const { userName, email, password } = req.body;

    try {

        const isExistUser = await Users.findOne({
            attributes: ['id'],
            where: {
                [Op.or]: [{ email }, { userName }]
            },
            raw: true
        });

        if (isExistUser) return res.send({ error: 'Email or user name already exists.' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await Users.create({ userName, email, password: hashedPassword });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        delete user.dataValues.password;
        user.dataValues.token = token;

        res.status(201).send({ message: 'User registered successfully', user });
    } catch (error) {
        res.send({ error: 'Failed to register user' });
    }
});

// Login User
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Users.findOne({ where: { email } });
        if (!user) return res.send({ error: 'User not found' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.send({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).send({ token, userId: user.id });
    } catch (error) {
        res.send({ error: 'Login failed' });
    }
});

module.exports = router;
