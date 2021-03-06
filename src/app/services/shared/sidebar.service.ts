import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      nombre: 'Principal',
      icono: 'mdi mdi-gauge',
     submenu: [
       {titulo: 'Dashboard', url: '/dashboard'},
       {titulo: 'Barras de progreso', url: '/progress'},
       {titulo: 'Promesas', url: '/promesas'},
       {titulo: 'Graficas', url: '/graficas'},
       {titulo: 'RXJS', url: '/rxjs'}
     ]
    },
    {
      nombre: 'Mantenimientos',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        {titulo: 'Usuarios',  url:  '/usuarios'},
        {titulo: 'Hospitales',  url:  '/hospitales'},
        {titulo: 'Medicos',  url:  '/medicos'}
      ]
    }
  ]

  constructor() { }
}
