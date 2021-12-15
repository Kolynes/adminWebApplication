import { IProductsClient } from "@/services/services";
import EProductTypes from "@/types/EProductTypes";
import EServices from "@/types/EServices";
import { service } from "@/utils/services/ServiceProvider";
import { Vue, Component, Ref, Prop } from "vue-property-decorator";
import EDrugTypes from "@/types/EDrugTypes";
import { namespace } from "vuex-class";
import { ISelectOrganization } from "@/components/select-organization/SelectOrganization";

const typeTextPlurals = {
  [EProductTypes.drug]: "Drugs",
  [EProductTypes.equipment]: "Equipment"
};

const typeTexts = {
  [EProductTypes.drug]: "Drug",
  [EProductTypes.equipment]: "Equipment"
};

const drugTypeTexts = {
  [EDrugTypes.otc]: "Over The Counter",
  [EDrugTypes.pom]: "Prescription Only Medication"
}

const organizationTypes = {
  [EProductTypes.drug]: "Pharmacy",
  [EProductTypes.equipment]: "OEM"
}

const organizationTypeRoutes = {
  [EProductTypes.drug]: "/dashboard/pharmacies",
  [EProductTypes.equipment]: "/dashboard/oems"
}

const AdminModule = namespace("AdminModule");

@Component
export default class OrganizationProductsEditorMixin extends Vue {
  @Prop({
    type: String,
    default: EProductTypes.drug
  })
  type!: EProductTypes;

  @service(EServices.products)
  productsClient!: IProductsClient;

  @AdminModule.Getter
  isSuperAdmin!: boolean;

  drugTypeOptions = [
    EDrugTypes.otc,
    EDrugTypes.pom,
  ];

  get typeText(): string {
    return typeTexts[this.type];
  }

  get typeTextPlural(): string {
    return typeTextPlurals[this.type];
  }

  get organizationTypeRoute(): string {
    return organizationTypeRoutes[this.type];
  }

  drugTypeText(drugType: EDrugTypes): string {
    return drugTypeTexts[drugType];
  }

  get typeOfOrganization(): string {
    return organizationTypes[this.type];
  }

}
