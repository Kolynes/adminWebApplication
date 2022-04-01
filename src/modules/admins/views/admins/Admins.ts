import { Component, Mixins, Ref, Watch } from "vue-property-decorator"
import TableMixin, { ISearchResults, ITableView } from "@/mixins/TableMixin";
import TableView from "@/components/TableView.vue";
import { IUser } from "@/modules/auth/types";
import AdminEditor from "../../components/admin-editor/AdminEditor";
import { service } from "@/utils/services/ServiceProvider";
import { EServices } from "@/types";
import { IAdminEditor, IAdminUsersClient } from "../../types";
import NetworkManagerMixin, { throwsNetworkError } from "@/utils/http/NetworkManagerMixin";

@Component({
  components: {
    TableView,
    AdminEditor
  }
})
export default class Admins extends Mixins(TableMixin, NetworkManagerMixin) implements ITableView {

  headers = [
    {
      text: "User ID",
      value: "id"
    },
    {
      text: "First Name",
      value: "firstName"
    },
    {
      text: "Last Name",
      value: "lastName"
    },
    {
      text: "Email",
      value: "email"
    },
    {
      text: "Active",
      value: "active"
    }
  ];

  @Ref()
  adminEditor!: IAdminEditor;

  @service(EServices.adminUsers)
  usersClient!: IAdminUsersClient;

  itemClicked(admin: IUser) {
    this.$router.push(`/dashboard/admins/details?id=${admin.id}`)
  }

  @throwsNetworkError()
  async deleteAdmin(admin: IUser) {
    const result = await confirm({ icon: "mdi-delete", title: "Delete admin" })
    if (!result) return;
    toast({ loading: true, message: "Deleting admin..." });
    await this.usersClient.deleteUser(admin.id);
    toast(false);
    toast({ icon: "mdi-check", iconColor: "green", message: "Admin deleted" });
    this.search();
  }

  @throwsNetworkError()
  async enableAdmin(admin: IUser) {
    const result = await confirm({ icon: "mdi-check", title: "Enable admin" });
    if (!result) return;
    toast({ loading: true, message: "Enabling admin..." });
    await this.usersClient.enableUser(admin.id);
    toast(false);
    toast({ icon: "mdi-check", iconColor: "green", message: "Admin enabled" });
    this.search();
  }

  @throwsNetworkError()
  async disableAdmin(admin: IUser) {
    const result = await confirm({ icon: "mdi-close", title: "Disable admin" });
    if (!result) return;
    toast({ loading: true, message: "Disabling admin..." });
    await this.usersClient.disableUser(admin.id);
    toast(false);
    toast({ icon: "mdi-check", iconColor: "green", message: "Admin disabled" });
    this.search();
  }

  @throwsNetworkError()
  async getSearchResults(searchString: string, page: number, pageSize: number): Promise<ISearchResults> {
    const response = await this.usersClient.getUsers(
      searchString,
      page,
      pageSize
    );
    return {
      items: response.data,
      numberOfPages: response.numberOfPages || 0
    }
  }

  @Watch("error.deleteAdmin")
  @Watch("error.enableAdmin")
  @Watch("error.disableAdmin")
  @Watch("error.getSearchResults")
  onError(message: string) {
    if(message) toast({ icon: "mdi-exclamation-thick", iconColor: "red", message });
  }
}
