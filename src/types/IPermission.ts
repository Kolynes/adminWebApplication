import IRole from "./IRole";

export default interface IPermission {
  id: number;
  name: string;
  description: string;
  createdOnDate: string | Date;
  roles: IRole[];
}