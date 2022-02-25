import PractitionersEditorMixin from "@/mixins/PractitionersEditorMixin";
import { Component, Mixins, Prop } from "vue-property-decorator";
import FileGetter from "@/components/file-getter/FileGetter.vue";
import ProfilePhoto from "@/components/ProfilePhoto.vue";
import VEmptyState from "@/vuetify-extensions/VEmptyState.vue";
import { IPractitioner } from "../../types";
import { datetime } from "@/utils/time";

@Component({
  components: {
    FileGetter,
    ProfilePhoto,
    VEmptyState
  }
})
export default class PractitionerDetails extends Mixins(PractitionersEditorMixin) {
  @Prop({
    type: Number,
    required: true
  })
  id!: number;

  loading = true;
  practitioner: IPractitioner | null = null;

  datetime = datetime;

  async getPractitioner() {
    const response = await this.practitionersClient.getPractitioner(this.id);
    this.loading = false;
    if(response.status == 200) {
      this.practitioner = response.data;
    }
    else toast({ message: `${this.typeText} not found` });
  }

  deletePractitioner(practitioner: IPractitioner) {
    confirm({ icon: "mdi-delete", title: `Delete ${this.typeText}` }).then(async (result: boolean) => {
      if(result) {
        toast({ loading: true, message: `Deleting ${this.typeText.toLowerCase()}...` });
        const response = await this.practitionersClient.deletePractitioner(practitioner.id);
        toast(false);
        if(response.status == 200) {
          toast({ message: `${this.typeText} deleted`});
          this.$router.back();
        }
        else toast({ message: response.errors!.summary });
      }
    });
  }

  mounted() {
    this.getPractitioner();
  }

}