import { Component, Mixins, Watch } from "vue-property-decorator";
import TableView from "@/components/TableView.vue";
import TableMixin, { ISearchResults, ITableView } from "@/mixins/TableMixin";
import { ETripStatus, IAdminTripsClient, ITrip } from "../../types";
import { service } from "@/utils/services/ServiceProvider";
import { EServices } from "@/types";
import { statusChipClasses } from "../../constants";
import { datetime } from "@/utils/time";

@Component({
  components: {
    TableView
  }
})
export default class Trips extends Mixins(TableMixin) implements ITableView<ITrip> {
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
  items = [];
  status: ETripStatus | "" = "";


  @service(EServices.adminTrips)
  tripsClient!: IAdminTripsClient;
  
  datetime = datetime;
  
  itemClicked(trip: ITrip) {
    this.$router.push(`/dashboard/trips/details?id=${trip.id}`);
  }


  async deleteTrip(trip: ITrip) {
    const result = await confirm({ title: "Delete Trip", icon: "mdi-map" });
    if (!result)
      return;
    toast({ loading: true, message: "Deleting trip..."});
    const response = await this.tripsClient.deleteTrip(trip.id);
    toast(false);
    if(response.status == 200) {
      toast({ message: "Deleted trip" });
      this.search();
    } 
    else toast({ message: response.errors!.summary });
  }

  async getSearchResults(searchString: string, page: number, pageSize: number): Promise<ISearchResults<ITrip>> {
    const response = await this.tripsClient.getTrips(
      this.status,
      searchString, 
      page, 
      pageSize
    );
    if(response.status == 200) {
      return {
        items: response.data,
        numberOfPages: response.numberOfPages || 0
      }
    }
    else {
      toast({ message: response.errors!.summary })
      return {
        items: this.items,
        numberOfPages: this.numberOfPages
      }
    }
  }

  @Watch("status")
  onTypeChange() {
    this.items = [];
    this.search();
  }
}