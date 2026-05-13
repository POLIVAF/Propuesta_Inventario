const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { sequelize } = require('./models');
const authRoutes = require('./routes/authRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const { verifyToken } = require('./middlewares/authMiddleware');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/inventory', verifyToken, inventoryRoutes);

// Test route
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Sync Database and start server
const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true }) // alter: true will update the schema if it changes
  .then(() => {
    console.log('Database synced successfully');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to sync database:', error);
  });
