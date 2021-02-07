import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms'

//Modulo
import { SharedModule } from '../shared/shared.module';
import { ChartsModule } from 'ng2-charts';
import { PipesModule } from '../pipes/pipes.module';


import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';
import { PAGES_ROUTES } from './pages.routes';
import { IncrementoComponent } from '../componentes/incremento/incremento.component';
import { GraficoDonaComponent } from '../componentes/dona/graficoDona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ModalUploadComponent } from '../componentes/modal-upload/modal-upload.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { HospitalesComponent } from './hospitales/hospitales.component';



@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        Graficas1Component,
        ProgressComponent,
        IncrementoComponent,
        GraficoDonaComponent,
        AccountSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        PerfilComponent,
        UsuariosComponent,
        ModalUploadComponent,
        HospitalesComponent
    ],
    imports: [
        CommonModule,
        SharedModule, 
        PAGES_ROUTES,
        FormsModule, //Two way data binding
        ChartsModule,
        PipesModule,
        ImageCropperModule
    ],
    exports: [
        DashboardComponent,
        Graficas1Component,
        ProgressComponent
    ]
})

export class PageModule { }