import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: Ajustes = { //Aquí se definen los valores por default
    temaUrl: "assets/css/colors/default.css",
    tema: "default"
  }

  constructor(@Inject(DOCUMENT) private _document) {
    this.cargarAjustes();
   }

  guardarAjustes(){
   
    localStorage.setItem("ajustes", JSON.stringify(this.ajustes))
  }

  cargarAjustes(){
    if(localStorage.getItem("ajustes")){
      
      this.ajustes = JSON.parse( localStorage.getItem("ajustes") );
      this.aplicarCambios(this.ajustes.tema)
    } else{
      
      this.aplicarCambios(this.ajustes.tema)
    }
  }

  aplicarCambios( tema: string ){

    let url = `assets/css/colors/${tema}.css`
    this._document.getElementById("theme").setAttribute('href', url)

    this.ajustes.temaUrl = url;
    this.ajustes.tema = tema;
    this.guardarAjustes();
  }
}

interface Ajustes{
  temaUrl: string;
  tema: string;
}
