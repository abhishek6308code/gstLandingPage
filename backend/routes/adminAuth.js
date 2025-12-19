// routes/adminAuth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getDb } = require('../db');
const { isEmail, isNonEmptyString } = require('../validators');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '8h';

if (!JWT_SECRET) {
  console.warn('JWT_SECRET not set — login will fail');
}

// POST /api/admin/signup
router.post('/admin/signup', async (req, res) => {
  try {
    const db = getDb();
    const { email, password } = req.body || {};
    if (!isEmail(email) || !isNonEmptyString(password) || password.length < 6) {
      return res.status(400).json({ error: 'Email and password (min 6 chars) required' });
    }
    const hashed = await bcrypt.hash(password, 10);
    const doc = { email: email.trim().toLowerCase(), password: hashed, createdAt: new Date() };
    const result = await db.collection('admins').insertOne(doc);
    return res.status(201).json({ id: result.insertedId, message: 'Admin created' });
  } catch (err) {
    console.error('Error /api/admin/signup', err);
    if (err && err.code === 11000) return res.status(409).json({ error: 'Admin email already registered' });
    return res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/admin/login
router.post('/admin/login', async (req, res) => {
  try {
    const db = getDb();
    const { email, password } = req.body || {};
    if (!isEmail(email) || !isNonEmptyString(password)) return res.status(400).json({ error: 'Email and password required' });
    const admin = await db.collection('admins').findOne({ email: email.trim().toLowerCase() });
    if (!admin) return res.status(401).json({ error: 'Invalid credentials' });
    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ sub: String(admin._id), email: admin.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    return res.json({ token, expiresIn: JWT_EXPIRES_IN });
  } catch (err) {
    console.error('Error /api/admin/login', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
