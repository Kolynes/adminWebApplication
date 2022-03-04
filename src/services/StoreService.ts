import AdminModule from "@/modules/admins/store/AdminModule";
import Service, { serviceClass } from "@/utils/services/Service";
import store from "@/store";
import { Store } from "vuex";
import { IStoreService } from "./types";
import { EServices } from "@/types";
import AccountModule from "@/modules/auth/store/AccountModule";
import OrganizationModule from "@/modules/organizations/store/OrganizationModule";
import PractitionerModule from "@/modules/practitioners/store/PractitionerModule";

@serviceClass(EServices.store)
class StoreService extends Service implements IStoreService {
  private _store!: Store<any>;
  adminModule!: AdminModule;
  organizationModule!: OrganizationModule;
  practitionerModule!: PractitionerModule;
  accountModule!: AccountModule;

  initState() {
    this._store = store;
    this.adminModule = store.state.AdminModule;
    this.accountModule = store.state.AccountModule;
    this.organizationModule = store.state.OrganizationModule;
    this.practitionerModule = store.state.PractitionerModule;
    super.initState();
  }

  get instance() {
    return this._store;
  }
}