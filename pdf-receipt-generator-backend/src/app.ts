import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createPDF } from './controllers/pdfController.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({
  origin: process.env.ALLOWED_ORIGINS,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.post('/api/generate-pdf', createPDF);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
