import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Flowbite } from '../../../core/services/flowbite/flowbite';
import { initFlowbite } from 'flowbite';

@Component({
  imports: [RouterLink , RouterLinkActive],
  selector: 'app-navbar',
  styleUrl: './navbar.component.css',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  private _Flowbite= inject(Flowbite)
   ngOnInit(): void {
    this._Flowbite.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }
}
