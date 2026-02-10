import express from 'express';

import healthRouter from './routes/health.js';
import bfhlRouter from './routes/bfhl.js';
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());


app.use('/', healthRouter);
app.use('/', bfhlRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});