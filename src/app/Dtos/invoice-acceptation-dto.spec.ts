import {InvoiceAcceptationDto} from './invoice-acceptation-dto';
import {InvoiceStatusDto} from './Enums/invoice-status-dto';

describe('InvoiceAcceptationDto', () => {
  it('should create an instance', () => {
    expect(new InvoiceAcceptationDto("", "", InvoiceStatusDto.Approved, "", "", "")).toBeTruthy();
  });
});
