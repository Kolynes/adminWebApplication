import Service from "@/utils/services/Service";
import IJsonResponse from "@/utils/types/IJsonResponse";

export enum EUserType {
  admin = "ADMIN",
  customer = "CUSTOMER",
  practitioner = "PRACTITIONER",
  organization = "ORGANIZATION"
}

export enum ERoleTypes {
  admin = "ADMIN",
  superAdmin = "SUPERADMIN"
}

export interface IRole {
  id: string;
  name: ERoleTypes;
  description: string;
  createdOnDate: string;
}

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  active: boolean;
  lockedUtilDate: string | Date;
  permissions: IPermission[];
  phoneNumber: string;
  profilePhoto: string;
  role: IRole;
  userType: EUserType;
  location: string;
  token: string;
  isDeleted: boolean;
}

export interface IAccount {
  userType: EUserType;
  userSubType?: any;
  id: number;
  email: string;
  token: string;
}

export interface IPermission {
  id: number;
  name: string;
  description: string;
  createdOnDate: string | Date;
  roles: IRole[];
}

export interface IAuthClient extends Service {
  login(email: string, password: string): Promise<IJsonResponse>;

  getAllPermissions(): Promise<IJsonResponse>;

  changeUserPassword(id: number, newPassword: string): Promise<IJsonResponse>;

  logout(): Promise<boolean>;
}


