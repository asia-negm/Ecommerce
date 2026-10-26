import { AfterViewInit, Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Flowbite } from '../../../core/services/flowbite/flowbite';
import { initFlowbite } from 'flowbite';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../../core/services/Auth/auth.service';

@Component({
  imports: [RouterLink , RouterLinkActive],
  selector: 'app-navbar',
  styleUrl: './navbar.component.css',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit   {
  private _Flowbite= inject(Flowbite);
  private _AuthService =inject(AuthService);
  private _CookieService = inject(CookieService);
  isLogged = computed( ()=> this._AuthService.isLogging() )
  userDetails = computed( ()=> this._AuthService.userOnfo)





   ngOnInit(): void {
    if(this._CookieService.get('userToken')){
      this._AuthService.isLogging.set(true)
      this._AuthService.decodeToken()
    }
    this._Flowbite.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

  ngAfterViewInit(): void {
     this._Flowbite.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

  logOut(){
    this._CookieService.delete('userToken');
    this._AuthService.isLogging.set(false);
  }
}
