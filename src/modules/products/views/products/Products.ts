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

const AccountModule = namespace("AccountModule");
const OrganizationModule = namespace("OrganizationModule");

@Component({
  components: {
    TableView,
    ProductEditor
  }
})
export default class Products extends Mixins(TableMixin) implements ITableView<IProduct> {
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
  items = [];

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

  deleteProduct(product: IProduct) {
    confirm({ icon: "mdi-delete", title: `Delete ${this.typeText}` }).then(async (result: boolean) => {
      if (result) {
        toast({ loading: true, message: `Deleting ${this.typeText.toLowerCase()}...` });
        const response = await this.productsClient.deleteProduct(product.id);
        toast(false);
        if (response.status == 200) {
          toast({ message: `${this.typeText} deleted` });
          this.search();
        }
        else toast({ message: response.errors!.summary });
      }
    });
  }

  async getSearchResults(searchString: string, page: number, pageSize: number): Promise<ISearchResults<IProduct>> {
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
    if (response.status == 200) {
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