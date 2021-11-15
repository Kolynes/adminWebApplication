import AdminModule from "@/store/AdminModule";
import Service from "@/utils/services/Service";
import { Store } from "vuex";

export interface IStoreService extends Service {
  adminModule: AdminModule;
  instance: Store<any>;
}