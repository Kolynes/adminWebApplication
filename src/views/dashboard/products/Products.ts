import { Component, Mixins, Watch } from "vue-property-decorator";
import TableView from "@/components/TableView.vue";
import TableMixin, { ISearchResults, ITableView } from "@/mixins/TableMixin";
import IProduct from "@/types/IProduct";
import ProductsEditorMixin from "@/mixins/ProductsEditorMixin";
import VFileField from "@/vuetify-extensions/VFileField.vue";
import SelectOrganization from "@/components/select-organization/SelectOrganization.vue";

@Component({
  components: {
    TableView,
    VFileField,
    SelectOrganization
  }
})
export default class Products extends Mixins(TableMixin, ProductsEditorMixin) implements ITableView<IProduct> {
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
      value: "organizationName"
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

  itemClicked(product: IProduct) {
    this.$router.push(`/dashboard/${this.typeTextPlural.toLowerCase()}/details?id=${product.id}`);
  }

  deleteProduct(product: IProduct) {
    confirm({ icon: "mdi-delete", title: `Delete ${this.typeText}` }).then(async (result: boolean) => {
      if(result) {
        toast({ loading: true, message: `Deleting ${this.typeText.toLowerCase()}...` });
        const response = await this.productsClient.deleteProduct(product.id);
        toast(false);
        if(response.status == 200) {
          toast({ message: `${this.typeText} deleted`});
          this.search();
        }
        else toast({ message: response.errors!.summary });
      }
    });
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

  @Watch("type")
  onTypeChange() {
    this.items = [];
    this.search();
  }
}