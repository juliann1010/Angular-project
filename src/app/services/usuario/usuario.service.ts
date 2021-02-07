import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Usuario } from '../../models/user.model'
import { URL_BACK_END } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  id: string;
  token: string;
  usuario: Usuario;

  constructor( 
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) {
    
    this.cargarLocalStorage();
    
  }

  guardarLocalStorage(id: string, token: string, usuario: Usuario){
    localStorage.setItem("token", token);
    localStorage.setItem("id", id);
    localStorage.setItem("usuario", JSON.stringify(usuario));

    this.id = id;
    this.token = token;
    this.usuario = usuario;

  }

  cargarLocalStorage(){
    if(localStorage.getItem("token")){
      this.token = localStorage.getItem("token");
      this.id = localStorage.getItem("id");
      this.usuario = JSON.parse(localStorage.getItem("usuario"));
    } else {
      this.token = '';
      this.id = null;
    }
  }

  estaLogueado(){
    return (this.token.length > 5) ? true : false;
  }

  loginUsuariosGoogle(token: string){
    let url = `${URL_BACK_END}/google`;
    return this.http.post(url, {token})
            .pipe(
              map((resp: any) => {
                this.guardarLocalStorage(resp.id, resp.token, resp.user);
                return true;
              })
            );
  }

  loginUsuarios(usuario: Usuario, recuerdame: boolean){
    let url = `${URL_BACK_END}/login`;
    return this.http.post(url, usuario)
          .pipe(
            map((resp: any) => {
              
              this.guardarLocalStorage(resp.id, resp.token, resp.user);

              return resp;
            })
          )
  }

  logout(){
    this.id = null;
    this.token = '';

    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);

  }

  crearUsuario(usuario: Usuario){
    let url = `${URL_BACK_END}/users`;
    return this.http.post(url, usuario)
            .pipe(
              map((resp: any) => {
                Swal.fire( //El sweetalert podría también implementarse en el componente
                  'Usuario creado',
                  usuario.email,
                  'success'
                )
                return resp;
              })
            )
  }

  actualizarUsuario(usuario: Usuario){
    let url = `${URL_BACK_END}/users/${usuario._id}?token=${this.token}`;
    return this.http.put(url, usuario)
            .pipe(
              map((resp: any) => {

                if(usuario._id === this.usuario._id){
                  let usuarioRespuesta: Usuario = resp.userUpdated;
                  this.guardarLocalStorage(this.id, this.token, usuarioRespuesta);

                }

                Swal.fire('Usuario actualizado', usuario.name, 'success');
                return true;
              })
            )
  }

  actualizarImagen(imagen: File, id: string){
    
    this._subirArchivoService.subirArchivo(imagen, 'user', id)
        .then((resp: any) => {
          this.usuario.img = resp.user.img;
          this.guardarLocalStorage(id, this.token, this.usuario);
          console.log(resp);
        })
        .catch((resp) => {
          console.log(resp);
        })
  }

  cargarUsuarios(desde: number = 0, hasta: number = 5){
    
    let url = `${URL_BACK_END}/users?from=${desde}&to=${hasta}`;
    return this.http.get(url);
  }

  buscarUsuarios(termino: string){
    
    let url = `${URL_BACK_END}/collection/users/${termino}`;
    return this.http.get(url)
                .pipe(
                  map((resp: any) => resp.users)
                )
  }

  borrarUsuario(id: string){

    let url = `${URL_BACK_END}/users/${id}?token=${this.token}`;
    return this.http.delete(url);
  }
}
