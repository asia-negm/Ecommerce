import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors, withXhr } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import { headerInterceptor } from './core/services/flowbite/interceptors/header/header-interceptor';
import { CarouselModule } from 'ngx-owl-carousel-o';


export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(CookieService ,CarouselModule),
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withXhr() , withInterceptors([headerInterceptor])),
    provideRouter(routes , withViewTransitions() , withInMemoryScrolling({scrollPositionRestoration:'top' , anchorScrolling:'enabled'})), provideClientHydration()
  ]
};
