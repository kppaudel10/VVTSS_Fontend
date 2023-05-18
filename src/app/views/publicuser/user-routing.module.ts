import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserKycUpdateComponent} from 'src/app/views/publicuser/user-kyc-update/user-kyc-update.component'
import { UserRequestViewComponent } from './user-request-view/user-request-view.component';

const routes: Routes = [
  {path: 'user-request-view',
  component: UserRequestViewComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
