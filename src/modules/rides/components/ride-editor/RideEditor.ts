import IVForm from "@/utils/types/IVForm";
import { emailRule, requiredLengthRule, requiredRule } from "@/utils/rules";
import { service } from "@/utils/services/ServiceProvider";
import { Component, Ref, Mixins, Watch } from "vue-property-decorator";
import { EServices } from "@/types";
import VFileField from "@/vuetify-extensions/VFileField.vue";
import { IAdminRidesClient, IRide, IRideEditor } from "@/modules/rides/types";
import NetworkManagerMixin, { throwsNetworkError } from "@/utils/http/NetworkManagerMixin";

@Component({
  components: {
    VFileField
  }
})
export default class RideEditor extends Mixins(NetworkManagerMixin) implements IRideEditor {
  @service(EServices.adminRides)
  ridesClient!: IAdminRidesClient;

  createRideDialogVisible = false;
  selectedRide: number | null = null;
  name = "";
  model = "";
  brand = "";
  licensePlate = "";
  photo: File | null = null;

  @Ref()
  createRideForm!: IVForm;

  emailRule = emailRule;
  requiredLengthRule = requiredLengthRule;
  requiredRule = requiredRule;

  toggleCreateRideDialog() {
    this.createRideDialogVisible = !this.createRideDialogVisible;
    if (!this.createRideDialogVisible) {
      this.selectedRide = null;
      this.createRideForm.reset();
    }
  }

  beginEditRide(ride: IRide) {
    this.selectedRide = ride.id;
    this.name = ride.name;
    this.model = ride.model;
    this.brand = ride.brand;
    this.licensePlate = ride.licensePlate;
    this.toggleCreateRideDialog();
  }

  @throwsNetworkError()
  async createRide() {
    if (!this.createRideForm.validate()) return;
    await this.ridesClient.createRide(
      this.name,
      this.model,
      this.brand!,
      this.licensePlate,
      this.photo!
    );
    toast({ icon: "mdi-check", iconColor: "green", message: "Ride created" });
    this.$emit("saved");
    this.toggleCreateRideDialog();
  }

  @throwsNetworkError()
  async editRide() {
    if (!this.createRideForm.validate()) return;
    await this.ridesClient.updateRide(
      this.selectedRide!,
      this.name,
      this.model,
      this.brand!,
      this.licensePlate,
    );
    toast({ icon: "mdi-check", iconColor: "green", message: "Ride updated" });
    this.$emit("saved");
    this.toggleCreateRideDialog();
  }

  @Watch("error.createRide")
  @Watch("error.editRide")
  onError(value: string) {
    if(value) toast({ icon: "mdi-exclamation-thick", iconColor: "red", message: value });
  }
}


