import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  showSuccess(message: string | undefined, title: string | undefined){
    this.toastr.success(message, title, {
      positionClass: 'toast-top-right',
      timeOut: 4000
    });
  }

  showError(message: string | undefined, title: string | undefined) {
    this.toastr.error(message, title, {
      positionClass: 'toast-top-right',
      timeOut: 4000,
    });
  }

  showInfo(message: string | undefined, title: string | undefined) {
    this.toastr.info(message, title, {
      positionClass: 'toast-top-right',
      timeOut: 4000,
    });
  }

  showWarnig(message: string | undefined, title: string | undefined) {
    this.toastr.warning(message, title, {
      positionClass: 'toast-top-right',
      timeOut: 4000,
    });
  }
}
