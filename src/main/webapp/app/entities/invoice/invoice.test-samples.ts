import { IInvoice, NewInvoice } from './invoice.model';

export const sampleWithRequiredData: IInvoice = {
  id: 28745,
  number: 'INV-001',
  date: '2026-01-15',
  dueDate: '2026-02-15',
  amount: 1500.0,
  status: 'DRAFT',
};

export const sampleWithPartialData: IInvoice = {
  id: 19823,
  number: 'INV-002',
  date: '2026-02-20',
  dueDate: '2026-03-20',
  amount: 2750.5,
  status: 'SENT',
};

export const sampleWithFullData: IInvoice = {
  id: 31542,
  number: 'INV-003',
  date: '2026-03-10',
  dueDate: '2026-04-10',
  amount: 890.25,
  status: 'PAID',
  bankAccount: { id: 1, name: 'Main Account' },
};

export const sampleWithNewData: NewInvoice = {
  number: 'INV-004',
  date: '2026-04-01',
  dueDate: '2026-05-01',
  amount: 3200.0,
  status: 'DRAFT',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
