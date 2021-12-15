 <template>
  <div>
    <table-view
      :title="typeTextPlural"
      :loading="loading"
      :searchString.sync="searchString"
      :items="items"
      :headers="headers"
      :itemClicked="itemClicked"
      :pages="pages"
      :numberOfPages="numberOfPages"
      :nextPage="nextPage"
      :previousPage="previousPage"
      :pageSize.sync="pageSize"
      :page.sync="page"
      @refresh="search"
    >
      <template #subtitle>
        <v-btn
          rounded
          color="primary"
          elevation="0"
          @click="toggleCreateProductDialog"
        >
          <v-icon>mdi-plus</v-icon>
          <span class="font-weight-bold text-capitalize ml-3">
            create {{ typeText }}
          </span>
        </v-btn>
      </template>
      <template #item:id="{ item }"> #{{ item.id }} </template>
      <template #item:vendor="{ item }">
        <router-link
          :to="`${organizationTypeRoute}/details?id=${item.organization.id}`"
        >
          {{ item.organization.name }}
        </router-link>
      </template>
      <template #item:name="{ item }">
        <v-avatar tile class="my-1 mr-1">
          <img :src="item.productImage" />
        </v-avatar>
        {{ item.name }}
      </template>

      <template #actions="{ item }">
        <v-list-item @click="deleteProduct(item)">
          <v-list-item-icon>
            <v-icon color="red"> mdi-delete </v-icon>
          </v-list-item-icon>
          <v-list-item-title> Delete </v-list-item-title>
        </v-list-item>
        <v-list-item @click="beginEditProduct(item)">
          <v-list-item-icon>
            <v-icon color="primary"> mdi-lead-pencil </v-icon>
          </v-list-item-icon>
          <v-list-item-title> Edit </v-list-item-title>
        </v-list-item>
      </template>

      <template #empty-state>
        <v-empty-state
          :title="`No ${typeTextPlural} Found`"
          icon="mdi-account"
        />
      </template>
    </table-view>
    <v-dialog v-model="createProductDialogVisible" persistent width="1000">
      <v-card v-if="createProductDialogVisible">
        <v-card-title>
          <span class="body-1" v-if="selectedProduct == null">
            Create New {{ typeText }}
          </span>
          <span class="body-1" v-else>Edit {{ typeText }}</span>
          <v-spacer />
          <v-btn icon @click="toggleCreateProductDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-xl>
            <v-form
              ref="createProductForm"
              @submit.prevent="
                selectedProduct == null ? createProduct() : editProduct()
              "
            >
              <v-layout>
                <v-flex xs6>
                  <v-text-field
                    label="Name"
                    outlined
                    v-model="name"
                    :rules="[requiredLengthRule(6)]"
                  />
                  <v-textarea
                    label="Description"
                    outlined
                    prepend-inner-icon="mdi-note-text"
                    v-model="description"
                    type="phone"
                    :rules="[requiredLengthRule(20, 150)]"
                  />
                  <v-layout>
                    <v-flex xs6>
                      <v-text-field
                        label="Price"
                        outlined
                        v-model="price"
                        type="number"
                        :rules="[requiredRule]"
                      >
                        <template #prepend-inner>
                          <span class="title">₦</span>
                        </template>
                      </v-text-field>
                    </v-flex>
                    <v-flex xs6>
                      <v-text-field
                        label="Quantity in stock"
                        outlined
                        prepend-inner-icon="mdi-package"
                        v-model="quantityInStock"
                        type="number"
                        :rules="[requiredRule]"
                      />
                    </v-flex>
                  </v-layout>
                  <v-select
                    label="Drug type"
                    prepend-inner-icon="mdi-hospital"
                    outlined
                    :items="drugTypeOptions"
                    v-model="drugType"
                    :rules="[requiredRule]"
                    v-if="type == 'DRUG'"
                  >
                    <template #item="{ item }">
                      <span>{{ drugTypeText(item) }}</span>
                    </template>
                    <template #selection="{ item }">
                      <span>{{ drugTypeText(item) }}</span>
                    </template>
                  </v-select>
                  <v-btn
                    class="text-capitalize font-weight-bold"
                    color="primary"
                    rounded
                    elevation="0"
                    type="submit"
                    :loading="creatingProduct"
                  >
                    {{ selectedProduct != null ? "Edit" : "Create" }}
                    {{ typeText }}
                  </v-btn>
                </v-flex>
                <v-flex xs6>
                  <v-file-field
                    outlined
                    label="Image"
                    v-model="image"
                    :rules="[requiredRule]"
                    v-if="!selectedProduct"
                  />
                  <v-textarea
                    label="dosage"
                    outlined
                    prepend-inner-icon="mdi-note-text"
                    v-model="dosage"
                    :rules="[requiredLengthRule(20, 150)]"
                    v-if="type == 'DRUG'"
                  />
                </v-flex>
              </v-layout>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
    <select-organization ref="selectOrganization" :type="typeOfOrganization" />
  </div>
</template>

<script src="./Products.ts"></script>

<style>
</style>