import { Component, Vue, Prop, Ref } from "vue-property-decorator";
import FileGetter from "@/components/file-getter/FileGetter.vue";
import ProfilePhoto from "@/components/ProfilePhoto.vue";
import VEmptyState from "@/vuetify-extensions/VEmptyState.vue";
import { EPractitionerTypes, IAdminPractitionersClient, IPractitioner, IPractitionerEditor } from "../../types";
import { datetime } from "@/utils/time";
import { EServices } from "@/types";
import { service } from "@/utils/services/ServiceProvider";
import { typeTextPlurals, typeTexts } from "../../constants";
import PractitionerEditor from "../../components/practitioner-editor/PractitionerEditor";
import { IFileGetter } from "@/components/file-getter/FileGetter";

@Component({
  components: {
    FileGetter,
    ProfilePhoto,
    VEmptyState,
    PractitionerEditor
  }
})
export default class PractitionerDetails extends Vue {
  @Prop({
    type: Number,
    required: true
  })
  id!: number;

  @Prop({
    type: String,
    default: EPractitionerTypes.doctor
  })
  type!: EPractitionerTypes;

  @Ref()
  practitionerEditor!: IPractitionerEditor;

  @Ref()
  fileGetter!: IFileGetter;

  @service(EServices.adminPractitioners)
  practitionersClient!: IAdminPractitionersClient;

  get typeText(): string {
    return typeTexts[this.type];
  }

  get typeTextPlural(): string {
    return typeTextPlurals[this.type];
  }

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

  async verifyPractitioner() {
    const result = await confirm({ icon: "mdi-check-all", title: `Verify ${this.typeText.toLowerCase()}`});
    if(!result) return;
    toast({ loading: true, message: `Verifying ${this.typeText.toLowerCase()}...` });
    const response = await this.practitionersClient.verifyPractitioner(this.id);
    toast(false);
    if(response.status == 200) toast({ message: `${this.typeText} verified`});
    else toast({ message: response.errors!.summary });
  }

  async completeIdentification() {
    const result = await confirm({ icon: "mdi-check", title: `Complete ${this.typeText.toLowerCase()} identification`});
    if(!result) return;
    toast({ loading: true, message: `Completing ${this.typeText.toLowerCase()} identification...` });
    const response = await this.practitionersClient.completeIdentifcation(this.id);
    toast(false);
    if(response.status == 200) toast({ message: `${this.typeText} identification completed`});
    else toast({ message: response.errors!.summary });
  }

  async changeProfilePhoto(id: number) {
    const file = await this.fileGetter.getFile("image/*", 1 * 1024 * 1024);
    if(file !== null) {
      toast({ loading: true, message: "Changing profile picture..."})
      const response = await this.practitionersClient.changeProfilePhoto(id, file);
      if(response.status == 200) {
        toast({ message: "Profile picture changed" });
        this.getPractitioner();
      }
      else toast({ message: "Failed to change profile picture" });
    }
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