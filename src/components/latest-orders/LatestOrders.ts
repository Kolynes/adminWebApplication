import IOrder from "@/types/IOrder";
import {Vue, Component} from "vue-property-decorator";

@Component
export default class LatestOrders extends Vue {
  lastestOrders: IOrder[] = [];

  goToOrders() {
    this.$router.push("/dashboard/orders");
  }

  getDate(order: IOrder): string {
    return order.date.substring(4, 6);
  }

  getMonthAndYear(order: IOrder): string {
    return order.date.substring(1, 7);
  }
}