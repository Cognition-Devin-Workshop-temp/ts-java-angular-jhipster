import { IInvoice, NewInvoice } from './invoice.model';

export const sampleWithRequiredData: IInvoice = {
  id: 17167,
  number: 'INV-001',
  date: '2024-01-15',
  dueDate: '2024-02-15',
  amount: 1500.0,
  status: 'DRAFT',
};

export const sampleWithPartialData: IInvoice = {
  id: 18934,
  number: 'INV-002',
  date: '2024-03-01',
  dueDate: '2024-04-01',
  amount: 2500.5,
  status: 'SENT',
};

export const sampleWithFullData: IInvoice = {
  id: 13483,
  number: 'INV-003',
  date: '2024-06-01',
  dueDate: '2024-07-01',
  amount: 9999.99,
  status: 'PAID',
};

export const sampleWithNewData: NewInvoice = {
  number: 'INV-NEW',
  date: '2024-08-01',
  dueDate: '2024-09-01',
  amount: 500.0,
  status: 'DRAFT',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
