export interface InvoiceDTO {
  invoiceNumber: string;
  status: InvoiceStatus;
  issueDate: Date;
  dueDate: Date;
  seller: PartyDTO;
  //buyer: PartyDTO;
  //hasReceiver: boolean;
  //receiver?: PartyDTO;
  //deliveryDate: Date | null;
  //items: ItemDTO[];
  totalNetAmount: number;
  totalTaxAmount: number;
  totalGrossAmount: number;
  currency: string;
  remarks: string;
  invoiceFileAsBase64: string;
}

export interface InvoiceResponseDTO {
  id: string;
  invoiceNumber: string;
  status: InvoiceStatus;
  issueDate: Date;
  dueDate: Date;
  seller: PartyDTO;
  buyer: PartyDTO;
  hasReceiver: boolean;
  receiver?: PartyDTO;
  deliveryDate: Date | null;
  items: ItemDTO[];
  totalNetAmount: number;
  totalTaxAmount: number;
  totalGrossAmount: number;
  currency: string;
  remarks: string;
  invoiceFileAsBase64: string;
  approvalHistories: InvoiceApprovalHistoryDTO[];
}

export interface InvoiceApprovalHistoryDTO {
  invoiceId: string;
  executor?: string;
  creationTime: Date;
  executionTime?: Date;
  stageName: string;
  isAccepted: boolean;
  note?: string;
}



export enum InvoiceStatus {
  New = "New",
  Approved = "Approved",
  Rejected = "Rejected",
  PendingApproval = "PendingApproval"
}

interface AddressDTO {
  street: string;
  streetNumber: string;
  flatNumber: string;
  city: string;
  postCode: string;
  country: string;
}

interface TaxNumberDTO {
  taxNumber: string;
  taxPrefix: string;
}

interface PartyDTO {
  name: string;
  //address: AddressDTO;
  taxNumber: TaxNumberDTO;
}

interface ItemDTO {
  name: string;
  unit: string;
  quantity: number;
  unitNetPrice: number;
  discount: number;
  netValue: number;
  taxRate: number;
  taxAmount: number;
  grossValue: number;
}
