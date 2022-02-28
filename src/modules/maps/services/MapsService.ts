import { Loader } from "google-maps";
import Service, { serviceClass } from "@/utils/services/Service";
import { IMapsService } from "../types";
import { EServices } from "@/types";

@serviceClass(EServices.maps)
class MapsService extends Service implements IMapsService {
  private google?: typeof google;
  
  async load(element: HTMLElement): Promise<google.maps.Map> {
    if(this.google == undefined)
      this.google = await new Loader(
        process.env.VUE_APP_MAPS_API_KEY,
        { version: "weekly", libraries: ["places"] }
      ).load();
        
    const map = new this.google.maps.Map(
      element,
      {
        center: new this.google.maps.LatLng(0, 1),
        zoom: 8
      }
    );
    return map;
  }

  async geocodeAddress(address: string): Promise<google.maps.GeocoderResult[]> {
    let geocoder = new this.google!.maps.Geocoder();
    return new Promise((resolve, reject) => {
      geocoder.geocode({ address }, (results, status) => {
        if(status != "OK")
          reject("Failed to find address");
        resolve(results);
      })
    })
  }

  async findPlace(request: google.maps.places.QueryAutocompletionRequest): Promise<google.maps.places.QueryAutocompletePrediction[]> {
    let placesService = new this.google!.maps.places.AutocompleteService();
    return new Promise((resolve, reject) => {
      placesService.getQueryPredictions(request, (results, status) => {
        if(status !== google.maps.places.PlacesServiceStatus.OK) reject(status);
        resolve(results);
      })
    })
  }

  async getPlaceDetails(id: string, map: google.maps.Map | HTMLDivElement): Promise<google.maps.places.PlaceResult> {
    let placesService = new this.google!.maps.places.PlacesService(map);
    return new Promise((resolve, reject) => {
      placesService.getDetails({placeId: id}, (results, status) => {
        if(status !== google.maps.places.PlacesServiceStatus.OK) reject(status);
        resolve(results);
      })
    })
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