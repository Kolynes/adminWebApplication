import { ERoleTypes, EUserType, IAccount, IUser } from "../auth/types";
import { IOrganization } from "../organizations/types";
import { IPractitioner } from "../practitioners/types";

export const roleTexts = {
  [ERoleTypes.admin]: "Admin",
  [ERoleTypes.superAdmin]: "Super Admin"
}

export const usersLinks = {
  name: "Users",
  show: false,
  active: false,
  remove: (account: IAccount, user: IUser | IOrganization | IPractitioner) => {
    if(account.userType == EUserType.admin) return false;
    return true;
  },
  routes: [
    { 
      icon: "mdi-account-star", 
      path: "/dashboard/admins", 
      name: "Admins" 
    },
    { 
      icon: "mdi-account", 
      path: "/dashboard/customers", 
      name: "Customers"
    },
  ]
}