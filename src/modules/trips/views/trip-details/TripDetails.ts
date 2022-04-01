import { EServices } from "@/types";
import NetworkManagerMixin, { throwsNetworkError } from "@/utils/http/NetworkManagerMixin";
import { service } from "@/utils/services/ServiceProvider";
import { datetime } from "@/utils/time";
import IIndexable from "@/utils/types/IIndexable";
import { Component, Mixins, Prop, Watch } from "vue-property-decorator";
import { statusChipClasses } from "../../constants";
import { IAdminTripsClient, ITrip } from "../../types";

@Component
export default class TripDetails extends Mixins(NetworkManagerMixin) {
  @Prop({
    type: Number,
    required: true
  })
  id!: number;

  loading: IIndexable<boolean> = {
    getTrip: true
  };

  trip: ITrip | null = null;
  statusChipClasses = statusChipClasses;

  datetime = datetime;

  @service(EServices.adminTrips)
  tripsClient!: IAdminTripsClient;

  @throwsNetworkError()
  async getTrip() {
    const response = await this.tripsClient.getTrip(this.id);
    this.trip = response.data;
  }

  @Watch("error.getTrip")
  onGetTripError(value: string) {
    if(value) toast({ icon: "mdi-exclamation-thick", iconColor: "red", message: value });
  }

  mounted() {
    this.getTrip();
  }
}