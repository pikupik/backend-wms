// backend/server.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

app.use(express.json());
app.use(cors())

// Import routes
const inboundDeliveryRoutes = require('./routes/inboundDelivery');
const goodReceivingRoutes = require('./routes/goodReceiving');

// Use routes
app.use('/api/inbound-deliveries', inboundDeliveryRoutes);
app.use('/api/good-receivings', goodReceivingRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
