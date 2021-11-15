import { IAdminRidesClient } from "@/services/services";
import EServices from "@/types/EServices";
import IRide from "@/types/IRide";
import { service } from "@/utils/services/ServiceProvider";
import { Vue, Component, Watch } from "vue-property-decorator";
import VScrollView from "@/vuetify-extensions/VScrollView.vue";

interface ILoaderResponse<T> {
  items: T[];
  hasNextPage: boolean
}

export interface ISelectRide {
  getRide(): Promise<IRide>;
}

@Component({
  components: {
    VScrollView
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