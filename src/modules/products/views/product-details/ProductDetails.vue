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
        <v-card class="ml-4" style="overflow: hidden">
          <v-layout>
            <profile-photo
              :src="product.productImage"
              width="300"
              @click="changeProductImage(product.id)"
            />
             <v-flex>
              
              <p class="font-weight-bold caption mb-0 mt-5">
                {{ typeOfOrganization }}
              </p>
              <p class="body-1">
                <router-link
                  :to="`${organizationTypeRoute}/details?id=${product.organization.id}`"
                >
                  {{ product.organization.name }}
                </router-link>
              </p>
              <p class="font-weight-bold caption mb-0">Price</p>
              <p class="display-1">{{ parseInt(product.price).toLocaleString() }}</p>
              <p class="font-weight-bold caption mb-0">Quantity in Stock</p>
              <p class="display-1">{{ parseInt(product.quantityInStock).toLocaleString() }}</p>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6>
        <v-card>
          <v-card-text>
            <p class="mb-2">Actions:</p>
            <v-btn
              rounded
              text
              color="red white--text"
              elevation="0"
              class="font-weight-bold text-capitalize mb-1"
              @click="deleteProduct(product)"
            >
              <v-icon class="mr-2">mdi-delete</v-icon>
              Delete {{ typeText }}
            </v-btn>
            <br />
            <v-btn
              rounded
              text
              color="primary white--text"
              elevation="0"
              class="font-weight-bold text-capitalize"
              @click="productEditor.beginEditProduct(product)"
            >
              <v-icon class="mr-2">mdi-lead-pencil</v-icon>
              Edit {{ typeText }}
            </v-btn>
          </v-card-text>
        </v-card>
        <v-card class="mt-5">
          <v-card-text>
            <p class="font-weight-bold caption">Description</p>
            <p class="body-1">{{ product.description }}</p><br>
            <template v-if="product.dosage">
              <p class="font-weight-bold caption">Dosage</p>
              <p class="body-1">{{ product.dosage }}</p>
            </template>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <product-editor ref="productEditor" @saved="getProduct" />
    <file-getter ref="fileGetter" />
  </v-container>
</template>

<script src="./ProductDetails.ts"></script>

<style>
</style>