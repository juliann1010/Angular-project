import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SettingsService } from 'src/app/services/index.services';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private _document,
              public _ajustes: SettingsService) {}

  ngOnInit() {
    this.iniciarCheck();
  }

  cambiarColor(tema: string, link: any){
    
    this.cambiarCheck(link);
    this._ajustes.aplicarCambios(tema);
    
  }

  cambiarCheck(link: any){

    let selectores = this._document.getElementsByClassName('selector');

    for(let elemento of selectores){
      elemento.classList.remove("working");
    }

    link.classList.add("working");

  }

  iniciarCheck(){

    let selectores = this._document.getElementsByClassName('selector');
    let tema = this._ajustes.ajustes.tema;

    for(let elemento of selectores){
      if( elemento.getAttribute("data-theme") === tema ){
        elemento.classList.add("working");
        break;
      }
    }

  }

}
