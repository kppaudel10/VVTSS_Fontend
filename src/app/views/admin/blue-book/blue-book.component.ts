import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AdminService} from "../admin.service";
import {NotificationService} from "../../../baseService/notification.service";
import {GlobalMethodService} from "../../global.method.service";

@Component({
  selector: 'app-blue-book',
  templateUrl: './blue-book.component.html',
  styleUrls: ['./blue-book.component.scss']
})
export class BlueBookComponent extends GlobalMethodService implements OnInit {

  public form: FormGroup | any;
  public searchForm: FormGroup | any;
  public blueBookList: any[] = [];
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 0;

  constructor(private formBuilder: FormBuilder,
              private adminService: AdminService,
              private notificationService: NotificationService) {
    super();
  }

  ngOnInit(): void {
    // show license list
    this.getAndShowBlueBookDetailList();

    this.form = this.formBuilder.group({
      citizenshipNo: ['', Validators.required],
      vehicleType: ['', Validators.required],
      vehicleIdentificationNo: ['', Validators.required],
      numberPlate: ['', Validators.required],

    });

    this.searchForm = this.formBuilder.group({
      searchValue: ['', Validators.required]
    });

  }

  saveBlueBookData() {
    if (this.form?.invalid) {
      this.notificationService.showWarnig('Please check each field before submit.', 'Warning !!');
      return;
    }

    let blueBookData = this.form.getRawValue();
    // call save api
    this.adminService.saveBlueBookDetail(blueBookData).subscribe(
      (response: any) => {
        // Handle successful form submission
        Object.keys(this.form.controls).forEach((controlName) => {
          this.form.controls[controlName].setValue(null);
        });
        this.notificationService.showSuccess(response.message, "Success !!")
        this.ngOnInit();
      },
      (error: any) => {
        // Handle error during form submission
        this.notificationService.showError(error.error.message, "Error !!")
      }
    )
  }

  getAndShowBlueBookDetailList() {
    this.adminService.getBlueBookDetailList()
      .subscribe(
        (response: any) => {
          this.blueBookList = response.data;
        },
        error => {
          console.error(error);
        }
      );
  }


  getSearchBlueBook() {
    let searchData = this.searchForm.getRawValue();
    if (searchData['searchValue'].length > 0) {
      this.adminService.searchBlueBookDetail(searchData['searchValue']).subscribe(
        (response: any) => {
          this.blueBookList = response.data;
          this.totalPages = Math.ceil(this.blueBookList.length / this.itemsPerPage);
        },
        error => {
          console.error(error);
        }
      );
    }
  }

  searchFieldValueCheck(searchValue: string) {
    if (searchValue === '') {
      this.ngOnInit();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getPageNumbers(): number[] {
    return Array(this.totalPages).fill(0).map((_, index) => index + 1);
  }

  getItemsForCurrentPage() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.blueBookList.slice(startIndex, endIndex);
  }
}

  

