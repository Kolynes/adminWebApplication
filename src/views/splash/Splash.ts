
import { IStoreService } from "@/services/types";
import { EServices } from "@/types";
import ServiceProvider from "@/utils/services/ServiceProvider";
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Splash extends Vue {
  mounted() {
    setTimeout(() => {
      const storeService = ServiceProvider.getInstance().getService<IStoreService>(EServices.store);
      if(storeService.instance.getters["AccountModule/isLoggedIn"])
        this.$router.replace("/dashboard");
      else this.$router.replace("/login")
    }, 5000)
  }
}