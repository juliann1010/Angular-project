import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/user.model';
import { UsuarioService } from '../services/index.services';
import { Router } from '@angular/router';

declare const gapi: any;
declare function init_plugins();


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;
  auth2: any;
  token: string;
  

  constructor(public _usuarioService: UsuarioService,
              public _router: Router) { }

  ngOnInit() {

    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem("email") || '';
    if(this.email.length > 1){
      this.recuerdame = true;
    }
  }

  googleInit(){

    gapi.load('auth2', () =>{
      this.auth2 = gapi.auth2.init({
        client_id: '775097927956-6sla1q68fl9dl4g7bqhnid4p1t2jimgt.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      }); 
      this.attachSignIn(document.getElementById("btnGoogle"));
    });
  }

  attachSignIn(element){

    this.auth2.attachClickHandler(element, {}, (googleUser) =>{
      // let profile = googleUser.getBasicProfile();
      this.token =  googleUser.getAuthResponse().id_token;
      
      this._usuarioService.loginUsuariosGoogle(this.token).subscribe(resp =>{
        window.location.href = '#/dashboard'
      });
    })
  }

  ingresar(formulario: any){

    if (formulario.invalid){
      return;
    }

    if(formulario.value.recuerdame){
      localStorage.setItem("email", formulario.value.email);
    } else{
      localStorage.removeItem("email");
    }

    let usuario = new Usuario(null,formulario.value.email, formulario.value.password);
    
    this._usuarioService.loginUsuarios(usuario, formulario.value.recuerdame).subscribe(resp => {
      this._router.navigate(['/dashboard']);
    })
  }

}
