import AdminModule from "@/modules/admins/store/AdminModule";
import AccountModule from "@/modules/auth/store/AccountModule";
import { IUser } from "@/modules/auth/types";
import OrganizationModule from "@/modules/organizations/store/OrganizationModule";
import PractitionerModule from "@/modules/practitioners/store/PractitionerModule";
import Service from "@/utils/services/Service";
import { Store } from "vuex";

export interface IAdminModule {
  admin?: IUser;
}

export interface IStoreService extends Service {
  adminModule: AdminModule;
  organizationModule: OrganizationModule;
  practitionerModule: PractitionerModule;
  accountModule: AccountModule;
  instance: Store<any>;
}