import { DecimalPipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../core/services/cart/cart.service';
import { ICart } from '../core/models/cart/icart.interface';

type CartItem = { id: number; name: string; category: string; sku: string; price: number; image: string; quantity: number };

@Component({
  imports: [DecimalPipe, RouterLink],
  selector: 'app-cart',
  styleUrl: './cart.component.css',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {

  private _CartService =inject(CartService);
  CartDetails =signal<ICart>( {} as ICart)

  ngOnInit(): void {
    this._CartService.GetLoggedUserCart().subscribe({
      next:(res)=>{
        console.log(res)
        this.CartDetails.set(res)
      }
    })
  }

}
