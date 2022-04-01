import { Component, Mixins, Ref, Watch } from "vue-property-decorator";
import TableView from "@/components/TableView.vue";
import TableMixin, { ISearchResults, ITableView } from "@/mixins/TableMixin";
import { IAdminRidesClient, IRide, IRideEditor } from "../../types";
import { service } from "@/utils/services/ServiceProvider";
import { EServices } from "@/types";
import RideEditor from "../../components/ride-editor/RideEditor";
import NetworkManagerMixin, { throwsNetworkError } from "@/utils/http/NetworkManagerMixin";

@Component({
  components: {
    TableView,
    RideEditor
  }
})
export default class Rides extends Mixins(TableMixin, NetworkManagerMixin) implements ITableView {
  headers = [
    {
      text: "ID",
      value: "id"
    },
    {
      text: "Name",
      value: "name"
    },
    {
      text: "Model",
      value: "model"
    },
    {
      text: "Brand",
      value: "brand"
    },
    {
      text: "License Plate",
      value: "licensePlate"
    },
  ];

  @service(EServices.adminRides)
  ridesClient!: IAdminRidesClient;

  @Ref()
  rideEditor!: IRideEditor;

  itemClicked(ride: IRide) {
    this.$router.push(`/dashboard/rides/details?id=${ride.id}`);
  }

  @throwsNetworkError()
  async deleteRide(ride: IRide) {
    const result = await confirm({ icon: "mdi-delete", title: `Delete Ride` });
    if (!result) return;
    toast({ loading: true, message: `Deleting ride...` });
    await this.ridesClient.deleteRide(ride.id);
    toast(false);
    toast({ icon: "mdi-check", iconColor: "green", message: `Ride deleted` });
    this.search();
  }

  @throwsNetworkError()
  async getSearchResults(searchString: string, page: number, pageSize: number): Promise<ISearchResults> {
    const response = await this.ridesClient.getRides(
      searchString,
      page,
      pageSize
    );
    return {
      items: response.data,
      numberOfPages: response.numberOfPages || 0
    }
  }

  @Watch("error.deleteRide")
  @Watch("error.getSearchResults")
  onDeleteRideError(value: string) {
    if(value) toast({ icon: "mdi-exclamation-thick", iconColor: "red", message: value });
  }

  @Watch("type")
  onTypeChange() {
    this.items = [];
    this.search();
  }
}