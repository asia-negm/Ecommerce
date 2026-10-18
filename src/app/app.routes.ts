import { Routes } from '@angular/router';

export const routes: Routes = [
  {path:'' , redirectTo:'home' , pathMatch:'full'},
  {path:'home' , title:'Fresh-Cart | Main Page'},
  {path:'shop' , title:'Fresh-Cart | Main Page'},
  {path:'brands' , title:'Fresh-Cart | Main Page'},
  {path:'categories' , title:'Fresh-Cart | Main Page'},
  {path:'login' , title:'Fresh-Cart | Main Page'},
  {path:'register' , title:'Fresh-Cart | Main Page'},
  {path:'p-details/:id' , title:'Fresh-Cart | Main Page'},
  {path:'**' , title:'Fresh-Cart | Main Page'},
];
