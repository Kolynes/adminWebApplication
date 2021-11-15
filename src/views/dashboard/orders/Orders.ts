import EOrderTypes from "@/types/EOrderTypes";
import { Component, Ref, Mixins } from "vue-property-decorator"
import IOrder from "@/types/IOrder";
import ServiceProvider, { service } from "@/utils/services/ServiceProvider";
import { IAdminOrdersClient } from "@/services/services";
import EServices from "@/types/EServices";
import IUser from "@/types/IUser";
import SelectAgent from "@/components/select-agent/SelectAgent.vue";
import TableView from "@/components/TableView.vue";
import { ISelectAgent } from "@/components/select-agent/SelectAgent";
import TableMixin, { ISearchResults, ITableView } from "@/mixins/TableMixin";

@Component({
   components: {
     SelectAgent,
     TableView
   }
})
export default class Orders extends Mixins(TableMixin) implements ITableView<IOrder> {
  @service(EServices.adminOrders)
  ordersClient!: IAdminOrdersClient;
  
  orderType = EOrderTypes.processing;
  showAgentDialog = false;

  headers = [
    {
      text: "Order ID",
      value: "id"
    },
    {
      text: "Date",
      value: "date"
    },
    {
      text: "Customer ID",
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
  items = [];

  @Ref()
  selectAgent!: ISelectAgent;

  setOrderType(type: EOrderTypes) {
    this.orderType = type;
  }

  itemClicked(order: IOrder) {
    this.$router.push(`/dashboard/orders/details?id=${order.id}`)
  }

  async assignAgent(order: IOrder) {
    const agent: IUser | null = await this.selectAgent.getAgent();
    if(agent == null)
      return;
    if(order.agentId != null || order.agentId != undefined) {
      const confirmation = await confirm({
        icon: "mdi-motormike",
        title: "Assign Delivery Agent",
        message: "This order has already been assigned to another agent. Do you wish to reassign?"
      })
      if(!confirmation)
        return;
      toast({ loading: true, message: "Unassigning agent" })
      const response = await this.ordersClient.unassignOrderToAgent(order.id, order.agentId);
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
      this.orderType, 
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
}