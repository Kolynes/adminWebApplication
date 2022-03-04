import { Module, Mutation, VuexModule } from "vuex-module-decorators";
import { ERoleTypes, EUserType, IAccount, IUser } from "../types";

@Module({ namespaced: true })
export default class AccountModule extends VuexModule {
  account?: IAccount = undefined;

  get isLoggedIn(): boolean {
    return this.account != undefined;
  }

  @Mutation
  setAccount(account: IUser) {
    this.account = account;
    localStorage.setItem("account", JSON.stringify(this.account));
  }

  @Mutation
  setUserSubType(subtype: any) {
    this.account!.userSubType = subtype;
    localStorage.setItem("account", JSON.stringify(this.account));
  }

  @Mutation
  getAccount() {
    if(localStorage.getItem("account") != null)
      this.account = JSON.parse(
        localStorage.getItem("account")!
      )
  }

  @Mutation
  clear() {
    localStorage.clear();
    this.account = undefined;
  }
}