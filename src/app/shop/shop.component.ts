import { Component } from '@angular/core';
import { AllProductComponent } from '../shared/componets/allProduct/all-product/all-product.component';

@Component({
  imports: [AllProductComponent],
  selector: 'app-shop',
  styleUrl: './shop.component.css',
  templateUrl: './shop.component.html',
})
export class ShopComponent {}
