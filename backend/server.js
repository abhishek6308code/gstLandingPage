
 

// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const { MongoClient, ObjectId } = require('mongodb');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// const PORT = process.env.PORT || 4000;
// const MONGODB_URI = process.env.MONGODB_URI;
// const JWT_SECRET = process.env.JWT_SECRET;
// const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '8h';

// if (!MONGODB_URI || !JWT_SECRET) {
//   console.error('MONGODB_URI and JWT_SECRET must be set in .env');
//   process.exit(1);
// }

// const app = express();
// app.use(cors());
// app.use(express.json({ limit: '500kb' }));

// // Helpers
// function isNonEmptyString(v) { return typeof v === 'string' && v.trim().length > 0; }
// function isEmail(v) { return isNonEmptyString(v) && /^\S+@\S+\.\S+$/.test(v); }
// function normalizePhone(v) { if (!isNonEmptyString(v)) return ''; return v.replace(/[^\d+]/g, ''); }
// function isPhoneValid(v) { const p = normalizePhone(v); const digits = p.replace(/\D/g, ''); return digits.length >= 7 && digits.length <= 15; }

// // Mongo
// const client = new MongoClient(MONGODB_URI);
// let db;
// async function start() {
//   try {
//     await client.connect();
//     db = client.db();
//     console.log('Connected to MongoDB');

//     // Unique sparse index for phone
//     await db.collection('enquiries').createIndex({ phone: 1 }, { unique: true, sparse: true });
//     await db.collection('enrollments').createIndex({ phone: 1 }, { unique: true, sparse: true });
//     // Ensure admin email unique
//     await db.collection('admins').createIndex({ email: 1 }, { unique: true });

//     // --- Health ---
//     app.get('/api/health', (_req, res) => res.json({ ok: true }));

//     // --- Public API: enquiries / enrollments (as before) ---
//     app.post('/api/enquiries', async (req, res) => {
//       try {
//         const { name, email, phone, business_name, service_type, message } = req.body || {};
//         const errors = [];
//         if (!isNonEmptyString(name) || name.trim().length < 2) errors.push('Name is required (min 2 chars).');
//         if (!isEmail(email)) errors.push('Valid email is required.');
//         if (!isNonEmptyString(phone) || !isPhoneValid(phone)) errors.push('Valid phone number is required.');
//         if (!isNonEmptyString(service_type)) errors.push('Service type is required.');
//         if (!isNonEmptyString(message) || message.trim().length < 5) errors.push('Message is required (min 5 chars).');
//         if (errors.length) return res.status(400).json({ errors });

//         const phoneNorm = normalizePhone(phone);
//         const doc = {
//           name: name.trim(),
//           email: email.trim(),
//           phone: phoneNorm,
//           business_name: business_name ? String(business_name).trim() : null,
//           service_type: String(service_type).trim(),
//           message: message.trim(),
//           createdAt: new Date(),
//         };

//         const result = await db.collection('enquiries').insertOne(doc);
//         return res.status(201).json({ id: result.insertedId, message: 'Enquiry submitted' });
//       } catch (err) {
//         console.error('Error /api/enquiries:', err);
//         if (err && err.code === 11000) return res.status(409).json({ error: 'Phone number already used' });
//         return res.status(500).json({ error: 'Server error' });
//       }
//     });

//     app.post('/api/enrollments', async (req, res) => {
//       try {
//         const { name, email, phone, highestQualification } = req.body || {};
//         const errors = [];
//         if (!isNonEmptyString(name) || name.trim().length < 2) errors.push('Name is required (min 2 chars).');
//         if (!isEmail(email)) errors.push('Valid email is required.');
//         if (phone && !isPhoneValid(phone)) errors.push('Phone is invalid.');
//         if (!isNonEmptyString(highestQualification)) errors.push('Highest qualification is required.');
//         if (errors.length) return res.status(400).json({ errors });

//         const doc = {
//           name: name.trim(),
//           email: email.trim(),
//           phone: phone ? normalizePhone(phone) : null,
//           highestQualification: String(highestQualification).trim(),
//           createdAt: new Date(),
//         };

//         const result = await db.collection('enrollments').insertOne(doc);
//         return res.status(201).json({ id: result.insertedId, message: 'Enrollment successful' });
//       } catch (err) {
//         console.error('Error /api/enrollments:', err);
//         if (err && err.code === 11000) return res.status(409).json({ error: 'Phone number already used' });
//         return res.status(500).json({ error: 'Server error' });
//       }
//     });

