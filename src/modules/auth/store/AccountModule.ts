import { Module, Mutation, VuexModule } from "vuex-module-decorators";
import { ERoleTypes, IAccount, IUser } from "../types";

@Module({ namespaced: true })
export default class AccountModule extends VuexModule {
  account?: IAccount = undefined;

  @Mutation
  setAccount(account: IUser) {
    this.account = account;
    localStorage.setItem("account", JSON.stringify(this.account));
  }

  @Mutation
  getAccount() {
    if(localStorage.getItem("account") != null)
      this.account = JSON.parse(
        localStorage.getItem("account")!
      );
  }
}