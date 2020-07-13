import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { fadeAnimation } from './animations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation]})
export class AppComponent {
  title = 'Mood Tracker';
  isLoggedIn = true;
  constructor(translate: TranslateService) {
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('es');
    translate.use('es');
  }
}
