import { TestBed } from '@angular/core/testing';

import { InvoiceAcceptationService } from './invoice-acceptation.service';

describe('InvoiceAcceptationService', () => {
  let service: InvoiceAcceptationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoiceAcceptationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
