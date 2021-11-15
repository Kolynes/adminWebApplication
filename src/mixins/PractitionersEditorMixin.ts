import { IAdminPractitionersClient } from "@/services/services";
import EPractitionerTypes from "@/types/EPractitionerTypes";
import EServices from "@/types/EServices";
import { service } from "@/utils/services/ServiceProvider";
import { Vue, Component, Prop } from "vue-property-decorator";

const typeTexts = {
  [EPractitionerTypes.ambulance]: "Ambulance",
  [EPractitionerTypes.doctor]: "Doctor",
  [EPractitionerTypes.hospital]: "Hospital",
  [EPractitionerTypes.laboratory]: "Laboratory",
  [EPractitionerTypes.nurse]: "Nurse",
  [EPractitionerTypes.physiotherapist]: "Physiotherapist",
};

const typeTextPlurals = {
  [EPractitionerTypes.ambulance]: "Ambulances",
  [EPractitionerTypes.doctor]: "Doctors",
  [EPractitionerTypes.hospital]: "Hospitals",
  [EPractitionerTypes.laboratory]: "Laboratories",
  [EPractitionerTypes.nurse]: "Nurses",
  [EPractitionerTypes.physiotherapist]: "Physiotherapists",
};

@Component
export default class PractitionersEditorMixin extends Vue {
  @Prop({
    type: String,
    default: EPractitionerTypes.doctor
  })
  type!: EPractitionerTypes;

  @service(EServices.adminPractitioners)
  practitionersClient!: IAdminPractitionersClient;

  get typeText(): string {
    return typeTexts[this.type];
  }

  get typeTextPlural(): string {
    return typeTextPlurals[this.type];
  }

}