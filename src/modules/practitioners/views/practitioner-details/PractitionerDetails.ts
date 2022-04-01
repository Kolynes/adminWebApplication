import { Component, Vue, Prop, Ref, Mixins, Watch } from "vue-property-decorator";
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
import NetworkManagerMixin, { throwsNetworkError } from "@/utils/http/NetworkManagerMixin";
import IIndexable from "@/utils/types/IIndexable";

@Component({
  components: {
    FileGetter,
    ProfilePhoto,
    VEmptyState,
    PractitionerEditor
  }
})
export default class PractitionerDetails extends Mixins(NetworkManagerMixin) {
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

  loading: IIndexable<boolean> = {
    getPractitioner: true
  };
  practitioner: IPractitioner | null = null;

  datetime = datetime;

  @throwsNetworkError()
  async getPractitioner() {
    const response = await this.practitionersClient.getPractitioner(this.id);
    this.practitioner = response.data;
  }

  @throwsNetworkError()
  async verifyPractitioner() {
    const result = await confirm({ icon: "mdi-check-all", title: `Verify ${this.typeText.toLowerCase()}` });
    if (!result) return;
    toast({ loading: true, message: `Verifying ${this.typeText.toLowerCase()}...` });
    await this.practitionersClient.verifyPractitioner(this.id);
    toast(false);
    toast({ icon: "mdi-check", iconColor: "green", message: `${this.typeText} verified` });
    this.getPractitioner();
  }

  @throwsNetworkError()
  async completeIdentification() {
    const result = await confirm({ icon: "mdi-check", title: `Complete ${this.typeText.toLowerCase()} identification` });
    if (!result) return;
    toast({ loading: true, message: `Completing ${this.typeText.toLowerCase()} identification...` });
    await this.practitionersClient.completeIdentifcation(this.id);
    toast(false);
    toast({ icon: "mdi-check", iconColor: "green", message: `${this.typeText} identification completed` });
    this.getPractitioner();
  }

  @throwsNetworkError()
  async changeProfilePhoto(id: number) {
    const file = await this.fileGetter.getFile("image/*", 1 * 1024 * 1024);
    if (!file) return;
    toast({ loading: true, message: "Changing profile picture..." })
    await this.practitionersClient.changeProfilePhoto(id, file);
    toast({ icon: "mdi-check", iconColor: "green", message: "Profile picture changed" });
    this.getPractitioner();
  }

  @throwsNetworkError()
  async deletePractitioner(practitioner: IPractitioner) {
    const result = await confirm({ icon: "mdi-delete", title: `Delete ${this.typeText}` });
    if(!result) return;
    toast({ loading: true, message: `Deleting ${this.typeText.toLowerCase()}...` });
    await this.practitionersClient.deletePractitioner(practitioner.id);
    toast(false);
    toast({ icon: "mdi-check", iconColor: "green", message: `${this.typeText} deleted` });
    this.$router.back();
  }

  @Watch("error.getPractitioner")
  @Watch("error.verifyPractitioner")
  @Watch("error.completeIdentification")
  @Watch("error.changeProfilePhoto")
  @Watch("error.deletePractitioner")
  onError(message: string) {
    if(message) toast({ icon: "mdi-exclamation-thick", iconColor: "red", message });
  }

  mounted() {
    this.getPractitioner();
  }
}