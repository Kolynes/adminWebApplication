import Service from "@/utils/services/Service";
import IJsonResponse from "@/utils/types/IJsonResponse";
import { IOrder } from "../orders/types";

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