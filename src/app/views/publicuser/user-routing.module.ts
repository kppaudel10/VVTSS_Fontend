import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserKycUpdateComponent} from 'src/app/views/publicuser/user-kyc-update/user-kyc-update.component'

const routes: Routes = [
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
