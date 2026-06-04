import { IInvoice, NewInvoice } from './invoice.model';

export const sampleWithRequiredData: IInvoice = {
  id: 28946,
  number: 'INV-001',
  date: '2024-01-15',
  dueDate: '2024-02-15',
  amount: 1500.0,
  status: 'DRAFT',
};

export const sampleWithPartialData: IInvoice = {
  id: 15732,
  number: 'INV-002',
  date: '2024-02-01',
  dueDate: '2024-03-01',
  amount: 2750.5,
  status: 'SENT',
};

export const sampleWithFullData: IInvoice = {
  id: 19843,
  number: 'INV-003',
  date: '2024-03-10',
  dueDate: '2024-04-10',
  amount: 890.0,
  status: 'PAID',
};

export const sampleWithNewData: NewInvoice = {
  number: 'INV-004',
  date: '2024-04-01',
  dueDate: '2024-05-01',
  amount: 3200.75,
  status: 'OVERDUE',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
