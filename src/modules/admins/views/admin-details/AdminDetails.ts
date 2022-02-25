import { IAdminEditor, IAdminUsersClient } from "../../types";
import { service } from "@/utils/services/ServiceProvider";
import { Component, Prop, Ref, Vue } from "vue-property-decorator";
import { ERoleTypes, IUser } from "@/modules/auth/types";
import { EServices } from "@/types";
import AdminEditor from "../../components/admin-editor/AdminEditor";
import { roleTexts } from "../../constants";

@Component({
  components: {
    AdminEditor
  }
})
export default class AdminDetails extends Vue {
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
  loading = true;

  getRoleText(role: ERoleTypes) {
    return roleTexts[role];
  }

  async getAdmin() {
    const response = await this.usersClient.getUser(this.id);
    this.loading = false;
    if(response.status == 200)
      this.admin = response.data;
    else toast({ message: "User not found"});
  }

  deleteAdmin(admin: IUser) {
    confirm({ icon: "mdi-delete", title: "Delete admin" }).then(async (result: boolean) => {
      if(result) {
        toast({ loading: true, message: "Deleting admin..." });
        const response = await this.usersClient.deleteUser(admin.id);
        toast(false);
        if(response.status == 200) {
          toast({ message: "Admin deleted"});
          this.$router.back();
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
          this.getAdmin();
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
          this.getAdmin();
        }
        else toast({ message: response.errors!.summary });
      }
    });
  }

  mounted() { 
    this.getAdmin()
  }
}