import { EIdentificationTypes, EPractitionerTypes, EVerificationTypes } from "./types";

export const identicationTypes = {
  [EIdentificationTypes.driver]: "Driver's License",
  [EIdentificationTypes.passport]: "International Passport",
  [EIdentificationTypes.national]: "National ID Card",
  [EIdentificationTypes.voters]: "Voter's Card"
}

export const verificationTypes = {
  [EVerificationTypes.cac]: "Corporate Affairs Commission",
  [EVerificationTypes.cos]: "Certification Of Service",
  [EVerificationTypes.others]: "Others"
}

export const typeTexts = {
  [EPractitionerTypes.ambulance]: "Ambulance",
  [EPractitionerTypes.doctor]: "Doctor",
  [EPractitionerTypes.hospital]: "Hospital",
  [EPractitionerTypes.laboratory]: "Laboratory",
  [EPractitionerTypes.nurse]: "Nurse",
  [EPractitionerTypes.physiotherapist]: "Physiotherapist",
};

export const typeTextPlurals = {
  [EPractitionerTypes.ambulance]: "Ambulances",
  [EPractitionerTypes.doctor]: "Doctors",
  [EPractitionerTypes.hospital]: "Hospitals",
  [EPractitionerTypes.laboratory]: "Laboratories",
  [EPractitionerTypes.nurse]: "Nurses",
  [EPractitionerTypes.physiotherapist]: "Physiotherapists",
};