import * as yup from 'yup';

export const receiptSchema = yup.object().shape({
  customerName: yup.string().required('Customer name is required'),
  amount: yup.number().positive('Amount must be positive').required('Amount is required'),
  date: yup.date().required('Date is required'),
});

export type ReceiptData = yup.InferType<typeof receiptSchema>;
