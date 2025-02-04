import { Component } from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {InvoiceApiService} from '../../services/invoice/invoice-api.service';

@Component({
  selector: 'app-invoice-create',
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './invoice-create.component.html',
  styleUrl: './invoice-create.component.css'
})
export class InvoiceCreateComponent {
  public invoiceForm: FormGroup = new FormGroup({});
  private invoiceApiService: InvoiceApiService;

  constructor(private fb: FormBuilder, invoiceApiService: InvoiceApiService) {
    this.invoiceApiService = invoiceApiService;
  }

  ngOnInit(): void {
    this.invoiceForm = this.fb.group({
      invoiceNumber: [''],
      issueDate: [new Date(), Validators.required],
      seller: this.fb.group({
        name: ['', Validators.required],
        address: this.fb.group({
          street: [''],
          streetNumber: [''],
          flatNumber: [''],
          city: [''],
          postCode: [''],
          country: ['']
        }),
        taxNumber: this.fb.group({
          taxNumber: [''],
          taxPrefix: ['']
        })
      }),
      buyer: this.fb.group({
        name: ['', Validators.required],
        address: this.fb.group({
          street: [''],
          streetNumber: [''],
          flatNumber: [''],
          city: [''],
          postCode: [''],
          country: ['']
        }),
        taxNumber: this.fb.group({
          taxNumber: [''],
          taxPrefix: ['']
        })
      }),
      hasReceiver: [false],
      receiver: this.fb.group({
        name: [''],
        address: this.fb.group({
          street: [''],
          streetNumber: [''],
          flatNumber: [''],
          city: [''],
          postCode: [''],
          country: ['']
        }),
        taxNumber: this.fb.group({
          taxNumber: [''],
          taxPrefix: ['']
        })
      }),
      deliveryDate: [null],
      items: this.fb.array([], Validators.required),
      totalNetAmount: [0],
      totalTaxAmount: [0],
      totalGrossAmount: [0],
      currency: [''],
      remarks: ['']
    });

    this.addItem();
  }

  get items(): FormArray {
    return this.invoiceForm?.get('items') as FormArray;
  }

  addItem(): void {
    const itemForm = this.fb.group({
      name: ['', Validators.required],
      unit: ['', Validators.required],
      quantity: [0, Validators.required],
      unitNetPrice: [0, Validators.required],
      discount: [0],
      netValue: [0],
      taxRate: [0],
      taxAmount: [0],
      grossValue: [0]
    });

    itemForm.valueChanges.subscribe(() => {
      this.updateItemCalculations(itemForm);
      this.updateTotals();
    });

    this.items.push(itemForm);
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
    this.updateTotals();
  }

  updateItemCalculations(itemGroup: FormGroup): void {
    const quantity = +itemGroup.get('quantity')?.value || 0;
    const unitNetPrice = +itemGroup.get('unitNetPrice')?.value || 0;
    const discount = +itemGroup.get('discount')?.value || 0;
    const taxRate = +itemGroup.get('taxRate')?.value || 0;

    const baseValue = (quantity * unitNetPrice) - discount;
    const itemGross = this.round(baseValue * (1 + taxRate / 100));
    const itemTax = this.round(itemGross * taxRate / (100 + taxRate));
    const itemNet = this.round(itemGross - itemTax);

    itemGroup.patchValue({
      grossValue: itemGross,
      taxAmount: itemTax,
      netValue: itemNet
    }, { emitEvent: false });
  }

  updateTotals(): void {
    let totalNet = 0, totalTax = 0, totalGross = 0;
    this.items.controls.forEach((value: AbstractControl) => {
      const item = value as FormGroup;
      totalNet += +item.get('netValue')?.value || 0;
      totalTax += +item.get('taxAmount')?.value || 0;
      totalGross += +item.get('grossValue')?.value || 0;
    });

    this.invoiceForm.patchValue({
      totalNetAmount: this.round(totalNet),
      totalTaxAmount: this.round(totalTax),
      totalGrossAmount: this.round(totalGross)
    }, { emitEvent: false });
  }

  private round(value: number): number {
    return Math.round(value * 100) / 100;
  }

  onSubmit(): void {
    if (this.invoiceForm?.valid) {
      console.log('Invoice data:', this.invoiceForm.value);
      this.invoiceApiService.postInvoice(this.invoiceForm)
        .subscribe(result => {
          if(result.status) {
            console.log(result.message);
          } else {
            console.error(result.message, result.error);
          }
        });
    } else {
      console.log('Form contains errors!');
    }
  }
}
