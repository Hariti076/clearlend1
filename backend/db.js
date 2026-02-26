const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const path = require('path');

const dbPromise = open({
  filename: path.join(__dirname, 'clearlend.db'),
  driver: sqlite3.Database
});

const initDb = async () => {
  const db = await dbPromise;

  // Drop tables to force a clean seed (for dev phase 2 logic)
  await db.exec(`
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS global_stats;
    DROP TABLE IF EXISTS disbursement_trends;
    DROP TABLE IF EXISTS risk_distribution;
    DROP TABLE IF EXISTS emi_trends;
    DROP TABLE IF EXISTS user_participation;
    DROP TABLE IF EXISTS activity_pulse;
    DROP TABLE IF EXISTS borrower_snapshots;
    DROP TABLE IF EXISTS lender_snapshots;
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password_hash TEXT,
      role TEXT,
      name TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS global_stats (
      id INTEGER PRIMARY KEY,
      totalBorrowers INTEGER,
      totalLenders INTEGER,
      totalDisbursed INTEGER,
      activeEMIs INTEGER,
      avgInterestRate REAL,
      repaymentSuccess REAL
    );

    CREATE TABLE IF NOT EXISTS disbursement_trends (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      month TEXT,
      amount INTEGER
    );

    CREATE TABLE IF NOT EXISTS risk_distribution (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      grade TEXT,
      count INTEGER,
      fill TEXT
    );

    CREATE TABLE IF NOT EXISTS emi_trends (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT,
      expected INTEGER,
      received INTEGER
    );

    CREATE TABLE IF NOT EXISTS user_participation (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      value INTEGER,
      color TEXT
    );

    CREATE TABLE IF NOT EXISTS activity_pulse (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT,
      message TEXT,
      time TEXT,
      entity TEXT
    );

    CREATE TABLE IF NOT EXISTS borrower_snapshots (
      id TEXT PRIMARY KEY,
      name TEXT,
      grade TEXT,
      score INTEGER,
      rate REAL,
      funding INTEGER
    );

    CREATE TABLE IF NOT EXISTS lender_snapshots (
      id TEXT PRIMARY KEY,
      name TEXT,
      preference TEXT,
      minRate REAL,
      balance INTEGER
    );
  `);

  console.log('Tables created. Proceeding to seed mock data...');

  // Seeding Logic
  // 0. Auth Users
  const bcrypt = require('bcryptjs');
  const salt = await bcrypt.genSalt(10);
  const defaultPasswordHash = await bcrypt.hash('password123', salt);

  const authUsers = [
    { email: 'borrower@clearlend.in', role: 'borrower', name: 'Arjun Mehta' },
    { email: 'lender@clearlend.in', role: 'lender', name: 'Alpha Fund' },
    { email: 'admin@clearlend.in', role: 'admin', name: 'System Admin' }
  ];

  const stmtAuth = await db.prepare('INSERT INTO users (email, password_hash, role, name) VALUES (?, ?, ?, ?)');
  for (const u of authUsers) await stmtAuth.run(u.email, defaultPasswordHash, u.role, u.name);
  await stmtAuth.finalize();

  // Seeding Logic
  // 1. Stats
  await db.run(
    'INSERT INTO global_stats (totalBorrowers, totalLenders, totalDisbursed, activeEMIs, avgInterestRate, repaymentSuccess) VALUES (?, ?, ?, ?, ?, ?)',
    [12458, 8392, 145250000, 45802, 14.2, 98.4]
  );

  // 2. Disbursement Trends
  const disbursements = [
    { month: 'Jan', amount: 8500000 },
    { month: 'Feb', amount: 9200000 },
    { month: 'Mar', amount: 10500000 },
    { month: 'Apr', amount: 11200000 },
    { month: 'May', amount: 12800000 },
    { month: 'Jun', amount: 13500000 },
    { month: 'Jul', amount: 14200000 },
  ];
  const stmtDisp = await db.prepare('INSERT INTO disbursement_trends (month, amount) VALUES (?, ?)');
  for (const d of disbursements) await stmtDisp.run(d.month, d.amount);
  await stmtDisp.finalize();

  // 3. Risk Distribution
  const risks = [
    { grade: 'A', count: 4200, fill: '#10B981' },
    { grade: 'B', count: 3800, fill: '#34D399' },
    { grade: 'C', count: 2500, fill: '#FBBF24' },
    { grade: 'D', count: 1200, fill: '#F59E0B' },
    { grade: 'E', count: 600, fill: '#EF4444' },
    { grade: 'X', count: 158, fill: '#991B1B' },
  ];
  const stmtRisk = await db.prepare('INSERT INTO risk_distribution (grade, count, fill) VALUES (?, ?, ?)');
  for (const r of risks) await stmtRisk.run(r.grade, r.count, r.fill);
  await stmtRisk.finalize();

  // 4. EMI Trends
  const emis = [
    { date: '01', expected: 120000, received: 118000 },
    { date: '05', expected: 85000, received: 84500 },
    { date: '10', expected: 210000, received: 205000 },
    { date: '15', expected: 150000, received: 148000 },
    { date: '20', expected: 90000, received: 88000 },
    { date: '25', expected: 180000, received: 175000 },
    { date: '30', expected: 110000, received: 108000 },
  ];
  const stmtEmi = await db.prepare('INSERT INTO emi_trends (date, expected, received) VALUES (?, ?, ?)');
  for (const e of emis) await stmtEmi.run(e.date, e.expected, e.received);
  await stmtEmi.finalize();

  // 5. User Participation
  const users = [
    { name: 'Borrowers', value: 12458, color: '#3B82F6' },
    { name: 'Lenders', value: 8392, color: '#059669' }
  ];
  const stmtUsers = await db.prepare('INSERT INTO user_participation (name, value, color) VALUES (?, ?, ?)');
  for (const u of users) await stmtUsers.run(u.name, u.value, u.color);
  await stmtUsers.finalize();

  // 6. Pulse
  const pulses = [
    { type: 'loan_match', message: '₹5.5L Loan Fully Funded', time: '2 min ago', entity: 'Grade A' },
    { type: 'repayment', message: '₹12,450 EMI Received', time: '5 min ago', entity: 'User #8842' },
    { type: 'disbursement', message: 'Tranche #2 Released', time: '14 min ago', entity: 'Construction Loan' },
    { type: 'risk_alert', message: 'Payment Overdue (3 days)', time: '1 hr ago', entity: 'Grade D Warning' },
    { type: 'new_lender', message: 'New Institutional Lender', time: '2 hrs ago', entity: '₹50L Committed' }
  ];
  const stmtPulse = await db.prepare('INSERT INTO activity_pulse (type, message, time, entity) VALUES (?, ?, ?, ?)');
  for (const p of pulses) await stmtPulse.run(p.type, p.message, p.time, p.entity);
  await stmtPulse.finalize();

  // 7. Borrowers
  const borrowerSnaps = [
    { id: 'BW-1042', name: 'Retail Store Exp.', grade: 'B', score: 742, rate: 13.5, funding: 85 },
    { id: 'BW-2091', name: 'Medical Emergency', grade: 'D', score: 610, rate: 18.0, funding: 42 },
    { id: 'BW-3305', name: 'Home Renovation', grade: 'A', score: 815, rate: 11.2, funding: 100 },
    { id: 'BW-4144', name: 'Inventory Purchase', grade: 'C', score: 680, rate: 15.5, funding: 12 }
  ];
  const stmtB = await db.prepare('INSERT INTO borrower_snapshots (id, name, grade, score, rate, funding) VALUES (?, ?, ?, ?, ?, ?)');
  for (const b of borrowerSnaps) await stmtB.run(b.id, b.name, b.grade, b.score, b.rate, b.funding);
  await stmtB.finalize();

  // 8. Lenders
  const lenderSnaps = [
    { id: 'LD-8821', name: 'Alpha Fund', preference: 'Low Risk', minRate: 10.0, balance: 1250000 },
    { id: 'LD-9022', name: 'Retail Inv-01', preference: 'High Yield', minRate: 16.0, balance: 45000 },
    { id: 'LD-1104', name: 'Beta Partners', preference: 'Balanced', minRate: 13.0, balance: 850000 },
  ];
  const stmtL = await db.prepare('INSERT INTO lender_snapshots (id, name, preference, minRate, balance) VALUES (?, ?, ?, ?, ?)');
  for (const l of lenderSnaps) await stmtL.run(l.id, l.name, l.preference, l.minRate, l.balance);
  await stmtL.finalize();

  console.log('Database successfully seeded.');
};

module.exports = { initDb, dbPromise };
