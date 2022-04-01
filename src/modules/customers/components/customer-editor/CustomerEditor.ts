import IVForm from "@/utils/types/IVForm";
import { emailRule, requiredLengthRule, requiredRule } from "@/utils/rules";
import { service } from "@/utils/services/ServiceProvider";
import { Vue, Component, Ref, Mixins, Watch } from "vue-property-decorator";
import { EServices } from "@/types";
import { IAdminCustomersClient, ICustomer, ICustomerEditor } from "@/modules/customers/types";
import VPasswordField from "@/vuetify-extensions/VPasswordField.vue";
import NetworkManagerMixin, { throwsNetworkError } from "@/utils/http/NetworkManagerMixin";

@Component({
  components: {
    VPasswordField,
  }
})
export default class CustomerEditor extends Mixins(NetworkManagerMixin) implements ICustomerEditor {
  @service(EServices.adminCustomers)
  customersClient!: IAdminCustomersClient;

  createCustomerDialogVisible = false;
  firstName = "";
  lastName = "";
  email = "";
  password = "";
  phoneNumber = "";
  address = "";
  gender = "";
  age = "";
  city = "";
  state = "";
  selectedCustomer: number | null = null;

  @Ref()
  createCustomerForm!: IVForm;

  emailRule = emailRule;
  requiredLengthRule = requiredLengthRule;
  requiredRule = requiredRule;

  toggleCreateCustomerDialog() {
    this.createCustomerDialogVisible = !this.createCustomerDialogVisible;
    if (!this.createCustomerDialogVisible) {
      this.selectedCustomer = null;
      this.createCustomerForm.reset();
    }
  }

  beginEditCustomer(customer: ICustomer) {
    this.firstName = customer.firstName;
    this.lastName = customer.lastName;
    this.phoneNumber = customer.phoneNumber;
    this.selectedCustomer = customer.id;
    this.toggleCreateCustomerDialog();
  }

  @throwsNetworkError()
  async editCustomer() {
    if (!this.createCustomerForm.validate()) return
    await this.customersClient.updateCustomer(
      this.selectedCustomer!,
      this.firstName,
      this.lastName,
      this.phoneNumber
    );
    toast({ icon: "mdi-check", iconColor: "green", message: "User updated" });
    this.$emit("saved");
    this.toggleCreateCustomerDialog();
  }

  @throwsNetworkError()
  async createCustomer() {
    if (!this.createCustomerForm.validate()) return;
    await this.customersClient.createCustomer(
      this.firstName,
      this.lastName,
      this.email,
      this.phoneNumber,
      this.address,
      this.gender,
      this.age,
      this.city,
      this.state,
      this.password
    );
    toast({ icon: "mdi-check", iconColor: "green", message: "Customer created" });
    this.$emit("saved");
    this.toggleCreateCustomerDialog();
  }

  @Watch("error.createCustomer")
  @Watch("error.editCustomer")
  onError(message: string) {
    if(message) toast({ icon: "mdi-exclamation-thick", iconColor: "red", message });
  }
}
