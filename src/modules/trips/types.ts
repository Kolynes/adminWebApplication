import Service from "@/utils/services/Service";
import IJsonResponse from "@/utils/types/IJsonResponse";
import { IOrder } from "@/modules/orders/types";
import { IAgent, ILocation } from "../agents/types";
import { ICustomer } from "../customers/types";
import { IOrganization } from "../organizations/types";
import { IRide } from "../rides/types";

export enum ETripStatus {
  accepted = "ACCEPTED",
  completed = "COMPLETED",
  inProgress = "INPROGRESS",
  cancelled = "CANCELLED"
}

export interface ITripStep {
  description: string;
  isCompleted: boolean;
  isOrganization: boolean;
  location: ILocation;
  stepId: number;
  timeCompletion: string;
  title: string;
}

export interface ITrip {
  agentLocation: ILocation;
  cancelReason: string;
  createdOnDate: string;
  customer: ICustomer;
  deliveryAgent: IAgent;
  endLocation: ILocation;
  endTime?: string;
  id: number;
  isDeleted: false;
  order: IOrder;
  organizations: IOrganization[];
  percentage: number;
  ride: IRide;
  startLocation: ILocation;
  startTime: string;
  tripPrice: number;
  tripStatus: ETripStatus;
  tripSteps: ITripStep[];
  waitTime: number;
}

export interface IAdminTripsClient extends Service {
  getTrips(
    status: ETripStatus | "",
    search?: string,
    page?: number,
    pageSize?: number,
  ): Promise<IJsonResponse>;

  getTrip(id: number): Promise<IJsonResponse>;

  deleteTrip(id: number): Promise<IJsonResponse>;

  getTripsByAgent(
    id: number,
    status?: ETripStatus,
    search?: string,
    page?: number,
    pageSize?: number,
  ): Promise<IJsonResponse>;

  getTripsByCustomer(
    id: number,
    status?: ETripStatus,
    search?: string,
    page?: number,
    pageSize?: number,
  ): Promise<IJsonResponse>;

  getTripsByOrder(
    id: number,
    status?: ETripStatus,
    search?: string,
    page?: number,
    pageSize?: number,
  ): Promise<IJsonResponse>;

  getTripsByOrganization(
    id: number,
    status?: ETripStatus,
    search?: string,
    page?: number,
    pageSize?: number,
  ): Promise<IJsonResponse>;
}