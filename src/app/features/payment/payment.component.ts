import { Component, inject, OnInit, signal } from '@angular/core';
import { OrdersService } from '../../core/services/Orders/orders.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { form, validate } from '@angular/forms/signals';

@Component({
  imports: [],
  selector: 'app-payment',
  styleUrl: './payment.component.css',
  templateUrl: './payment.component.html',
})
export class PaymentComponent implements OnInit {
  private _OrdersService=inject(OrdersService);
  private _ActivatedRoute=inject(ActivatedRoute);
  cartId =signal<string>('')

ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe( (param) => this.cartId.set( param.get('id')!) )
}

checkOut = new FormGroup({
  details: new FormControl(null , Validators.required),
  phone: new FormControl(null , Validators.required),
  city: new FormControl(null , Validators.required),
  postalCode: new FormControl(null , Validators.required)
})

// submitFormDetails(){
//   if(this.checkOut.valid){
//     this._OrdersService.Checkoutsession(this.cartId)
//   }
// }

}

