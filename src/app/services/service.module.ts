import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { 
  SettingsService, 
  SidebarService, 
  SharedService, 
  UsuarioService, 
  LoginGuardGuard,
  SubirArchivoService,
  HospitalService
} from './index.services';
import { ModalUploadService } from '../componentes/modal-upload/modal-upload.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    LoginGuardGuard,
    SubirArchivoService,
    ModalUploadService,
    HospitalService
  ]
})
export class ServiceModule { }