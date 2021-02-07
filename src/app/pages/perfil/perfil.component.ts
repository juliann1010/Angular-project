import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/user.model';
import { UsuarioService } from 'src/app/services/index.services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: []
})
export class PerfilComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  imagenTemporal: any; //This will storage an image in base64

  constructor(
    public _usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
  }

  guardar(usuario: Usuario){
    this.usuario.name = usuario.name;

    if(!this.usuario.google){
      this.usuario.email = usuario.email;
    }
    this._usuarioService.actualizarUsuario(this.usuario).subscribe()
  }

  seleccionDeImagen(archivo: File){
    
    if(!archivo){
      this.imagenSubir = null;
      this.imagenTemporal = null;
      return;
    }

    if(archivo.type.indexOf("image") < 0){
      Swal.fire("Sólo imagenes", "El archivo seleccionado no es una imagen", "error");
      this.imagenSubir = null;
      return;
    }


    //las siguientes líneas de código permiten mostrar una imagen temporal 
    //antes de subirla al back-end. El código es JavaScript puro

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemporal = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemporal = reader.result;
  }

  cambiarImagen(){
    this._usuarioService.actualizarImagen(this.imagenSubir, this.usuario._id);
  }

}
