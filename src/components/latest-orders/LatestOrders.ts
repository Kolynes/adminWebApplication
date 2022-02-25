import { IOrder } from "@/modules/orders/types";
import {Vue, Component} from "vue-property-decorator";

@Component
export default class LatestOrders extends Vue {
  lastestOrders: IOrder[] = [];

  goToOrders() {
    this.$router.push("/dashboard/orders");
  }

  getDate(order: IOrder): string {
    return (order.createdOnDate as string).substring(4, 6);
  }

  getMonthAndYear(order: IOrder): string {
    return (order.createdOnDate as string).substring(1, 7);
  }
}