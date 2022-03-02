import { Module, Mutation, VuexModule } from "vuex-module-decorators";
import { IUser } from "../../auth/types";

@Module({ namespaced: true })
export default class AdminModule extends VuexModule {
  admin?: IUser = undefined;

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
}