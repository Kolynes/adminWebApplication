import { Module, Mutation, VuexModule } from "vuex-module-decorators";
import { IOrganization } from "../types";

@Module({ namespaced: true })
export default class OrganizationModule extends VuexModule {
  organization?: IOrganization = undefined;

  @Mutation
  setOrganization(organization: IOrganization) {
    this.organization = organization;
    localStorage.setItem("organization", JSON.stringify(this.organization));
  }

  @Mutation
  getOrganization() {
    if(localStorage.getItem("organization") != null)
      this.organization = JSON.parse(
        localStorage.getItem("organization")!
      );
  }
}