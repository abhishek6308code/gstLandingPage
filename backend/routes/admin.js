// routes/admin.js
const express = require('express');
const { getDb } = require('../db');
const adminAuth = require('../middleware/adminAuth');
const { isPhoneValid, isEmail, normalizePhone } = require('../validators');

const router = express.Router();

// Helper to convert string id -> ObjectId
const { ObjectId } = require('mongodb');
function toObjectId(id) { try { return new ObjectId(id); } catch (e) { return null; } }

// All routes protected
router.use(adminAuth);

// Enquiries list
router.get('/enquiries', async (req, res) => {
  try {
    const db = getDb();
    const page = Math.max(0, parseInt(req.query.page) || 0);
    const limit = Math.min(100, parseInt(req.query.limit) || 50);
    const cursor = db.collection('enquiries').find({}).sort({ createdAt: -1 }).skip(page * limit).limit(limit);
    const items = await cursor.toArray();
    const total = await db.collection('enquiries').countDocuments();
    return res.json({ items, page, limit, total });
  } catch (err) {
    console.error('GET /api/admin/enquiries', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

router.get('/enquiries/:id', async (req, res) => {
  const db = getDb();
  const id = toObjectId(req.params.id);
  if (!id) return res.status(400).json({ error: 'Invalid id' });
  const doc = await db.collection('enquiries').findOne({ _id: id });
  if (!doc) return res.status(404).json({ error: 'Not found' });
  return res.json(doc);
});

router.put('/enquiries/:id', async (req, res) => {
  try {
    const db = getDb();
    const id = toObjectId(req.params.id);
    if (!id) return res.status(400).json({ error: 'Invalid id' });
    const update = req.body || {};
    if (update.phone && !isPhoneValid(update.phone)) return res.status(400).json({ error: 'Invalid phone' });
    if (update.email && !isEmail(update.email)) return res.status(400).json({ error: 'Invalid email' });
    if (update.phone) update.phone = normalizePhone(update.phone);
    update.updatedAt = new Date();

    const result = await db.collection('enquiries').findOneAndUpdate({ _id: id }, { $set: update }, { returnDocument: 'after' });
    if (!result.value) return res.status(404).json({ error: 'Not found' });
    return res.json(result.value);
  } catch (err) {
    console.error('PUT /api/admin/enquiries/:id', err);
    if (err && err.code === 11000) return res.status(409).json({ error: 'Phone number already used' });
    return res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/enquiries/:id', async (req, res) => {
  try {
    const db = getDb();
    const id = toObjectId(req.params.id);
    if (!id) return res.status(400).json({ error: 'Invalid id' });
    const result = await db.collection('enquiries').deleteOne({ _id: id });
    if (result.deletedCount === 0) return res.status(404).json({ error: 'Not found' });
    return res.json({ message: 'Deleted' });
  } catch (err) {
    console.error('DELETE /api/admin/enquiries/:id', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Enrollments repeated routes
router.get('/enrollments', async (req, res) => {
  try {
    const db = getDb();
    const page = Math.max(0, parseInt(req.query.page) || 0);
    const limit = Math.min(100, parseInt(req.query.limit) || 50);
    const items = await db.collection('enrollments').find({}).sort({ createdAt: -1 }).skip(page * limit).limit(limit).toArray();
    const total = await db.collection('enrollments').countDocuments();
    return res.json({ items, page, limit, total });
  } catch (err) {
    console.error('GET /api/admin/enrollments', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

router.get('/enrollments/:id', async (req, res) => {
  const db = getDb();
  const id = toObjectId(req.params.id);
  if (!id) return res.status(400).json({ error: 'Invalid id' });
  const doc = await db.collection('enrollments').findOne({ _id: id });
  if (!doc) return res.status(404).json({ error: 'Not found' });
  return res.json(doc);
});

router.put('/enrollments/:id', async (req, res) => {
  try {
    const db = getDb();
    const id = toObjectId(req.params.id);
    if (!id) return res.status(400).json({ error: 'Invalid id' });
    const update = req.body || {};
    if (update.phone && !isPhoneValid(update.phone)) return res.status(400).json({ error: 'Invalid phone' });
    if (update.email && !isEmail(update.email)) return res.status(400).json({ error: 'Invalid email' });
    if (update.phone) update.phone = normalizePhone(update.phone);
    update.updatedAt = new Date();

    const result = await db.collection('enrollments').findOneAndUpdate({ _id: id }, { $set: update }, { returnDocument: 'after' });
    if (!result.value) return res.status(404).json({ error: 'Not found' });
    return res.json(result.value);
  } catch (err) {
    console.error('PUT /api/admin/enrollments/:id', err);
    if (err && err.code === 11000) return res.status(409).json({ error: 'Phone number already used' });
    return res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/enrollments/:id', async (req, res) => {
  try {
    const db = getDb();
    const id = toObjectId(req.params.id);
    if (!id) return res.status(400).json({ error: 'Invalid id' });
    const result = await db.collection('enrollments').deleteOne({ _id: id });
    if (result.deletedCount === 0) return res.status(404).json({ error: 'Not found' });
    return res.json({ message: 'Deleted' });
  } catch (err) {
    console.error('DELETE /api/admin/enrollments/:id', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
