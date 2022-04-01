import { IAccount, IUser, EUserType } from "../auth/types";
import { IPractitioner } from "../practitioners/types";
import { EProductTypes } from "../products/types";
import { EOrganizationTypes, IOrganization } from "./types";

export const organizationTypeTexts = {
  [EOrganizationTypes.pharmacy]: "Pharmacy",
  [EOrganizationTypes.OEM]: "OEM"
};

export const icons = {
  [EOrganizationTypes.pharmacy]: "mdi-pharmacy",
  [EOrganizationTypes.OEM]: "mdi-truck-delivery"
};

export const organizationTypeTextPlurals = {
  [EOrganizationTypes.pharmacy]: "Pharmacies",
  [EOrganizationTypes.OEM]: "OEMs"
};

export const organizationTypeRoutes = {
  [EProductTypes.drug]: "/dashboard/pharmacies",
  [EProductTypes.equipment]: "/dashboard/oems"
}

export const organizationTypeTextsByProductType = {
  [EProductTypes.drug]: "Pharmacy",
  [EProductTypes.equipment]: "OEM"
}

export const organizationLinks = {
  name: "Organizations",
  show: false,
  active: false,
  remove: (account: IAccount, user: IUser | IOrganization | IPractitioner) => {
    if (account.userType == EUserType.admin) return false;
    return true;
  },
  routes: [
    {
      icon: "mdi-pharmacy",
      path: "/dashboard/pharmacies",
      name: "Pharmacies"
    },
    {
      icon: "mdi-truck-delivery",
      path: "/dashboard/oems",
      name: "OEMs"
    },
  ]
}