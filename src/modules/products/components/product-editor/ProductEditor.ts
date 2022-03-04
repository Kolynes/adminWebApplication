import IVForm from "@/utils/types/IVForm";
import { emailRule, requiredLengthRule, requiredRule } from "@/utils/rules";
import { service } from "@/utils/services/ServiceProvider";
import { Vue, Component, Ref, Prop } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { EDrugTypes, EProductTypes, IProduct, IProductEditor, IProductsClient } from "@/modules/products/types";
import { EServices } from "@/types";
import { drugTypeTexts, productTypeTextPlurals, productTypeTexts } from "../../constants";
import { organizationTypeRoutes, organizationTypeTextsByProductType } from "@/modules/organizations/constants";
import { IOrganization, ISelectOrganization } from "@/modules/organizations/types";
import VFileField from "@/vuetify-extensions/VFileField.vue";
import SelectOrganization from "@/modules/organizations/components/select-organization/SelectOrganization";
import { EUserType, IAccount } from "@/modules/auth/types";

const AccountModule = namespace("AccountModule");
const OrganizationModule = namespace("OrganizationModule");

@Component({
  components: {
    VFileField,
    SelectOrganization
  }
})
export default class ProductEditor extends Vue implements IProductEditor {
  @Prop({
    type: String,
    default: EProductTypes.drug
  })
  type!: EProductTypes;

  @service(EServices.products)
  productsClient!: IProductsClient;

  @AccountModule.State
  account!: IAccount;

  @OrganizationModule.State
  organization!: IOrganization;

  createProductDialogVisible = false;
  name = "";
  organizationId: number | null = null;
  description = "";
  image: File | null = null;
  price = 0;
  quantityInStock = 0;
  dosage = ""
  drugType = EDrugTypes.otc;
  creatingProduct = false;
  selectedProduct: number | null = null;
  drugTypeOptions = [
    EDrugTypes.otc,
    EDrugTypes.pom,
  ];

  get productTypeText(): string {
    return productTypeTexts[this.type];
  }

  get productTypeTextPlural(): string {
    return productTypeTextPlurals[this.type];
  }

  get organizationTypeRoute(): string {
    return organizationTypeRoutes[this.type];
  }
  
  get typeOfOrganization(): string {
    return organizationTypeTextsByProductType[this.type];
  }
  
  drugTypeText(drugType: EDrugTypes): string {
    return drugTypeTexts[drugType];
  }

  @Ref()
  createProductForm!: IVForm;

  @Ref()
  mapElement!: HTMLElement;

  @Ref()
  selectOrganization!: ISelectOrganization;

  emailRule = emailRule;
  requiredLengthRule = requiredLengthRule;
  requiredRule = requiredRule;

  toggleCreateProductDialog(organizationId?: number) {
    this.createProductDialogVisible = !this.createProductDialogVisible;
    this.organizationId = organizationId || null;
    if (!this.createProductDialogVisible) {
      this.selectedProduct = null;
      this.organizationId = null;
      this.createProductForm.reset();
    }
  }

  async beginEditProduct(product: IProduct) {
    this.selectedProduct = product.id;
    this.name = product.name;
    this.organizationId = product.organization.id;
    this.description = product.description;
    this.price = product.price;
    this.quantityInStock = product.quantityInStock;
    this.dosage = product.dosage;
    this.drugType = product.drugType;
    this.toggleCreateProductDialog();
  }

  async editProduct() {
    if (this.createProductForm.validate()) {
      this.creatingProduct = true;
      const response = await this.productsClient.updateProduct(
        this.selectedProduct!,
        this.name,
        this.description,
        this.price,
        this.quantityInStock,
        this.dosage,
        this.drugType,
        this.type
      );
      this.creatingProduct = false;
      if (response.status == 200) {
        toast({ message: this.productTypeText + " updated" });
        this.$emit("saved");
        this.toggleCreateProductDialog();
        this.selectedProduct = null
      }
      else toast({ message: response.errors!.summary });
    }
  }

  async createProduct() {
    if (this.createProductForm.validate()) {
      if (this.account.userType == EUserType.admin) {
        this.createProductForOrganization();
        return;
      }
      this.creatingProduct = true;
      const response = await this.productsClient.createProduct(
        this.name,
        this.description,
        this.image!,
        this.price,
        this.quantityInStock,
        this.dosage,
        this.drugType,
        this.type,
      );
      this.creatingProduct = false;
      if (response.status == 201 || response.status == 200) {
        toast({ message: this.productTypeText + " created" });
        this.$emit("saved");
        this.toggleCreateProductDialog()
        this.selectedProduct = null
      }
      else toast({ message: response.errors!.summary });
    }
  }

  async createProductForOrganization(): Promise<void> {
    if (this.createProductForm.validate()) {
      this.creatingProduct = true;
      if(!this.organizationId)
        this.organizationId = (await this.selectOrganization.getOrganization()).id;
      const response = await this.productsClient.createProductForOrganization(
        this.organizationId,
        this.name,
        this.description,
        this.image!,
        this.price,
        this.quantityInStock,
        this.dosage,
        this.drugType,
        this.type,
      );
      this.creatingProduct = false;
      if (response.status == 201 || response.status == 200) {
        toast({ message: this.productTypeText + " created" });
        this.$emit("saved");
        this.toggleCreateProductDialog()
        this.selectedProduct = null
      }
      else toast({ message: response.errors!.summary });
    }
  }
}
