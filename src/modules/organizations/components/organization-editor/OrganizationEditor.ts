import IVForm from "@/utils/types/IVForm";
import { emailRule, requiredLengthRule, requiredRule } from "@/utils/rules";
import { service } from "@/utils/services/ServiceProvider";
import { Component, Ref, Prop, Mixins } from "vue-property-decorator";
import { delay } from "@/utils/time";
import { EOrganizationTypes, IAdminOrganizationsClient, IOrganization, IOrganizationEditor } from "@/modules/organizations/types";
import { EServices } from "@/types";
import VPasswordField from "@/vuetify-extensions/VPasswordField.vue";
import VFileField from "@/vuetify-extensions/VFileField.vue";
import { organizationTypeTexts } from "../../constants";
import GooglePlacesAPIMixin from "@/mixins/GooglePlacesAPIMixin";

@Component({
  components: {
    VPasswordField,
    VFileField,
  }
})
export default class OrganizationEditor extends Mixins(GooglePlacesAPIMixin) implements IOrganizationEditor {
  @Prop({
    type: String,
    required: true
  })
  type!: EOrganizationTypes;

  @service(EServices.adminOrganizations)
  organizationsClient!: IAdminOrganizationsClient;

  createOrganizationDialogVisible = false;
  name = "";
  email = "";
  profilePhoto: string | File | null = null;
  description = "";
  phoneNumber = "";
  password = "";
  creatingOrganization = false;
  selectedOrganization: number | null = null;
  errors = {};

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
}
