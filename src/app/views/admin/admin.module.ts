import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LicenseComponent } from './license/license.component';
import { UserRoutingModule } from '../publicuser/user-routing.module';
import { AvatarModule, ButtonGroupModule, ButtonModule, CardModule, DropdownModule, FormModule, GridModule, ModalModule, NavModule, PaginationModule, ProgressModule, SharedModule, TableModule, TabsModule, WidgetModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ChartjsModule } from '@coreui/angular-chartjs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { BlueBookComponent } from './blue-book/blue-book.component';
import { OwnershipRequestComponent } from './ownership-request/ownership-request.component';
import { OwnershipRequestViewComponent } from './ownership-request-view/ownership-request-view.component';


@NgModule({
  declarations: [
    LicenseComponent,
    BlueBookComponent,
    OwnershipRequestComponent,
    OwnershipRequestViewComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
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
    MatDatepickerModule,
    FormsModule

  ]
})
export class AdminModule { }
