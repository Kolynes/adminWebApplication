import { IMapsService } from "@/modules/maps/types";
import { EServices } from "@/types";
import { service } from "@/utils/services/ServiceProvider";
import { delay } from "@/utils/time";
import { Vue, Component, Ref, Watch } from "vue-property-decorator";

@Component
export default class GooglePlacesAPIMixin extends Vue {
  place: google.maps.places.PlaceResult | null = null;
  prediction: google.maps.places.QueryAutocompletePrediction | null = null;
  predictions: google.maps.places.QueryAutocompletePrediction[] = [];
  map: google.maps.Map | null = null;
  locationMarker: google.maps.Marker | null = null;
  addressSearchString = "";

  @Ref()
  mapElement!: HTMLElement;

  @service(EServices.maps)
  mapsService!: IMapsService;

  get address(): string {
    return this.place && this.place!.formatted_address || "";
  }

  get latitude() {
    return this.place && this.place!.geometry!.location.lat();
  }

  get longitude() {
    return this.place && this.place!.geometry!.location.lng();
  }

  async initiateMap() {
    await delay(200);
    this.map = await this.mapsService.load(this.mapElement);
    navigator.geolocation.getCurrentPosition((result) => {
      this.mapsService.panToCoordinates(this.map!, result.coords.latitude, result.coords.longitude);
    }, error => {
      toast({ message: "Failed to get your current location" });
      console.log(error);
    })
  }

  setLocation(latitude: number, longitude: number) {
    if (this.locationMarker)
      this.locationMarker!.setPosition({ lat: latitude, lng: longitude });
    else {
      this.locationMarker = this.mapsService.placeMarker(this.map!, latitude, longitude);
    }
  }

  clearLocation() {
    if (!this.locationMarker) return;
    this.locationMarker!.setMap(null);
    this.locationMarker = null;
  }

  @Watch("addressSearchString")
  async onEnterAddress(input: string) {
    const request: google.maps.places.QueryAutocompletionRequest = {
      input,
      location: new google.maps.LatLng(0, 1),
      radius: 2000
    }
    this.predictions = await this.mapsService.findPlace(request);
  }

  @Watch("prediction")
  async onPredictionChange(input: google.maps.places.QueryAutocompletePrediction) {
    this.place = await this.mapsService.getPlaceDetails(input.place_id, this.map!);
  }

  @Watch("place")
  async onPlaceChange(place: google.maps.places.PlaceResult) {
    this.clearLocation();
    this.mapsService.panToCoordinates(this.map!, place.geometry!.location.lat(), place.geometry!.location.lng())
    this.setLocation(place.geometry!.location.lat(), place.geometry!.location.lng())
  }

}