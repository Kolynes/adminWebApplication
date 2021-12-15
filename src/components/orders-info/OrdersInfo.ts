import {Vue, Component} from "vue-property-decorator";

@Component
export default class OrdersInfo extends Vue {
  numberOfOrdersToAttend = 0;
  numbers = [
    {
      icon: "mdi-check-all",
      name: "Orders",
      link: "/dashboard/orders",
      value: 0
    },
    {
      icon: "mdi-account",
      name: "Customers",
      link: "/dashboard/customers",
      value: 0
    },
    {
      icon: "mdi-cart",
      name: "Products",
      link: "/dashboard/drugs",
      value: 0
    }
  ];
}