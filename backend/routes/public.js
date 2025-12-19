// routes/public.js
const express = require('express');
const { getDb } = require('../db');
const { isNonEmptyString, isEmail, isPhoneValid, normalizePhone } = require('../validators');

const router = express.Router();

// POST /api/enquiries
router.post('/enquiries', async (req, res) => {
  try {
    const db = getDb();
    const { name, email, phone, business_name, service_type, message } = req.body || {};
    const errors = [];
    if (!isNonEmptyString(name) || name.trim().length < 2) errors.push('Name is required (min 2 chars).');
    if (!isEmail(email)) errors.push('Valid email is required.');
    if (!isNonEmptyString(phone) || !isPhoneValid(phone)) errors.push('Valid phone number is required.');
    if (!isNonEmptyString(service_type)) errors.push('Service type is required.');
    if (!isNonEmptyString(message) || message.trim().length < 5) errors.push('Message is required (min 5 chars).');
    if (errors.length) return res.status(400).json({ errors });

    const phoneNorm = normalizePhone(phone);
    const doc = {
      name: name.trim(),
      email: email.trim(),
      phone: phoneNorm,
      business_name: business_name ? String(business_name).trim() : null,
      service_type: String(service_type).trim(),
      message: message.trim(),
      createdAt: new Date(),
    };

    const result = await db.collection('enquiries').insertOne(doc);
    return res.status(201).json({ id: result.insertedId, message: 'Enquiry submitted' });
  } catch (err) {
    console.error('Error POST /api/enquiries', err);
    if (err && err.code === 11000) return res.status(409).json({ error: 'Phone number already used' });
    return res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/enrollments
router.post('/enrollments', async (req, res) => {
  try {
    const db = getDb();
    const { name, email, phone, highestQualification, currentProfession } = req.body || {};
    const errors = [];
    if (!isNonEmptyString(name) || name.trim().length < 2) errors.push('Name is required (min 2 chars).');
    if (!isEmail(email)) errors.push('Valid email is required.');
    if (phone && !isPhoneValid(phone)) errors.push('Phone is invalid.');
    if (!isNonEmptyString(highestQualification)) errors.push('Highest qualification is required.');
    if (!isNonEmptyString(currentProfession)) errors.push('Current profession is required.');
    if (errors.length) return res.status(400).json({ errors });

    const doc = {
      name: name.trim(),
      email: email.trim(),
      phone: phone ? normalizePhone(phone) : null,
      highestQualification: String(highestQualification).trim(),
      currentProfession: String(currentProfession).trim(),
      createdAt: new Date(),
    };

    const result = await db.collection('enrollments').insertOne(doc);
    return res.status(201).json({ id: result.insertedId, message: 'Enrollment successful' });
  } catch (err) {
    console.error('Error POST /api/enrollments', err);
    if (err && err.code === 11000) return res.status(409).json({ error: 'Phone number already used' });
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
