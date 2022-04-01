import GooglePlacesAPIMixin from "@/mixins/GooglePlacesAPIMixin";
import { EServices } from "@/types";
import { emailRule, requiredLengthRule, requiredRule } from "@/utils/rules";
import { service } from "@/utils/services/ServiceProvider";
import IVForm from "@/utils/types/IVForm";
import { Component, Mixins, Ref, Watch } from "vue-property-decorator";
import { identicationTypes, typeTexts, verificationTypes } from "@/modules/practitioners/constants";
import { EIdentificationTypes, EPractitionerTypes, EVerificationTypes, IAdminPractitionersClient, IPractitioner, IPractitionerEditor, IPractitonersClient } from "@/modules/practitioners/types";
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
export default class PractitionerEditor extends Mixins(GooglePlacesAPIMixin, NetworkManagerMixin) {
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
  practitionerType: EPractitionerTypes | null = null;
  dialogVisible = false;
  cities = [];
  city = "";

  @Ref()
  practitionerEditorForm!: IVForm;

  @service(EServices.practitioners)
  practitionersClient!: IPractitonersClient;

  @service(EServices.settings)
  adminSettingsClient!: IAdminSettingsClient;

  get verificationTypeOptions() {
    return Object.keys(verificationTypes)
    .map(
      key => ({key, value: Object.getOwnPropertyDescriptor(verificationTypes, key)!.value})
    );
  }

  get identificationTypeOptions() {
    return Object.keys(identicationTypes)
    .map(
      key => ({key, value: Object.getOwnPropertyDescriptor(identicationTypes, key)!.value})
    );
  }

  get practitionerTypeOptions() {
    return Object.keys(typeTexts)
    .map(
      key => ({key, value: Object.getOwnPropertyDescriptor(typeTexts, key)!.value})
    );
  }

  emailRule = emailRule;
  requiredLengthRule = requiredLengthRule;
  requiredRule = requiredRule;

  @throwsNetworkError()
  async createPractitioner() {
    if(!this.practitionerEditorForm.validate()) return;
    await this.practitionersClient.signUp(
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
      this.practitionerType!,
      this.identificationType,
      this.verificationType,
      this.identificationPhoto!,
      this.verificationPhoto!,
      this.profilePhoto!,
      this.password
    );
    // go to practitionr dashboard from here
  }

  @throwsNetworkError()
  async getCities() {
    const response = await this.adminSettingsClient.getCities();
    this.cities = response.data.map((city: string) => city.toUpperCase());
  }

  @Watch("error.createPractitioner")
  @Watch("error.getCities")
  onError(message: string) {
    if(message) toast({ icon: "mdi-exclamation-thick", iconColor: "red", message });
  }
  
  mounted() {
    this.getCities();
    this.initiateMap();
  }

}