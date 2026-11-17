import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors, withXhr } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import { headerInterceptor } from './core/services/flowbite/interceptors/header/header-interceptor';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { provideToastr } from 'ngx-toastr';
import { errorInterceptor } from './core/interceptors/error-interceptor';
import { ngxSpinnerInterceptor, NgxSpinnerModule } from "ngx-spinner";




export const appConfig: ApplicationConfig = {
  providers: [
    provideToastr(),
    importProvidersFrom(CookieService ,CarouselModule ,NgxSpinnerModule),
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withXhr() , withInterceptors([headerInterceptor , errorInterceptor])),
    provideRouter(routes , withViewTransitions() , withInMemoryScrolling({scrollPositionRestoration:'top' , anchorScrolling:'enabled'})), provideClientHydration()
  ]
};
