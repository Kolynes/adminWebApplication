import { IAccount, IUser, EUserType } from "../auth/types";
import { IOrganization } from "../organizations/types";
import { EIdentificationTypes, EPractitionerTypes, EVerificationTypes, IPractitioner } from "./types";

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

export const medicalPersonnelLinks =  {
  name: "Medical Personnel",
  show: false,
  active: false,
  remove: (account: IAccount, user: IUser | IOrganization | IPractitioner) => {
    if(account.userType == EUserType.admin) return false;
    return true;
  },
  routes: [
    { 
      icon: "mdi-hospital", 
      path: "/dashboard/doctors", 
      name: "Doctors" 
    },
    { 
      icon: "mdi-hospital", 
      path: "/dashboard/nurses", 
      name: "Nurses" 
    },
    { 
      icon: "mdi-hospital", 
      path: "/dashboard/physiotherapists", 
      name: "Physiotherapists" 
    },
  ]
};

export const medicalInstitutionsLinks = {
  name: "Medical Institutions",
  show: false,
  active: false,
  remove: (account: IAccount, user: IUser | IOrganization | IPractitioner) => {
    if(account.userType == EUserType.admin) return false;
    return true;
  },
  routes: [
    { 
      icon: "mdi-hospital-building", 
      path: "/dashboard/hospitals", 
      name: "Hospitals" 
    },
    { 
      icon: "mdi-hospital-building", 
      path: "/dashboard/laboratories", 
      name: "Laboratories" 
    },
    { 
      icon: "mdi-hospital-building", 
      path: "/dashboard/ambulances", 
      name: "Ambulance Services" 
    },
  ]
}