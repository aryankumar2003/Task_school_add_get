const express = require('express');
const schoolRoutes = require('./routes/schoolRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/', schoolRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
