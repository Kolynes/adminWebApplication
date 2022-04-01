import { Component, Prop, Ref, Mixins, Watch } from "vue-property-decorator";
import FileGetter from "@/components/file-getter/FileGetter.vue";
import ProfilePhoto from "@/components/ProfilePhoto.vue";
import { IAdminOrganizationsClient, IOrganization } from "../../types";
import { service } from "@/utils/services/ServiceProvider";
import { EServices } from "@/types";
import { IMapsService } from "@/modules/maps/types";
import { IFileGetter } from "@/components/file-getter/FileGetter";
import OrganizationEditor from "../../components/organization-editor/OrganizationEditor";
import NetworkManagerMixin, { throwsNetworkError } from "@/utils/http/NetworkManagerMixin";
import IIndexable from "@/utils/types/IIndexable";

@Component({
  components: {
    FileGetter,
    ProfilePhoto,
    OrganizationEditor
  }
})
export default class OrganizationDetails extends Mixins(NetworkManagerMixin) {
  @Prop({
    type: Number,
    required: true
  })
  id!: number;

  organization: IOrganization | null = null;
  loading: IIndexable<boolean> = {
    getOrganizations: true
  };
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

  @throwsNetworkError()
  async getOrganization() {
    const response = await this.organizationsClient.getOrganization(this.id);
    this.organization = response.data;
    setTimeout(this.showLocation, 1000);
  }

  @throwsNetworkError()
  async deleteOrganization(organization: IOrganization) {
    const result = await confirm({ icon: "mdi-delete", title: "Delete Organization" });
    if (!result) return;
    toast({ loading: true, message: "Deleting organization..." });
    await this.organizationsClient.deleteOrganization(organization.id);
    toast(false);
    toast({ icon: "mdi-check", iconColor: "green", message: "Organization deleted" });
    this.$router.back();
  }

  @throwsNetworkError()
  async changeProfilePhoto(id: number) {
    const file = await this.fileGetter.getFile("image/*", 1 * 1024 * 1024);
    if(!file) return;
    toast({ loading: true, message: "Changing profile picture..."})
    await this.organizationsClient.changeProfilePhoto(id, file);
    toast({ icon: "mdi-check", iconColor: "green", message: "Profile picture changed" });
    this.getOrganization();
  }

  async showLocation() {
    this.locationMap = await this.mapsService.load(this.locationMapElement);
    this.mapsService.panToCoordinates(this.locationMap, parseFloat(this.organization!.location.latitude), parseFloat(this.organization!.location.longitude));
    this.mapsService.placeMarker(this.locationMap, parseFloat(this.organization!.location.latitude), parseFloat(this.organization!.location.longitude));
  }

  @Watch("error.getOrganizations")
  @Watch("error.deleteOrganization")
  @Watch("error.changeProfilePhoto")
  onError(message: string) {
    if(message) toast({ icon: "mdi-exclamation-thick", iconColor: "red", message });
  }
  
  mounted() { 
    this.getOrganization();
  }
}
