import { service } from "@/utils/services/ServiceProvider";
import { Vue, Component, Watch, Ref } from "vue-property-decorator";
import VScrollView from "@/vuetify-extensions/VScrollView.vue";
import { EServices } from "@/types";
import { IAdminRidesClient, IRide, IRideEditor, ISelectRide } from "../../types";
import ILoaderResponse from "@/utils/types/ILoaderResponse";
import RideEditor from "../ride-editor/RideEditor";
import { throwsNetworkError } from "@/utils/http/NetworkManagerMixin";

@Component({
  components: {
    VScrollView,
    RideEditor
  }
})
export default class SelectRide extends Vue implements ISelectRide {
  showDialog = false;
  searchString = "";
  refresh = false;
  searchTimeout: number | null = null;
  rideResolve: Function | null = null;

  @service(EServices.adminRides)
  ridesClient!: IAdminRidesClient

  @Ref()
  rideEditor!: IRideEditor;

  async getRide(): Promise<IRide> {
    this.showDialog = true;
    return new Promise<IRide>((resolve) => {
      this.rideResolve = resolve;
    }).then((ride: IRide) => {
      this.showDialog = false;
      return ride;
    });
  }

  @throwsNetworkError()
  async loadRides(page: number): Promise<ILoaderResponse> {
    const response = await this.ridesClient.getRides(
      this.searchString || "",
      page,
      100
    );
    return {
      items: response.data,
      hasNextPage: response.hasNextPage as boolean
    };
  }

  @Watch("searchString")
  onSearchStringChanged() {
    if (this.searchTimeout != null)
      clearTimeout(this.searchTimeout)
    this.searchTimeout = setTimeout(() => this.refresh = true, 500)
  }

  @Watch("error.loadRides")
  onError(value: string) {
    if(value) toast({ icon: "mdi-exclamation-thick", iconColor: "red", message: value });
  }
}