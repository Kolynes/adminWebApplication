import { Component, Mixins, Prop, Watch } from "vue-property-decorator";
import TableView from "@/components/TableView.vue";
import TableMixin, { ISearchResults, ITableView } from "@/mixins/TableMixin";
import IProduct from "@/types/IProduct";
import VFileField from "@/vuetify-extensions/VFileField.vue";
import OrganizationProductsEditorMixin from "@/mixins/OrganizationProductsEditorMixin";
import IOrganization from "@/types/IOrganization";
import { service } from "@/utils/services/ServiceProvider";
import EServices from "@/types/EServices";
import { IAdminOrganizationsClient } from "@/services/services";

@Component({
  components: {
    TableView,
    VFileField,
  }
})
export default class OrganizationProducts extends Mixins(TableMixin, OrganizationProductsEditorMixin) implements ITableView<IProduct> {
  @Prop({
    type: Number,
    required: true
  })
  organizationId!: number;

  @service(EServices.adminOrganizations)
  organizatonsClient!: IAdminOrganizationsClient;

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
      text: "Price",
      value: "price"
    },
    {
      text: "Quantity in stock",
      value: "quantityInStock"
    },
  ];
  items = [];

  organization: IOrganization | null = null;

  get organizationName(): string {
    if(this.organization != null)
      return `${this.organization.name}:`;
    else return "";
  }

  itemClicked(product: IProduct) {
    this.$router.push(`/dashboard/${this.typeTextPlural.toLowerCase()}/details?id=${product.id}`);
  }

  async getSearchResults(searchString: string, page: number, pageSize: number): Promise<ISearchResults<IProduct>> {
    const response = await this.productsClient.getProducts(
      this.type,
      "",
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

  async getOrganization() {
    const response = await this.organizatonsClient.getOrganization(this.organizationId);
    if(response.status == 200)
      this.organization = response.data;
  }

  @Watch("type")
  async onTypeChange() {
    this.items = [];
    await this.search();
  }

  mounted() {
    this.getOrganization();
  }
}