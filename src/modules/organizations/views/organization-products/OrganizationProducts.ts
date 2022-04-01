import { Component, Mixins, Prop, Ref, Watch } from "vue-property-decorator";
import TableView from "@/components/TableView.vue";
import TableMixin, { ISearchResults, ITableView } from "@/mixins/TableMixin";
import { service } from "@/utils/services/ServiceProvider";
import { EProductTypes, IProduct, IProductEditor, IProductsClient } from "@/modules/products/types";
import { EOrganizationTypes, IAdminOrganizationsClient, IOrganization } from "../../types";
import { EServices } from "@/types";
import ProductEditor from "@/modules/products/components/product-editor/ProductEditor";
import { productTypeTextPlurals, productTypeTexts } from "@/modules/products/constants";
import NetworkManagerMixin, { throwsNetworkError } from "@/utils/http/NetworkManagerMixin";

@Component({
  components: {
    TableView,
    ProductEditor
  }
})
export default class OrganizationProducts extends Mixins(TableMixin, NetworkManagerMixin) implements ITableView {
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
  
  type = EProductTypes.drug;
  organization: IOrganization | null = null;

  @service(EServices.products)
  productsClient!: IProductsClient;

  @Ref()
  productEditor!: IProductEditor;

  get organizationName(): string {
    if(this.organization != null)
      return `${this.organization.name}:`;
    else return "";
  }

  get typeText(): string {
    return productTypeTexts[this.type];
  }

  get typeTextPlural(): string {
    return productTypeTextPlurals[this.type];
  }

  itemClicked(product: IProduct) {
    this.$router.push(`/dashboard/${this.typeTextPlural.toLowerCase()}/details?id=${product.id}`);
  }

  @throwsNetworkError()
  async getSearchResults(searchString: string, page: number, pageSize: number): Promise<ISearchResults> {
    const response = await this.productsClient.getProductsByOrganization(
      this.organizationId,
      this.type,
      searchString, 
      page, 
      pageSize
    );
    return {
      items: response.data,
      numberOfPages: response.numberOfPages || 0
    }
  }

  @throwsNetworkError()
  async getOrganization() {
    const response = await this.organizatonsClient.getOrganization(this.organizationId);
    this.organization = response.data;
    this.organization!.organizationType == EOrganizationTypes.OEM
      ? this.type == EProductTypes.equipment
      : this.type == EProductTypes.drug;
  }

  @Watch("type")
  async onTypeChange() {
    this.items = [];
    await this.search();
  }

  @Watch("error.getSearchResults")
  @Watch("error.getOrganization")
  onError(message: string) {
    if(message) toast({ icon: "mdi-exclamation-thick", iconColor: "red", message });
  }

  mounted() {
    this.getOrganization();
  }
}