import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {CartService} from "../../../shared/services/cart.service";
import {CartType} from "../../../../types/cart.type";
import {checkResponse} from "../../../shared/helpers/response.helper";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DeliveryType} from "../../../../types/delivery.type";
import {FormBuilder, Validators} from "@angular/forms";
import {PaymentType} from "../../../../types/payment.type";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  cart: CartType | null = null;
  totalAmount: number = 0;
  totalCount: number = 0;
  deliveryType: DeliveryType = DeliveryType.delivery;
  deliveryTypes = DeliveryType;
  paymentTypes = PaymentType;

  orderForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: ['', Validators.required],
    fatherName: [''],
    paymentType: [PaymentType.cashToCourier, Validators.required],
    email: ['', [Validators.required, Validators.email]],
    street: [''],
    house: [''],
    entrance: [''],
    apartment: [''],
    comment: ['']
  });

  @ViewChild('popup') popup!: TemplateRef<ElementRef>;

  constructor(private cartService: CartService,
              private router: Router,
              private _snackBar: MatSnackBar,
              private fb: FormBuilder,
              private dialog: MatDialog,) {
    this.updateDeliveryTypeValidator();
  }

  ngOnInit(): void {
    this.cartService.getCart()
      .subscribe((data) => {
        const result = checkResponse<CartType>(data);
        this.cart = result;
        if (!this.cart || (this.cart && this.cart.items.length === 0)) {
          this._snackBar.open('Корзина пустая');
          this.router.navigate(['/catalog']);
          return;
        }
        this.calculateTotal();
      });
  }

  createOrder(): void {
    // if (this.orderForm.valid) {
      this.dialog.open(this.popup);
    // }
  }

  calculateTotal() {
    this.totalAmount = 0;
    this.totalCount = 0;
    this.cart?.items.forEach(item => {
      this.totalAmount += item.quantity * item.product.price;
      this.totalCount += item.quantity;
    });
  }

  changeDeliveryType(type: DeliveryType) {
    this.deliveryType = type;
    this.updateDeliveryTypeValidator();
  }

  updateDeliveryTypeValidator() {
    if (this.deliveryType === DeliveryType.delivery) {
      this.orderForm.get('street')?.setValidators(Validators.required);
      this.orderForm.get('house')?.setValidators(Validators.required);
    } else {
      this.orderForm.get('street')?.removeValidators(Validators.required);
      this.orderForm.get('house')?.removeValidators(Validators.required);
      this.orderForm.get('street')?.setValue('');
      this.orderForm.get('house')?.setValue('');
    }
    this.orderForm.get('street')?.updateValueAndValidity();
    this.orderForm.get('house')?.updateValueAndValidity();
  }

  closePopup() {
    //...
  }


  protected readonly PaymentType = PaymentType;
}
