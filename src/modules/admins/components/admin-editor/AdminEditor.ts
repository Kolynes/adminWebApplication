import IVForm from "@/utils/types/IVForm";
import { emailRule, requiredLengthRule, requiredRule } from "@/utils/rules";
import { service } from "@/utils/services/ServiceProvider";
import { Component, Ref, Mixins, Watch } from "vue-property-decorator";
import { EServices } from "@/types";
import { ERoleTypes, IAuthClient, IPermission, IUser } from "@/modules/auth/types";
import { IAdminEditor, IAdminUsersClient } from "@/modules/admins/types";
import VPasswordField from "@/vuetify-extensions/VPasswordField.vue";
import { roleTexts } from "../../constants";
import NetworkManagerMixin, { throwsNetworkError } from "@/utils/http/NetworkManagerMixin";

@Component({
  components: {
    VPasswordField
  }
})
export default class AdminEditor extends Mixins(NetworkManagerMixin) implements IAdminEditor {
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
    return roleTexts[role];
  }

  isSelected(permission: IPermission) {
    return this.permissions.findIndex(value => value == permission) != -1;
  }

  toggleCreateAdminDialog() {
    this.createAdminDialogVisible = !this.createAdminDialogVisible;
    if (!this.createAdminDialogVisible) {
      this.selectedAdmin = null;
      this.createAdminForm.reset();
    }
  }

  beginEditAdmin(admin: IUser) {
    this.firstName = admin.firstName;
    this.lastName = admin.lastName;
    this.email = admin.email;
    this.phoneNumber = admin.phoneNumber;
    this.role = admin.role ? admin.role.name : ERoleTypes.admin;
    this.permissions = admin.permissions;
    if (admin.role)
      this.role = admin.role.name as ERoleTypes;
    this.selectedAdmin = admin.id;
    this.toggleCreateAdminDialog();
  }

  removePermission(permission: IPermission) {
    this.permissions = this.permissions.filter(value => permission != value);
  }

  @throwsNetworkError()
  async editAdmin() {
    if (!this.createAdminForm.validate()) return;
    await this.usersClient.updateUser(
      this.selectedAdmin!,
      this.firstName,
      this.lastName,
      this.email,
      this.phoneNumber,
      this.role,
      this.permissionIds
    );
    toast({ icon: "mdi-check", iconColor: "green", message: "User updated" });
    this.$emit("saved");
    this.toggleCreateAdminDialog();
  }

  @throwsNetworkError()
  async createAdmin() {
    if (!this.createAdminForm.validate()) return;
    await this.usersClient.createAdminUser(
      this.firstName,
      this.lastName,
      this.email,
      this.phoneNumber,
      this.password,
      this.role,
      this.permissionIds
    );
    toast({ icon: "mdi-check", iconColor: "green", message: "Admin created" });
    this.$emit("saved");
    this.toggleCreateAdminDialog();
  }

  @throwsNetworkError()
  async getAllPermissions() {
    const response = await this.authClient.getAllPermissions();
    this.allPermissions = response.data;
  }

  @Watch("error.editAdmin")
  @Watch("error.createAdmin")
  @Watch("error.getAllPermissions")
  onError(message: string) {
    if(message) toast({ icon: "mdi-exclamation-thick", iconColor: "red", message });
  }

  mounted() {
    this.getAllPermissions();
  }
}
