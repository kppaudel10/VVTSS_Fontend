import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserKycUpdateComponent } from './user-kyc-update/user-kyc-update.component';
import { IconModule } from '@coreui/icons-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { AvatarModule,
   ButtonGroupModule,
    ButtonModule, 
    CardModule, 
    FormModule, GridModule, 
    NavModule, ProgressModule, 
    TableModule, 
    TabsModule, 
    WidgetModule ,
    PaginationModule,
    ModalModule  } from '@coreui/angular';
import { SellVehicleComponent } from './sell-vehicle/sell-vehicle.component';
import { BuyRequestComponent } from './buy-request/buy-request.component';
import { UserRequestComponent } from './user-request/user-request.component';
import { UserRequestViewComponent } from './user-request-view/user-request-view.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    UserKycUpdateComponent,
    SellVehicleComponent,
    BuyRequestComponent,
    UserRequestComponent,
    UserRequestViewComponent

  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    CardModule,
    NavModule,
    IconModule,
    TabsModule,
    CommonModule,
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
    BrowserAnimationsModule
    
  ]
})
export class UserModule { }
