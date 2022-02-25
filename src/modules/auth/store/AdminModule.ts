import { Module, Mutation, VuexModule } from "vuex-module-decorators";
import { ERoleTypes, IUser } from "../types";

@Module({ namespaced: true })
export default class AdminModule extends VuexModule {
  admin?: IUser = undefined;

  get isLoggedIn(): boolean {
    return this.admin != undefined;
  }

  get isSuperAdmin(): boolean {
    return this.isLoggedIn && this.admin!.role.name == ERoleTypes.superAdmin;
  }

  @Mutation
  setAdmin(admin: IUser) {
    this.admin = admin;
    localStorage.setItem("admin", JSON.stringify(this.admin));
  }

  @Mutation
  getAdmin() {
    if(localStorage.getItem("admin") != null)
      this.admin = JSON.parse(
        localStorage.getItem("admin")!
      );
  }

  @Mutation
  clear() {
    localStorage.clear();
    this.admin = undefined;
  }
}