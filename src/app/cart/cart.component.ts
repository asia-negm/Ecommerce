import { DecimalPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';

type CartItem = { id: number; name: string; category: string; sku: string; price: number; image: string; quantity: number };

@Component({
  imports: [DecimalPipe, RouterLink],
  selector: 'app-cart',
  styleUrl: './cart.component.css',
  templateUrl: './cart.component.html',
})
export class CartComponent  {
  items: CartItem[] = [ ];
  private _CartService = inject(CartService)

  get itemCount(): number { return this.items.reduce((count, item) => count + item.quantity, 0); }
  get subtotal(): number { return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0); }

  changeQuantity(item: CartItem, amount: number): void {
    item.quantity = Math.max(1, item.quantity + amount);
  }

  removeItem(id: number): void { this.items = this.items.filter(item => item.id !== id); }
  clearCart(): void { this.items = []; }
  //  ngOnInit(p_id:string , count:number): void {
  //    this._CartService.UpdateCartProductQuantity(p_id , count).subscribe({
  //     next:
  //    })
  //  }
}
