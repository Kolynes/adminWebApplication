import GooglePlacesAPIMixin from "@/mixins/GooglePlacesAPIMixin";
import { EServices } from "@/types";
import { emailRule, requiredLengthRule, requiredRule } from "@/utils/rules";
import { service } from "@/utils/services/ServiceProvider";
import IVForm from "@/utils/types/IVForm";
import { Component, Mixins, Ref } from "vue-property-decorator";
import { identicationTypes, typeTexts, verificationTypes } from "@/modules/practitioners/constants";
import { EIdentificationTypes, EPractitionerTypes, EVerificationTypes, IAdminPractitionersClient, IPractitioner, IPractitionerEditor, IPractitonersClient } from "@/modules/practitioners/types";
import VPasswordField from "@/vuetify-extensions/VPasswordField.vue";
import VFileField from "@/vuetify-extensions/VFileField.vue";
import { IAdminSettingsClient } from "@/modules/admins/types";

@Component({
  components: {
    VPasswordField,
    VFileField
  }
})
export default class PractitionerEditor extends Mixins(GooglePlacesAPIMixin) {
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
  errors = {};
  creatingPractitioner = false;
  cities = [];
  loadingCities = false;
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

  async createPractitioner() {
    if(!this.practitionerEditorForm.validate()) return;
    this.creatingPractitioner = true;
    const response = await this.practitionersClient.signUp(
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
    this.creatingPractitioner = false;
    if(response.status == 200 || response.status == 201) {
      console.log(response)
      toast({ message: "Practitioner created"});
    } else {
      toast({ message: response.errors!.summary });
      this.errors = response.errors!.fields;
    }
  }

  async getCities() {
    this.loadingCities = true;
    const response = await this.adminSettingsClient.getCities();
    this.loadingCities = false;
    if(response.status == 200)
      this.cities = response.data;
    else toast({ message: "Failed to get cities" });
  }

  mounted() {
    this.getCities();
    this.initiateMap();
  }

}