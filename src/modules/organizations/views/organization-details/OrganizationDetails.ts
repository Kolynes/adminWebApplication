import { Component, Vue, Prop, Ref } from "vue-property-decorator";
import FileGetter from "@/components/file-getter/FileGetter.vue";
import ProfilePhoto from "@/components/ProfilePhoto.vue";
import { IAdminOrganizationsClient, IOrganization } from "../../types";
import { service } from "@/utils/services/ServiceProvider";
import { EServices } from "@/types";
import { IMapsService } from "@/modules/maps/types";
import { IFileGetter } from "@/components/file-getter/FileGetter";
import OrganizationEditor from "../../components/organization-editor/OrganizationEditor";

@Component({
  components: {
    FileGetter,
    ProfilePhoto,
    OrganizationEditor
  }
})
export default class OrganizationDetails extends Vue {
  @Prop({
    type: Number,
    required: true
  })
  id!: number;

  organization: IOrganization | null = null;
  loading = true;
  locationMap: google.maps.Map | null = null;

  @Ref()
  locationMapElement!: HTMLElement;

  @service(EServices.adminOrganizations)
  organizationsClient!: IAdminOrganizationsClient;

  @service(EServices.maps)
  mapsService!: IMapsService;

  @Ref()
  fileGetter!: IFileGetter;

  @Ref()
  organizationEditor!: IAdminOrganizationsClient;

  async getOrganization() {
    const response = await this.organizationsClient.getOrganization(this.id);
    this.loading = false;
    if(response.status == 200) {
      this.organization = response.data;
      setTimeout(this.showLocation, 1000);
    }
    else toast({ message: "Organization not found"});
  }

  deleteOrganization(organization: IOrganization) {
    confirm({ icon: "mdi-delete", title: "Delete Organization" }).then(async (result: boolean) => {
      if(result) {
        toast({ loading: true, message: "Deleting organization..." });
        const response = await this.organizationsClient.deleteOrganization(organization.id);
        toast(false);
        if(response.status == 200) {
          toast({ message: "Organization deleted"});
          this.$router.back();
        }
        else toast({ message: response.errors!.summary });
      }
    });
  }

  async changeProfilePhoto(id: number) {
    const file = await this.fileGetter.getFile("image/*", 1 * 1024 * 1024);
    if(file !== null) {
      toast({ loading: true, message: "Changing profile picture..."})
      const response = await this.organizationsClient.changeProfilePhoto(id, file);
      if(response.status == 200)
        toast({ message: "Profile picture changed" });
      else toast({ message: "Failed to change profile picture" });
    }
  }

  async showLocation() {
    this.locationMap = await this.mapsService.load(this.locationMapElement);
    this.mapsService.panToCoordinates(this.locationMap, parseFloat(this.organization!.location.latitude), parseFloat(this.organization!.location.longitude));
    this.mapsService.placeMarker(this.locationMap, parseFloat(this.organization!.location.latitude), parseFloat(this.organization!.location.longitude));
  }
  
  mounted() { 
    this.getOrganization();
  }
}
