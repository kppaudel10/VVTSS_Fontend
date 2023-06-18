import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../publicuser/user-request/user.data.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-number-plate-scan-process',
  templateUrl: './number-plate-scan-process.component.html',
  styleUrls: ['./number-plate-scan-process.component.scss']
})
export class NumberPlateScanProcessComponent implements OnInit {

  public userDataDetail : any;
  public displayForm : FormGroup | any

  constructor(private userDataService : UserDataService,
    private formBuilder : FormBuilder){}

  ngOnInit(): void {
    // Initialize the reactive form
    this.userDataDetail = this.userDataService.getUserData();
    console.log("userDataxx",this.userDataDetail);
    
  };

}
