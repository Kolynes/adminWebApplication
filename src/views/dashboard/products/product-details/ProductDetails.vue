<template>
  <v-skeleton-loader
    type="list-item-avatar, article@3, heading, list-item-avatar-three-line@3 "
    style="width: 600px"
    v-if="loading"
  />
  <v-container grid-list-xl v-else>
    <v-row class="mb-3 mx-1" align="center">
      <v-btn icon @click="$router.back()">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <h1 class="display-1 font-weight-bold primary--text ml-2 mr-3">
        {{ product.name }}
      </h1>
      <img
        src="../../../../assets/icons/pomIcon.svg"
        v-if="product.drugType == 'POM'"
      />
    </v-row>
    <v-layout>
      <v-flex>
        <div class="ml-4">
          <profile-photo :src="product.image" width="300" @click="changeProductImage(product.id)"/>
          <p class="font-weight-bold caption mb-0">{{ typeOfOrganization }}</p>
          <p class="body-1">
            <router-link :to="`${organizationTypeRoute}/details?id=${id}`">
              {{ product.organizationName }}
            </router-link>
          </p>
          <p class="font-weight-bold caption mb-0">Price</p>
          <p class="body-1">{{ product.price }}</p>
          <p class="font-weight-bold caption mb-0">Quantity in Stock</p>
          <p class="body-1">{{ product.quantityInStock }}</p>
          <p class="font-weight-bold caption mb-0">Description</p>
          <p class="body-1">{{ product.description }}</p>
        </div>
      </v-flex>
      <v-flex xs12 sm6>
        <p>Actions:</p>
        <v-btn
          rounded
          color="red white--text"
          elevation="0"
          class="font-weight-bold text-capitalize ml-3"
          @click="deleteProduct(product)"
        >
          <v-icon class="mr-2">mdi-delete</v-icon>
          Delete {{ typeText }}
        </v-btn>
        <v-btn
          rounded
          color="primary white--text"
          elevation="0"
          class="font-weight-bold text-capitalize ml-3"
          @click="beginEditProduct(product)"
        >
          <v-icon class="mr-2">mdi-lead-pencil</v-icon>
          Edit {{ typeText }}
        </v-btn>
      </v-flex>
    </v-layout>
    <v-dialog v-model="createProductDialogVisible" persistent width="1000">
      <v-card v-if="createProductDialogVisible">
        <v-card-title>
          <span class="body-1" v-if="selectedProduct == null">
            Edit New {{ typeText }}
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
    <file-getter ref="fileGetter"/>
  </v-container>
</template>

<script src="./ProductDetails.ts"></script>

<style>
</style>