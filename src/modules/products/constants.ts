import { EUserType, IAccount, IUser } from "../auth/types";
import { EOrganizationTypes, IOrganization } from "../organizations/types";
import { IPractitioner } from "../practitioners/types";
import { EDrugTypes, EProductTypes } from "./types";

export const productTypeTextPlurals = {
  [EProductTypes.drug]: "Drugs",
  [EProductTypes.equipment]: "Equipment"
};

export const productTypeTexts = {
  [EProductTypes.drug]: "Drug",
  [EProductTypes.equipment]: "Equipment"
};

export const drugTypeTexts = {
  [EDrugTypes.otc]: "Over The Counter",
  [EDrugTypes.pom]: "Prescription Only Medication"
}

export const productsLinks = {
  name: "Products",
  show: false,
  active: false,
  remove: (account: IAccount, user: IUser | IOrganization | IPractitioner) => {
    if(account.userType == EUserType.practitioner) return true;
    return false;
  },
  routes: [
    { 
      icon: "mdi-cart", 
      path: "/dashboard/drugs", 
      name: "Drugs",
      remove: (account: IAccount, user: IUser | IOrganization | IPractitioner) => {
        if(account.userType == EUserType.admin) return false;
        if((user as IOrganization).organizationType == EOrganizationTypes.pharmacy) return false;
        return true;
      }
    },
    { 
      icon: "mdi-package", 
      path: "/dashboard/equipment", 
      name: "Equipment",
      remove: (account: IAccount, user: IUser | IOrganization | IPractitioner) => {
        if(account.userType == EUserType.admin) return false;
        if((user as IOrganization).organizationType == EOrganizationTypes.OEM) return false;
        return true;
      } 
    },
  ]
}