export interface InvoiceDTO {
  invoiceNumber: string;
  issueDate: Date;
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
  address: AddressDTO;
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
