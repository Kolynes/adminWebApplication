<template>
  <v-dialog v-model="createProductDialogVisible" persistent width="1000">
    <v-card v-if="createProductDialogVisible">
      <v-card-title>
        <span class="body-1" v-if="selectedProduct == null">
          Create New {{ productTypeText }}
        </span>
        <span class="body-1" v-else>Edit {{ productTypeText }}</span>
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
                  :rules="[requiredLengthRule(0, 500)]"
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
                  {{ productTypeText }}
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
                  label="Dosage"
                  outlined
                  prepend-inner-icon="mdi-note-text"
                  v-model="dosage"
                  :rules="[requiredLengthRule(0, 500)]"
                  v-if="type == 'DRUG'"
                />
              </v-flex>
            </v-layout>
          </v-form>
        </v-container>
      </v-card-text>
    </v-card>
    <select-organization ref="selectOrganization" :type="typeOfOrganization.toUpperCase()" />
  </v-dialog>
</template>

<script src="./ProductEditor.ts"></script>

<style>
</style>