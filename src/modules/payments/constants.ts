import { EUserType, IAccount, IUser } from "../auth/types";
import { EOrganizationTypes, IOrganization } from "../organizations/types";
import { IPractitioner } from "../practitioners/types";

export const paymentsLinks = {
  name: "Payments",
  show: false,
  active: false,
  routes: [
    { 
      icon: "mdi-currency-usd", 
      path: "/dashboard/payments/products", 
      name: "Product Payments",
      remove: (account: IAccount, user: IUser | IOrganization | IPractitioner) => {
        if(account.userType == EUserType.practitioner) return true;
        return false;
      }
    },
    { 
      icon: "mdi-currency-usd", 
      path: "/dashboard/payments/organizations", 
      name: "Payments to Organizations",
      remove: (account: IAccount, user: IUser | IOrganization | IPractitioner) => {
        if(account.userType != EUserType.admin) return true;
        return false;
      }
    },
    { 
      icon: "mdi-currency-usd", 
      path: "/dashboard/payments/practitioners", 
      name: "Payments",
      remove: (account: IAccount, user: IUser | IOrganization | IPractitioner) => {
        if(account.userType != EUserType.admin) return true;
        return false;
      }
    },
  ]
}