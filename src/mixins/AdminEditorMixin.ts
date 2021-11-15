import { IAdminUsersClient, IAuthClient } from "@/services/services";
import ERoleTypes from "@/types/ERoleTypes";
import EServices from "@/types/EServices";
import IPermission from "@/types/IPermission";
import IUser from "@/types/IUser";
import IVForm from "@/types/IVForm";
import { emailRule, requiredLengthRule, requiredRule } from "@/utils/rules";
import { service } from "@/utils/services/ServiceProvider";
import {Vue, Component, Ref} from "vue-property-decorator";

@Component
export default class AdminEditorMixin extends Vue {
  @service(EServices.auth)
  authClient!: IAuthClient;

  @service(EServices.adminUsers)
  usersClient!: IAdminUsersClient;

  createAdminDialogVisible = false;
  firstName = "";
  lastName = "";
  email = "";
  password = "";
  phoneNumber = "";
  permissions: IPermission[] = [];
  role = ERoleTypes.admin;
  creatingAdmin = false;
  allPermissions = [];
  roles = [
    ERoleTypes.admin,
    ERoleTypes.superAdmin
  ];
  selectedAdmin: number | null = null;

  @Ref()
  createAdminForm!: IVForm;

  emailRule = emailRule;
  requiredLengthRule = requiredLengthRule;
  requiredRule = requiredRule;

  get permissionIds(): number[] {
    return this.permissions.map(element => element.id);
  }

  getRoleText(role: ERoleTypes): string {
    return {
      [ERoleTypes.admin]: "Admin",
      [ERoleTypes.superAdmin]: "Super Admin"
    }[role] as string;
  }

  toggleCreateAdminDialog() {
    this.createAdminDialogVisible = !this.createAdminDialogVisible;
    if(!this.createAdminDialogVisible) {
      this.selectedAdmin = null;
      this.createAdminForm.reset();
    }
  }

  beginEditAdmin(admin: IUser) {
    this.firstName = admin.firstName;
    this.lastName = admin.lastName;
    this.email =admin.email;
    this.phoneNumber = admin.phoneNumber;
    this.permissions = admin.permissions;
    this.role = admin.role.name as ERoleTypes;
    this.selectedAdmin = admin.id;
    this.toggleCreateAdminDialog();
  }

  async editAdmin() {
    if(this.createAdminForm.validate()) {
      this.creatingAdmin = true;
      const response = await this.usersClient.updateUser(
        this.selectedAdmin!, 
        this.firstName, 
        this.lastName, 
        this.email, 
        this.phoneNumber,
        this.role, 
        this.permissionIds
      );
      this.creatingAdmin = false;
      if(response.status == 200) {
        toast({ message: "User updated"});
        this.toggleCreateAdminDialog();
        this.selectedAdmin = null
      }
      else toast({ message: response.errors!.summary });
    }
  }

  async createAdmin() {
    if(this.createAdminForm.validate()) {
      this.creatingAdmin = true;
      const response = await this.usersClient.createAdminUser(
        this.firstName, 
        this.lastName, 
        this.email, 
        this.phoneNumber, 
        this.password, 
        this.role, 
        this.permissionIds
      );
      this.creatingAdmin = false;
      if(response.status == 201) {
        toast({ message: "Admin created"});
        this.toggleCreateAdminDialog();
      }
      else toast({ message: response.errors!.summary });
    }
  }

  async getAllPermissions() {
    const response = await this.authClient.getAllPermissions();
    if(response.status == 200)  
      this.allPermissions = response.data;
    else toast({ message: response.errors!.summary});
    console.log(this.allPermissions)
  }

  created(){
    this.getAllPermissions();
  }
}
