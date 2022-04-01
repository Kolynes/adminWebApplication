import IVForm from "@/utils/types/IVForm";
import { emailRule, requiredLengthRule, requiredRule } from "@/utils/rules";
import { service } from "@/utils/services/ServiceProvider";
import { Component, Ref, Prop, Mixins, Watch } from "vue-property-decorator";
import { EOrganizationTypes, IAdminOrganizationsClient, IOrganization, IOrganizationEditor } from "@/modules/organizations/types";
import { EServices } from "@/types";
import VPasswordField from "@/vuetify-extensions/VPasswordField.vue";
import VFileField from "@/vuetify-extensions/VFileField.vue";
import { organizationTypeTexts } from "../../constants";
import GooglePlacesAPIMixin from "@/mixins/GooglePlacesAPIMixin";
import NetworkManagerMixin, { throwsNetworkError } from "@/utils/http/NetworkManagerMixin";
import { IAdminSettingsClient } from "@/modules/admins/types";

@Component({
  components: {
    VPasswordField,
    VFileField,
  }
})
export default class OrganizationEditor extends Mixins(GooglePlacesAPIMixin, NetworkManagerMixin) implements IOrganizationEditor {
  @Prop({
    type: String,
    required: true
  })
  type!: EOrganizationTypes;

  @service(EServices.adminOrganizations)
  organizationsClient!: IAdminOrganizationsClient;

  @service(EServices.settings)
  adminSettingsClient!: IAdminSettingsClient;

  createOrganizationDialogVisible = false;
  name = "";
  email = "";
  profilePhoto: string | File | null = null;
  description = "";
  phoneNumber = "";
  password = "";
  selectedOrganization: number | null = null;
  cities = [];
  city = "";

  @Ref()
  createOrganizationForm!: IVForm;

  emailRule = emailRule;
  requiredLengthRule = requiredLengthRule;
  requiredRule = requiredRule;

  get organizationTypeText(): string {
    return organizationTypeTexts[this.type!];
  }

  async toggleCreateOrganizationDialog() {
    this.createOrganizationDialogVisible = !this.createOrganizationDialogVisible;
    if (!this.createOrganizationDialogVisible) {
      this.selectedOrganization = null;
      this.createOrganizationForm.reset();
      this.locationMarker = null;
    } else this.initiateMap();
  }

  async beginEditOrganization(organization: IOrganization) {
    this.name = organization.name;
    this.email = organization.email;
    this.phoneNumber = organization.phoneNumber;
    await this.onEnterAddress(organization.location.address);
    this.prediction = this.predictions.find(el => el.description.includes(organization.location.address)) || null;
    this.description = organization.description;
    this.selectedOrganization = organization.id;
    await this.toggleCreateOrganizationDialog();
    setTimeout(
      () => {
        this.setLocation(parseFloat(organization.location.latitude), parseFloat(organization.location.longitude));
        this.mapsService.panToCoordinates(
          this.map!,
          parseFloat(organization.location.latitude),
          parseFloat(organization.location.longitude)
        );
      },
      1000
    );
  }

  @throwsNetworkError()
  async editOrganization() {
    if (!this.createOrganizationForm.validate()) return;
    await this.organizationsClient.updateOrganization(
      this.selectedOrganization!,
      this.name,
      this.email,
      this.description,
      this.address,
      this.city,
      this.phoneNumber,
      this.latitude!,
      this.longitude!
    );
    toast({ message: this.organizationTypeText + " updated" });
    this.$emit("saved");
    this.toggleCreateOrganizationDialog();
  }

  @throwsNetworkError()
  async createOrganization() {
    if (!this.createOrganizationForm.validate()) return;
    await this.organizationsClient.createOrganization(
      this.name,
      this.email,
      this.description,
      this.address,
      this.city,
      this.phoneNumber,
      this.profilePhoto as File,
      this.latitude!,
      this.longitude!,
      this.type!,
      this.password
    );
    toast({ message: this.organizationTypeText + " created" });
    this.$emit("saved");
    this.toggleCreateOrganizationDialog()
  }

  @throwsNetworkError()
  async getCities() {
    const response = await this.adminSettingsClient.getCities();
    this.cities = response.data.map((city: string) => city.toUpperCase());
  }

  @Watch("error.createOrganization")
  @Watch("error.editOrganization")
  onError(message: string) {
    if(message) toast({ icon: "mdi-exclamation-thick", iconColor: "red", message });
  }

  mounted() {
    this.getCities();
  }
}
