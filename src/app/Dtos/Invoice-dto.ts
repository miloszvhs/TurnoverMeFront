import {InvoiceStatusDto} from './Enums/invoice-status-dto';

export class InvoiceDto {
  guid: string;
  invoiceNumber: string;
  status: InvoiceStatusDto;
  creationDate: string;
  saleDate: string;
  stage: string;
  procedure: string;
  responsiblePerson: any;
  issueDate: Date;

  constructor(guid: string, invoiceNumber: string, status: InvoiceStatusDto, creationDate: string, saleDate: string, stage: string, procedure: string, responsiblePerson: string, issueDate: Date) {
    this.guid = guid;
    this.invoiceNumber = invoiceNumber
    this.status = status;
    this.creationDate = creationDate;
    this.saleDate = saleDate;
    this.stage = stage;
    this.procedure = procedure;
    this.responsiblePerson = responsiblePerson;
    this.issueDate = issueDate;
  }
}

