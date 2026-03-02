const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/session', require('./routes/session'));
app.use('/api/questions', require('./routes/questions'));
app.use('/api/submit', require('./routes/submit'));
app.use('/api/result', require('./routes/result'));

// Database connection
sequelize.sync({ force: false }).then(() => {
  console.log('Database connected successfully');
}).catch(err => {
  console.error('Unable to connect to database:', err);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
