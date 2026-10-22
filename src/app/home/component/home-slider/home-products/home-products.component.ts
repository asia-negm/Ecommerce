import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../../../core/services/products.service';
import { IProducts } from '../../../../core/models/product/iproducts.interface';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  imports: [CurrencyPipe, RouterLink],
  selector: 'app-home-products',
  styleUrl: './home-products.component.css',
  templateUrl: './home-products.component.html',
})
export class HomeProductsComponent implements OnInit{
  private _ProductsService= inject(ProductsService);

  products = signal<IProducts[]>([]);

ngOnInit(): void {
 this.GetAllProducts()
}

GetAllProducts(){
  this._ProductsService.GetAllProducts().subscribe({
    next:(res)=>{
      console.log(res)
      this.products.set(res.data)
    },
    error:(err)=> {
      console.log(err)

    },
  })
}

}
