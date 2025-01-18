import {InvoiceStatusDto} from './Enums/invoice-status-dto';

export class InvoiceAcceptationDto {
  guid: string;
  name: string;
  status: InvoiceStatusDto;
  creationDate: string;
  modificationDate: string;
  invoiceFileAsBase64: string;
  stage: string;
  procedure: string;
  responsiblePerson: any;
  issueDate: Date;
  invoiceNumber: any;
  grossAmount: number;
  netAmount: number;
  currency: string;
  dueDate: Date;
  comments: string[];
  remarks: string;

  constructor(guid: string, name: string, status: InvoiceStatusDto, creationDate: string, modificationDate: string, invoiceFileAsBase64: string, stage: string, procedure: string, responsiblePerson: any, issueDate: Date, invoiceNumber: any, grossAmount: number, netAmount: number, currency: string, dueDate: Date, comments: string[], remarks: string) {
    this.guid = guid;
    this.name = name;
    this.status = status;
    this.creationDate = creationDate;
    this.modificationDate = modificationDate;
    this.invoiceFileAsBase64 = invoiceFileAsBase64;
    this.stage = stage;
    this.procedure = procedure;
    this.responsiblePerson = responsiblePerson;
    this.issueDate = issueDate;
    this.invoiceNumber = invoiceNumber;
    this.grossAmount = grossAmount;
    this.netAmount = netAmount;
    this.currency = currency;
    this.dueDate = dueDate;
    this.comments = comments;
    this.remarks = remarks;
  }
}

