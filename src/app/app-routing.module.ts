import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './containers';
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { UserKycUpdateComponent } from './views/publicuser/user-kyc-update/user-kyc-update.component';
import { SellVehicleComponent } from './views/publicuser/sell-vehicle/sell-vehicle.component';
import { BuyRequestComponent } from './views/publicuser/buy-request/buy-request.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    
  },
  {
    path: 'home',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
     {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      
      {
        path: 'page',
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule)
      },
      {
        path: 'admin',
        loadChildren: () =>
        import('./views/admin/admin.module').then((m) => m.AdminModule)
      },

      {
        path: 'user',
        loadChildren: () =>
        import('./views/publicuser/user.module').then((m) => m.UserModule)
      },

      {
        path: 'user/update-kyc',
        component: UserKycUpdateComponent,
      },
      {
        path: 'user/sell-vehicle',
        component: SellVehicleComponent
      },
      {
        path: 'user/buy-request',
        component: BuyRequestComponent
      },
    ]
    
    },
  
  {path: '', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
