import { Mutation, VuexModule } from "vuex-module-decorators";

export default abstract class MutableModule<S> extends VuexModule<S> {
  @Mutation
  mutate(newState: S) {
    this.state = {
      ...this.state,
      ...newState
    }
  }
}