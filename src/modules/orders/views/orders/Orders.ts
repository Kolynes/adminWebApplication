import { Component, Ref, Mixins, Watch } from "vue-property-decorator"
import { service } from "@/utils/services/ServiceProvider";
import SelectAgent from "@/modules/agents/components/select-agent/SelectAgent.vue";
import TableView from "@/components/TableView.vue";
import TableMixin, { ISearchResults, ITableView } from "@/mixins/TableMixin";
import { datetime } from "@/utils/time";
import { EOrderTypes, IAdminOrdersClient, IOrder, ITransaction } from "../../types";
import { EServices } from "@/types";
import { IUser } from "@/modules/auth/types";
import { IAgent, ISelectAgent } from "@/modules/agents/types";

@Component({
   components: {
     SelectAgent,
     TableView
   }
})
export default class Orders extends Mixins(TableMixin) implements ITableView<IOrder> {
  @service(EServices.adminOrders)
  ordersClient!: IAdminOrdersClient;
  
  selectedOrderType: EOrderTypes | null = null;
  showAgentDialog = false;

  headers = [
    {
      text: "Order ID",
      value: "id"
    },
    {
      text: "Date",
      value: "createdOnDate"
    },
    {
      text: "Customer",
      value: "customerId"
    },
    {
      text: "Delivery Address",
      value: "deliveryAddress"
    },
    {
      text: "Status",
      value: "status"
    }
  ];

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

  items = [];

  @Ref()
  selectAgent!: ISelectAgent;

  datetime = datetime;

  setOrderType(type: EOrderTypes) {
    this.selectedOrderType = type;
  }

  getSelectedOrderTypeClassName() {
    this.orderTypes.find(element => element.name == this.selectedOrderType)!.className
  }

  itemClicked(order: IOrder) {
    this.$router.push(`/dashboard/orders/details?id=${order.id}`)
  }

  getTransaction(order: IOrder): ITransaction {
    return order.transaction
  }

  getUser(order: IOrder): IUser | null {
    let transaction = this.getTransaction(order);
    if(transaction !== null)
      return transaction.user;
    else return {} as IUser;
  }

  async assignAgent(order: IOrder) {
    const agent: IAgent | null = await this.selectAgent.getAgent();
    if(agent == null)
      return;
    if(order.deliveryAgent != null) {
      const confirmation = await confirm({
        icon: "mdi-motormike",
        title: "Assign Delivery Agent",
        message: "This order has already been assigned to another agent. Do you wish to reassign?"
      })
      if(!confirmation)
        return;
      toast({ loading: true, message: "Unassigning agent" })
      const response = await this.ordersClient.unassignOrderToAgent(order.id, order.deliveryAgent!.id);
      if(response.status == 200)
        toast({ loading: true, message: `Order has been unassigned. Reassigning order...`});
      else {
        toast({ message: response.errors!.summary });
        return;
      }
    }
    toast({ loading: true, message: "Assigning agent" })
    const response = await this.ordersClient.assignOrderToAgent(order.id, agent.id);
    toast(false);
    if(response.status == 200)
      toast({ message: `Order has been assigned to ${agent.firstName} ${agent.lastName}`});
    else toast({ message: response.errors!.summary })
  }

  deleteOrder(order: IOrder) {
    confirm({ icon: "mdi-delete", title: "Delete Order" }).then(async (result: boolean) => {
      if(result) {
        toast({ loading: true, message: "Deleting order..." });
        const response = await this.ordersClient.deleteOrder(order.id);
        toast(false);
        if(response.status == 200) {
          toast({ message: "Order deleted"});
          this.search();
        }
        else toast({ message: response.errors!.summary });
      }
    });
  }

  async getSearchResults(searchString: string, page: number, pageSize: number): Promise<ISearchResults<IOrder>> {
    const response = await this.ordersClient.getOrders(
      this.selectedOrderType!, 
      searchString, 
      page, 
      pageSize
    );
    if(response.status == 200) {
      return {
        items: response.data,
        numberOfPages: response.numberOfPages || 0
      }
    }
    else {
      toast({ message: response.errors!.summary })
      return {
        items: this.items,
        numberOfPages: this.numberOfPages
      }
    }
  }

  @Watch("selectedOrderType")
  onSelectedOrderTypeChanged() {
    this.reset();
  }
}