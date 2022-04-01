import { IAccount, IUser, EUserType } from "../auth/types";
import { IOrganization } from "../organizations/types";
import { IPractitioner } from "../practitioners/types";

export const logisticsLinks = {
  name: "Logistics",
  show: false,
  active: false,
  remove: (account: IAccount, user: IUser | IOrganization | IPractitioner) => {
    if(account.userType == EUserType.admin) return false;
    return true;
  },
  routes: [
    { 
      icon: "mdi-account", 
      path: "/dashboard/agents", 
      name: "Delivery Agents" 
    },
    { 
      icon: "mdi-motorbike", 
      path: "/dashboard/rides", 
      name: "Rides" 
    },
    { 
      icon: "mdi-map", 
      path: "/dashboard/trips", 
      name: "Trips" 
    },
  ]
}