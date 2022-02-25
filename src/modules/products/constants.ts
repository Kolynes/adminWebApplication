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