import { DecimalPipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../core/services/cart/cart.service';
import { ICart } from '../core/models/cart/icart.interface';
import { ToastrService } from 'ngx-toastr';

type CartItem = { id: number; name: string; category: string; sku: string; price: number; image: string; quantity: number };

@Component({
  imports: [DecimalPipe, RouterLink],
  selector: 'app-cart',
  styleUrl: './cart.component.css',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {

  private _CartService =inject(CartService);
  private _ToastrService =inject(ToastrService)
    CartDetails =signal<ICart>( {} as ICart)

  ngOnInit(): void {
    this._CartService.GetLoggedUserCart().subscribe({
      next:(res)=>{
        console.log(res)
        this.CartDetails.set(res)
      }
    })
  }

  updateCartCount(p_id:string ,count:number){
    if(count >= 1){
      this._CartService.UpdateCartProductQuantity(p_id , count).subscribe({
        next:(res)=>{
    console.log(res);
               this.CartDetails.set(res)

        }
      })

    }
  }

  removeFromCart(p_id:string){
    this._CartService.RemoveProductFromCart(p_id).subscribe({
      next:(res)=>{
              this._ToastrService.remove(res.message)
              this.CartDetails.set(res)

      }
    })
  }
}
