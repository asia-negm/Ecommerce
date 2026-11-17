import { Component, inject, input, InputSignal, signal } from '@angular/core';
import { ProductsService } from '../../../../core/services/products.service';
import { CartService } from '../../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { IProducts } from '../../../../core/models/product/iproducts.interface';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  imports: [CurrencyPipe, RouterLink],
  selector: 'app-all-product',
  styleUrl: './all-product.component.css',
  templateUrl: './all-product.component.html',
})
export class AllProductComponent {
  private _ProductsService = inject(ProductsService);
  private _CartService = inject(CartService)
  private _ToastrService = inject(ToastrService)
  private _CookieService = inject(CookieService)
  private _NgxSpinnerService = inject(NgxSpinnerService)
  products = signal<IProducts[]>([]);

    flag:InputSignal<boolean> = input.required()


ngOnInit(): void {
 this.GetAllProducts()
}

GetAllProducts(){
  this._NgxSpinnerService.show()
  this._ProductsService.GetAllProducts().subscribe({
    next:(res)=>{
      console.log(res)
      this.products.set(res.data)
        this._NgxSpinnerService.hide()


    },
    error:(err)=> {
      console.log(err)

    },
  })
}

addToProduct(p_id:string){
  if(this._CookieService.get('userToken')){
    this._CartService.AddProductToCart(p_id).subscribe({
      next:(res)=>{
        this._ToastrService.success(res.message , 'Add To Cart')
        this._CartService.count.set(res.numOfCartItems)
      }
    })

  }else{
    let unLoggedCart = localStorage.getItem('unLoggedCart')
    if(unLoggedCart){
      let cart = JSON.parse(localStorage.getItem('unLoggedCart') !)
      if(cart.some( (product:any) => product.productId === p_id)){
        cart.map( (product:any) => product.productId === p_id ? product.quantity++ : product)
        localStorage.setItem('unLoggedCart' , JSON.stringify(cart))
      }else{
      cart.push( {productId: p_id ,quantity: 1})
              localStorage.setItem('unLoggedCart' , JSON.stringify(cart))
      }

    }else{
      localStorage.setItem('unLoggedCart' ,JSON.stringify([{productId: p_id ,quantity: 1}]))
    }
  }
}


}


