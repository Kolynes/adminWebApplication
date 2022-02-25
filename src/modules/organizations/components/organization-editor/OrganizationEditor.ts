import IVForm from "@/utils/types/IVForm";
import { emailRule, requiredLengthRule, requiredRule } from "@/utils/rules";
import { service } from "@/utils/services/ServiceProvider";
import { Vue, Component, Ref, Prop, Watch } from "vue-property-decorator";
import { delay } from "@/utils/time";
import { EOrganizationTypes, IAdminOrganizationsClient, IOrganization, IOrganizationEditor } from "@/modules/organizations/types";
import { EServices } from "@/types";
import { IMapsService } from "@/modules/maps/types";
import VPasswordField from "@/vuetify-extensions/VPasswordField.vue";
import VFileField from "@/vuetify-extensions/VFileField.vue";
import { organizationTypeTexts } from "../../constants";

@Component({
  components: {
    VPasswordField,
    VFileField,
  }
})
export default class OrganizationEditor extends Vue implements IOrganizationEditor {
  @Prop({
    type: String,
    required: true
  })
  type!: EOrganizationTypes;

  @service(EServices.adminOrganizations)
  organizationsClient!: IAdminOrganizationsClient;

  @service(EServices.maps)
  mapsService!: IMapsService;

  createOrganizationDialogVisible = false;
  name = "";
  email = "";
  profilePhoto: string | File | null = null;
  description = "";
  place: google.maps.places.PlaceResult | null = null;
  prediction: google.maps.places.QueryAutocompletePrediction | null = null;
  predictions: google.maps.places.QueryAutocompletePrediction[] = [];
  phoneNumber = "";
  password = "";
  creatingOrganization = false;
  selectedOrganization: number | null = null;
  map: google.maps.Map | null = null;
  locationMarker: google.maps.Marker | null = null;
  addressSearchString = "";
  errors = {};

  @Ref()
  createOrganizationForm!: IVForm;

  @Ref()
  mapElement!: HTMLElement;

  emailRule = emailRule;
  requiredLengthRule = requiredLengthRule;
  requiredRule = requiredRule;

  get organizationTypeText(): string {
    return organizationTypeTexts[this.type!];
  }

  get address(): string {
    return this.place && this.place!.formatted_address || "";
  }

  get latitude() {
    return this.place && this.place!.geometry!.location.lat();
  }

  get longitude() {
    return this.place && this.place!.geometry!.location.lng();
  }

  async toggleCreateOrganizationDialog(edit: boolean = false) {
    this.createOrganizationDialogVisible = !this.createOrganizationDialogVisible;
    if (!this.createOrganizationDialogVisible) {
      this.selectedOrganization = null;
      this.createOrganizationForm.reset();
      this.locationMarker = null;
    } else {
      await delay(200);
      this.map = await this.mapsService.load(this.mapElement);
      if (!edit)
        navigator.geolocation.getCurrentPosition((result) => {
          this.mapsService.panToCoordinates(this.map!, result.coords.latitude, result.coords.longitude);
        }, error => {
          toast({ message: "Failed to get your current location" });
          console.log(error);
        })
      this.map.addListener(
        "click",
        (event) => this.setLocation(event.latLng.lat(), event.latLng.lng())
      )
    }
  }

  async beginEditOrganization(organization: IOrganization) {
    this.name = organization.name;
    this.email = organization.email;
    this.phoneNumber = organization.phoneNumber;
    await this.onEnterAddress(organization.location.address);
    this.prediction = this.predictions.find(el => el.description.includes(organization.location.address)) || null;
    console.log(this.predictions)
    this.description = organization.description;
    this.selectedOrganization = organization.id;
    await this.toggleCreateOrganizationDialog(true);
    this.setLocation(parseFloat(organization.location.latitude), parseFloat(organization.location.longitude))
    setTimeout(
      () =>
        this.mapsService.panToCoordinates(
          this.map!,
          parseFloat(organization.location.latitude),
          parseFloat(organization.location.longitude)
        ),
      1000
    );
  }

  setLocation(latitude: number, longitude: number) {
    if (this.locationMarker)
      this.locationMarker!.setPosition({ lat: latitude, lng: longitude });
    else {
      this.locationMarker = this.mapsService.placeMarker(this.map!, latitude, longitude);
    }
  }

  clearLocation() {
    if(!this.locationMarker) return;
    this.locationMarker!.setMap(null);
    this.locationMarker = null;
  }

  async editOrganization() {
    if (this.createOrganizationForm.validate()) {
      this.errors = {};
      this.creatingOrganization = true;
      const response = await this.organizationsClient.updateOrganization(
        this.selectedOrganization!,
        this.name,
        this.email,
        this.description,
        this.address,
        this.phoneNumber,
        this.latitude!,
        this.longitude!
      );
      this.creatingOrganization = false;
      if (response.status == 200) {
        toast({ message: this.organizationTypeText + " updated" });
        this.$emit("saved");
        this.toggleCreateOrganizationDialog();
        this.selectedOrganization = null
      }
      else {
        toast({ message: response.errors!.summary });
        this.errors = response.errors!.fields;
      }
    }
  }

  async createOrganization() {
    if (this.createOrganizationForm.validate()) {
      this.errors = {};
      this.creatingOrganization = true;
      const response = await this.organizationsClient.createOrganization(
        this.name,
        this.email,
        this.description,
        this.address,
        this.phoneNumber,
        this.profilePhoto as File,
        this.latitude!,
        this.longitude!,
        this.type!,
        this.password
      );
      this.creatingOrganization = false;
      if (response.status == 201 || response.status == 200) {
        toast({ message: this.organizationTypeText + " created" });
        this.$emit("saved");
        this.toggleCreateOrganizationDialog()
        this.selectedOrganization = null
      }
      else {
        toast({ message: response.errors!.summary });
        this.errors = response.errors!.fields;
      }
    }
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
