import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { IInvoice } from '../invoice.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../invoice.test-samples';

import { InvoiceService } from './invoice.service';

const requireRestSample: IInvoice = {
  ...sampleWithRequiredData,
};

describe('Invoice Service', () => {
  let service: InvoiceService;
  let httpMock: HttpTestingController;
  let expectedResult: IInvoice | IInvoice[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(InvoiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create an Invoice', () => {
      const invoice = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(invoice).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update an Invoice', () => {
      const invoice = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(invoice).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update an Invoice', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Invoice', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete an Invoice', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addInvoiceToCollectionIfMissing', () => {
      it('should add an Invoice to an empty array', () => {
        const invoice: IInvoice = sampleWithRequiredData;
        expectedResult = service.addInvoiceToCollectionIfMissing([], invoice);
        expect(expectedResult).toEqual([invoice]);
      });

      it('should not add an Invoice to an array that contains it', () => {
        const invoice: IInvoice = sampleWithRequiredData;
        const invoiceCollection: IInvoice[] = [
          {
            ...invoice,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addInvoiceToCollectionIfMissing(invoiceCollection, invoice);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add an Invoice to an array that doesn't contain it", () => {
        const invoice: IInvoice = sampleWithRequiredData;
        const invoiceCollection: IInvoice[] = [sampleWithPartialData];
        expectedResult = service.addInvoiceToCollectionIfMissing(invoiceCollection, invoice);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(invoice);
      });

      it('should add only unique Invoice to an array', () => {
        const invoiceArray: IInvoice[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const invoiceCollection: IInvoice[] = [sampleWithRequiredData];
        expectedResult = service.addInvoiceToCollectionIfMissing(invoiceCollection, ...invoiceArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const invoice: IInvoice = sampleWithRequiredData;
        const invoice2: IInvoice = sampleWithPartialData;
        expectedResult = service.addInvoiceToCollectionIfMissing([], invoice, invoice2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(invoice);
        expect(expectedResult).toContain(invoice2);
      });

      it('should accept null and undefined values', () => {
        const invoice: IInvoice = sampleWithRequiredData;
        expectedResult = service.addInvoiceToCollectionIfMissing([], null, invoice, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(invoice);
      });

      it('should return initial array if no Invoice is added', () => {
        const invoiceCollection: IInvoice[] = [sampleWithRequiredData];
        expectedResult = service.addInvoiceToCollectionIfMissing(invoiceCollection, undefined, null);
        expect(expectedResult).toEqual(invoiceCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
