import { IAdminOrganizationsClient } from "@/services/services";
import EOrganizationTypes from "@/types/EOrganizationTypes";
import EServices from "@/types/EServices";
import IOrganization from "@/types/IOrganization";
import IVForm from "@/types/IVForm";
import { emailRule, requiredLengthRule, requiredRule } from "@/utils/rules";
import { service } from "@/utils/services/ServiceProvider";
import { Vue, Component, Ref, Prop } from "vue-property-decorator";
import IMapsService from "@/services/maps/IMapsService";
import { delay } from "@/utils/time";
import { IFileGetter } from "@/components/file-getter/FileGetter";

const typeTextPlurals = {
  [EOrganizationTypes.pharmacy]: "Pharmacies",
  [EOrganizationTypes.OEM]: "OEMs"
};

const typeTexts = {
  [EOrganizationTypes.pharmacy]: "Pharmacy",
  [EOrganizationTypes.OEM]: "OEM"
};

const icons = {
  [EOrganizationTypes.pharmacy]: "mdi-pharmacy",
  [EOrganizationTypes.OEM]: "mdi-truck-delivery"
};

@Component
export default class OrganizationsEditorMixin extends Vue {
  @Prop({
    type: String,
    default: EOrganizationTypes.pharmacy
  })
  type!: EOrganizationTypes;

  @service(EServices.adminOrganizations)
  organizationsClient!: IAdminOrganizationsClient;

  @service(EServices.maps)
  mapsService!: IMapsService;
  
  @Ref()
  fileGetter!: IFileGetter;

  createOrganizationDialogVisible = false;
  name = "";
  email = "";
  profilePhoto: string | File | null = null;
  description = "";
  latitude: number | null = null;
  longitude: number | null = null;
  address = "";
  phoneNumber = "";
  password = "";
  creatingOrganization = false;
  selectedOrganization: number | null = null;
  map: google.maps.Map | null = null;
  locationMarker: google.maps.Marker | null = null;

  get typeText(): string {
    return typeTexts[this.type];
  }

  get typeTextPlural(): string {
    return typeTextPlurals[this.type];
  }

  get icon(): string {
    return icons[this.type];
  }

  @Ref()
  createOrganizationForm!: IVForm;

  @Ref()
  mapElement!: HTMLElement;

  emailRule = emailRule;
  requiredLengthRule = requiredLengthRule;
  requiredRule = requiredRule;

  async toggleCreateOrganizationDialog(edit: boolean = false) {
    this.createOrganizationDialogVisible = !this.createOrganizationDialogVisible;
    if(!this.createOrganizationDialogVisible){
      this.selectedOrganization = null;
      this.createOrganizationForm.reset();
      this.locationMarker = null;
    } else {
      await delay(200);
      this.map = await this.mapsService.load(this.mapElement);
      if(!edit)
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
    this.email =organization.email;
    this.phoneNumber = organization.phoneNumber;
    this.address = organization.address;
    this.description = organization.description;
    this.selectedOrganization = organization.id;
    await this.toggleCreateOrganizationDialog(true);
    this.setLocation(organization.latitude, organization.longitude)
    setTimeout(
      () => 
        this.mapsService.panToCoordinates(this.map!, organization.latitude, organization.longitude),
      1000
    );
  }

  async changeProfilePhoto(id: number) {
    const file = await this.fileGetter.getFile("image/*", 1 * 1024 * 1024);
    if(file !== null) {
      toast({ loading: true, message: "Changing profile picture..."})
      const response = await this.organizationsClient.changeProfilePhoto(id, file);
      if(response.status == 200)
        toast({ message: "Profile picture changed" });
      else toast({ message: "Failed to change profile picture" });
    }
  }

  setLocation(latitude: number, longitude: number) {
    if(this.locationMarker)
      this.locationMarker!.setPosition({lat: latitude, lng: longitude});
    else {
      this.locationMarker = this.mapsService.placeMarker(this.map!, latitude, longitude);
    }
    this.latitude = latitude;
    this.longitude = longitude;
  }

  async editOrganization() {
    if(this.createOrganizationForm.validate()) {
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
      if(response.status == 200) {
        toast({ message: this.typeText + " updated"});
        this.toggleCreateOrganizationDialog();
        this.selectedOrganization = null
      }
      else toast({ message: response.errors!.summary });
    }
  }

  async createOrganization() {
    if(this.createOrganizationForm.validate()) {
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
        this.type,
        this.password
      );
      this.creatingOrganization = false;
      if(response.status == 201 || response.status == 200) {
        toast({ message: this.typeText + "created"});
        this.toggleCreateOrganizationDialog()
        this.selectedOrganization = null
      }
      else toast({ message: response.errors!.summary });
    }
  }
}
