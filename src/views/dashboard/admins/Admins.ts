import { Component, Mixins } from "vue-property-decorator"
import IUser from "@/types/IUser";
import TableMixin, { ISearchResults, ITableView } from "@/mixins/TableMixin";
import TableView from "@/components/TableView.vue";
import VPasswordField from "@/vuetify-extensions/VPasswordField.vue";
import AdminEditorMixin from "@/mixins/AdminEditorMixin";

@Component({
  components: {
    TableView,
    VPasswordField,
  }
})
export default class Admins extends Mixins(TableMixin, AdminEditorMixin) implements ITableView<IUser> {

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
  items = [];

  

  itemClicked(admin: IUser) {
    this.$router.push(`/dashboard/admins/details?id=${admin.id}`)
  }

  deleteAdmin(admin: IUser) {
    confirm({ icon: "mdi-delete", title: "Delete admin" }).then(async (result: boolean) => {
      if(result) {
        toast({ loading: true, message: "Deleting admin..." });
        const response = await this.usersClient.deleteUser(admin.id);
        toast(false);
        if(response.status == 200) {
          toast({ message: "Admin deleted"});
          this.search();
        }
        else toast({ message: response.errors!.summary });
      }
    });
  }

  enableAdmin(admin: IUser) {
    confirm({ icon: "mdi-check", title: "Enable admin" }).then(async (result: boolean) => {
      if(result) {
        toast({ loading: true, message: "Enabling admin..." });
        const response = await this.usersClient.enableUser(admin.id);
        toast(false);
        if(response.status == 200) {
          toast({ message: "Admin enabled"});
          this.search();
        }
        else toast({ message: response.errors!.summary });
      }
    });
  }

  disableAdmin(admin: IUser) {
    confirm({ icon: "mdi-close", title: "Disable admin" }).then(async (result: boolean) => {
      if(result) {
        toast({ loading: true, message: "Disabling admin..." });
        const response = await this.usersClient.disableUser(admin.id);
        toast(false);
        if(response.status == 200) {
          toast({ message: "Admin disabled"});
          this.search();
        }
        else toast({ message: response.errors!.summary });
      }
    });
  }

  async getSearchResults(searchString: string, page: number, pageSize: number): Promise<ISearchResults<IUser>> {
    const response = await this.usersClient.getUsers(
      searchString, 
      page, 
      pageSize
    );
    if(response.status == 200) {
      return {
        items: response.data,
        numberOfPages: response.numberOfPages || 0
      }
    }
    else {
      toast({ message: response.errors!.summary })
      return {
        items: this.items,
        numberOfPages: this.numberOfPages
      }
    }
  }

}
