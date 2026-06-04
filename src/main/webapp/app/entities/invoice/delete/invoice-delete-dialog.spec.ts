import { ComponentFixture, TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { InvoiceService } from '../service/invoice.service';

import { InvoiceDeleteDialog } from './invoice-delete-dialog';

import { beforeEach, describe, expect, it, vi } from 'vitest';

class MockActiveModal {
  close = vi.fn();
  dismiss = vi.fn();
}

describe('Invoice Management Delete Component', () => {
  let comp: InvoiceDeleteDialog;
  let fixture: ComponentFixture<InvoiceDeleteDialog>;
  let service: InvoiceService;
  let mockActiveModal: MockActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InvoiceDeleteDialog],
      providers: [provideHttpClient(), { provide: NgbActiveModal, useClass: MockActiveModal }],
    })
      .overrideTemplate(InvoiceDeleteDialog, '')
      .compileComponents();
    fixture = TestBed.createComponent(InvoiceDeleteDialog);
    comp = fixture.componentInstance;
    service = TestBed.inject(InvoiceService);
    mockActiveModal = TestBed.inject(NgbActiveModal) as unknown as MockActiveModal;
  });

  describe('confirmDelete', () => {
    it('should call delete service on confirmDelete', inject(
      [],
      fakeAsync(() => {
        // GIVEN
        vi.spyOn(service, 'delete').mockReturnValue(of(new HttpResponse({ body: {} })));

        // WHEN
        comp.confirmDelete(123);
        tick();

        // THEN
        expect(service.delete).toHaveBeenCalledWith(123);
        expect(mockActiveModal.close).toHaveBeenCalledWith('deleted');
      }),
    ));

    it('should not call delete service on cancel', () => {
      vi.spyOn(service, 'delete');

      // WHEN
      comp.cancel();

      // THEN
      expect(service.delete).not.toHaveBeenCalled();
      expect(mockActiveModal.dismiss).toHaveBeenCalled();
    });
  });
});
