import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './containers';
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { UserKycUpdateComponent } from './views/publicuser/user-kyc-update/user-kyc-update.component';
import { SellVehicleComponent } from './views/publicuser/sell-vehicle/sell-vehicle.component';
import { BuyRequestComponent } from './views/publicuser/buy-request/buy-request.component';
import { UserRequestComponent } from './views/publicuser/user-request/user-request.component';
import { UserRequestViewComponent } from './views/publicuser/user-request-view/user-request-view.component';
import { LicenseComponent } from './views/admin/license/license.component';
import { BlueBookComponent } from './views/admin/blue-book/blue-book.component';
import { OwnershipRequestComponent } from './views/admin/ownership-request/ownership-request.component';
import { OwnershipRequestViewComponent } from './views/admin/ownership-request-view/ownership-request-view.component';
import { NumberPlateScanComponent } from './views/admin/number-plate-scan/number-plate-scan.component';
import { NumberPlateScanProcessComponent } from './views/admin/number-plate-scan-process/number-plate-scan-process.component';
import { AuthGuard } from 'src/app/baseService/auth/auth.guard'

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'home',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard],
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

      {
        path: 'user-request',
        component: UserRequestComponent
      },
      {
        path: 'user-request-view',
        component: UserRequestViewComponent
      },

      {
        path: 'license',
        component: LicenseComponent
      },
      {
        path: 'blue-book',
        component: BlueBookComponent
      },
      {
        path: 'ownershp-request',
        component: OwnershipRequestComponent
      },
      {
        path: 'ownershp-request-view',
        component: OwnershipRequestViewComponent
      },
      {
        path: 'number-plate-scan',
        component: NumberPlateScanComponent
      },
      {
        path: 'plate-scan-process',
        component: NumberPlateScanProcessComponent
      }

    ]

  },

  {
  path: 'register',
  component: RegisterComponent
  },

  { path: '', redirectTo: '', pathMatch: 'full'},
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
