import OrganizationsEditorMixin from "@/mixins/OrganizationsEditorMixin";
import IOrganization from "@/types/IOrganization";
import { Component, Mixins, Prop, Ref } from "vue-property-decorator";
import FileGetter from "@/components/file-getter/FileGetter.vue";
import ProfilePhoto from "@/components/ProfilePhoto.vue";

@Component({
  components: {
    FileGetter,
    ProfilePhoto
  }
})
export default class OrganizationDetails extends Mixins(OrganizationsEditorMixin) {
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

  async getPharmacy() {
    const response = await this.organizationsClient.getOrganization(this.id);
    this.loading = false;
    if(response.status == 200) {
      this.organization = response.data;
      setTimeout(this.showLocation, 1000);
    }
    else toast({ message: "Pharmacy not found"});
  }

  deletePharmacy(organization: IOrganization) {
    confirm({ icon: "mdi-delete", title: "Delete Pharmacy" }).then(async (result: boolean) => {
      if(result) {
        toast({ loading: true, message: "Deleting organization..." });
        const response = await this.organizationsClient.deleteOrganization(organization.id);
        toast(false);
        if(response.status == 200) {
          toast({ message: "Pharmacy deleted"});
          this.$router.back();
        }
        else toast({ message: response.errors!.summary });
      }
    });
  }

  async callEditOrganization() {
    await this.editOrganization();
    await this.showLocation();
  }

  async showLocation() {
    this.locationMap = await this.mapsService.load(this.locationMapElement);
    this.mapsService.panToCoordinates(this.locationMap, parseFloat(this.organization!.location.latitude), parseFloat(this.organization!.location.longitude));
    this.mapsService.placeMarker(this.locationMap, parseFloat(this.organization!.location.latitude), parseFloat(this.organization!.location.longitude));
  }
  
  mounted() { 
    this.getPharmacy();
  }
}
