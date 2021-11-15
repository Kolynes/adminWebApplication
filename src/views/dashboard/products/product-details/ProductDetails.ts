import ProductsEditorMixin from "@/mixins/ProductsEditorMixin";
import IProduct from "@/types/IProduct";
import { Component, Mixins, Prop } from "vue-property-decorator";
import FileGetter from "@/components/file-getter/FileGetter.vue";
import ProfilePhoto from "@/components/ProfilePhoto.vue";

@Component({
  components: {
    FileGetter,
    ProfilePhoto
  }
})
export default class ProductDetails extends Mixins(ProductsEditorMixin) {
  @Prop({
    type: Number,
    required: true
  })
  id!: number;

  loading = true;
  product: IProduct | null = null;

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

  mounted() {
    this.getProduct();
  }

}