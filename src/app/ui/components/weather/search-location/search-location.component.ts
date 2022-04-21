import { WeatherService } from '../../../../core/services/weather.service';
import { IFeature, ISearchItem, IWeatherResult } from '../../../../core/domain/types';
import { LocationService } from '../../../../core/services/location.service';
import { Component } from "@angular/core";
import { ISearchResult } from 'src/app/core/domain/types';

@Component({
  selector: 'app-search-location',
  templateUrl: './search-location.component.html'
})
export class SearchLocationComponent {


  selectedItem: ISearchItem | undefined;

  results: ISearchItem[] = [];

  /**
   *
   */
  constructor(private service: LocationService,
              private weatherService: WeatherService) {

  }

  search(text: string) {
      console.log( text );
      this.service.buscarCiudades( text ).subscribe( this.observer )

  }

  onItemSelected(event: ISearchItem) {

    if (event && event.value && event.value.center) {
      const [ lon, lat ] = event.value.center;

      this.weatherService.searchWeatherByLatLon( lat, lon ).subscribe( this.weatherObserver );
    }

  }

  private weatherObserver = (response: IWeatherResult) => {

    this.weatherService.setWeatherResult( response );

  }

   private observer = (response: ISearchResult) => {
      // const results : string[] = [];
      // for (let r of response?.features as IFeature[]) {
      //   results.push( r.place_name as string );
      // }

      if (response && response.features) {
        console.log( response.features );
        const results: ISearchItem[] =  response.features?.map( result => {
          return { label: result.place_name as string, value: result  };
        } )

        console.log(  results );
        this.results = [...results];
      }


   }
}
