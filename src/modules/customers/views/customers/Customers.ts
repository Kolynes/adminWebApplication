import { Component, Mixins, Ref, Watch } from "vue-property-decorator";
import TableMixin, { ISearchResults, ITableView } from "@/mixins/TableMixin";
import TableView from "@/components/TableView.vue";
import { IAdminCustomersClient, ICustomer, ICustomerEditor } from "../../types";
import { service } from "@/utils/services/ServiceProvider";
import { EServices } from "@/types";
import CustomerEditor from "../../components/customer-editor/CustomerEditor";
import NetworkManagerMixin, { throwsNetworkError } from "@/utils/http/NetworkManagerMixin";

@Component({
  components: {
    TableView,
    CustomerEditor
  }
})
export default class Customers extends Mixins(TableMixin, NetworkManagerMixin) implements ITableView {

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

  @service(EServices.adminCustomers)
  customersClient!: IAdminCustomersClient;

  @Ref()
  customerEditor!: ICustomerEditor;

  itemClicked(customer: ICustomer) {
    this.$router.push(`/dashboard/customers/details?id=${customer.id}`);
  }

  @throwsNetworkError()
  async deleteCustomer(customer: ICustomer) {
    const result = await confirm({ icon: "mdi-delete", title: "Delete customer" });
    if (!result) return;
    toast({ loading: true, message: "Deleting customer..." });
    await this.customersClient.deleteCustomer(customer.id);
    toast(false);
    toast({ icon: "mdi-check", iconColor: "green", message: "Customer deleted" });
    this.search();
  }

  @throwsNetworkError()
  async getSearchResults(searchString: string, page: number, pageSize: number): Promise<ISearchResults> {
    const response = await this.customersClient.getCustomers(
      searchString,
      page,
      pageSize
    );
    return {
      items: response.data,
      numberOfPages: response.numberOfPages || 0
    }
  }

  @Watch("error.deleteCustomer")
  @Watch("error.getSearchResults")
  onError(message: string) {
    if(message) toast({ icon: "mdi-exclamation-thick", iconColor: "red", message });
  }
}