
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const apiRoutes = require('./routes/api');
const Admin = require('./models/Admin');
const Counter = require('./models/Counter');

dotenv.config();

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Pernnavistaar Foundation Backend is Running 🚀');
});

app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  // Volunteer Counter
  const vCounter = await Counter.findOne({ id: 'volunteerRegistration' });
  if (!vCounter) {
    await Counter.create({ id: 'volunteerRegistration', seq: 1462 });
    console.log('✅ Volunteer Counter initialized at 1462 → Next: PVF/V/2026/1463');
  } else {
    console.log('ℹ️  Volunteer Counter exists at:', vCounter.seq);
  }

  // Intern Counter
  const iCounter = await Counter.findOne({ id: 'internRegistration' });
  if (!iCounter) {
    await Counter.create({ id: 'internRegistration', seq: 1000 });
    console.log('✅ Intern Counter initialized at 1000 → Next: PVF/I/2026/1001');
  } else {
    console.log('ℹ️  Intern Counter exists at:', iCounter.seq);
  }

  // Default Admin
  const admin = await Admin.findOne({ username: 'admin1907' });
  if (!admin) {
    await Admin.create({ username: 'admin1907', password: 'Admin@1907' });
    console.log('✅ Default Admin created: admin1907 / Admin@1907');
  } else {
    console.log('ℹ️  Admin already exists: admin1907');
  }

  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
};

startServer();
