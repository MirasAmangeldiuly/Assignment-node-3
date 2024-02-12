const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const newsRoutes = require('./routes/newsRoutes');
const weatherRoutes = require('./routes/weatherRoutes');
const holidayRoutes = require('./routes/holidayRoutes');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoURL = 'mongodb+srv://miras:12345@miras.kgpnlg6.mongodb.net/?retryWrites=true&w=majority'; // Update with your MongoDB URL
mongoose
    .connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(`DB connection error: ${err}`));

// Routes
app.use(authRoutes);
app.use(userRoutes);
app.use(newsRoutes);
app.use(weatherRoutes);
app.use(holidayRoutes);
app.listen(PORT, '0.0.0.0', (err) => {
  err ? console.log(err) : console.log(`Listening on port ${PORT}`);
});
