import express from 'express';
import { createPDF } from '../controllers/pdfController.js';

const router = express.Router();

router.post('/generate-pdf', createPDF);

export default router;
