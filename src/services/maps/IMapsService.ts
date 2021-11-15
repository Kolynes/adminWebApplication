import Service from "@/utils/services/Service";

export default interface IMapsService extends Service {
  load(element: HTMLElement): Promise<google.maps.Map>
  goToCoordinates(map: google.maps.Map, latitude: number, longitude: number): void;
  panToCoordinates(map: google.maps.Map, latitude: number, longitude: number): void;
  placeMarker(map: google.maps.Map, latitude: number, longitude: number): google.maps.Marker;
}