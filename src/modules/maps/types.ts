import Service from "@/utils/services/Service";

export interface IMapsService extends Service {
  load(element: HTMLElement): Promise<google.maps.Map>
  goToCoordinates(map: google.maps.Map, latitude: number, longitude: number): void;
  panToCoordinates(map: google.maps.Map, latitude: number, longitude: number): void;
  placeMarker(map: google.maps.Map, latitude: number, longitude: number): google.maps.Marker;
  geocodeAddress(address: string): Promise<google.maps.GeocoderResult[]>;
  findPlace(request: google.maps.places.QueryAutocompletionRequest): Promise<google.maps.places.QueryAutocompletePrediction[]>;
  getPlaceDetails(id: string, map: google.maps.Map | HTMLDivElement): Promise<google.maps.places.PlaceResult>;
}