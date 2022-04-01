import { Component, Prop, Ref, Mixins, Watch } from "vue-property-decorator";
import FileGetter from "@/components/file-getter/FileGetter.vue";
import ProfilePhoto from "@/components/ProfilePhoto.vue";
import { EDrugTypes, IProduct, IProductEditor, IProductsClient } from "../../types";
import { service } from "@/utils/services/ServiceProvider";
import { EServices } from "@/types";
import ProductEditor from "../../components/product-editor/ProductEditor";
import { IFileGetter } from "@/components/file-getter/FileGetter";
import { drugTypeTexts, productTypeTextPlurals, productTypeTexts } from "../../constants";
import { organizationTypeRoutes, organizationTypeTextsByProductType } from "@/modules/organizations/constants";
import NetworkManagerMixin, { throwsNetworkError } from "@/utils/http/NetworkManagerMixin";
import IIndexable from "@/utils/types/IIndexable";

@Component({
  components: {
    FileGetter,
    ProfilePhoto,
    ProductEditor
  }
})
export default class ProductDetails extends Mixins(NetworkManagerMixin) {
  @Prop({
    type: Number,
    required: true
  })
  id!: number;

  loading: IIndexable<boolean> = {
    getProduct: true
  };

  product: IProduct | null = null;

  @Ref()
  fileGetter!: IFileGetter;

  @Ref()
  productEditor!: IProductEditor;

  @service(EServices.products)
  productsClient!: IProductsClient;

  get typeText(): string {
    return productTypeTexts[this.product!.productType];
  }

  get typeTextPlural(): string {
    return productTypeTextPlurals[this.product!.productType];
  }

  get organizationTypeRoute(): string {
    return organizationTypeRoutes[this.product!.productType];
  }

  get typeOfOrganization() {
    return organizationTypeTextsByProductType[this.product!.productType]
  }

  drugTypeText(drugType: EDrugTypes): string {
    return drugTypeTexts[drugType];
  }

  @throwsNetworkError()
  async getProduct() {
    const response = await this.productsClient.getProduct(this.id);
    this.product = response.data;
  }

  @throwsNetworkError()
  async deleteProduct(product: IProduct) {
    const result = await confirm({ icon: "mdi-delete", title: `Delete ${this.typeText}` });
    if (!result) return;
    toast({ loading: true, message: `Deleting ${this.typeText.toLowerCase()}...` });
    await this.productsClient.deleteProduct(product.id);
    toast(false);
    toast({ icon: "mdi-check", iconColor: "green", message: `${this.typeText} deleted` });
    this.$router.back();
  }

  @throwsNetworkError()
  async changeProductImage(id: number) {
    const file = await this.fileGetter.getFile("image/*", 1 * 1024 * 1024);
    if (!file) return;
    toast({ loading: true, message: "Changing product image..." })
    await this.productsClient.changeProductImage(id, file);
    toast({ icon: "mdi-check", iconColor: "green", message: "Product image changed" });
  }

  @Watch("error.getProduct")
  @Watch("error.deleteProduct")
  @Watch("error.changeProductImage")
  onError(message: string) {
    if(message) toast({ icon: "mdi-exclamation-thick", iconColor: "red", message });
  }

  mounted() {
    this.getProduct();
  }
}