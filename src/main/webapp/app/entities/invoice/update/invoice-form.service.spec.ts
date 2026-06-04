import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../invoice.test-samples';

import { InvoiceFormService } from './invoice-form.service';

import { beforeEach, describe, expect, it } from 'vitest';

describe('Invoice Form Service', () => {
  let service: InvoiceFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoiceFormService);
  });

  describe('Service methods', () => {
    describe('createInvoiceFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createInvoiceFormGroup();

        expect(formGroup.controls.id).toBeDefined();
        expect(formGroup.controls.number).toBeDefined();
        expect(formGroup.controls.date).toBeDefined();
        expect(formGroup.controls.dueDate).toBeDefined();
        expect(formGroup.controls.amount).toBeDefined();
        expect(formGroup.controls.status).toBeDefined();
        expect(formGroup.controls.bankAccount).toBeDefined();
      });

      it('passing IInvoice should create a new form with FormGroup', () => {
        const formGroup = service.createInvoiceFormGroup(sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
        expect(formGroup.controls.id.value).toEqual(sampleWithRequiredData.id);
      });

      it('passing NewInvoice should create a form with null id', () => {
        const formGroup = service.createInvoiceFormGroup(sampleWithNewData);

        expect(formGroup.controls.id.disabled).toBe(true);
        expect(formGroup.controls.id.value).toBeNull();
      });
    });

    describe('getInvoice', () => {
      it('should return NewInvoice for an empty form', () => {
        const formGroup = service.createInvoiceFormGroup();
        const invoice = service.getInvoice(formGroup);

        expect(invoice).toMatchObject({});
      });

      it('should return IInvoice', () => {
        const formGroup = service.createInvoiceFormGroup(sampleWithRequiredData);
        const invoice = service.getInvoice(formGroup);

        expect(invoice).toMatchObject(sampleWithRequiredData);
      });

      it('should return NewInvoice with id null', () => {
        const formGroup = service.createInvoiceFormGroup(sampleWithNewData);
        const invoice = service.getInvoice(formGroup);

        expect(invoice).toMatchObject(sampleWithNewData);
      });
    });

    describe('resetForm', () => {
      it('should reset form to default', () => {
        const formGroup = service.createInvoiceFormGroup(sampleWithRequiredData);
        service.resetForm(formGroup, sampleWithNewData);

        const invoice = service.getInvoice(formGroup);
        expect(invoice).toMatchObject(sampleWithNewData);
      });
    });
  });
});
