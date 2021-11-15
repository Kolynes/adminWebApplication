import EUserType from "./EUserType";
import IPermission from "./IPermission";
import IRole from "./IRole";

export default interface IUser {
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
}