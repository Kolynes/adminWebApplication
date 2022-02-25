import { EIdentificationTypes, EVerificationTypes } from "./types";

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