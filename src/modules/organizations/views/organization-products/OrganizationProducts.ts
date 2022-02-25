import { Component, Mixins, Prop, Ref, Watch } from "vue-property-decorator";
import TableView from "@/components/TableView.vue";
import TableMixin, { ISearchResults, ITableView } from "@/mixins/TableMixin";
import { service } from "@/utils/services/ServiceProvider";
import { EProductTypes, IProduct, IProductEditor, IProductsClient } from "@/modules/products/types";
import { IAdminOrganizationsClient, IOrganization } from "../../types";
import { EServices } from "@/types";
import ProductEditor from "@/modules/products/components/product-editor/ProductEditor";
import { productTypeTextPlurals, productTypeTexts } from "@/modules/products/constants";

@Component({
  components: {
    TableView,
    ProductEditor
  }
})
export default class OrganizationProducts extends Mixins(TableMixin) implements ITableView<IProduct> {
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

  async getSearchResults(searchString: string, page: number, pageSize: number): Promise<ISearchResults<IProduct>> {
    const response = await this.productsClient.getProductsByOrganization(
      this.organizationId,
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