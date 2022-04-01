<template>
  <v-skeleton-loader
    type="list-item-avatar, article@3, heading, list-item-avatar-three-line@3 "
    style="width: 600px"
    v-if="loading.gt"
  />
  <v-container grid-list-xl v-else>
    <v-row class="mb-3 mx-1" align="center">
      <v-btn icon @click="$router.back()">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <h1 class="display-1 font-weight-bold primary--text ml-2 mr-3">
        {{ organization.name }}
      </h1>
    </v-row>
    <v-layout>
      <v-flex xs12 sm6>
        <v-card style="overflow: hidden">
          <v-layout>
            <profile-photo
              :src="organization.profilePhoto"
              width="300"
              @click="changeProfilePhoto(organization.id)"
            />
            <v-flex>
              <v-card-text>
                <p class="font-weight-bold caption mb-0">Email</p>
                <p class="body-1">{{ organization.email }}</p>
                <p class="font-weight-bold caption mb-0">Phone Number</p>
                <p class="body-1">{{ organization.phoneNumber }}</p>
                <p class="font-weight-bold caption mb-0">Address</p>
                <p class="body-1">{{ organization.location.address }}</p>
              </v-card-text>
            </v-flex>
          </v-layout>
          <v-card-text>
            <p class="font-weight-bold caption mb-0">Description</p>
            <p class="body-1">{{ organization.description }}</p>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6>
        <v-card>
          <v-card-text>
            <p>Actions:</p>
            <v-btn
              rounded
              text
              color="primary"
              elevation="0"
              class="font-weight-bold text-capitalize mb-2"
              @click="organizationEditor.beginEditOrganization(organization)"
            >
              <v-icon class="mr-2">mdi-lead-pencil</v-icon>
              Edit Pharmacy
            </v-btn>
            <br />
            <v-btn
              rounded
              text
              color="red white--text"
              elevation="0"
              class="font-weight-bold text-capitalize mb-2"
              @click="deletePharmacy(organization)"
            >
              <v-icon class="mr-2">mdi-delete</v-icon>
              Delete Pharmacy
            </v-btn>
            <br />
            <v-btn
              rounded
              text
              color="primary white--text"
              elevation="0"
              class="font-weight-bold text-capitalize mb-2"
              :to="`/dashboard/pharmacies/products?organizationId=${organization.id}`"
            >
              <v-icon class="mr-2">mdi-cart</v-icon>
              View Products
            </v-btn>
          </v-card-text>
        </v-card>
        <v-card class="mt-5">
          <v-card-text class="pb-0">
            <p class="subheading">
              <v-icon>mdi-map</v-icon>
              Location
            </p>
          </v-card-text>
          <div
            ref="locationMapElement"
            style="height: 400px;"
          />
        </v-card>
      </v-flex>
    </v-layout>
    <organization-editor ref="organizationEditor" @saved="getOrganization" :type="organization.organizationType"/>
    <file-getter ref="fileGetter" />
  </v-container>
</template>

<script src="./OrganizationDetails.ts"></script>

<style>
</style>