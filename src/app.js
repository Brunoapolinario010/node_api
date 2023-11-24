const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const PORT = parseInt(process.env.PORT) || 3000;

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', require('./routes/user.routes'));

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});