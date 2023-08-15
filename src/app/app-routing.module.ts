import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DefaultLayoutComponent} from './containers';
import {LoginComponent} from './views/pages/login/login.component';
import {RegisterComponent} from './views/pages/register/register.component';
import {UserKycUpdateComponent} from './views/publicuser/user-kyc-update/user-kyc-update.component';
import {SellVehicleComponent} from './views/publicuser/sell-vehicle/sell-vehicle.component';
import {BuyRequestComponent} from './views/publicuser/buy-request/buy-request.component';
import {UserRequestComponent} from './views/publicuser/user-request/user-request.component';
import {UserRequestViewComponent} from './views/publicuser/user-request-view/user-request-view.component';
import {LicenseComponent} from './views/admin/license/license.component';
import {BlueBookComponent} from './views/admin/blue-book/blue-book.component';
import {OwnershipRequestComponent} from './views/admin/ownership-request/ownership-request.component';
import {OwnershipRequestViewComponent} from './views/admin/ownership-request-view/ownership-request-view.component';
import {NumberPlateScanComponent} from './views/admin/number-plate-scan/number-plate-scan.component';
import {
  NumberPlateScanProcessComponent
} from './views/admin/number-plate-scan-process/number-plate-scan-process.component';
import {AuthGuard} from "./baseService/auth/auth.guard";
import {DashboardComponent} from './views/dashboard/dashboard.component';
import {SellVehicleDetailsComponent} from './views/publicuser/sell-vehicle-details/sell-vehicle-details.component';
import {AddVehicleComponent} from './views/publicuser/add-vehicle/add-vehicle.component';
import {UserListComponent} from "./views/admin/user-list/user-list.component";
import {UserListViewComponent} from "./views/admin/user-list-view/user-list-view.component";
import {ProcessTaxComponent} from "./views/publicuser/process-tax/process-tax.component";
import {TaxClearanceRequestComponent} from "./views/admin/tax-clearance-request/tax-clearance-request.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [AuthGuard]
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
          import('./views/dashboard/dashboard.module')
            .then((m) => m.DashboardModule),
        canActivate: [AuthGuard]
      },

      {
        path: 'page',
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./views/admin/admin.module').then((m) => m.AdminModule),
        canActivate: [AuthGuard]
      },

      {
        path: 'user',
        loadChildren: () =>
          import('./views/publicuser/user.module').then((m) => m.UserModule),
        canActivate: [AuthGuard]
      },

      {
        path: 'user/update-kyc',
        component: UserKycUpdateComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'user/sell-vehicle',
        component: SellVehicleComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'user/buy-request',
        component: BuyRequestComponent,
        canActivate: [AuthGuard]
      },

      {
        path: 'user-request',
        component: UserRequestComponent
      },
      {
        path: 'user-request-view',
        component: UserRequestViewComponent,
        canActivate: [AuthGuard]
      },

      {
        path: 'license',
        component: LicenseComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'blue-book',
        component: BlueBookComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'ownership-request',
        component: OwnershipRequestComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'ownership-request-view',
        component: OwnershipRequestViewComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'number-plate-scan',
        component: NumberPlateScanComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'plate-scan-process',
        component: NumberPlateScanProcessComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'dash',
        component: DashboardComponent
      },
      {
        path: 'sell-vehicle-detail',
        component: SellVehicleDetailsComponent
      },
      {
        path: 'add-vehicle',
        component: AddVehicleComponent
      },
      {
        path: 'user-list',
        component: UserListComponent
      },
      {
        path: 'user-list-view',
        component: UserListViewComponent
      },
      {
        path: 'process-tax',
        component: ProcessTaxComponent
      },
      {
        path: 'tax-clearance-request',
        component: TaxClearanceRequestComponent
      }

    ]

  },

  {
    path: 'register',
    component: RegisterComponent
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
