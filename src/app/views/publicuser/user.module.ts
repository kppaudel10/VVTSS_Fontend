import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserRoutingModule} from './user-routing.module';
import {UserKycUpdateComponent} from './user-kyc-update/user-kyc-update.component';
import {IconModule} from '@coreui/icons-angular';
import {ReactiveFormsModule} from '@angular/forms';
import {ChartjsModule} from '@coreui/angular-chartjs';
import {
  AccordionModule,
  AvatarModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  ModalModule,
  NavModule,
  PaginationModule,
  ProgressModule,
  SharedModule,
  TableModule,
  TabsModule,
  WidgetModule
} from '@coreui/angular';
import {SellVehicleComponent} from './sell-vehicle/sell-vehicle.component';
import {BuyRequestComponent} from './buy-request/buy-request.component';
import {UserRequestComponent} from './user-request/user-request.component';
import {UserRequestViewComponent} from './user-request-view/user-request-view.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {ToastrModule} from 'ngx-toastr';
import {SellVehicleDetailsComponent} from './sell-vehicle-details/sell-vehicle-details.component';
import {AddVehicleComponent} from './add-vehicle/add-vehicle.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {DialogModule} from '@angular/cdk/dialog';
import {MatDialogModule} from '@angular/material/dialog';
import { ProcessTaxComponent } from './process-tax/process-tax.component'


@NgModule({
  declarations: [
    UserKycUpdateComponent,
    SellVehicleComponent,
    BuyRequestComponent,
    UserRequestComponent,
    UserRequestViewComponent,
    SellVehicleDetailsComponent,
    AddVehicleComponent,
    UserProfileComponent,
    ProcessTaxComponent

  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    CardModule,
    NavModule,
    IconModule,
    TabsModule,
    GridModule,
    ProgressModule,
    ReactiveFormsModule,
    ButtonModule,
    FormModule,
    ButtonModule,
    ButtonGroupModule,
    ChartjsModule,
    AvatarModule,
    TableModule,
    WidgetModule,
    ModalModule,
    PaginationModule,
    MatSnackBarModule,
    ToastrModule,
    AccordionModule,
    SharedModule,
    DialogModule,
    MatDialogModule


  ]
})
export class UserModule {
}
