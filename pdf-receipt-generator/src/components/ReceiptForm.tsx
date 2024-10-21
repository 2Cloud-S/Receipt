'use client';

import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// Remove this line if ReceiptData is not used
// import { ReceiptData } from '../types';

// Define the schema for form validation
const schema = yup.object().shape({
  customerName: yup.string().required('Customer name is required'),
  date: yup.date().required('Date is required'),
  items: yup.array().of(
    yup.object().shape({
      description: yup.string().required('Item description is required'),
      quantity: yup.number().positive().required('Quantity is required'),
      unitPrice: yup.number().positive().required('Unit price is required'),
    })
  ).required('At least one item is required'),
  taxRate: yup.number().min(0).max(100).required('Tax rate is required'),
  paymentTerms: yup.string().required('Payment terms are required'),
});

// Define the type for the form data
export interface ReceiptFormData {
  customerName: string;
  date: Date;
  items: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
  }>;
  taxRate: number;
  paymentTerms: string;
}

interface ReceiptFormProps {
  onSubmit: (data: ReceiptFormData) => void;
}

const ReceiptForm: React.FC<ReceiptFormProps> = ({ onSubmit }) => {
  const { register, control, handleSubmit, formState: { errors } } = useForm<ReceiptFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      items: [{ description: '', quantity: 1, unitPrice: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">Customer Name</label>
        <input
          type="text"
          id="customerName"
          {...register('customerName')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.customerName && <p className="mt-1 text-sm text-red-600">{errors.customerName.message}</p>}
      </div>

      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          id="date"
          {...register('date')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Items</label>
        {fields.map((field, index) => (
          <div key={field.id} className="flex space-x-2 mt-2">
            <input
              {...register(`items.${index}.description`)}
              placeholder="Description"
              className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <input
              type="number"
              {...register(`items.${index}.quantity`)}
              placeholder="Qty"
              className="w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <input
              type="number"
              step="0.01"
              {...register(`items.${index}.unitPrice`)}
              placeholder="Price"
              className="w-24 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <button type="button" onClick={() => remove(index)} className="px-2 py-1 bg-red-500 text-white rounded">Remove</button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => append({ description: '', quantity: 1, unitPrice: 0 })}
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
        >
          Add Item
        </button>
      </div>

      <div>
        <label htmlFor="taxRate" className="block text-sm font-medium text-gray-700">Tax Rate (%)</label>
        <input
          type="number"
          id="taxRate"
          step="0.01"
          {...register('taxRate')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.taxRate && <p className="mt-1 text-sm text-red-600">{errors.taxRate.message}</p>}
      </div>

      <div>
        <label htmlFor="paymentTerms" className="block text-sm font-medium text-gray-700">Payment Terms</label>
        <input
          type="text"
          id="paymentTerms"
          {...register('paymentTerms')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.paymentTerms && <p className="mt-1 text-sm text-red-600">{errors.paymentTerms.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Generate Receipt
      </button>
    </form>
  );
};

export default ReceiptForm;
