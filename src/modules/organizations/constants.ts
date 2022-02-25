import { EProductTypes } from "../products/types";
import { EOrganizationTypes } from "./types";

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