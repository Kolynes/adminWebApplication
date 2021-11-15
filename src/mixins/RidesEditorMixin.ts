import { IFileGetter } from "@/components/file-getter/FileGetter";
import { IAdminRidesClient } from "@/services/services";
import EServices from "@/types/EServices";
import IRide from "@/types/IRide";
import IVForm from "@/types/IVForm";
import { emailRule, requiredLengthRule, requiredRule } from "@/utils/rules";
import { service } from "@/utils/services/ServiceProvider";
import { Vue, Component, Ref } from "vue-property-decorator";

@Component
export default class RidesEditorMixin extends Vue {
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

  @Ref()
  fileGetter!: IFileGetter;

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

  async changeRidePhoto(id: number) {
    const file = await this.fileGetter.getFile("image/*", 1 * 1024 * 1024);
    if(file !== null) {
      toast({ loading: true, message: "Changing ride photo..."})
      const response = await this.ridesClient.changeRidePhoto(id, file);
      if(response.status == 200)
        toast({ message: "Ride photo changed" });
      else toast({ message: "Failed to change ride photo" });
    }
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
        this.toggleCreateRideDialog()
      }
      else toast({ message: response.errors!.summary });
    }
  }
}
