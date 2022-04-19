import { Component, OnInit } from '@angular/core';
import { IWeatherResult } from './core/domain/types';
import { WeatherService } from './core/services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'angular-weather';




}
