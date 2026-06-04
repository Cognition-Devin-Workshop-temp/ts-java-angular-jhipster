import { IInvoice, NewInvoice } from './invoice.model';

export const sampleWithRequiredData: IInvoice = {
  id: 15432,
  number: 'INV-001',
  date: '2025-01-15T10:00:00Z',
  dueDate: '2025-02-15T10:00:00Z',
  amount: 1500,
  status: 'DRAFT',
};

export const sampleWithPartialData: IInvoice = {
  id: 28743,
  number: 'INV-002',
  date: '2025-03-10T14:00:00Z',
  dueDate: '2025-04-10T14:00:00Z',
  amount: 2750.5,
  status: 'SENT',
};

export const sampleWithFullData: IInvoice = {
  id: 31256,
  number: 'INV-003',
  date: '2025-05-20T11:45:00Z',
  dueDate: '2025-06-20T11:45:00Z',
  amount: 8900,
  status: 'PAID',
  bankAccount: { id: 1, name: 'Test Account' },
};

export const sampleWithNewData: NewInvoice = {
  number: 'INV-004',
  date: '2025-07-01T07:00:00Z',
  dueDate: '2025-08-01T07:00:00Z',
  amount: 450.25,
  status: 'OVERDUE',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
