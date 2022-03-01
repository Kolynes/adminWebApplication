import Service from "@/utils/services/Service";
import IJsonResponse from "@/utils/types/IJsonResponse";
import { IUser } from "../auth/types";

export interface IAdminUsersClient extends Service {
  getUsers(
    search: string,
    page?: number,
    pageSize?: number
  ): Promise<IJsonResponse>;

  getUser(id: number): Promise<IJsonResponse>;

  deleteUser(id: number): Promise<IJsonResponse>;

  updateUser(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    roleType: string,
    permissions: number[]
  ): Promise<IJsonResponse>;

  disableUser(id: number): Promise<IJsonResponse>;

  enableUser(id: number): Promise<IJsonResponse>;

  createAdminUser(
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    password: string,
    roleType: string,
    permissions: number[]
  ): Promise<IJsonResponse>;

  getCurrent(): Promise<IJsonResponse>;

}

export interface IAdminSettingsClient extends Service {
  getCities(): Promise<IJsonResponse>;
}

export interface IAdminEditor {
  beginEditAdmin(admin: IUser): void;
  toggleCreateAdminDialog(): void;
}