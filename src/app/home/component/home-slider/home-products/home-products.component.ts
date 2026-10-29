import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../../../core/services/products.service';
import { IProducts } from '../../../../core/models/product/iproducts.interface';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  imports: [CurrencyPipe, RouterLink],
  selector: 'app-home-products',
  styleUrl: './home-products.component.css',
  templateUrl: './home-products.component.html',
})
export class HomeProductsComponent implements OnInit{
  private _ProductsService= inject(ProductsService);
  private _CartService = inject(CartService)
  private _ToastrService =inject(ToastrService)
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

addToProduct(p_id:string){
  this._CartService.AddProductToCart(p_id).subscribe({
    next:(res)=>{
      this._ToastrService.success(res.message , 'Add To Cart')
      this._CartService.count.set(res.numOfCartItems)
    }
  })
}

}
