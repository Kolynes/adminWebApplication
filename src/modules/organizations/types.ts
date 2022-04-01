import Service from "@/utils/services/Service";
import IJsonResponse from "@/utils/types/IJsonResponse";
import { ILocation } from "../agents/types";

export enum EOrganizationTypes {
  pharmacy = "PHARMACY",
  OEM = "OEM"
}

export interface IOrganization {
  id: number;
  name: string;
  email: string;
  profilePhoto: string;
  description: string;
  location: ILocation;
  phoneNumber: string;
  organizationType: EOrganizationTypes;
}

export interface IAdminOrganizationsClient extends Service {
  getOrganizations(
    type: EOrganizationTypes,
    search: string,
    page?: number,
    pageSize?: number
  ): Promise<IJsonResponse>;

  getOrganization(id: number): Promise<IJsonResponse>;

  deleteOrganization(id: number): Promise<IJsonResponse>;

  createOrganization(
    name: string,
    email: string,
    description: string,
    address: string,
    city: string,
    phoneNumber: string,
    profilePhoto: File,
    latitude: number,
    longitude: number,
    organizationType: EOrganizationTypes,
    password: string
  ): Promise<IJsonResponse>;

  updateOrganization(
    id: number,
    name: string,
    email: string,
    description: string,
    address: string,
    city: string,
    phoneNumber: string,
    latitude: number,
    longitude: number,
  ): Promise<IJsonResponse>;

  changeProfilePhoto(id: number, profilePhoto: File): Promise<IJsonResponse>;
}

export interface IOrganizationsClient extends Service {
  getCurrent(): Promise<IJsonResponse>;
  getOrders(): Promise<IJsonResponse>;
  getProducts(): Promise<IJsonResponse>;
  createProduct(): Promise<IJsonResponse>;
  updateProduct(): Promise<IJsonResponse>;
  getDashboard(): Promise<IJsonResponse>;
  updateOrganization(): Promise<IJsonResponse>;
}

export interface IOrganizationEditor {
  toggleCreateOrganizationDialog(edit?: boolean): void;
  beginEditOrganization(organization: IOrganization): void;
}

export interface ISelectOrganization {
  getOrganization(): Promise<IOrganization>;
}