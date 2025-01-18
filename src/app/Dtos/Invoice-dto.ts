import {InvoiceStatusDto} from './Enums/invoice-status-dto';

export class InvoiceDto {
  guid: string;
  name: string;
  status: InvoiceStatusDto;
  creationDate: string;
  modificationDate: string;
  invoiceFileAsBase64: string;

  constructor(guid: string, name: string, status: InvoiceStatusDto, creationDate: string, modificationDate: string, invoiceFileAsBase64: string) {
    this.guid = guid;
    this.name = name;
    this.status = status;
    this.creationDate = creationDate;
    this.modificationDate = modificationDate;
    this.invoiceFileAsBase64 = invoiceFileAsBase64;
  }
}

