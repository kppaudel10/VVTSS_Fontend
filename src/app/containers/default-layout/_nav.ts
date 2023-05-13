
import { INavData } from '@coreui/angular';



export const navItems: INavData[]  = [
  
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
  },
  
  {
    name: 'VVTS Page',
    title: true
  },
  {
    name: 'Pages',
    url: '/login',
    iconComponent: { name: 'cil-star' },
    children: [
      {
        name: 'Login',
        url: '/login',
        iconComponent: { name: 'cil-user' },
      },
      {
        name: 'Register',
        url: '/register',
        iconComponent: { name: 'cil-user' },
      },
    ]                                                           
  },
];
  
