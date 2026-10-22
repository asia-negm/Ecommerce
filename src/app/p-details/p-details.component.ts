import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../core/services/products.service';
import { IProducts } from '../core/models/product/iproducts.interface';


@Component({
  imports: [],
  selector: 'app-p-details',
  styleUrl: './p-details.component.css',
  templateUrl: './p-details.component.html',
})
export class PDetailsComponent implements OnInit{
  private _ActivatedRoute= inject(ActivatedRoute);
  private _ProductsService= inject(ProductsService);
  pDetails =signal<IProducts>(  {} as IProducts)
  pId =signal<string>('')

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe( (route) =>
    this.pId.set(route.get('id') !)
    )
    this.GetProductsDetails()
  }

  GetProductsDetails(){
  this._ProductsService.GetSpecificProducts(this.pId()).subscribe({
    next:(res)=>{
      console.log(res);
      this.pDetails.set(res.data)
    }
  })
  }

}
