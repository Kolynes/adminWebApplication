import { Vue, Component } from "vue-property-decorator";
import OrdersInfo from "@/components/orders-info/OrdersInfo";
import OrdersOverview from "@/components/orders-overview/OrdersOverview";
import LatestOrders from "@/components/latest-orders/LatestOrders";
import Sales from "@/components/sales/Sales"
import CustomerStatistics from "@/components/customer-statistics/CustomerStatistics"
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

  mounted() {
  }
}