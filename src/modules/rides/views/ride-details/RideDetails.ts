import { Component, Vue, Prop, Ref } from "vue-property-decorator";
import FileGetter from "@/components/file-getter/FileGetter.vue";
import ProfilePhoto from "@/components/ProfilePhoto.vue";
import { IAdminRidesClient, IRide, IRideEditor } from "../../types";
import { IFileGetter } from "@/components/file-getter/FileGetter";
import { service } from "@/utils/services/ServiceProvider";
import { EServices } from "@/types";
import RideEditor from "../../components/ride-editor/RideEditor";

@Component({
  components: {
    ProfilePhoto,
    FileGetter,
    RideEditor
  }
})
export default class RideDetails extends Vue {
  @Prop({
    type: Number,
    required: true
  })
  id!: number;

  loading = true;
  ride: IRide | null = null;

  @Ref()
  fileGetter!: IFileGetter;

  @Ref()
  rideEditor!: IRideEditor;

  @service(EServices.adminRides)
  ridesClient!: IAdminRidesClient;


  async getRide() {
    const response = await this.ridesClient.getRide(this.id);
    this.loading = false;
    if(response.status == 200) {
      this.ride = response.data;
    }
    else toast({ message: `Ride not found` });
  }

  async changeRidePhoto(id: number) {
    const file = await this.fileGetter.getFile("image/*", 1 * 1024 * 1024);
    if(file !== null) {
      toast({ loading: true, message: "Changing ride photo..."})
      const response = await this.ridesClient.changeRidePhoto(id, file);
      if(response.status == 200)
        toast({ message: "Ride photo changed" });
      else toast({ message: "Failed to change ride photo" });
    }
  }

  deleteRide(ride: IRide) {
    confirm({ icon: "mdi-delete", title: `Delete Ride` }).then(async (result: boolean) => {
      if(result) {
        toast({ loading: true, message: `Deleting ride...` });
        const response = await this.ridesClient.deleteRide(ride.id);
        toast(false);
        if(response.status == 200) {
          toast({ message: `Ride deleted`});
          this.$router.back();
        }
        else toast({ message: response.errors!.summary });
      }
    });
  }

  mounted() {
    this.getRide();
  }

}