import { Vue, Component } from "vue-property-decorator";
import OrdersOverview from "@/components/orders-overview/OrdersOverview";
import Sales from "@/components/sales/Sales"
import CustomerStatistics from "@/components/customer-statistics/CustomerStatistics"
import { service } from "@/utils/services/ServiceProvider";
import { EServices } from "@/types";
import { IAuthClient } from "@/modules/auth/types";
import { IAdminDashboardClient, IAdminDashboardInfo } from "../../types";
import { EOrderTypes, IOrder } from "@/modules/orders/types";

@Component({
  components: {
    OrdersOverview,
    Sales,
    CustomerStatistics
  }
})
export default class Home extends Vue {
  loading = false;
  dashboardDetails: IAdminDashboardInfo | null = null;
  orderTypes = [
    {
      name: EOrderTypes.unassigned,
      className: "orange orange--text lighten-5",
    },
    {
      name: EOrderTypes.assigned,
      className: "primary primary--text lighten-5",
    },
    {
      name: EOrderTypes.accepted,
      className: "green green--text lighten-5",
    },
    {
      name: EOrderTypes.failed,
      className: "red red--text lighten-5",
    },
    {
      name: EOrderTypes.fulfilled,
      className: "green green--text lighten-5",
    },
  ];

  @service(EServices.auth)
  authClient!: IAuthClient;

  @service(EServices.adminDashboard)
  adminDashboardClient!: IAdminDashboardClient;

  get numberOfOrdersToAttend() {
    return this.dashboardDetails && this.dashboardDetails!.noOfUnAssignedOrders;
  }

  get numbers() {
    return [
      { 
        icon: "mdi-check-all", 
        name: "Orders", 
        value: this.dashboardDetails && this.dashboardDetails.noOfOrders || 0,
        link: "/dashboard/orders"
      },
      { 
        icon: "mdi-account-multiple", 
        name: "Customers", 
        value: this.dashboardDetails && this.dashboardDetails.noOfCustomers || 0,
        link: "/dashboard/customers"
      },
      { 
        icon: "mdi-package", 
        name: "Products", 
        value: this.dashboardDetails && this.dashboardDetails.noOfProducts || 0,
        link: "/dashboard/drugs"
      }
    ]
  }

  get latestOrders() {
    return this.dashboardDetails && this.dashboardDetails!.last6Orders;
  }

  goToOrders() {
    this.$router.push("/dashboard/orders")
  }

  getDate(order: IOrder): string {
    const createdOn = new Date(order.createdOnDate);
    return createdOn.getDate().toString().length == 1
      ? `0${createdOn.getDate().toString()}`
      : createdOn.getDate().toString();
  }

  getMonthAndYear(order: IOrder): string {
    const createdOn = new Date(order.createdOnDate);
    return `${createdOn.toDateString().slice(4, 7)} ${createdOn.getFullYear()} `;
  }

  async getDashboardDetails() {
    const response = await this.adminDashboardClient.getDashboard();
    this.loading = false;
    if(response.status == 200)
      this.dashboardDetails = response.data;
    else toast({ message: response.errors!.summary });
  }

  async logout() {
    const result = await confirm({ icon: "mdi-power", title: "Logout" });
    if(!result) return;
    this.authClient.logout();
    this.$router.replace("/");
  }

  mounted() {
    this.getDashboardDetails();
  }
}