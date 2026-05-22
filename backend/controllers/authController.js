const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
require('dotenv').config();

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
    }

    try {
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        const user = rows[0];

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
                expiresIn: '1h', 
            });
            res.json({
                message: 'Logado com sucesso',
                token,
                user: { 
                    id: user.id,
                    email: user.email
                }
            });
        } else {
            res.status(401).json({ message: 'Email ou senha inválidos' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Error no servidor durante o login' });
    }
};

module.exports = { login };