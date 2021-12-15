import IMapsService from "./IMapsService";

import { Loader } from "google-maps";
import Service, { serviceClass } from "@/utils/services/Service";
import EServices from "@/types/EServices";

@serviceClass(EServices.maps)
class MapsService extends Service implements IMapsService {
  private google?: typeof google;
  
  async load(element: HTMLElement): Promise<google.maps.Map> {
    if(this.google == undefined)
      this.google = await new Loader(
        process.env.VUE_APP_MAPS_API_KEY,
        {
          version: "weekly"
        }
        ).load();
        
    const map = new this.google.maps.Map(
      element,
      {
        center: new this.google.maps.LatLng(7, 7),
        zoom: 18
      }
    );
    return map;
  }

  goToCoordinates(map: google.maps.Map, latitude: number, longitude: number) {
    map.setCenter(new google.maps.LatLng(latitude, longitude));
  }

  panToCoordinates(map: google.maps.Map, latitude: number, longitude: number) {
    map.panTo(new google.maps.LatLng(latitude, longitude));
  }

  placeMarker(map: google.maps.Map, latitude: number, longitude: number): google.maps.Marker {
    return new this.google!.maps.Marker({
      position: new this.google!.maps.LatLng(latitude, longitude),
      map,
      title: "Selected Location"
    });
  }
}