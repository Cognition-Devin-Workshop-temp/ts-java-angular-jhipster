import { IInvoice, NewInvoice } from './invoice.model';

export const sampleWithRequiredData: IInvoice = {
  id: 28743,
  number: 'INV-001',
  date: '2026-06-01',
  dueDate: '2026-07-01',
  amount: 1500.0,
  status: 'DRAFT',
};

export const sampleWithPartialData: IInvoice = {
  id: 19234,
  number: 'INV-002',
  date: '2026-06-01',
  dueDate: '2026-07-01',
  amount: 2500.5,
  status: 'SENT',
};

export const sampleWithFullData: IInvoice = {
  id: 14532,
  number: 'INV-003',
  date: '2026-06-01',
  dueDate: '2026-07-01',
  amount: 3500.75,
  status: 'PAID',
};

export const sampleWithNewData: NewInvoice = {
  number: 'INV-004',
  date: '2026-06-01',
  dueDate: '2026-07-01',
  amount: 4500.0,
  status: 'OVERDUE',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
