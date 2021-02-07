import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() { 

    this.contador().then(
      mensaje => {
        console.log("Acá terminó de contar", mensaje);
      }
    ).catch(
      error => {
        console.error("Error contando", error);
      }
    )
  }

  ngOnInit() {
  }


  contador() {
    
    return new Promise((resolve,reject) => {

      let contador = 0;
      
      let intervalo = setInterval( () =>{

        contador += 1;
        console.log(contador);

        if(contador === 3){
          resolve('OK!!!');
          clearInterval(intervalo);
        }

        if(contador === 10){
          reject('error!');
          console.log("banderita");
        }

      }, 1000);
    });
  }

}
