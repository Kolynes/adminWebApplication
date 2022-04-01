import { IAdminEditor, IAdminUsersClient } from "../../types";
import { service } from "@/utils/services/ServiceProvider";
import { Component, Mixins, Prop, Ref, Vue, Watch } from "vue-property-decorator";
import { ERoleTypes, IUser } from "@/modules/auth/types";
import { EServices } from "@/types";
import AdminEditor from "../../components/admin-editor/AdminEditor";
import { roleTexts } from "../../constants";
import NetworkManagerMixin, { throwsNetworkError } from "@/utils/http/NetworkManagerMixin";
import IIndexable from "@/utils/types/IIndexable";

@Component({
  components: {
    AdminEditor
  }
})
export default class AdminDetails extends Mixins(NetworkManagerMixin) {
  @Prop({
    type: Number,
    required: true
  })
  id!: number;

  @Ref()
  adminEditor!: IAdminEditor;

  @service(EServices.adminUsers)
  usersClient!: IAdminUsersClient;

  admin: IUser | null = null;
  loading: IIndexable<boolean> = {
    getAdmin: true
  }

  getRoleText(role: ERoleTypes) {
    return roleTexts[role];
  }

  @throwsNetworkError()
  async getAdmin() {
    const response = await this.usersClient.getUser(this.id);
    this.admin = response.data;
  }

  @throwsNetworkError()
  async deleteAdmin(admin: IUser) {
    const result = await confirm({ icon: "mdi-delete", title: "Delete admin" });
    if (!result) return;
    toast({ loading: true, message: "Deleting admin..." });
    await this.usersClient.deleteUser(admin.id);
    toast(false);
    toast({ icon: "mdi-check", iconColor: "green", message: "Admin deleted" });
    this.$router.back();
  }

  @throwsNetworkError()
  async enableAdmin(admin: IUser) {
    const result = await confirm({ icon: "mdi-check", title: "Enable admin" });
    if (!result) return;
    toast({ loading: true, message: "Enabling admin..." });
    await this.usersClient.enableUser(admin.id);
    toast(false);
    toast({ icon: "mdi-check", iconColor: "green", message: "Admin enabled" });
    this.getAdmin();
  }

  @throwsNetworkError()
  async disableAdmin(admin: IUser) {
    const result = await confirm({ icon: "mdi-close", title: "Disable admin" });
    if (!result) return
    toast({ loading: true, message: "Disabling admin..." });
    await this.usersClient.disableUser(admin.id);
    toast(false);
    toast({ icon: "mdi-check", iconColor: "green", message: "Admin disabled" });
    this.getAdmin();
  }

  @Watch("error.getAdmin")
  @Watch("error.deleteAdmin")
  @Watch("error.enableAdmin")
  @Watch("error.disableAdmin")
  onError(message: string) {
    if(message) toast({ icon: "mdi-exclamation-thick", iconColor: "red", message });
  }

  mounted() {
    this.getAdmin()
  }
}