//     // --- Admin auth ---
//     app.post('/api/admin/signup', async (req, res) => {
//       try {
//         const { email, password } = req.body || {};
//         if (!isEmail(email) || !isNonEmptyString(password) || password.length < 6) {
//           return res.status(400).json({ error: 'Email and password (min 6 chars) required' });
//         }
//         const hashed = await bcrypt.hash(password, 10);
//         const doc = { email: email.trim().toLowerCase(), password: hashed, createdAt: new Date() };
//         const result = await db.collection('admins').insertOne(doc);
//         return res.status(201).json({ id: result.insertedId, message: 'Admin created' });
//       } catch (err) {
//         console.error('Error /api/admin/signup:', err);
//         if (err && err.code === 11000) return res.status(409).json({ error: 'Admin email already registered' });
//         return res.status(500).json({ error: 'Server error' });
//       }
//     });

//     app.post('/api/admin/login', async (req, res) => {
//       try {
//         const { email, password } = req.body || {};
//         if (!isEmail(email) || !isNonEmptyString(password)) return res.status(400).json({ error: 'Email and password required' });
//         const admin = await db.collection('admins').findOne({ email: email.trim().toLowerCase() });
//         if (!admin) return res.status(401).json({ error: 'Invalid credentials' });
//         const match = await bcrypt.compare(password, admin.password);
//         if (!match) return res.status(401).json({ error: 'Invalid credentials' });
//         const token = jwt.sign({ sub: String(admin._id), email: admin.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
//         return res.json({ token, expiresIn: JWT_EXPIRES_IN });
//       } catch (err) {
//         console.error('Error /api/admin/login:', err);
//         return res.status(500).json({ error: 'Server error' });
//       }
//     });

//     // JWT middleware
//     function adminAuth(req, res, next) {
//       const auth = req.headers.authorization;
//       if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });
//       const token = auth.slice(7);
//       try {
//         const payload = jwt.verify(token, JWT_SECRET);
//         req.admin = payload;
//         return next();
//       } catch (err) {
//         return res.status(401).json({ error: 'Invalid or expired token' });
//       }
//     }

//     // --- Admin protected CRUD endpoints ---
//     // Helper to convert string id -> ObjectId
//     function toObjectId(id) {
//       try { return new ObjectId(id); } catch (e) { return null; }
//     }

//     // Generic list route with query pagination & sort
//     app.get('/api/admin/enquiries', adminAuth, async (req, res) => {
//       const page = Math.max(0, parseInt(req.query.page) || 0);
//       const limit = Math.min(100, parseInt(req.query.limit) || 50);
//       const cursor = db.collection('enquiries').find({}).sort({ createdAt: -1 }).skip(page * limit).limit(limit);
//       const items = await cursor.toArray();
//       const total = await db.collection('enquiries').countDocuments();
//       return res.json({ items, page, limit, total });
//     });

//     app.get('/api/admin/enquiries/:id', adminAuth, async (req, res) => {
//       const id = toObjectId(req.params.id);
//       if (!id) return res.status(400).json({ error: 'Invalid id' });
//       const doc = await db.collection('enquiries').findOne({ _id: id });
//       if (!doc) return res.status(404).json({ error: 'Not found' });
//       return res.json(doc);
//     });

//     app.put('/api/admin/enquiries/:id', adminAuth, async (req, res) => {
//       const id = toObjectId(req.params.id);
//       if (!id) return res.status(400).json({ error: 'Invalid id' });
//       const update = req.body || {};
//       // server-side validation for updatable fields
//       if (update.phone && !isPhoneValid(update.phone)) return res.status(400).json({ error: 'Invalid phone' });
//       if (update.email && !isEmail(update.email)) return res.status(400).json({ error: 'Invalid email' });
//       // normalize phone when present
//       if (update.phone) update.phone = normalizePhone(update.phone);
//       update.updatedAt = new Date();
//       try {
//         const result = await db.collection('enquiries').findOneAndUpdate({ _id: id }, { $set: update }, { returnDocument: 'after' });
//         if (!result.value) return res.status(404).json({ error: 'Not found' });
//         return res.json(result.value);
//       } catch (err) {
//         console.error('PUT enquiry', err);
//         if (err && err.code === 11000) return res.status(409).json({ error: 'Phone number already used' });
//         return res.status(500).json({ error: 'Server error' });
//       }
//     });

