import { IInvoice, NewInvoice } from './invoice.model';

export const sampleWithRequiredData: IInvoice = {
  id: 12345,
  number: 'INV-001',
  date: '2024-01-01T00:00:00Z',
  dueDate: '2024-02-01T00:00:00Z',
  amount: 1000,
  status: 'DRAFT',
};

export const sampleWithPartialData: IInvoice = {
  id: 23456,
  number: 'INV-002',
  date: '2024-01-15T00:00:00Z',
  dueDate: '2024-02-15T00:00:00Z',
  amount: 2500.5,
  status: 'SENT',
};

export const sampleWithFullData: IInvoice = {
  id: 34567,
  number: 'INV-003',
  date: '2024-03-01T00:00:00Z',
  dueDate: '2024-04-01T00:00:00Z',
  amount: 5000.75,
  status: 'PAID',
  bankAccount: { id: 1, name: 'Test Account' },
};

export const sampleWithNewData: NewInvoice = {
  number: 'INV-004',
  date: '2024-05-01T00:00:00Z',
  dueDate: '2024-06-01T00:00:00Z',
  amount: 750,
  status: 'OVERDUE',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
