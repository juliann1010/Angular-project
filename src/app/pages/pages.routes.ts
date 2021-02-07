import { RouterModule, Routes } from "@angular/router";
import { PagesComponent } from './pages.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/index.services';
import { PerfilComponent } from './perfil/perfil.component';

//Mantenimientos
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';



const pagesRoutes: Routes = [

    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
        children: [
            
            {path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'}},
            {path: 'graficas', component: Graficas1Component, data: {titulo: 'Graficas'}},
            {path: 'cuenta', component: AccountSettingsComponent, data: {titulo: 'Ajustes del tema'}},
            {path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'}},
            {path: 'rxjs', component: RxjsComponent, data: {titulo: 'RXJS'}},
            {path: 'progress', component: ProgressComponent, data: {titulo: 'Progreso'}},
            {path: 'perfil', component: PerfilComponent, data: {titulo: 'Perfil'}},
            //Mantenimientos
            {path: 'usuarios', component: UsuariosComponent, data: {titulo: 'Mantenimiento de usuarios'}},
            {path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Mantenimiento de hospitales'}},
            {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
        ]
    }

]

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );