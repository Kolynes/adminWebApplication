import { IRide } from "@/modules/rides/types";
import Service from "@/utils/services/Service";
import IJsonResponse from "@/utils/types/IJsonResponse";

export interface ILocation {
  longitude: string;
  latitude: string;
  address: string;
}

export interface IAgent {
  id: number;
  email: string;
  city: string;
  location: ILocation;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  profilePhoto: string;
  available: boolean;
  ride: IRide;
}

export interface IAdminAgentsClient extends Service {
  getAgents(
    search: string,
    page?: number,
    pageSize?: number
  ): Promise<IJsonResponse>;

  getAgent(id: number): Promise<IJsonResponse>;

  deleteAgent(id: number): Promise<IJsonResponse>;

  updateAgent(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    availability: boolean,
  ): Promise<IJsonResponse>;

  changeProfilePhoto(id: number, profilePhoto: File): Promise<IJsonResponse>;

  updateAgentCredentials(
    id: number,
    email: string,
    password: string
  ): Promise<IJsonResponse>;

  createAgent(
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    city: string, 
    profilePhoto: File,
    rideId: number,
    password: string,
  ): Promise<IJsonResponse>;

  toggleAgentAvailability(id: number): Promise<IJsonResponse>;

  getActiveAgents(
    search: string,
    page?: number,
    pageSize?: number 
  ): Promise<IJsonResponse>;
}

export interface IAgentEditor {
  toggleCreateAgentDialog(): void;
  beginEditAgent(agent: IAgent): void;
}

export interface ISelectAgent {
  getAgent(): Promise<IAgent>;
}