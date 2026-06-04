import { IInvoice, NewInvoice } from './invoice.model';

export const sampleWithRequiredData: IInvoice = {
  id: 12345,
  number: 'INV-001',
  date: '2024-01-15',
  dueDate: '2024-02-15',
  amount: 1500,
  status: 'DRAFT',
};

export const sampleWithPartialData: IInvoice = {
  id: 67890,
  number: 'INV-002',
  date: '2024-03-01',
  dueDate: '2024-04-01',
  amount: 2500,
  status: 'SENT',
};

export const sampleWithFullData: IInvoice = {
  id: 11111,
  number: 'INV-003',
  date: '2024-05-20',
  dueDate: '2024-06-20',
  amount: 3200,
  status: 'PAID',
  bankAccount: { id: 1, name: 'Test Account' },
};

export const sampleWithNewData: NewInvoice = {
  number: 'INV-NEW',
  date: '2024-07-01',
  dueDate: '2024-08-01',
  amount: 500,
  status: 'DRAFT',
  id: null,
};