//     app.delete('/api/admin/enquiries/:id', adminAuth, async (req, res) => {
//       const id = toObjectId(req.params.id);
//       if (!id) return res.status(400).json({ error: 'Invalid id' });
//       const result = await db.collection('enquiries').deleteOne({ _id: id });
//       if (result.deletedCount === 0) return res.status(404).json({ error: 'Not found' });
//       return res.json({ message: 'Deleted' });
//     });

//     // Repeat for enrollments
//     app.get('/api/admin/enrollments', adminAuth, async (req, res) => {
//       const page = Math.max(0, parseInt(req.query.page) || 0);
//       const limit = Math.min(100, parseInt(req.query.limit) || 50);
//       const items = await db.collection('enrollments').find({}).sort({ createdAt: -1 }).skip(page * limit).limit(limit).toArray();
//       const total = await db.collection('enrollments').countDocuments();
//       return res.json({ items, page, limit, total });
//     });

//     app.get('/api/admin/enrollments/:id', adminAuth, async (req, res) => {
//       const id = toObjectId(req.params.id);
//       if (!id) return res.status(400).json({ error: 'Invalid id' });
//       const doc = await db.collection('enrollments').findOne({ _id: id });
//       if (!doc) return res.status(404).json({ error: 'Not found' });
//       return res.json(doc);
//     });

//     app.put('/api/admin/enrollments/:id', adminAuth, async (req, res) => {
//       const id = toObjectId(req.params.id);
//       if (!id) return res.status(400).json({ error: 'Invalid id' });
//       const update = req.body || {};
//       if (update.phone && !isPhoneValid(update.phone)) return res.status(400).json({ error: 'Invalid phone' });
//       if (update.email && !isEmail(update.email)) return res.status(400).json({ error: 'Invalid email' });
//       if (update.phone) update.phone = normalizePhone(update.phone);
//       update.updatedAt = new Date();
//       try {
//         const result = await db.collection('enrollments').findOneAndUpdate({ _id: id }, { $set: update }, { returnDocument: 'after' });
//         if (!result.value) return res.status(404).json({ error: 'Not found' });
//         return res.json(result.value);
//       } catch (err) {
//         console.error('PUT enrollment', err);
//         if (err && err.code === 11000) return res.status(409).json({ error: 'Phone number already used' });
//         return res.status(500).json({ error: 'Server error' });
//       }
//     });

//     app.delete('/api/admin/enrollments/:id', adminAuth, async (req, res) => {
//       const id = toObjectId(req.params.id);
//       if (!id) return res.status(400).json({ error: 'Invalid id' });
//       const result = await db.collection('enrollments').deleteOne({ _id: id });
//       if (result.deletedCount === 0) return res.status(404).json({ error: 'Not found' });
//       return res.json({ message: 'Deleted' });
//     });

//     // fallback 404
//     app.use((_req, res) => res.status(404).json({ error: 'Not found' }));

//     app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
//   } catch (err) {
//     console.error('Failed to start server:', err);
//     process.exit(1);
//   }
// }

// start();

// // graceful shutdown
// process.on('SIGINT', async () => { try { await client.close(); } catch(e){} process.exit(0); });
// process.on('SIGTERM', async () => { try { await client.close(); } catch(e){} process.exit(0); });
// server.js
const express = require('express');
const cors = require('cors');
const { connectToDb, close: closeDb } = require('./db');

const publicRoutes = require('./routes/public');
const adminAuthRoutes = require('./routes/adminAuth');
const adminRoutes = require('./routes/admin');

const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;

async function startServer() {
  if (!MONGODB_URI) {
    console.error('MONGODB_URI must be set in .env');
    process.exit(1);
  }

  const db = await connectToDb(MONGODB_URI);
  console.log('Connected to MongoDB');

  const app = express();
  app.use(cors());
  app.use(express.json({ limit: '500kb' }));

  // health
  app.get('/api/health', (_req, res) => res.json({ ok: true }));

  // mount routes
  app.use('/api', publicRoutes);           // /api/enquiries, /api/enrollments
  app.use('/api', adminAuthRoutes);       // /api/admin/signup, /api/admin/login
  app.use('/api/admin', adminRoutes);     // protected admin endpoints

  // fallback 404
  app.use((_req, res) => res.status(404).json({ error: 'Not found' }));

  const server = app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });

  // graceful shutdown
  const shutdown = async () => {
    console.log('Shutting down...');
    server.close(async () => {
      try { await closeDb(); } catch (e) { console.error(e); }
      process.exit(0);
    });
  };
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);

  return { app, server };
}

module.exports = { startServer };
