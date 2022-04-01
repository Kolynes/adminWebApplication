import Service from "@/utils/services/Service";
import IJsonResponse from "@/utils/types/IJsonResponse";
import { ILocation } from "../agents/types";
import { EUserType, IRole } from "../auth/types";

export enum EPractitionerTypes {
  ambulance = "AMBULANCE",
  hospital = "HOSPITAL",
  laboratory = "LABORATORY",
  doctor = "DOCTOR",
  physiotherapist = "PHYSIOTHERAPIST",
  nurse = "NURSE"
}

export enum EIdentificationStatus {
  pending = "PENDING"
}

export enum EIdentificationTypes {
  passport = "PASSPORT",
  driver = "DRIVER",
  national = "NATIONAL",
  voters ="VOTERS"
}

export enum EVerificationTypes {
  cac = "CAC",
  cos = "COS",
  others = "OTHERS"
}

export enum ESubscriptionTypes {
  monthly = "MONTHLY",
  yearly = "YEARLY"
}

export interface IPractitioner {
  id: number;
  name: string;
  email: string;
  profilePhoto: string;
  specialties: string;
  companyName: string;
  yearsOfExperience: number;
  type: string;
  active: boolean;
  city: string;
  location: ILocation;
  createdOnDate: string;
  description: string;
  identification: IIdentification;
  identified: false
  permissions: string[];
  phoneNumber: string;
  practitionerType: EPractitionerTypes;
  role: IRole;
  subscribed: boolean;
  subscription: ISubscription;
  userType: EUserType;
  verification: IVerification;
  verified: boolean;
}

export interface ISubscription {
  endDate: string,
  startDate: string,
  subscriptionType: ESubscriptionTypes
}

export interface IIdentification {
  identificationDate: string;
  identificationPhoto: string;
  identificationStatus: EIdentificationStatus;
  identifiactionType: EIdentificationTypes;
}

export interface IVerification {
  verificationDate: string;
  verificationPhoto: string;
  verificationType: EVerificationTypes;
  verificationStatus: EIdentificationStatus;
}

export interface IAdminPractitionersClient extends Service {
  getPractitioners(
    type: EPractitionerTypes,
    search: string,
    page?: number,
    pageSize?: number
  ): Promise<IJsonResponse>;

  getPractitioner(id: number): Promise<IJsonResponse>;

  deletePractitioner(id: number): Promise<IJsonResponse>;

  createPractitioner(
    name: string,
    email: string,
    phoneNumber: string,
    description: string,
    specialties: string,
    yearsOfExperience: number,
    companyName: string,
    address: string,
    city: string,
    latitude: number,
    longitude: number,
    practitionerType: EPractitionerTypes,
    identificationType: EIdentificationTypes,
    verificationType: EVerificationTypes,
    identificationPhoto: File,
    verificationPhoto: File,
    profilePhoto: File,
    password: string
  ): Promise<IJsonResponse>;

  updatePractitioner(
    id: number,
    name: string,
    email: string,
    phoneNumber: string,
    description: string,
    specialties: string,
    yearsOfExperience: number,
    companyName: string,
    address: string,
    city: string,
    latitude: number,
    longitude: number,
  ): Promise<IJsonResponse>;

  completeIdentifcation(
    id: number,
  ): Promise<IJsonResponse>;

  verifyPractitioner(
    id: number,
  ): Promise<IJsonResponse>;

  changeProfilePhoto(id: number, profilePhoto: File): Promise<IJsonResponse>;

  getClicks(
    query: string, 
    page?: number,
    pageSize?: number,
  ): Promise<IJsonResponse>;

  getClicksByPractitioner(
    id: number,
    page?: number,
    pageSize?: number,
  ): Promise<IJsonResponse>;

}

export interface IPractitonersClient extends Service {
  signUp(
    name: string,
    email: string,
    phoneNumber: string,
    description: string,
    specialties: string,
    yearsOfExperience: number,
    companyName: string,
    address: string,
    city: string,
    latitude: number,
    longitude: number,
    practitionerType: EPractitionerTypes,
    identificationType: EIdentificationTypes,
    verificationType: EVerificationTypes,
    identificationPhoto: File,
    verificationPhoto: File,
    profilePhoto: File,
    password: string
  ): Promise<IJsonResponse>;

  login(email: string, password: string): Promise<IJsonResponse>;

  subscribe(id: number, transactionReference: string, subscriptionType: ESubscriptionTypes): Promise<IJsonResponse>;

  unsubscribe(id: number): Promise<IJsonResponse>;

  deleteAccount(id: number): Promise<IJsonResponse>;

  getCurrent(): Promise<IJsonResponse>;
}

export interface IPractitionerEditor {
  toggleCreatePractitionerDialog(): void;
  beginEditPractitioner(practitioner: IPractitioner): void; 
}