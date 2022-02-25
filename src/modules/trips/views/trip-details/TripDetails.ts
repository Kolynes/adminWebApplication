import { EServices } from "@/types";
import { service } from "@/utils/services/ServiceProvider";
import { datetime } from "@/utils/time";
import { Component, Prop, Vue } from "vue-property-decorator";
import { statusChipClasses } from "../../constants";
import { IAdminTripsClient, ITrip } from "../../types";

@Component
export default class TripDetails extends Vue {
  @Prop({
    type: Number,
    required: true
  })
  id!: number;

  loading = true;
  trip: ITrip | null = null;
  statusChipClasses = statusChipClasses;

  datetime = datetime;

  @service(EServices.adminTrips)
  tripsClient!: IAdminTripsClient;

  async getTrip() {
    const response = await this.tripsClient.getTrip(this.id);
    this.loading = false;
    if(response.status == 200)
      this.trip = response.data;
    else toast({ message: "Trip not found" });
  }

  mounted() {
    this.getTrip();
  }
}