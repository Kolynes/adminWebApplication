import { Module, Mutation, VuexModule } from "vuex-module-decorators";
import { IPractitioner } from "../types";

@Module({ namespaced: true })
export default class PractitionerModule extends VuexModule {
  practitioner?: IPractitioner = undefined;

  @Mutation
  setPractitioner(practitioner: IPractitioner) {
    this.practitioner = practitioner;
    localStorage.setItem("practitioner", JSON.stringify(this.practitioner));
  }

  @Mutation
  getPractitioner() {
    if(localStorage.getItem("practitioner") != null)
      this.practitioner = JSON.parse(
        localStorage.getItem("practitioner")!
      );
  }
}