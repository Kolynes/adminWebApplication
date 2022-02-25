import { Component, Mixins, Ref } from "vue-property-decorator";
import TableMixin, { ISearchResults, ITableView } from "@/mixins/TableMixin";
import TableView from "@/components/TableView.vue";
import { IAdminCustomersClient, ICustomer, ICustomerEditor } from "../../types";
import { service } from "@/utils/services/ServiceProvider";
import { EServices } from "@/types";
import CustomerEditor from "../../components/customer-editor/CustomerEditor";

@Component({
  components: {
    TableView,
    CustomerEditor
  }
})
export default class Customers extends Mixins(TableMixin) implements ITableView<ICustomer> {
  
  headers = [
    {
      text: "Customer ID",
      value: "id"
    },
    {
      text: "First Name",
      value: "firstName"
    },
    {
      text: "Last Name",
      value: "lastName"
    },
    {
      text: "Email",
      value: "email"
    },
    {
      text: "Phone Number",
      value: "phoneNumber"
    }
  ];
  items = [];

  @service(EServices.adminCustomers)
  customersClient!: IAdminCustomersClient;

  @Ref()
  customerEditor!: ICustomerEditor;

  itemClicked(customer: ICustomer) {
    this.$router.push(`/dashboard/customers/details?id=${customer.id}`);
  }

  deleteCustomer(customer: ICustomer) {
    confirm({ icon: "mdi-delete", title: "Delete customer" }).then(async (result: boolean) => {
      if(result) {
        toast({ loading: true, message: "Deleting customer..." });
        const response = await this.customersClient.deleteCustomer(customer.id);
        toast(false);
        if(response.status == 200) {
          toast({ message: "Customer deleted"});
          this.search();
        }
        else toast({ message: response.errors!.summary });
      }
    });
  }

  async getSearchResults(searchString: string, page: number, pageSize: number): Promise<ISearchResults<ICustomer>> {
    const response = await this.customersClient.getCustomers(
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