import GooglePlacesAPIMixin from "@/mixins/GooglePlacesAPIMixin";
import { EServices } from "@/types";
import { emailRule, requiredLengthRule, requiredRule } from "@/utils/rules";
import { service } from "@/utils/services/ServiceProvider";
import IVForm from "@/utils/types/IVForm";
import { Component, Prop, Mixins, Ref, Watch } from "vue-property-decorator";
import { identicationTypes, typeTextPlurals, typeTexts, verificationTypes } from "../../constants";
import { EIdentificationTypes, EPractitionerTypes, EVerificationTypes, IAdminPractitionersClient, IPractitioner, IPractitionerEditor } from "../../types";
import VPasswordField from "@/vuetify-extensions/VPasswordField.vue";
import VFileField from "@/vuetify-extensions/VFileField.vue";
import { IAdminSettingsClient } from "@/modules/admins/types";
import NetworkManagerMixin, { throwsNetworkError } from "@/utils/http/NetworkManagerMixin";

@Component({
  components: {
    VPasswordField,
    VFileField
  }
})
export default class PractitionerEditor extends Mixins(GooglePlacesAPIMixin, NetworkManagerMixin) implements IPractitionerEditor {
  @Prop({
    type: String,
    default: EPractitionerTypes.doctor
  })
  type!: EPractitionerTypes;

  name = "";
  yearsOfExperience = 0;
  phoneNumber = "";
  email = "";
  description = "";
  specialties = "";
  companyName = "";
  verificationType = EVerificationTypes.cac;
  identificationType = EIdentificationTypes.national;
  profilePhoto: File | null = null;
  identificationPhoto: File | null = null;
  verificationPhoto: File | null = null;
  password = "";
  selectedPractitioner: number | null = null;
  dialogVisible = false;
  cities = [];
  city = "";

  @Ref()
  practitionerEditorForm!: IVForm;

  @service(EServices.adminPractitioners)
  adminPractitionersClient!: IAdminPractitionersClient;

  @service(EServices.settings)
  adminSettingsClient!: IAdminSettingsClient;

  get typeText(): string {
    return typeTexts[this.type];
  }

  get typeTextPlural(): string {
    return typeTextPlurals[this.type];
  }

  get verificationTypeOptions() {
    return Object.keys(verificationTypes)
      .map(
        key => ({ key, value: Object.getOwnPropertyDescriptor(verificationTypes, key)!.value })
      );
  }

  get identificationTypeOptions() {
    return Object.keys(identicationTypes)
      .map(
        key => ({ key, value: Object.getOwnPropertyDescriptor(identicationTypes, key)!.value })
      );
  }

  emailRule = emailRule;
  requiredLengthRule = requiredLengthRule;
  requiredRule = requiredRule;

  toggleCreatePractitionerDialog() {
    this.dialogVisible = !this.dialogVisible;
    if (!this.dialogVisible) {
      this.practitionerEditorForm.reset();
      this.selectedPractitioner = null;
    } else this.initiateMap();
  }

  async beginEditPractitioner(practitioner: IPractitioner) {
    this.selectedPractitioner = practitioner.id;
    this.name = practitioner.name;
    this.yearsOfExperience = practitioner.yearsOfExperience;
    this.phoneNumber = practitioner.phoneNumber;
    this.email = practitioner.email;
    this.description = practitioner.description;
    this.specialties = practitioner.specialties;
    this.companyName = practitioner.companyName;
    this.city = practitioner.city;
    this.toggleCreatePractitionerDialog();
    if (practitioner.location) {
      await this.onEnterAddress(practitioner.location.address);
      this.prediction = this.predictions.find(el => el.description.includes(practitioner.location.address)) || null;
    }
    setTimeout(
      () => {
        this.setLocation(parseFloat(practitioner.location.latitude), parseFloat(practitioner.location.longitude));
        this.mapsService.panToCoordinates(
          this.map!,
          parseFloat(practitioner.location.latitude),
          parseFloat(practitioner.location.longitude)
        );
      },
      1000
    );
  }

  @throwsNetworkError()
  async createPractitioner() {
    if (!this.practitionerEditorForm.validate()) return;
    await this.adminPractitionersClient.createPractitioner(
      this.name,
      this.email,
      this.phoneNumber,
      this.description,
      this.specialties,
      this.yearsOfExperience,
      this.companyName,
      this.address,
      this.city,
      this.latitude!,
      this.longitude!,
      this.type,
      this.identificationType,
      this.verificationType,
      this.identificationPhoto!,
      this.verificationPhoto!,
      this.profilePhoto!,
      this.password
    );
    this.$emit("saved");
    this.toggleCreatePractitionerDialog();
    toast({ icon: "mdi-check", iconColor: "green", message: "Practitioner created" });
  }

  @throwsNetworkError()
  async updatePractitioner() {
    if (!this.practitionerEditorForm.validate()) return;
    await this.adminPractitionersClient.updatePractitioner(
      this.selectedPractitioner!,
      this.name,
      this.email,
      this.phoneNumber,
      this.description,
      this.specialties,
      this.yearsOfExperience,
      this.companyName,
      this.address,
      this.city,
      this.latitude!,
      this.longitude!,
    );
    this.$emit("saved");
    this.toggleCreatePractitionerDialog();
    toast({ icon: "mdi-check", iconColor: "green", message: "Practitioner updated" });
  }

  @throwsNetworkError()
  async getCities() {
    const response = await this.adminSettingsClient.getCities();
    this.cities = response.data.map((city: string) => city.toUpperCase());
  }

  @Watch("error.createPractitioner")
  @Watch("error.updatePractitioner")
  @Watch("error.getCities")
  onError(message: string) {
    if(message) toast({ icon: "mdi-exclamation-thick", iconColor: "red", message });
  }

  mounted() {
    this.getCities();
  }
}