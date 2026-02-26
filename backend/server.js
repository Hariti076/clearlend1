const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { initDb, dbPromise } = require('./db');
const { verifyToken, JWT_SECRET } = require('./authMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Initialize Database
initDb().then(() => {
    console.log('Database initialized successfully.');
}).catch(err => {
    console.error('Failed to initialize database:', err);
});

// --- AUTHENTICATION ROUTES ---

// POST /api/auth/register
app.post('/api/auth/register', async (req, res) => {
    const { email, password, role, name } = req.body;
    if (!email || !password || !role || !name) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const db = await dbPromise;
        const existingUser = await db.get('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser) return res.status(400).json({ error: 'Email already exists' });

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const result = await db.run(
            'INSERT INTO users (email, password_hash, role, name) VALUES (?, ?, ?, ?)',
            [email, hash, role, name]
        );

        const token = jwt.sign({ id: result.lastID, role, email }, JWT_SECRET, { expiresIn: '24h' });
        res.json({ token, user: { id: result.lastID, email, role, name } });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
});

// POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const db = await dbPromise;
        const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);

        if (!user) return res.status(400).json({ error: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id, role: user.role, email: user.email }, JWT_SECRET, { expiresIn: '24h' });
        res.json({ token, user: { id: user.id, email: user.email, role: user.role, name: user.name } });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

// --- DATA MUTATION ROUTES (Protected) ---

// POST /api/loans/apply (Borrower creates loan)
app.post('/api/loans/apply', verifyToken, async (req, res) => {
    const { amount, purpose } = req.body;
    const user = req.user;

    if (user.role !== 'borrower') return res.status(403).json({ error: 'Only borrowers can apply for loans' });

    try {
        const db = await dbPromise;
        await db.run(
            'INSERT INTO activity_pulse (type, message, time, entity) VALUES (?, ?, ?, ?)',
            ['loan_match', `₹${amount} Loan Requested`, 'Just now', purpose]
        );
        res.json({ message: 'Loan application submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to submit application' });
    }
});

// POST /api/wallet/invest (Lender adds funds)
app.post('/api/wallet/invest', verifyToken, async (req, res) => {
    const { amount } = req.body;
    const user = req.user;

    if (user.role !== 'lender') return res.status(403).json({ error: 'Only lenders can add funds' });

    try {
        const db = await dbPromise;
        await db.run(
            'INSERT INTO activity_pulse (type, message, time, entity) VALUES (?, ?, ?, ?)',
            ['new_lender', `₹${amount} Added to Escrow`, 'Just now', user.email]
        );
        res.json({ message: 'Funds transferred successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to transfer funds' });
    }
});

// --- PUBLIC GET ROUTES ---


// GET /api/stats - Global Platform Statistics
app.get('/api/stats', async (req, res) => {
    try {
        const db = await dbPromise;
        const stats = await db.get('SELECT * FROM global_stats LIMIT 1');
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch platform stats' });
    }
});

// GET /api/loans/trend - Disbursement trends
app.get('/api/loans/trend', async (req, res) => {
    try {
        const db = await dbPromise;
        const trends = await db.all('SELECT * FROM disbursement_trends ORDER BY id ASC');
        res.json(trends);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch loan trends' });
    }
});

// GET /api/loans/risk - Risk distribution
app.get('/api/loans/risk', async (req, res) => {
    try {
        const db = await dbPromise;
        const risks = await db.all('SELECT * FROM risk_distribution ORDER BY id ASC');
        res.json(risks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch risk distribution' });
    }
});

// GET /api/loans/emi - EMI trends
app.get('/api/loans/emi', async (req, res) => {
    try {
        const db = await dbPromise;
        const emi = await db.all('SELECT * FROM emi_trends ORDER BY id ASC');
        res.json(emi);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch emi trends' });
    }
});

// GET /api/users/participation - User counts ratio
app.get('/api/users/participation', async (req, res) => {
    try {
        const db = await dbPromise;
        const participation = await db.all('SELECT * FROM user_participation ORDER BY id ASC');
        res.json(participation);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user participation' });
    }
});

// GET /api/pulse - Live activity pulse
app.get('/api/pulse', async (req, res) => {
    try {
        const db = await dbPromise;
        const pulse = await db.all('SELECT * FROM activity_pulse ORDER BY id ASC LIMIT 10');
        res.json(pulse);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch pulse activity' });
    }
});

// GET /api/users/borrowers - Borrower snapshots
app.get('/api/users/borrowers', async (req, res) => {
    try {
        const db = await dbPromise;
        const borrowers = await db.all('SELECT * FROM borrower_snapshots');
        res.json(borrowers);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch borrowers' });
    }
});

// GET /api/users/lenders - Lender snapshots
app.get('/api/users/lenders', async (req, res) => {
    try {
        const db = await dbPromise;
        const lenders = await db.all('SELECT * FROM lender_snapshots');
        res.json(lenders);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch lenders' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
