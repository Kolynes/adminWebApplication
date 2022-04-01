import SelectAgent from "@/modules/agents/components/select-agent/SelectAgent.vue";
import { service } from "@/utils/services/ServiceProvider";
import { Component, Prop, Ref, Mixins, Watch } from "vue-property-decorator";
import { IProduct } from "@/modules/products/types";
import { EServices } from "@/types";
import { EOrderTypes, IAdminOrdersClient, IOrder } from "../../types";
import { IUser } from "@/modules/auth/types";
import { IAdminAgentsClient, IAgent, ISelectAgent } from "@/modules/agents/types";
import { IAdminCustomersClient } from "@/modules/customers/types";
import { typeTextPlurals } from "../../contants";
import { datetime } from "@/utils/time";
import NetworkManagerMixin, { throwsNetworkError } from "@/utils/http/NetworkManagerMixin";
import IIndexable from "@/utils/types/IIndexable";

@Component({
  components: {
    SelectAgent
  }
})
export default class OrderDetails extends Mixins(NetworkManagerMixin) {
  @Prop()
  id!: number;

  @Ref()
  selectAgent!: ISelectAgent;

  @service(EServices.adminOrders)
  ordersClient!: IAdminOrdersClient;

  @service(EServices.adminCustomers)
  customerClient!: IAdminCustomersClient;

  @service(EServices.adminAgent)
  agentClient!: IAdminAgentsClient;

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

  loading: IIndexable<boolean> = {
    getOrder: true
  };
  order: IOrder | null = null;

  get customer(): IUser | null {
    return this.order && this.order.transaction.user;
  };

  get agent(): IAgent | null {
    return this.order && this.order.deliveryAgent;
  };

  datetime = datetime;

  getSelectedOrderTypeClassName() {
    return this.orderTypes.find(element => element.name == this.order!.status)!.className
  }

  productTypePlural(product: IProduct): string {
    return typeTextPlurals[product.productType];
  }

  goToProduct(product: IProduct) {
    this.$router.push(`/dashboard/${this.productTypePlural(product).toLowerCase()}/details?id=${product.id}`);
  }

  async getOrder() {
    const response = await this.ordersClient.getOrder(this.id);
    this.order = response.data;
  }

  @throwsNetworkError()
  async deleteOrder() {
    const result = await confirm({ title: "Delete Order", icon: "mdi-delete" })
    if (!result) return;
    await this.ordersClient.deleteOrder(this.order!.id);
    toast({ icon: "mdi-check", iconColor: "green", message: "Order deleted" });
    this.$router.back();
  }

  @throwsNetworkError()
  async assignAgent() {
    const agent: IAgent | null = await this.selectAgent.getAgent();
    if (agent == null) return;
    if (this.agent != null) {
      const confirmation = await confirm({
        icon: "mdi-motormike",
        title: "Assign Delivery Agent",
        message: "This order has already been assigned to another agent. Do you wish to reassign?"
      });
      if (!confirmation) return;
      toast({ loading: true, message: "Unassigning agent" })
      await this.ordersClient.unassignOrderToAgent(this.order!.id, this.agent!.id);
      toast({ loading: true, message: `Order has been unassigned. Reassigning order...` });
    }
    toast({ loading: true, message: "Assigning agent" })
    await this.ordersClient.assignOrderToAgent(this.order!.id, agent.id);
    toast(false);
    toast({ icon: "mdi-check", iconColor: "green", message: `Order has been assigned to ${agent.firstName} ${agent.lastName}` });
    this.getOrder();
  }

  @Watch("error.deleteOrder")
  @Watch("error.assignAgent")
  onError(message: string) {
    if(message) toast({ icon: "mdi-exclamation-thick", iconColor: "red", message });
  }

  mounted() {
    this.getOrder();
  }
}