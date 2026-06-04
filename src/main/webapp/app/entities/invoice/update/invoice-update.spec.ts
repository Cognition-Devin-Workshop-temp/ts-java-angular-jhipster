import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { IBankAccount } from 'app/entities/bank-account/bank-account.model';
import { BankAccountService } from 'app/entities/bank-account/service/bank-account.service';
import { InvoiceService } from '../service/invoice.service';
import { IInvoice } from '../invoice.model';
import { InvoiceFormService } from './invoice-form.service';

import { InvoiceUpdate } from './invoice-update';

import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('Invoice Management Update Component', () => {
  let comp: InvoiceUpdate;
  let fixture: ComponentFixture<InvoiceUpdate>;
  let activatedRoute: ActivatedRoute;
  let invoiceFormService: InvoiceFormService;
  let invoiceService: InvoiceService;
  let bankAccountService: BankAccountService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceUpdate],
      providers: [
        provideHttpClient(),
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            data: of({ invoice: null }),
          },
        },
      ],
    })
      .overrideTemplate(InvoiceUpdate, '')
      .compileComponents();

    fixture = TestBed.createComponent(InvoiceUpdate);
    activatedRoute = TestBed.inject(ActivatedRoute);
    invoiceFormService = TestBed.inject(InvoiceFormService);
    invoiceService = TestBed.inject(InvoiceService);
    bankAccountService = TestBed.inject(BankAccountService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call BankAccount query and add missing value', () => {
      const invoice: IInvoice = { id: 456, number: 'INV-001', date: '2024-01-15', dueDate: '2024-02-15', amount: 100, status: 'DRAFT' };
      const bankAccount: IBankAccount = { id: 12345, name: 'Test Account', balance: 1000 };
      invoice.bankAccount = bankAccount;

      const bankAccountCollection: IBankAccount[] = [{ id: 67890, name: 'Another Account', balance: 2000 }];
      vi.spyOn(bankAccountService, 'query').mockReturnValue(of(new HttpResponse({ body: bankAccountCollection })));
      const additionalBankAccounts = [bankAccount];
      const expectedCollection: IBankAccount[] = [...additionalBankAccounts, ...bankAccountCollection];
      vi.spyOn(bankAccountService, 'addBankAccountToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ invoice });
      comp.ngOnInit();

      expect(bankAccountService.query).toHaveBeenCalled();
      expect(bankAccountService.addBankAccountToCollectionIfMissing).toHaveBeenCalledWith(bankAccountCollection, ...additionalBankAccounts);
      expect(comp.bankAccountsSharedCollection()).toEqual(expectedCollection);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', fakeAsync(() => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IInvoice>>();
      const invoice: IInvoice = { id: 123, number: 'INV-001', date: '2024-01-15', dueDate: '2024-02-15', amount: 100, status: 'DRAFT' };
      vi.spyOn(invoiceFormService, 'getInvoice').mockReturnValue(invoice);
      vi.spyOn(invoiceService, 'update').mockReturnValue(saveSubject);
      comp.invoice = invoice;

      comp.editForm = invoiceFormService.createInvoiceFormGroup(invoice);
      comp.save();
      expect(invoiceService.update).toHaveBeenCalledWith(invoice);
      expect(comp.isSaving()).toBe(true);

      saveSubject.next(new HttpResponse({ body: invoice }));
      saveSubject.complete();
      tick();

      expect(comp.isSaving()).toBe(false);
    }));

    it('should call create service on save for new entity', fakeAsync(() => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IInvoice>>();
      const invoice = { id: null } as any;
      vi.spyOn(invoiceFormService, 'getInvoice').mockReturnValue(invoice);
      vi.spyOn(invoiceService, 'create').mockReturnValue(saveSubject);

      comp.editForm = invoiceFormService.createInvoiceFormGroup();
      comp.save();
      expect(invoiceService.create).toHaveBeenCalledWith(invoice);
      expect(comp.isSaving()).toBe(true);

      saveSubject.next(new HttpResponse({ body: { ...invoice, id: 123 } }));
      saveSubject.complete();
      tick();

      expect(comp.isSaving()).toBe(false);
    }));
  });
});
