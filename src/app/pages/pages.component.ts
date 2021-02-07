import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/index.services';

declare function init_plugins();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor(public _ajustes: SettingsService) { }

  ngOnInit() {
    init_plugins();
  }

}
