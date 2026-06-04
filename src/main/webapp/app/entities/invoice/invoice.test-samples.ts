import { IInvoice, NewInvoice } from './invoice.model';

export const sampleWithRequiredData: IInvoice = {
  id: 12345,
  number: 'INV-0001',
  date: '2024-01-15',
  dueDate: '2024-02-15',
  amount: 1500,
  status: 'DRAFT',
};

export const sampleWithPartialData: IInvoice = {
  id: 67890,
  number: 'INV-0002',
  date: '2024-02-20',
  dueDate: '2024-03-20',
  amount: 2750.5,
  status: 'SENT',
};

export const sampleWithFullData: IInvoice = {
  id: 11111,
  number: 'INV-0003',
  date: '2024-03-10',
  dueDate: '2024-04-10',
  amount: 890,
  status: 'PAID',
  bankAccount: { id: 1, name: 'Test Account' },
};

export const sampleWithNewData: NewInvoice = {
  number: 'INV-0004',
  date: '2024-04-01',
  dueDate: '2024-05-01',
  amount: 500,
  status: 'DRAFT',
  id: null,
};
