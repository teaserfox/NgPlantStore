import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../../shared/services/order.service";
import {AuthService} from "../../../core/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  constructor(private orderService: OrderService,
              private authService: AuthService,
              private router: Router) { }


  ngOnInit(): void {
  }

}
