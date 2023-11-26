const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user.routes');

dotenv.config();

const PORT = parseInt(process.env.PORT) || 3000;

const app = express();

app.use(express.json());
app.use(cors());

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

app.use('/api', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
