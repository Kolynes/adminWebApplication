import { EServices } from "@/types";
import { service } from "@/utils/services/ServiceProvider";
import { Component, Prop, Ref, Vue } from "vue-property-decorator";
import CustomerEditor from "../../components/customer-editor/CustomerEditor";
import { IAdminCustomersClient, ICustomer, ICustomerEditor } from "../../types";

@Component({
  components: {
    CustomerEditor
  }
})
export default class CustomerDetails extends Vue {
  @Prop({
    type: Number,
    required: true
  })
  id!: number;

  customer: ICustomer | null = null;
  loading = true;

  @service(EServices.adminCustomers)
  customersClient!: IAdminCustomersClient;

  @Ref()
  customerEditor!: ICustomerEditor;

  async getCustomer() {
    const response = await this.customersClient.getCustomer(this.id);
    this.loading = false;
    if(response.status == 200)
      this.customer = response.data;
    else toast({ message: "Customer not found"});
  }

  deleteCustomer(customer: ICustomer) {
    confirm({ icon: "mdi-delete", title: "Delete customer" }).then(async (result: boolean) => {
      if(result) {
        toast({ loading: true, message: "Deleting customer..." });
        const response = await this.customersClient.deleteCustomer(customer.id);
        toast(false);
        if(response.status == 200) {
          toast({ message: "Customer deleted"});
          this.$router.back();
        }
        else toast({ message: response.errors!.summary });
      }
    });
  }

  mounted() { 
    this.getCustomer()
  }
}