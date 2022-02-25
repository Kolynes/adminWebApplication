import IVForm from "@/utils/types/IVForm";
import { emailRule, requiredLengthRule, requiredRule } from "@/utils/rules";
import { service } from "@/utils/services/ServiceProvider";
import { Vue, Component, Ref } from "vue-property-decorator";
import { EServices } from "@/types";
import VFileField from "@/vuetify-extensions/VFileField.vue";
import { IAdminRidesClient, IRide, IRideEditor } from "@/modules/rides/types";

@Component({
  components: {
    VFileField
  }
})
export default class RideEditor extends Vue implements IRideEditor {
  @service(EServices.adminRides)
  ridesClient!: IAdminRidesClient;

  createRideDialogVisible = false;
  selectedRide: number | null = null;
  name = "";
  model = "";
  brand = "";
  licensePlate = "";
  photo: File | null = null;
  creatingRide = false;

  @Ref()
  createRideForm!: IVForm;

  emailRule = emailRule;
  requiredLengthRule = requiredLengthRule;
  requiredRule = requiredRule;

  toggleCreateRideDialog() {
    this.createRideDialogVisible = !this.createRideDialogVisible;
    if(!this.createRideDialogVisible) {
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

  async createRide() {
    if (this.createRideForm.validate()) {
      this.creatingRide = true;
      const response = await this.ridesClient.createRide(
        this.name,
        this.model,
        this.brand!,
        this.licensePlate,
        this.photo!
      );
      this.creatingRide = false;
      if (response.status == 201 || response.status == 200) {
        toast({ message: "Ride created" });
        this.$emit("saved");
        this.toggleCreateRideDialog()
      }
      else toast({ message: response.errors!.summary });
    }
  }

  async editRide() {
    if (this.createRideForm.validate()) {
      this.creatingRide = true;
      const response = await this.ridesClient.updateRide(
        this.selectedRide!,
        this.name,
        this.model,
        this.brand!,
        this.licensePlate,
      );
      this.creatingRide = false;
      if (response.status == 201 || response.status == 200) {
        toast({ message: "Ride updated" });
        this.$emit("saved");
        this.toggleCreateRideDialog();
      }
      else toast({ message: response.errors!.summary });
    }
  }
}


