import { Component, Mixins, Prop, Ref, Watch } from "vue-property-decorator";
import TableView from "@/components/TableView.vue";
import TableMixin, { ISearchResults, ITableView } from "@/mixins/TableMixin";
import { EDrugTypes, EProductTypes, IProduct, IProductEditor, IProductsClient } from "../../types";
import ProductEditor from "../../components/product-editor/ProductEditor";
import { service } from "@/utils/services/ServiceProvider";
import { EServices } from "@/types";
import { drugTypeTexts, productTypeTextPlurals, productTypeTexts } from "../../constants";
import { organizationTypeRoutes } from "@/modules/organizations/constants";
import { EUserType, IAccount } from "@/modules/auth/types";
import { namespace } from "vuex-class";
import { IOrganization } from "@/modules/organizations/types";
import NetworkManagerMixin, { throwsNetworkError } from "@/utils/http/NetworkManagerMixin";

const AccountModule = namespace("AccountModule");
const OrganizationModule = namespace("OrganizationModule");

@Component({
  components: {
    TableView,
    ProductEditor
  }
})
export default class Products extends Mixins(TableMixin, NetworkManagerMixin) implements ITableView {
  @Prop({
    type: String,
    required: true
  })
  type!: EProductTypes;

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
      text: "Vendor",
      value: "vendor"
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

  @AccountModule.State
  account!: IAccount;

  @OrganizationModule.State
  organization!: IOrganization;

  @Ref()
  productEditor!: IProductEditor;

  @service(EServices.products)
  productsClient!: IProductsClient;

  get typeText(): string {
    return productTypeTexts[this.type];
  }

  get typeTextPlural(): string {
    return productTypeTextPlurals[this.type];
  }

  get organizationTypeRoute(): string {
    return organizationTypeRoutes[this.type];
  }

  drugTypeText(drugType: EDrugTypes): string {
    return drugTypeTexts[drugType];
  }

  itemClicked(product: IProduct) {
    this.$router.push(`/dashboard/${this.typeTextPlural.toLowerCase()}/details?id=${product.id}`);
  }

  @throwsNetworkError()
  async deleteProduct(product: IProduct) {
    const result = await confirm({ icon: "mdi-delete", title: `Delete ${this.typeText}` });
    if (!result) return;
    toast({ loading: true, message: `Deleting ${this.typeText.toLowerCase()}...` });
    await this.productsClient.deleteProduct(product.id);
    toast(false);
    toast({ icon: "mdi-check", iconColor: "green", message: `${this.typeText} deleted` });
    this.search();
  }

  @throwsNetworkError()
  async getSearchResults(searchString: string, page: number, pageSize: number): Promise<ISearchResults> {
    const response = this.account.userType == EUserType.organization
      ? await this.productsClient.getProductsByOrganization(
        this.organization.id,
        this.type,
        searchString,
        page,
        pageSize
      )
      : await this.productsClient.getProducts(
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

  @Watch("type")
  onTypeChange() {
    this.items = [];
    this.search();
  }

  @Watch("error.getSearchResults")
  @Watch("error.deleteProduct")
  onError(message: string) {
    if(message) toast({ icon: "mdi-exclamation-thick", iconColor: "red", message });
  }
}