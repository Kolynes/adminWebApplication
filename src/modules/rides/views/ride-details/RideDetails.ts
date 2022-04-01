import { Component, Prop, Ref, Mixins, Watch } from "vue-property-decorator";
import FileGetter from "@/components/file-getter/FileGetter.vue";
import ProfilePhoto from "@/components/ProfilePhoto.vue";
import { IAdminRidesClient, IRide, IRideEditor } from "../../types";
import { IFileGetter } from "@/components/file-getter/FileGetter";
import { service } from "@/utils/services/ServiceProvider";
import { EServices } from "@/types";
import RideEditor from "../../components/ride-editor/RideEditor";
import NetworkManagerMixin, { throwsNetworkError } from "@/utils/http/NetworkManagerMixin";
import IIndexable from "@/utils/types/IIndexable";

@Component({
  components: {
    ProfilePhoto,
    FileGetter,
    RideEditor
  }
})
export default class RideDetails extends Mixins(NetworkManagerMixin) {
  @Prop({
    type: Number,
    required: true
  })
  id!: number;

  loading: IIndexable<boolean> = {
    getRide: true
  };

  ride: IRide | null = null;

  @Ref()
  fileGetter!: IFileGetter;

  @Ref()
  rideEditor!: IRideEditor;

  @service(EServices.adminRides)
  ridesClient!: IAdminRidesClient;

  @throwsNetworkError()
  async getRide() {
    const response = await this.ridesClient.getRide(this.id);
    this.ride = response.data;
  }

  @throwsNetworkError()
  async changeRidePhoto(id: number) {
    const file = await this.fileGetter.getFile("image/*", 1 * 1024 * 1024);
    if(file === null) return;
    toast({ loading: true, message: "Changing ride photo..."})
    await this.ridesClient.changeRidePhoto(id, file);
    toast({ icon: "mdi-check", iconColor: "green", message: "Ride photo changed" });
  }

  @throwsNetworkError()
  async deleteRide(ride: IRide) {
    const result = await confirm({ icon: "mdi-delete", title: `Delete Ride` });
    if(!result) return;
    toast({ loading: true, message: `Deleting ride...` });
    await this.ridesClient.deleteRide(ride.id);
    toast(false);
    toast({ icon: "mdi-check", iconColor: "green", message: `Ride deleted`});
    this.$router.back();
  }

  @Watch("error.getRide")
  @Watch("error.changeRidePhoto")
  @Watch("error.deleteRide")
  onError(value: string) {
    if (value) toast({ icon: "mdi-exclamation-thick", iconColor: "red", message: value });
  }

  mounted() {
    this.getRide();
  }
}