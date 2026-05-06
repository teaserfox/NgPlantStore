import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../../core/auth/auth.service";
import {Observable} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {CategoryWithTypeType} from "../../../../types/category-with-type.type";
import {CartService} from "../../services/cart.service";
import {DefaultResponseType} from "../../../../types/default-response.type";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLogged$: Observable<boolean>;
  count: number = 0;
  @Input() categories: CategoryWithTypeType[] = [];

  constructor(private authService: AuthService,
              private snackBar: MatSnackBar,
              private cartService: CartService,
              private router: Router) {
    this.isLogged$ = this.authService.isLogged$;
  }


  ngOnInit(): void {
    this.cartService.count$
      .subscribe(count => {
        this.count = count;
      })
  }

  logout(): void {
    this.authService.logout()
      .subscribe({
        next: () => {
          this.doLogout();
        },
        error: () => {
          this.doLogout();
          }
      })
  }

  doLogout(): void {
    this.authService.removeTokens();
    this.authService.userId = null;
    this.cartService.resetCart();
    this.snackBar.open('Вы вышли из системы');
    this.router.navigate(['/']);
  }
}
