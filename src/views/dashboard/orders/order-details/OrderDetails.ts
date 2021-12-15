import { ISelectAgent } from "@/components/select-agent/SelectAgent";
import SelectAgent from "@/components/select-agent/SelectAgent.vue";
import { IAdminAgentsClient, IAdminCustomersClient, IAdminOrdersClient } from "@/services/services";
import EOrderTypes from "@/types/EOrderTypes";
import EProductTypes from "@/types/EProductTypes";
import EServices from "@/types/EServices";
import IAgent from "@/types/IAgent";
import IOrder from "@/types/IOrder";
import IProduct from "@/types/IProduct";
import IUser from "@/types/IUser";
import { service } from "@/utils/services/ServiceProvider";
import { Vue, Component, Prop, Ref } from "vue-property-decorator";

const typeTextPlurals = {
  [EProductTypes.drug]: "Drugs",
  [EProductTypes.equipment]: "Equipment"
};

@Component({
  components: {
    SelectAgent
  }
})
export default class OrderDetails extends Vue {
  @Prop()
  id!:number;

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
  loading = true;
  deleting = false;
  order: IOrder | null = null;

  get customer(): IUser | null {
    return this.order && this.order.transaction.user;
  };

  get agent(): IAgent | null {
    return this.order && this.order.deliveryAgent;
  };

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
    this.loading = false;
    if(response.status == 200) 
      this.order = response.data;
    else toast({ message: response.errors!.summary });
  }

  deleteOrder() {
    confirm({ title: "Delete Order", icon: "mdi-delete"}).then(async (result: boolean) => {
      if(result) {
        this.deleting = true;
        const response = await this.ordersClient.deleteOrder(this.order!.id);
        this.deleting = false;
        if(response.status == 200) {
          toast({ message: "Order deleted" });
          this.$router.back();
        }
        else toast({ message: response.errors!.summary});
      }
    });
  }

  async assignAgent() {
    const agent: IAgent | null = await this.selectAgent.getAgent();
    if(agent == null)
      return;
    if(this.agent != null) {
      const confirmation = await confirm({
        icon: "mdi-motormike",
        title: "Assign Delivery Agent",
        message: "This order has already been assigned to another agent. Do you wish to reassign?"
      })
      if(!confirmation)
        return;
      toast({ loading: true, message: "Unassigning agent" })
      const response = await this.ordersClient.unassignOrderToAgent(this.order!.id, this.agent!.id);
      if(response.status == 200)
        toast({ loading: true, message: `Order has been unassigned. Reassigning order...`});
      else {
        toast({ message: response.errors!.summary });
        return;
      }
    }
    toast({ loading: true, message: "Assigning agent" })
    const response = await this.ordersClient.assignOrderToAgent(this.order!.id, agent.id);
    toast(false);
    if(response.status == 200) {
      toast({ message: `Order has been assigned to ${agent.name}`});
      this.getOrder();
    }
    else toast({ message: response.errors!.summary })
  }

  mounted() {
    this.getOrder();
  }
}