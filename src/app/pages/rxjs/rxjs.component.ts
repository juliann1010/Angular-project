import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map } from 'rxjs/operators';
import { stringify } from 'querystring';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy{

  suscripcion: Subscription;  

  constructor() {

  this.suscripcion = this.retornarObservable().pipe(
    retry(1)
  ).subscribe(
    conta=>{
      console.log(conta);
    },
    error =>{
    console.error(error)
    });
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.suscripcion.unsubscribe();
  }

  retornarObservable(): Observable<number>{
    return new Observable( (observer: Subscriber<any>) =>{

      let valor = {contador: 0};
      let intervalo = setInterval(() =>{

        valor.contador += 1;

        if(valor.contador % 2 === 0){
          observer.next(
            valor
          );
        } 
        
        if(valor.contador === 20){
          observer.complete();
        }

        if(valor.contador === 6){
          observer.error("Mensaje neutral de error")
        }
        
      }, 1000)
    }).pipe(
      map( resp =>{
        return resp.contador;
      })
    );
  }

}
