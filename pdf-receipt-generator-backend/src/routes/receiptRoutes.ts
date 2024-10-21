import express from 'express';
import { getDigitalReceipt } from '../controllers/receiptController.js';

const router = express.Router();

router.get('/receipts/:id', getDigitalReceipt);

export default router;
