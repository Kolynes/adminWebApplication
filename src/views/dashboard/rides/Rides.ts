import { Component, Mixins, Watch } from "vue-property-decorator";
import TableView from "@/components/TableView.vue";
import TableMixin, { ISearchResults, ITableView } from "@/mixins/TableMixin";
import IRide from "@/types/IRide";
import VFileField from "@/vuetify-extensions/VFileField.vue";
import RidesEditorMixin from "@/mixins/RidesEditorMixin";

@Component({
  components: {
    TableView,
    VFileField,
  }
})
export default class Products extends Mixins(TableMixin, RidesEditorMixin) implements ITableView<IRide> {
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
  items = [];

  itemClicked(ride: IRide) {
    this.$router.push(`/dashboard/rides/details?id=${ride.id}`);
  }

  deleteRide(ride: IRide) {
    confirm({ icon: "mdi-delete", title: `Delete Ride` }).then(async (result: boolean) => {
      if(result) {
        toast({ loading: true, message: `Deleting ride...` });
        const response = await this.ridesClient.deleteRide(ride.id);
        toast(false);
        if(response.status == 200) {
          toast({ message: `Ride deleted`});
          this.search();
        }
        else toast({ message: response.errors!.summary });
      }
    });
  }

  async getSearchResults(searchString: string, page: number, pageSize: number): Promise<ISearchResults<IRide>> {
    const response = await this.ridesClient.getRides(
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

  @Watch("type")
  onTypeChange() {
    this.items = [];
    this.search();
  }
}