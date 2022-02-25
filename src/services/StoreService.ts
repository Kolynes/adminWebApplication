import AdminModule from "@/modules/auth/store/AdminModule";
import Service, { serviceClass } from "@/utils/services/Service";
import store from "@/store";
import { Store } from "vuex";
import { IStoreService } from "./types";
import { EServices } from "@/types";

@serviceClass(EServices.store)
class StoreService extends Service implements IStoreService {
  private _store!: Store<any>;
  adminModule!: AdminModule;

  initState() {
    this._store = store;
    this.adminModule = store.state.AdminModule;
    super.initState();
  }

  get instance() {
    return this._store;
  }
}