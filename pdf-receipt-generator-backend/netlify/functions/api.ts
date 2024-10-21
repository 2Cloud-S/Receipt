import express, { Router } from 'express';
import serverless from 'serverless-http';
import cors from 'cors';
import { createPDF } from '../../src/controllers/pdfController';

const api = express();

// Middleware
api.use(cors({
  origin: process.env.ALLOWED_ORIGINS,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
api.use(express.json());

// Routes
const router = Router();
router.post('/generate-pdf', createPDF);

api.use('/api/', router);

// Serverless handler
export const handler = serverless(api);
