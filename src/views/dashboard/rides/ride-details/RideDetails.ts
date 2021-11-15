import RidesEditorMixin from "@/mixins/RidesEditorMixin";
import IRide from "@/types/IRide";
import { Component, Mixins, Prop } from "vue-property-decorator";
import FileGetter from "@/components/file-getter/FileGetter.vue";
import ProfilePhoto from "@/components/ProfilePhoto.vue";

@Component({
  components: {
    ProfilePhoto,
    FileGetter
  }
})
export default class RideDetails extends Mixins(RidesEditorMixin) {
  @Prop({
    type: Number,
    required: true
  })
  id!: number;

  loading = true;
  ride: IRide | null = null;

  async getRide() {
    const response = await this.ridesClient.getRide(this.id);
    this.loading = false;
    if(response.status == 200) {
      this.ride = response.data;
    }
    else toast({ message: `Ride not found` });
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