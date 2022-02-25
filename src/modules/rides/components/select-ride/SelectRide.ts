import { service } from "@/utils/services/ServiceProvider";
import { Vue, Component, Watch, Ref } from "vue-property-decorator";
import VScrollView from "@/vuetify-extensions/VScrollView.vue";
import { EServices } from "@/types";
import { IAdminRidesClient, IRide, IRideEditor, ISelectRide } from "../../types";
import ILoaderResponse from "@/utils/types/ILoaderResponse";
import RideEditor from "../ride-editor/RideEditor";

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
  searching = false;
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

  async loadRides(page: number): Promise<ILoaderResponse<IRide>> {
    this.searching = true;
    const response = await this.ridesClient.getRides(
      this.searchString || "",
      page,
      100
    );
    this.searching = false;
    if(response.status == 200) {
      return {
        items: response.data,
        hasNextPage: response.hasNextPage as boolean
      };
    }
    else return {
      items: [],
      hasNextPage: false
    };
  }

  @Watch("searchString")
  onSearchStringChanged() {
    if(this.searchTimeout != null)
      clearTimeout(this.searchTimeout)
    this.searchTimeout = setTimeout(() => this.refresh = true, 500)
  }
}