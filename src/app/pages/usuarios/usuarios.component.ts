import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/index.services';
import { Usuario } from 'src/app/models/user.model';
import Swal from 'sweetalert2';
import { ModalUploadService } from 'src/app/componentes/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  cargando: boolean = true;
  desde: number = 0;
  total: number = 0;

  constructor(
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadService.notificacion
      .subscribe(resp =>{
        this.cargarUsuarios();
      })
  }
  
  cargarUsuarios(){

    this.cargando = true;
    this._usuarioService.cargarUsuarios(this.desde)
    .subscribe((resp: any) => {
      
      this.total = resp.total;
      this.usuarios = resp.users;
      this.cargando = false;
    })
  }

  cambiarDesde(valor: number){
    let cambioDesde = this.desde + valor;

    if(cambioDesde >= this.total){
      return;
    }

    if(cambioDesde < 0){
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario(termino: string){

    if(termino.length <= 0){
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;
    
    this._usuarioService.buscarUsuarios(termino)
    .subscribe((usuarios: Usuario[]) => {
      this.usuarios = usuarios;
      this.cargando = false;
    })
  }

  borrarUsuario(usuarioSeleccionado: Usuario){
    
    if(usuarioSeleccionado._id === this._usuarioService.usuario._id){
      Swal.fire(
        'No se puede borrar a usted mismo, señor',
        usuarioSeleccionado.name,
        'error'
      );
      return;
    }
    
    Swal.fire({
      title: '¿Está seguro?',
      text: "Al borrar un usuario se inhabilitarán todas sus funciones",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, estoy seguro!'
    }).then((result) => {
      if (result.value) {

        this._usuarioService.borrarUsuario(usuarioSeleccionado._id)
        .subscribe((resp: any) =>{

          Swal.fire(
            'Usuario eliminado!',
            `El usuario ${resp.userUpdated.name} fue eliminado`,
            'success'
          );
          this.cargarUsuarios();
          
        });
      }
    })
  }

  guardarUsuario(usuario: Usuario){
    this._usuarioService.actualizarUsuario(usuario).subscribe();
  }

  mostrarModal(id: string){
    this._modalUploadService.mostrarModal("user", id);
  }

}
