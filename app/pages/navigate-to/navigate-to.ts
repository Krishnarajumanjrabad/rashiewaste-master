///<reference path="../../../node_modules/@angular/core/src/linker/element_ref.d.ts"/>
import {Component, NgZone} from "@angular/core";
import {NavController, Platform} from "ionic-angular";
import "rxjs/add/operator/map";
declare var google;
/*
 Generated class for the NavigateToPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  templateUrl: 'build/pages/navigate-to/navigate-to.html',
})
export class NavigateToPage {
//  @ViewChild('map') mapElement: ElementRef;
  map: any;
  myLoc: any;


  constructor(private nav: NavController, private platform: Platform, private _zone: NgZone) {
   // this.map = null;
   // google.maps.event.addDomListener(window, 'load', this.initMap());
    platform.ready().then((readSource) => {
      console.log("platform is invoked" + readSource);
      let lating = new google.maps.LatLng(13.265890, 77.560463);
      console.log(location);
      let mapOptions = {
        center: lating,
        zoom: 20,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        panControl: false,
        streetViewControl: true
      };
      this.map = new google.maps.Map(document.getElementById("map"),mapOptions);
      /*navigator.geolocation.getCurrentPosition(function(data){
        let latlagInfo = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);
        //this.map.setCenter(latlagInfo );
        this.myLoc = new google.maps.Marker({
          position: latlagInfo,
          map: mapView,
          title: "Rashi E Waste Location",
          animation: google.maps.Animation.DROP
        });

      });

      this.map = this.myLoc;*/
     // google.maps.event.addListener(window, 'load', this.loadMap());
    });

  }



  /*loadMap(){
    //google.maps.event.addListener(window,'load', this.initMap());

    let lating = new google.maps.LatLng(13.265890, 77.560463);
    console.log(location);
    let mapOptions = {
      center: lating,
      zoom: 20,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      panControl: false,
      streetViewControl: true
    }
    let mapView = new google.maps.Map(document.getElementById("map"),mapOptions);

    /!*this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
      console.log('Map is ready!');
    });*!/
    navigator.geolocation.getCurrentPosition(function(data){
      let latlagInfo = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);
      //this.map.setCenter(latlagInfo );
      this.myLoc = new google.maps.Marker({
        position: latlagInfo,
        map: mapView,
        title: "Rashi E Waste Location",
        animation: google.maps.Animation.DROP
      });

    });

    this.map = this.myLoc;
  }
*/
  /*initMap() {
    console.log('inside the initmap');
    let options = { enableHighAccuracy: true};
    Geolocation.getCurrentPosition(options).then((position) => {
      console.log(position);
      let lating = new google.maps.LatLng(13.265890, 77.560463);
      let mapOptions = {
        center: lating,
        zoom: 20,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        panControl: false,
        streetViewControl: true
      }
      //this.map = new google.maps.Map(document.getElementById("map"),mapOptions);
      this.map = new google.maps.Map(document.getElementById("map"),mapOptions);
      /!*var mapDiv = document.getElementById("map");
      var gomap = window.plugin.google.maps.Map(mapDiv);*!/
    }, (err) => {
      console.log(err);
    });

  }*/
  /*addMarker(){

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = "<h4>Information!</h4>";

    this.addInfoWindow(marker, content);

  }
  addInfoWindow(marker, content){

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }*/


}
