import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/views/user/user/user.service'
//import { navItems } from './_nav';
import { HttpClient } from '@angular/common/http';
import { IconSubset } from 'src/app/icons/icon-subset';
//import { INavData } from '@coreui/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent implements OnInit{

  public navItems: INavData[] = [];
  public icon: IconSubset[] = [];
  
  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor(private http: HttpClient,
              private dash: UserService) {}

  ngOnInit(): void {
    this.dash.getCallInit().subscribe((response: any) => {
      const userRole = 'Public User'; // Get the user's role here.
      console.log('data is here', response);
      
      
      const filteredModules = response.data.filter((module: any) => {
        return module.roleName === userRole;
      });

      this.navItems = filteredModules.map((module: any) => {

        switch(module.moduleName){
         
        }

       
        return {
          name: module.moduleName,
          url: `/module/${module.moduleId}`,
          iconComponent: { name: 'cil-home' }
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