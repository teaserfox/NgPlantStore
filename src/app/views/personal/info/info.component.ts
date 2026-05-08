import { Component, OnInit } from '@angular/core';
import {PaymentType} from "../../../../types/payment.type";
import {DeliveryType} from "../../../../types/delivery.type";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  userInfoForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    phone: [''],
    fatherName: [''],
    paymentType: [PaymentType.cashToCourier],
    email: [''],
    street: [''],
    house: [''],
    entrance: [''],
    apartment: ['']
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

    protected readonly paymentTypes = PaymentType;
    protected readonly deliveryTypes = DeliveryType;
}
