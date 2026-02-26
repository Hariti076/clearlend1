const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'clearlend-super-secret-key-development';

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) return res.status(403).json({ error: 'A token is required for authentication' });

    try {
        const bearer = token.split(' ')[1]; // Format: Bearer <token>
        const decoded = jwt.verify(bearer, JWT_SECRET);
        req.user = decoded;
    } catch (err) {
        return res.status(401).json({ error: 'Invalid Token' });
    }
    return next();
};

module.exports = { verifyToken, JWT_SECRET };
