import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  paginaActual: string = ''

  constructor(private router: Router,
              public title: Title) {
    
    this.getDataRoute()
    .subscribe(event =>{
      this.paginaActual = event.snapshot.data.titulo;
      this.title.setTitle(this.paginaActual) // Permite asignar el titulo de la pagina de forma dinamica
    })
   }

  ngOnInit() {
  }

  getDataRoute(){
    return this.router.events.pipe(
      filter(evento => evento instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.routeConfig.path !== "" )
    )
  }

}
