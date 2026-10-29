import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../core/services/products.service';
import { IProducts } from '../core/models/product/iproducts.interface';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  imports: [CarouselModule],
  selector: 'app-p-details',
  styleUrl: './p-details.component.css',
  templateUrl: './p-details.component.html',
})
export class PDetailsComponent implements OnInit{
   customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  private _ActivatedRoute= inject(ActivatedRoute);
  private _ProductsService= inject(ProductsService);
  private _CartService= inject(CartService);
  private _ToastrService= inject(ToastrService);
  pDetails =signal<IProducts>(  {} as IProducts)
  pId =signal<string>('')

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe( (route) =>{
    const id = route.get('id');
    if (id){
      this.pId.set(id);
    this.GetProductsDetails()

  }
  });
}

  GetProductsDetails(){
  this._ProductsService.GetSpecificProducts(this.pId()).subscribe({
    next:(res)=>{
      console.log(res);
      this.pDetails.set(res.data)
    }
  })
  }

  addToProduct(p_id:string){
  this._CartService.AddProductToCart(p_id).subscribe({
    next:(res)=>{
      this._ToastrService.success(res.message , 'Add To Cart')
    }
  })
}

}
