import { IAdminCustomersClient } from "@/services/services";
import EServices from "@/types/EServices";
import ICustomer from "@/types/ICustomer";
import IVForm from "@/types/IVForm";
import { emailRule, requiredLengthRule, requiredRule } from "@/utils/rules";
import { service } from "@/utils/services/ServiceProvider";
import {Vue, Component, Ref} from "vue-property-decorator";

@Component
export default class CustomerEditorMixin extends Vue {
  @service(EServices.adminCustomers)
  customersClient!: IAdminCustomersClient;

  createCustomerDialogVisible = false;
  firstName = "";
  lastName = "";
  email = "";
  password = "";
  phoneNumber = "";
  profilePhoto: File | null = null;
  address = "";
  gender = "";
  age = "";
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
    this.email =customer.email;
    this.phoneNumber = customer.phoneNumber;
    this.address = customer.address;
    this.gender = customer.gender;
    this.age = customer.age;
    this.selectedCustomer = customer.id;
    this.toggleCreateCustomerDialog();
  }

  changeProfilePhoto() {

  }

  async editCustomer() {
    if(this.createCustomerForm.validate()) {
      this.creatingCustomer = true;
      const response = await this.customersClient.updateCustomer(
        this.selectedCustomer!, 
        this.firstName, 
        this.lastName, 
        this.email, 
        this.phoneNumber,
        this.address,
        this.gender,
        this.age
      );
      this.creatingCustomer = false;
      if(response.status == 200) {
        toast({ message: "User updated"});
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
        this.profilePhoto!,
        this.address,
        this.gender,
        this.age,
        this.password
      );
      this.creatingCustomer = false;
      if(response.status == 201 || response.status == 200) {
        toast({ message: "Customer created"});
        this.toggleCreateCustomerDialog()
        this.selectedCustomer = null
      }
      else toast({ message: response.errors!.summary });
    }
  }
}
