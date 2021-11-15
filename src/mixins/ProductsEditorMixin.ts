import { IProductsClient } from "@/services/services";
import EProductTypes from "@/types/EProductTypes";
import EServices from "@/types/EServices";
import IProduct from "@/types/IProduct";
import IVForm from "@/types/IVForm";
import { emailRule, requiredLengthRule, requiredRule } from "@/utils/rules";
import { service } from "@/utils/services/ServiceProvider";
import { Vue, Component, Ref, Prop } from "vue-property-decorator";
import EDrugTypes from "@/types/EDrugTypes";
import { namespace } from "vuex-class";
import { ISelectOrganization } from "@/components/select-organization/SelectOrganization";
import { IFileGetter } from "@/components/file-getter/FileGetter";

const typeTextPlurals = {
  [EProductTypes.drug]: "Drugs",
  [EProductTypes.equipment]: "Equipment"
};

const typeTexts = {
  [EProductTypes.drug]: "Drug",
  [EProductTypes.equipment]: "Equipment"
};

const drugTypeTexts = {
  [EDrugTypes.otc]: "Over The Counter",
  [EDrugTypes.pom]: "Prescription Only Medication"
}

const organizationTypes = {
  [EProductTypes.drug]: "Pharmacy",
  [EProductTypes.equipment]: "OEM"
}

const organizationTypeRoutes = {
  [EProductTypes.drug]: "/dashboard/pharmacies",
  [EProductTypes.equipment]: "/dashboard/oems"
}

const AdminModule = namespace("AdminModule");

@Component
export default class ProductsEditorMixin extends Vue {
  @Prop({
    type: String,
    default: EProductTypes.drug
  })
  type!: EProductTypes;

  @service(EServices.products)
  productsClient!: IProductsClient;

  @AdminModule.Getter
  isSuperAdmin!: boolean;

  @Ref()
  fileGetter!: IFileGetter;

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

  get typeText(): string {
    return typeTexts[this.type];
  }

  get typeTextPlural(): string {
    return typeTextPlurals[this.type];
  }

  get organizationTypeRoute(): string {
    return organizationTypeRoutes[this.type];
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

  get typeOfOrganization(): string {
    return organizationTypes[this.type];
  }

  toggleCreateProductDialog() {
    this.createProductDialogVisible = !this.createProductDialogVisible;
    if (!this.createProductDialogVisible) {
      this.selectedProduct = null;
      this.createProductForm.reset();
    }
  }

  async beginEditProduct(product: IProduct) {
    this.selectedProduct = product.id;
    this.name = product.name;
    this.organizationId = product.organizationId;
    this.description = product.description;
    this.price = product.price;
    this.quantityInStock = product.quantityInStock;
    this.dosage = product.dosage;
    this.drugType = product.drugType;
    this.toggleCreateProductDialog();
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
        toast({ message: this.typeText + " updated" });
        this.toggleCreateProductDialog();
        this.selectedProduct = null
      }
      else toast({ message: response.errors!.summary });
    }
  }

  async createProduct() {
    if (this.createProductForm.validate()) {
      if (this.isSuperAdmin) {
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
        toast({ message: this.typeText + " created" });
        this.toggleCreateProductDialog()
        this.selectedProduct = null
      }
      else toast({ message: response.errors!.summary });
    }
  }

  async createProductForOrganization(): Promise<void> {
    if (this.createProductForm.validate()) {
      this.creatingProduct = true;
      const organization = await this.selectOrganization.getOrganization();
      const response = await this.productsClient.createProductForOrganization(
        organization.id,
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
        toast({ message: this.typeText + " created" });
        this.toggleCreateProductDialog()
        this.selectedProduct = null
      }
      else toast({ message: response.errors!.summary });
    }
  }
}
