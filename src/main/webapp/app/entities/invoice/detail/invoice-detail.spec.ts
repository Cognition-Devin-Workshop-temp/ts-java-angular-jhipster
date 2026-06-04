import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { InvoiceDetail } from './invoice-detail';

import { beforeEach, describe, expect, it } from 'vitest';

describe('Invoice Management Detail Component', () => {
  let comp: InvoiceDetail;
  let fixture: ComponentFixture<InvoiceDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceDetail, TranslateModule.forRoot()],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./invoice-detail').then(m => m.InvoiceDetail),
              resolve: {
                invoice: () => ({ id: 123, number: 'INV-001', date: '2024-01-15', dueDate: '2024-02-15', amount: 1500, status: 'DRAFT' }),
              },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(InvoiceDetail, '')
      .compileComponents();

    fixture = TestBed.createComponent(InvoiceDetail);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('should render component', () => {
      expect(comp).toBeTruthy();
    });
  });
});
