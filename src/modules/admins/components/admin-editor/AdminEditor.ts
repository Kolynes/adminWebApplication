import IVForm from "@/utils/types/IVForm";
import { emailRule, requiredLengthRule, requiredRule } from "@/utils/rules";
import { service } from "@/utils/services/ServiceProvider";
import { Vue, Component, Ref } from "vue-property-decorator";
import { EServices } from "@/types";
import { ERoleTypes, IAuthClient, IPermission, IUser } from "@/modules/auth/types";
import { IAdminEditor, IAdminUsersClient } from "@/modules/admins/types";
import VPasswordField from "@/vuetify-extensions/VPasswordField.vue";
import { roleTexts } from "../../constants";

@Component({
  components: {
    VPasswordField
  }
})
export default class AdminEditor extends Vue implements IAdminEditor {
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
  errors = {};

  @Ref()
  createAdminForm!: IVForm;

  emailRule = emailRule;
  requiredLengthRule = requiredLengthRule;
  requiredRule = requiredRule;

  get permissionIds(): number[] {
    return this.permissions.map(element => element.id);
  }

  getRoleText(role: ERoleTypes): string {
    return roleTexts[role];
  }

  isSelected(permission: IPermission) {
    return this.permissions.findIndex(value => value == permission) != -1;
  }

  toggleCreateAdminDialog() {
    this.createAdminDialogVisible = !this.createAdminDialogVisible;
    if (!this.createAdminDialogVisible) {
      this.selectedAdmin = null;
      this.errors = {};
      this.createAdminForm.reset();
    }
  }

  beginEditAdmin(admin: IUser) {
    this.firstName = admin.firstName;
    this.lastName = admin.lastName;
    this.email = admin.email;
    this.phoneNumber = admin.phoneNumber;
    this.role = admin.role? admin.role.name : ERoleTypes.admin;
    this.permissions = admin.permissions;
    this.errors = {};
    if (admin.role)
      this.role = admin.role.name as ERoleTypes;
    this.selectedAdmin = admin.id;
    this.toggleCreateAdminDialog();
  }

  async editAdmin() {
    this.errors = {};
    if (!this.createAdminForm.validate())
      return;
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
    if (response.status == 200) {
      toast({ message: "User updated" });
      this.$emit("saved");
      this.toggleCreateAdminDialog();
      this.selectedAdmin = null
    }
    else {
      toast({ message: response.errors!.summary });
      this.errors = response.errors!.fields;
    }
  }

  async createAdmin() {
    this.errors = {};
    if (this.createAdminForm.validate()) {
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
      if (response.status == 201) {
        toast({ message: "Admin created" });
        this.$emit("saved");
        this.toggleCreateAdminDialog();
      }
      else {
        toast({ message: response.errors!.summary });
        this.errors = response.errors!.fields;
      }
    }
  }

  async getAllPermissions() {
    const response = await this.authClient.getAllPermissions();
    if (response.status == 200)
      this.allPermissions = response.data;
    else toast({ message: response.errors!.summary });
  }

  removePermission(permission: IPermission) {
    this.permissions = this.permissions.filter(value => permission != value);
  }

  mounted() {
    this.getAllPermissions();
  }
}
