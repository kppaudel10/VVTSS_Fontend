import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/views/user/user.service'
//import { navItems } from './_nav';

import { IconSubset } from 'src/app/icons/icon-subset';
//import { INavData } from '@coreui/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent implements OnInit {

  public navItems: INavData[] = [];
  public icon: IconSubset[] = [];

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor(private dash: UserService) { }

  ngOnInit(): void {
    this.dash.getCallInit().subscribe((response: any) => {
      const userRole = 'Public User'; // Get the user's role here.
      console.log('data is here', response);


      const filteredModules = response.data.filter((module: any) => {
        return module.roleName === userRole;
      });

      this.navItems = filteredModules.map((module: any) => {

        let icon: string;
        let url: string;

        // Set the icon and URL based on the module name
        switch (module.moduleName) {
          case 'A-Dashboard':
            icon = IconSubset.cilUser;
            url = ``;
            break;
          case 'U-Dashboard':
            icon = IconSubset.cilBarChart;
            url = '/page/register';
            break;

            case 'Sell Vehicle':
              icon = IconSubset.cibCcPaypal;
              url = '/user/udate-kyc';
              break;

              case 'Buy Request':
              icon = IconSubset.cilBasket;
              url = '';
              break;

          case 'License':
            icon = IconSubset.cifUs;
            url = `/module/${module.moduleId}`;
            break;
          case 'Blue Book':
            icon = IconSubset.cilBook;
            url = `/module/${module.moduleId}`;
            break;
          case 'User Request':
            icon = IconSubset.cilUser;
            url = `/module/${module.moduleId}`;
            break;
          case 'Number Plate Scan':
            icon = IconSubset.cilListNumbered;
            url = `/module/${module.moduleId}`;
            break;
          case 'OwnerShip Request':
            icon = IconSubset.cilCar;
            url = `/module/${module.moduleId}`;
            break;
          case 'LogOut':
            icon = IconSubset.cilExitToApp;
            url = `/logout`;
            break;
          default:
            icon =
              url = '///'
            break;
        }

        return {
          name: module.moduleName,
          url: url,
          iconComponent: { name: icon }
        };


      });
    });
  }

}

export interface INavData {
  name?: string;
  url?: string;
  icon?: string;
  iconComponent?: any; // add this property
  children?: INavData[];
  variant?: string;
  attributes?: any;
  divider?: boolean;
  class?: string;
  label?: {
    variant: string;
    text: string;
  };
}