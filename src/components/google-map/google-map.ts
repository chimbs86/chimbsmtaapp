import {Component, ViewChild} from '@angular/core';
import Marker = google.maps.Marker;
import DirectionsRequest = google.maps.DirectionsRequest;
import DirectionsService = google.maps.DirectionsService;
import DirectionsRenderer = google.maps.DirectionsRenderer;
import DirectionsResult = google.maps.DirectionsResult;

/**
 * Generated class for the GoogleMapComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'google-map',
  templateUrl: 'google-map.html'
})
export class GoogleMapComponent {

  text: string;
  duration: string;

  @ViewChild("map") mapElement;
  map: any;

  constructor() {
    console.log('Hello GoogleMapComponent Component');
    this.text = 'Chimbs Rocks';
  }

  ngOnInit() {
    this.initMap()
  }

  private initMap() {
    let coords = new google.maps.LatLng(40.7128, -74.0060);
    let dest = new google.maps.LatLng(40.7433, -73.9196);
    let mapOptions: google.maps.MapOptions = {
      center: coords,
      zoom: 11,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    let marker: Marker = new Marker({map: this.map, position: coords});
    let req: DirectionsRequest = {
      origin: coords,
      destination: dest,
      travelMode: google.maps.TravelMode.DRIVING

    };
    marker.setTitle("chimbs Rocks")
    marker.setAnimation(google.maps.Animation.DROP)
    marker.setLabel("chimbs rocks")
    let dirs: DirectionsService = new DirectionsService();
    let disp: DirectionsRenderer = new google.maps.DirectionsRenderer();
    disp.setMap(this.map);
    let dirres: DirectionsResult;
    dirs.route(req, function (result, status) {

      disp.setDirections(result);
      dirres = result;
    this.duration = dirres.routes[0].legs[0].duration.text;
    console.log("duration is " + this.duration)
    });


  }
}

