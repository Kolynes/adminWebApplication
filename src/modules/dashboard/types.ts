import Service from "@/utils/services/Service";
import IJsonResponse from "@/utils/types/IJsonResponse";
import { IAccount, IUser } from "../auth/types";
import { IOrder } from "../orders/types";
import { IOrganization } from "../organizations/types";
import { IPractitioner } from "../practitioners/types";

export interface IAdminDashboardClient extends Service {
  getDashboard(): Promise<IJsonResponse>;
}

export interface IAdminDashboardInfo {
  noOfAmbulances: number;
  noOfCustomers: number;
  noOfDoctors: number;
  noOfDrugs: number;
  noOfEquipments: number;
  noOfHospitals: number;
  noOfLabs: number;
  noOfNurses: number;
  noOfOems: number;
  noOfOrders: number;
  noOfPharmacies: number;
  noOfPhysios: number;
  noOfPractitioners: number;
  noOfProducts: number;
  noOfTrips: number;
  noOfUnAssignedOrders: number;
  last6Orders: IOrder[];
}

export interface DashboardLink {
  name: string;
  show: boolean;
  active: boolean;
  remove?: (account: IAccount, user: IUser | IOrganization | IPractitioner) => boolean;
  routes: {
    icon: string;
    path: string;
    name: string;
    remove?: (account: IAccount, user: IUser | IOrganization | IPractitioner) => boolean;
  }[];
}