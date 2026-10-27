import { DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

type CartItem = { id: number; name: string; category: string; sku: string; price: number; image: string; quantity: number };

@Component({
  imports: [DecimalPipe, RouterLink],
  selector: 'app-cart',
  styleUrl: './cart.component.css',
  templateUrl: './cart.component.html',
})
export class CartComponent {
  items: CartItem[] = [
    { id: 1, name: 'Woman Shawl', category: "Women's Fashion", sku: 'SKU 5CADA0', price: 149, image: '/image/img1.avif', quantity: 2 },
    { id: 2, name: 'Woman Standart Fit Knitted Cardigan', category: "Women's Fashion", sku: 'SKU 5CDA84', price: 499, image: '/image/img2.avif', quantity: 1 },
    { id: 3, name: 'Woman Shawl', category: "Women's Fashion", sku: 'SKU 5CA096', price: 349, image: '/image/img3.avif', quantity: 2 },
    { id: 4, name: 'Woman Bordeaux Long Sleeve Blouse BORDEAUX', category: "Women's Fashion", sku: 'SKU 5CAD30', price: 499, image: '/image/img4.avif', quantity: 1 },
  ];

  get itemCount(): number { return this.items.reduce((count, item) => count + item.quantity, 0); }
  get subtotal(): number { return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0); }

  changeQuantity(item: CartItem, amount: number): void {
    item.quantity = Math.max(1, item.quantity + amount);
  }

  removeItem(id: number): void { this.items = this.items.filter(item => item.id !== id); }
  clearCart(): void { this.items = []; }
}
