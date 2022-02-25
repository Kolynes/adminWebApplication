import { Vue, Component } from "vue-property-decorator";
import OrdersInfo from "@/components/orders-info/OrdersInfo";
import OrdersOverview from "@/components/orders-overview/OrdersOverview";
import LatestOrders from "@/components/latest-orders/LatestOrders";
import Sales from "@/components/sales/Sales"
import CustomerStatistics from "@/components/customer-statistics/CustomerStatistics"
import { service } from "@/utils/services/ServiceProvider";
import { EServices } from "@/types";
import { IAuthClient } from "@/modules/auth/types";

@Component({
  components: {
    OrdersInfo,
    OrdersOverview,
    LatestOrders,
    Sales,
    CustomerStatistics
  }
})
export default class Home extends Vue {
  tab = 0;

  @service(EServices.auth)
  authClient!: IAuthClient;

  async logout() {
    const result = await confirm({ icon: "mdi-power", title: "Logout" });
    if(!result) return;
    this.authClient.logout();
    this.$router.replace("/")
  }

  mounted() {
  }
}