import SelectRide from "@/components/select-ride/SelectRide.vue";
import AgentEditorMixin from "@/mixins/AgentEditorMixin";
import IAgent from "@/types/IAgent";
import { Component, Mixins, Prop } from "vue-property-decorator";
import VFileField from "@/vuetify-extensions/VFileField.vue";
import VPasswordField from "@/vuetify-extensions/VPasswordField.vue";
import FileGetter from "@/components/file-getter/FileGetter.vue";
import ProfilePhoto from "@/components/ProfilePhoto.vue";

@Component({
  components: {
    VFileField,
    VPasswordField,
    SelectRide,
    FileGetter,
    ProfilePhoto
  }
})
export default class AgentDetails extends Mixins(AgentEditorMixin) {
  @Prop({
    type: Number,
    required: true
  })
  id!: number;

  agent: IAgent | null = null;
  loading = true;

  async getAgent() {
    const response = await this.agentsClient.getAgent(this.id);
    this.loading = false;
    if(response.status == 200)
      this.agent = response.data;
    else toast({ message: "Agent not found"});
  }

  deleteAgent(agent: IAgent) {
    confirm({ icon: "mdi-delete", title: "Delete agent" }).then(async (result: boolean) => {
      if(result) {
        toast({ loading: true, message: "Deleting agent..." });
        const response = await this.agentsClient.deleteAgent(agent.id);
        toast(false);
        if(response.status == 200) {
          toast({ message: "Agent deleted"});
          this.$router.back();
        }
        else toast({ message: response.errors!.summary });
      }
    });
  }

  mounted() { 
    this.getAgent()
  }
}