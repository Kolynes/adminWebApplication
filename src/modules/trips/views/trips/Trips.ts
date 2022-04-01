import { Component, Mixins, Watch } from "vue-property-decorator";
import TableView from "@/components/TableView.vue";
import TableMixin, { ISearchResults, ITableView } from "@/mixins/TableMixin";
import { ETripStatus, IAdminTripsClient, ITrip } from "../../types";
import { service } from "@/utils/services/ServiceProvider";
import { EServices } from "@/types";
import { statusChipClasses } from "../../constants";
import { datetime } from "@/utils/time";
import NetworkManagerMixin, { throwsNetworkError } from "@/utils/http/NetworkManagerMixin";

@Component({
  components: {
    TableView
  }
})
export default class Trips extends Mixins(TableMixin, NetworkManagerMixin) implements ITableView {
  headers = [
    {
      text: "ID",
      value: "id"
    },
    {
      text: "Date",
      value: "createdOnDate"
    },
    {
      text: "Customer",
      value: "customer"
    },
    {
      text: "Delivery Agent",
      value: "deliveryAgent"
    },
    {
      text: "Percentage",
      value: "percentage"
    },
    {
      text: "Trip Status",
      value: "tripStatus"
    },
  ];
  statusChipClasses = statusChipClasses;
  status: ETripStatus | "" = "";

  @service(EServices.adminTrips)
  tripsClient!: IAdminTripsClient;

  datetime = datetime;

  itemClicked(trip: ITrip) {
    this.$router.push(`/dashboard/trips/details?id=${trip.id}`);
  }

  @throwsNetworkError()
  async deleteTrip(trip: ITrip) {
    const result = await confirm({ title: "Delete Trip", icon: "mdi-map" });
    if (!result) return;
    toast({ loading: true, message: "Deleting trip..." });
    await this.tripsClient.deleteTrip(trip.id);
    toast(false);
    toast({ icon: "mdi-check", iconColor: "green", message: "Deleted trip" });
    this.search();
  }

  @throwsNetworkError("Failed to get trips. Please check your network")
  async getSearchResults(searchString: string, page: number, pageSize: number): Promise<ISearchResults> {
    const response = await this.tripsClient.getTrips(
      this.status,
      searchString,
      page,
      pageSize
    );
    return {
      items: response.data,
      numberOfPages: response.numberOfPages || 0
    }
  }

  @Watch("error.deleteTrip")
  @Watch("error.getSearchResults")
  onError(value: string) {
    if (value) toast({ icon: "mdi-exclamation-thick", iconColor: "red", message: value });
  }

  @Watch("status")
  onTypeChange() {
    this.items = [];
    this.search();
  }
}