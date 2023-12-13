import {Component, OnInit} from '@angular/core';
import {AdminService} from "../admin.service";
import {UserDataService} from "../../publicuser/user-request/user.data.service";
import {NotificationService} from "../../../baseService/notification.service";
import {UserService} from "../../publicuser/user.service";
import {BaseService} from "../../../baseService/baseService";
import baseURL from "../../../baseService/helper";

@Component({
  selector: 'app-tax-clearance-request',
  templateUrl: './tax-clearance-request.component.html',
  styleUrls: ['./tax-clearance-request.component.scss']
})
export class TaxClearanceRequestComponent extends BaseService implements OnInit {

  public taxClearanceList: any[] | undefined;
  public isTaxBillShowModalVisible: boolean | any;
  public taxBillImage: string | any;
  public taxClearanceData: any;

  constructor(private adminService: AdminService,
              private userDataService: UserDataService,
              private notificationService: NotificationService,
              private userService: UserService) {
    super();
  }

  ngOnInit(): void {
    this.getTaxClearanceList();
  }

  getTaxClearanceList() {
    this.adminService.getTaxClearanceList().subscribe(
      (res: any) => {
        console.log('taxData', res.data);
        this.taxClearanceList = res.data;
      },
      (error: any) => {
        this.notificationService.showError(error, "Error !")
      }
    )
  }

  showPaidBillSheet(data: string) {
    this.taxClearanceData = data;
    // fetch bill image
    if (data != null) {
      let taxBillImageUrl = baseURL.concat("/api/public-user/getUserImage/taxClearance/".concat(this.taxClearanceData.taxPaidBillImageName));
      this.userService.getFetchImage(taxBillImageUrl).subscribe((response: any) => {
        // create image form blob
        this.createImageFromBlob(response.body)
      });
      this.isTaxBillShowModalVisible = true;
      this.ngOnInit();
    }
  }

  createImageFromBlob(imageData: Blob): void {
    const reader = new FileReader();
    reader.onloadend = () => {
      // this.images[this.imageIndex++] = reader.result as string;
      this.taxBillImage = reader.result as string;
    };
    reader.readAsDataURL(imageData);
  }

  handleTaxBillChange(event: any) {
    this.isTaxBillShowModalVisible = event;
  }

  acceptTaxClearanceRequest() {
    this.adminService.actionOnTaxClearanceRequest("accept", this.taxClearanceData.id).subscribe(
      (res: any) => {
        this.notificationService.showSuccess(res.message, "Success !")
        this.isTaxBillShowModalVisible = false;
        this.ngOnInit();
      },
      (error: any) => {
        this.notificationService.showError(error, "Error !")
      }
    )

  }

  rejectTaxClearanceRequest() {
    this.adminService.actionOnTaxClearanceRequest("reject", this.taxClearanceData.id).subscribe(
      (res: any) => {
        this.notificationService.showSuccess(res.message, "Success !")
        this.isTaxBillShowModalVisible = false;
        this.ngOnInit();
      },
      (error: any) => {
        this.notificationService.showError(error, "Error !")
      }
    )
  }

}
