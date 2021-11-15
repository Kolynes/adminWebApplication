import { IStoreService } from "@/services/services";
import EServices from "@/types/EServices";
import ServiceProvider from "@/utils/services/ServiceProvider";
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Splash extends Vue {
  mounted() {
    setTimeout(() => {
      const storeService = ServiceProvider.getInstance().getService<IStoreService>(EServices.store);
      if(storeService.instance.getters["AdminModule/isLoggedIn"])
        this.$router.replace("/dashboard");
      else this.$router.replace("/login")
    }, 5000)
  }
}