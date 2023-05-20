import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/views/publicuser/user.service'
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
            url = '/home/user/update-kyc';
            break;

            case 'Sell Vehicle':
              icon = IconSubset.cibCcPaypal;
              url = '/home/user/sell-vehicle';
              break;

              case 'Buy Request':
              icon = IconSubset.cilBasket;
              url = '/home/user/buy-request';
              break;

          case 'License':
            icon = IconSubset.cilBold;
            url = '/home/license';
            break;

          case 'Blue Book':
            icon = IconSubset.cilBookmark;
            url = '/home/blue-book';
            break;

          case 'User Request':
            icon = IconSubset.cilUser;
            url = '/home/user-request';
            break;
          case 'Number Plate Scan':
            icon = IconSubset.cilListNumbered;
            url = '/home/number-plate-scan';
            break;

          case 'OwnerShip Request':
            icon = IconSubset.cilNotes;
            url = '/home/ownershp-request';
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