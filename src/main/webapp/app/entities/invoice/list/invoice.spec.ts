import { ComponentFixture, TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { HttpHeaders, HttpResponse, provideHttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { InvoiceService } from '../service/invoice.service';
import { sampleWithRequiredData } from '../invoice.test-samples';

import { InvoiceComponent } from './invoice';

import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('Invoice Management Component', () => {
  let comp: InvoiceComponent;
  let fixture: ComponentFixture<InvoiceComponent>;
  let service: InvoiceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceComponent],
      providers: [
        provideHttpClient(),
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              }),
            ),
          },
        },
      ],
    })
      .overrideTemplate(InvoiceComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(InvoiceComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(InvoiceService);

    const headers = new HttpHeaders();
    vi.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123, number: 'INV-001', date: '2024-01-15', dueDate: '2024-02-15', amount: 100, status: 'DRAFT' }],
          headers,
        }),
      ),
    );
  });

  it('should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.invoices()[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('should forward to invoiceService', () => {
      const entity = { id: 123, number: 'INV-001', date: '2024-01-15', dueDate: '2024-02-15', amount: 100, status: 'DRAFT' as const };
      vi.spyOn(service, 'getInvoiceIdentifier');
      const id = comp.trackId(entity);
      expect(service.getInvoiceIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
