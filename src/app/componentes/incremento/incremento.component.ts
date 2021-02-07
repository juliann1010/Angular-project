import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incremento',
  templateUrl: './incremento.component.html',
  styles: []
})
export class IncrementoComponent implements OnInit {

  @ViewChild('txtProgreso', {static: false}) txtProgreso: ElementRef;

  @Input() porcentaje: number = 50;
  @Input() titulo: string = "Título";

  @Output('actualizaValor') cambioValor:EventEmitter<number> = new EventEmitter();

  constructor() {
    console.log(this.titulo);
   }

  ngOnInit() {
    console.log(this.titulo);

    
    this.cambioValor.emit(this.porcentaje);
  }

  onChanges(valorRecibido:number){

    console.log(this.txtProgreso)

    if(valorRecibido > 100){
      this.porcentaje = 100;
      
    } else if(valorRecibido < 0 || valorRecibido === undefined){
      this.porcentaje = 0;
    } else {
      this.porcentaje = valorRecibido
    }

    
    this.txtProgreso.nativeElement.value = this.porcentaje
    this.cambioValor.emit(this.porcentaje);
    
  }

  cambiarValor(valor){

    if(this.porcentaje+valor > 100){
      this.porcentaje = 100;
      this.cambioValor.emit(this.porcentaje);
      return;
    }

    if(this.porcentaje+valor < 0){
      this.porcentaje = 0;
      this.cambioValor.emit(this.porcentaje);
      return;
    }

    this.porcentaje += valor;
    this.cambioValor.emit(this.porcentaje);
    this.txtProgreso.nativeElement.focus();
  }

}
