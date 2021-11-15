import CustomerEditorMixin from "@/mixins/CustomerEditorMixin";
import ICustomer from "@/types/ICustomer";
import { Component, Prop, Mixins } from "vue-property-decorator";

@Component
export default class CustomerDetails extends Mixins(CustomerEditorMixin) {
  @Prop({
    type: Number,
    required: true
  })
  id!: number;

  customer: ICustomer | null = null;
  loading = true;

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