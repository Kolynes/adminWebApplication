import { EServices } from "@/types";
import NetworkManagerMixin, { throwsNetworkError } from "@/utils/http/NetworkManagerMixin";
import { service } from "@/utils/services/ServiceProvider";
import IIndexable from "@/utils/types/IIndexable";
import { Component, Mixins, Prop, Ref, Vue, Watch } from "vue-property-decorator";
import CustomerEditor from "../../components/customer-editor/CustomerEditor";
import { IAdminCustomersClient, ICustomer, ICustomerEditor } from "../../types";

@Component({
  components: {
    CustomerEditor
  }
})
export default class CustomerDetails extends Mixins(NetworkManagerMixin) {
  @Prop({
    type: Number,
    required: true
  })
  id!: number;

  customer: ICustomer | null = null;
  loading: IIndexable<boolean> = {
    getCustomer: false
  };
  
  @service(EServices.adminCustomers)
  customersClient!: IAdminCustomersClient;

  @Ref()
  customerEditor!: ICustomerEditor;

  @throwsNetworkError()
  async getCustomer() {
    const response = await this.customersClient.getCustomer(this.id);
    this.customer = response.data;
  }

  @throwsNetworkError()
  async deleteCustomer(customer: ICustomer) {
    const result = await confirm({ icon: "mdi-delete", title: "Delete customer" });
    if (!result) return
    toast({ loading: true, message: "Deleting customer..." });
    await this.customersClient.deleteCustomer(customer.id);
    toast(false);
    toast({ icon: "mdi-check", iconColor: "green", message: "Customer deleted" });
    this.$router.back();
  }

  @Watch("error.getCustomer")
  @Watch("error.deleteCustomer")
  onError(message: string) {
    if(message) toast({ icon: "mdi-exclamation-thick", iconColor: "red", message });
  }

  mounted() {
    this.getCustomer();
  }
}