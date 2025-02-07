import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {InvoiceApiService} from '../../../services/invoice/invoice-api.service';
import {InvoiceDto} from '../../../Dtos/Invoice-dto';
import {InvoiceDTO} from '../../../Dtos/invoicedto';
import {Router} from '@angular/router';

@Component({
  selector: 'app-chambers-create',
    imports: [
        NgForOf,
        NgIf,
        ReactiveFormsModule
    ],
  templateUrl: './chambers-create.component.html',
  styleUrl: './chambers-create.component.css'
})
export class ChambersCreateComponent {
  public invoiceForm: FormGroup = new FormGroup({});
  private invoiceApiService: InvoiceApiService;
  protected errorMessage: any;
  protected successMessage: any;

  constructor(private fb: FormBuilder, invoiceApiService: InvoiceApiService, private router: Router) {
    this.invoiceApiService = invoiceApiService;
  }

  toInvoiceDTO(): InvoiceDTO {
    const formValue = this.invoiceForm.value;
    return {
      invoiceNumber: formValue.invoiceNumber,
      issueDate: formValue.issueDate,
      seller: formValue.seller,
      buyer: formValue.buyer,
      hasReceiver: formValue.hasReceiver,
      receiver: formValue.hasReceiver ? formValue.receiver : undefined,
      deliveryDate: formValue.deliveryDate,
      items: formValue.items,
      totalNetAmount: formValue.totalNetAmount,
      totalTaxAmount: formValue.totalTaxAmount,
      totalGrossAmount: formValue.totalGrossAmount,
      currency: formValue.currency,
      remarks: formValue.remarks
    };
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
    this.invoiceForm.markAllAsTouched();

    if (this.invoiceForm.invalid) {
      this.errorMessage = 'Please complete all required fields correctly';
      this.successMessage = '';
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';

    if (this.invoiceForm?.valid) {
      console.log('Invoice data:', this.invoiceForm.value);
      this.invoiceApiService.postInvoice(this.toInvoiceDTO())
        .subscribe({
          next: (response) => {
            this.successMessage = 'Invoice saved!';
            setTimeout(() => {
              this.router.navigate(['/chambers-index']);
            }, 1500);
          },
          error: (err) => {
            this.errorMessage = err.error?.message || 'Internal server error. Try again.';
          }
        });
    } else {
      console.log('Form contains errors!');
    }
  }
}


