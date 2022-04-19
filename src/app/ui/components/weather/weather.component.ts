import { Component, OnInit } from '@angular/core';
import { IWeatherResult } from 'src/app/core/domain/types';
import { WeatherService } from 'src/app/core/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  weatherResult: IWeatherResult = {};

  constructor( private weatherService: WeatherService ) {}

  ngOnInit(): void {
    this.weatherService._weatherResultChanged$.subscribe( result => this.weatherResult = result);
  }

}
