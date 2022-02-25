import Service from "@/utils/services/Service";
import IJsonResponse from "@/utils/types/IJsonResponse";

export interface IRide {
  id: number;
  name: string;
  model: string;
  brand: string;
  licensePlate: string;
  photo: string | File;
  assigned: boolean;
}

export interface IAdminRidesClient extends Service {
  getRides(
    search: string,
    page: number,
    pageSize: number,
  ): Promise<IJsonResponse>;

  createRide(
    name: string,
    model: string,
    brand: string,
    licensePlate: string,
    photo: File
  ): Promise<IJsonResponse>;

  getRide(id: number): Promise<IJsonResponse>;

  deleteRide(id: number): Promise<IJsonResponse>;

  updateRide(
    id: number,
    name: string,
    brand: string,
    model: string,
    licensePlate: string
  ): Promise<IJsonResponse>;

  changeRidePhoto(id: number, photo: File): Promise<IJsonResponse>;
}

export interface IRideEditor {
  toggleCreateRideDialog(): void;
  beginEditRide(ride: IRide): void;
}

export interface ISelectRide {
  getRide(): Promise<IRide>;
}