import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { URL_BACK_END } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { Hospital } from 'src/app/models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  token: string;
  hospital: Hospital;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService,
    public _usuarioService: UsuarioService
  ) { }


  cargarHospitales(desde: number = 0, hasta: number = 5){

    let url = `${URL_BACK_END}/hospital?from=${desde}&to=${hasta}`;
    return this.http.get(url);
  }

  obtenerHospital(id: string){

    let url = `${URL_BACK_END}/hospital/${id}`;
    return this.http.get(url)
                .pipe(
                  map((resp: any) => resp.hospital)
                )
  }

  borrarHospital(id: string){

    this.token = this._usuarioService.token;
    let url = `${URL_BACK_END}/hospital/${id}?token=${this.token}`;
    return this.http.delete(url);
  }

  crearHospital(nombre: string){
    
    this.token = this._usuarioService.token;
    this.hospital = new Hospital(nombre);
    let url = `${URL_BACK_END}/hospital?token=${this.token}`;
    return this.http.post(url, this.hospital)
                .pipe(
                  map((resp: any) => {
                    return resp.hospital;
                  })
                )
  }

  buscarHospital(termino: string){

    let url = `${URL_BACK_END}/collection/hospitals/${termino}`;
    return this.http.get(url)
                .pipe(
                  map((resp: any) => resp.hospitals)
                );
  }

  actualizarHospital(hospital: Hospital){
    
    let id = hospital._id;
    let token = this._usuarioService.token;
    let url = `${URL_BACK_END}/hospital/${id}?token=${token}`;
    return this.http.put(url, hospital)
                    .pipe
  }

}
