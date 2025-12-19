// db.js
const { MongoClient } = require('mongodb');

let client;
let db;

async function connectToDb(uri) {
  if (!uri) throw new Error('MONGODB_URI not provided');
  client = new MongoClient(uri);
  await client.connect();
  db = client.db();

  // create indexes similar to your original file
  await db.collection('enquiries').createIndex({ phone: 1 }, { unique: true, sparse: true });
  await db.collection('enrollments').createIndex({ phone: 1 }, { unique: true, sparse: true });
  await db.collection('admins').createIndex({ email: 1 }, { unique: true });

  return db;
}

function getDb() {
  if (!db) throw new Error('Call connectToDb first');
  return db;
}

async function close() {
  if (client) await client.close();
}

module.exports = { connectToDb, getDb, close };
