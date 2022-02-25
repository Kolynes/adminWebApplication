import AdminModule from "@/modules/auth/store/AdminModule";
import { IUser } from "@/modules/auth/types";
import Service from "@/utils/services/Service";
import { Store } from "vuex";

export interface IAdminModule {
  admin?: IUser;
}

export interface IStoreService extends Service {
  adminModule: AdminModule;
  instance: Store<any>;
}