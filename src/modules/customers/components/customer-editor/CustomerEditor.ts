import IVForm from "@/utils/types/IVForm";
import { emailRule, requiredLengthRule, requiredRule } from "@/utils/rules";
import { service } from "@/utils/services/ServiceProvider";
import {Vue, Component, Ref} from "vue-property-decorator";
import { EServices } from "@/types";
import { IAdminCustomersClient, ICustomer, ICustomerEditor } from "@/modules/customers/types";
import VPasswordField from "@/vuetify-extensions/VPasswordField.vue";

@Component({
  components: {
    VPasswordField,
  }
})
export default class CustomerEditor extends Vue implements ICustomerEditor {
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
  creatingCustomer = false;
  selectedCustomer: number | null = null;

  @Ref()
  createCustomerForm!: IVForm;

  emailRule = emailRule;
  requiredLengthRule = requiredLengthRule;
  requiredRule = requiredRule;

  toggleCreateCustomerDialog() {
    this.createCustomerDialogVisible = !this.createCustomerDialogVisible;
    if(!this.createCustomerDialogVisible){
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

  async editCustomer() {
    if(this.createCustomerForm.validate()) {
      this.creatingCustomer = true;
      const response = await this.customersClient.updateCustomer(
        this.selectedCustomer!, 
        this.firstName, 
        this.lastName, 
        this.phoneNumber
      );
      this.creatingCustomer = false;
      if(response.status == 200) {
        toast({ message: "User updated"});
        this.$emit("saved");
        this.toggleCreateCustomerDialog();
        this.selectedCustomer = null
      }
      else toast({ message: response.errors!.summary });
    }
  }

  async createCustomer() {
    if(this.createCustomerForm.validate()) {
      this.creatingCustomer = true;
      const response = await this.customersClient.createCustomer(
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
      this.creatingCustomer = false;
      if(response.status == 201 || response.status == 200) {
        toast({ message: "Customer created"});
        this.$emit("saved");
        this.toggleCreateCustomerDialog();
        this.selectedCustomer = null;
      }
      else toast({ message: response.errors!.summary });
    }
  }
}
