import express from 'express';
import apiRoutes from './routes/api';
// import cors from 'cors';

const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/api', apiRoutes);

export default app;