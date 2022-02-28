import { Component, Mixins, Prop, Ref, Watch } from "vue-property-decorator";
import TableView from "@/components/TableView.vue";
import TableMixin, { ISearchResults, ITableView } from "@/mixins/TableMixin";
import { EPractitionerTypes, IAdminPractitionersClient, IPractitioner, IPractitionerEditor } from "../../types";
import { EServices } from "@/types";
import { service } from "@/utils/services/ServiceProvider";
import { typeTextPlurals, typeTexts } from "../../constants";
import PractitionerEditor from "../../components/practitioner-editor/PractitionerEditor";

@Component({
  components: {
    TableView,
    PractitionerEditor
  }
})
export default class Practitioners extends Mixins(TableMixin) implements ITableView<IPractitioner> {
  @Prop({
    type: String,
    default: EPractitionerTypes.doctor
  })
  type!: EPractitionerTypes;

  @service(EServices.adminPractitioners)
  practitionersClient!: IAdminPractitionersClient;

  @Ref()
  practitionerEditor!: IPractitionerEditor;

  get typeText(): string {
    return typeTexts[this.type];
  }

  get typeTextPlural(): string {
    return typeTextPlurals[this.type];
  }
  
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
      text: "Phone Number",
      value: "phoneNumber"
    },
    {
      text: "Address",
      value: "address"
    },
    {
      text: "Company",
      value: "companyName"
    }
  ];
  items = [];

  itemClicked(practitioner: IPractitioner) {
    this.$router.push(`/dashboard/${this.typeTextPlural.toLowerCase()}/details?id=${practitioner.id}`);
  }

  deletePractitioner(practitioner: IPractitioner) {
    confirm({ icon: "mdi-delete", title: `Delete ${this.typeText}` }).then(async (result: boolean) => {
      if(result) {
        toast({ loading: true, message: `Deleting ${this.typeText.toLowerCase()}...` });
        const response = await this.practitionersClient.deletePractitioner(practitioner.id);
        toast(false);
        if(response.status == 200) {
          toast({ message: `${this.typeText} deleted`});
          this.search();
        }
        else toast({ message: response.errors!.summary });
      }
    });
  }

  async getSearchResults(searchString: string, page: number, pageSize: number): Promise<ISearchResults<IPractitioner>> {
    const response = await this.practitionersClient.getPractitioners(
      this.type,
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