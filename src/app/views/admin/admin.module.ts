import { NgModule,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LicenseComponent } from './license/license.component';
import { UserRoutingModule } from '../publicuser/user-routing.module';
import { AvatarModule, ButtonGroupModule, ButtonModule, CardModule, DropdownModule, FormModule, GridModule, ModalModule, NavModule, PaginationModule, ProgressModule, SharedModule, TableModule, TabsModule, ToastModule, WidgetModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartjsModule } from '@coreui/angular-chartjs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { BlueBookComponent } from './blue-book/blue-book.component';
import { OwnershipRequestComponent } from './ownership-request/ownership-request.component';
import { OwnershipRequestViewComponent } from './ownership-request-view/ownership-request-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NumberPlateScanComponent } from './number-plate-scan/number-plate-scan.component';
import { NumberPlateScanProcessComponent } from './number-plate-scan-process/number-plate-scan-process.component';
import {MatIconModule} from '@angular/material/icon';
import { UserListComponent } from './user-list/user-list.component';
import { UserListViewComponent } from './user-list-view/user-list-view.component';
import { TraficFlowPredictionComponent } from './trafic-flow-prediction/trafic-flow-prediction.component';
import { TrainingComponent } from './training/training.component';
import { ForecastComponent } from './forecast/forecast.component';
import { LogComponent } from './log/log.component';
import { PerformanceComponent } from './performance/performance.component';


@NgModule({
  declarations: [
    LicenseComponent,
    BlueBookComponent,
    OwnershipRequestComponent,
    OwnershipRequestViewComponent,
    NumberPlateScanComponent,
    NumberPlateScanProcessComponent,
    UserListComponent,
    UserListViewComponent,
    TraficFlowPredictionComponent,
    TrainingComponent,
    ForecastComponent,
    LogComponent,
    PerformanceComponent,
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    UserRoutingModule,
    CardModule,
    NavModule,
    IconModule,
    TabsModule,
    MatIconModule,
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
    ToastModule,
    BrowserAnimationsModule,
    TabsModule,
    ChartjsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule { }
