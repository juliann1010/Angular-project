import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { UsuarioService } from '../services/index.services';
import { Usuario } from '../models/user.model';
import { Router } from '@angular/router';

declare function init_plugins();


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['login.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(public _usuarioService: UsuarioService,
              public _router: Router) {}

  sonIguales(campo1: string, campo2: string){

    return (group: FormGroup) => {

      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;
      

      if(pass1 === pass2){
        return null;
      }

      return {
        sonIguales: true
      };
    }
  }

  ngOnInit() {

    init_plugins();

    this.form = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false)
    }, {validators: this.sonIguales('password', 'password2') });

    // Ponemos valores por defecto
    this.form.setValue({
      nombre: 'Prueba',
      email: 'Chucho@gmail.com',
      password: '123',
      password2: '123',
      condiciones: true
    })

  }

  registrarUsuario(){
    
    if(!this.form.value.condiciones){
      console.log("Debe aceptar las condiciones")
     Swal.fire( //Plugin de sweetalert2
      'Error',
      'Debe aceptar las condiciones',
      'error'
    )
      return
    }

    console.log("This line is almost useless");

      let usuario = new Usuario(
        this.form.value.nombre,
        this.form.value.email,
        this.form.value.password
      )

      this._usuarioService.crearUsuario(usuario).subscribe(
        resp => {
          console.log(resp)
          this._router.navigate(['/login']) //redirecciona al login cuando es exitoso el registro
        }
      )
    
    

  }
}