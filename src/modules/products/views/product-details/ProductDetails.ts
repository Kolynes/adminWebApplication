import { Component, Vue, Prop, Ref } from "vue-property-decorator";
import FileGetter from "@/components/file-getter/FileGetter.vue";
import ProfilePhoto from "@/components/ProfilePhoto.vue";
import { EDrugTypes, EProductTypes, IProduct, IProductEditor, IProductsClient } from "../../types";
import { service } from "@/utils/services/ServiceProvider";
import { EServices } from "@/types";
import ProductEditor from "../../components/product-editor/ProductEditor";
import { IFileGetter } from "@/components/file-getter/FileGetter";
import { drugTypeTexts, productTypeTextPlurals, productTypeTexts } from "../../constants";
import { organizationTypeRoutes, organizationTypeTextsByProductType } from "@/modules/organizations/constants";

@Component({
  components: {
    FileGetter,
    ProfilePhoto,
    ProductEditor
  }
})
export default class ProductDetails extends Vue {
  @Prop({
    type: Number,
    required: true
  })
  id!: number;

  loading = true;
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

  async getProduct() {
    const response = await this.productsClient.getProduct(this.id);
    this.loading = false;
    if(response.status == 200) {
      this.product = response.data;
    }
    else toast({ message: `${this.typeTextPlural} not found` });
  }

  deleteProduct(product: IProduct) {
    confirm({ icon: "mdi-delete", title: `Delete ${this.typeText}` }).then(async (result: boolean) => {
      if(result) {
        toast({ loading: true, message: `Deleting ${this.typeText.toLowerCase()}...` });
        const response = await this.productsClient.deleteProduct(product.id);
        toast(false);
        if(response.status == 200) {
          toast({ message: `${this.typeText} deleted`});
          this.$router.back();
        }
        else toast({ message: response.errors!.summary });
      }
    });
  }

  async changeProductImage(id: number) {
    const file = await this.fileGetter.getFile("image/*", 1 * 1024 * 1024);
    if(file !== null) {
      toast({ loading: true, message: "Changing product image..."})
      const response = await this.productsClient.changeProductImage(id, file);
      if(response.status == 200)
        toast({ message: "Product image changed" });
      else toast({ message: "Failed to change product image" });
    }
  }

  mounted() {
    this.getProduct();
  }

}