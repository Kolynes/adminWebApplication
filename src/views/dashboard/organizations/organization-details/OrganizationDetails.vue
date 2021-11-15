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
        {{ organization.name }}
      </h1>
    </v-row>
    <v-layout>
      <v-flex>
        <div class="ml-4">
          <profile-photo
            :src="organization.profilePhoto"
            width="300"
            @click="changeProfilePhoto(organization.id)"
            class="mb-4"
          />
          <p class="font-weight-bold caption mb-0">Email</p>
          <p class="body-1">{{ organization.email }}</p>
          <p class="font-weight-bold caption mb-0">Phone Number</p>
          <p class="body-1">{{ organization.phoneNumber }}</p>
          <p class="font-weight-bold caption mb-0">Address</p>
          <p class="body-1">{{ organization.address }}</p>
          <p class="font-weight-bold caption mb-0">Descritpion</p>
          <p class="body-1">{{ organization.description }}</p>
        </div>
      </v-flex>
      <v-flex xs12 sm6>
        <p>Actions:</p>
        <v-btn
          rounded
          color="primary"
          elevation="0"
          class="font-weight-bold text-capitalize"
          @click="beginEditOrganization(organization)"
        >
          <v-icon class="mr-2">mdi-lead-pencil</v-icon>
          Edit Pharmacy
        </v-btn>
        <v-btn
          rounded
          color="red white--text"
          elevation="0"
          class="font-weight-bold text-capitalize ml-3"
          @click="deletePharmacy(organization)"
        >
          <v-icon class="mr-2">mdi-delete</v-icon>
          Delete Pharmacy
        </v-btn>
        <v-btn
          rounded
          color="primary white--text"
          elevation="0"
          class="font-weight-bold text-capitalize ml-3"
          :to="`/dashboard/pharmacies/products?organizationId=${organization.id}`"
        >
          View Products
        </v-btn>
        <v-divider class="my-5" />
        <br />
        <p class="subheading mt-5">
          <v-icon>mdi-map</v-icon>
          Location
        </p>
        <div ref="locationMapElement" style="height: 400px; margin-top: 10px" />
      </v-flex>
    </v-layout>
    <v-dialog v-model="createOrganizationDialogVisible" persistent fullscreen>
      <v-card v-if="toggleCreateOrganizationDialog">
        <v-card-title>
          <span class="body-1" v-if="selectedOrganization == null">
            Create New Pharmacy
          </span>
          <span class="body-1" v-else>Edit Pharmacy</span>
          <v-spacer />
          <v-btn icon @click="toggleCreateOrganizationDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-xl>
            <v-form
              ref="createOrganizationForm"
              @submit.prevent="
                selectedOrganization == null
                  ? createOrganization()
                  : callEditOrganization()
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
                  <v-text-field
                    label="Email"
                    outlined
                    prepend-inner-icon="mdi-email"
                    v-model="email"
                    type="email"
                    :rules="[emailRule]"
                  />
                  <v-textarea
                    label="Description"
                    outlined
                    prepend-inner-icon="mdi-note-text"
                    v-model="description"
                    type="phone"
                    :rules="[requiredLengthRule(50, 150)]"
                  />
                  <v-text-field
                    label="Phone Number"
                    outlined
                    prepend-inner-icon="mdi-phone"
                    v-model="phoneNumber"
                    type="phone"
                    :rules="[requiredLengthRule(10)]"
                  />
                  <v-text-field
                    label="Address"
                    outlined
                    prepend-inner-icon="mdi-map-marker"
                    v-model="address"
                    type="address"
                    :rules="[requiredLengthRule(2)]"
                  />

                  <v-password-field
                    label="Password"
                    outlined
                    prepend-inner-icon="mdi-lock"
                    v-model="password"
                    :rules="[requiredLengthRule(6)]"
                    v-if="!selectedOrganization"
                  />
                  <v-btn
                    class="text-capitalize font-weight-bold"
                    color="primary"
                    rounded
                    elevation="0"
                    type="submit"
                    :loading="creatingOrganization"
                  >
                    {{ selectedOrganization != null ? "Edit" : "Create" }}
                    Pharmacy
                  </v-btn>
                </v-flex>
                <v-flex xs6>
                  <v-file-field
                    label="Profile Photo"
                    outlined
                    v-model="profilePhoto"
                    :rules="[requiredRule]"
                    v-if="!selectedOrganization"
                  />
                  <p class="title">
                    <v-icon>mdi-map</v-icon>
                    Select location on map
                  </p>
                  <v-layout>
                    <v-flex xs6>
                      <v-text-field
                        label="latitude"
                        outlined
                        readonly
                        v-model="latitude"
                        type="address"
                        :rules="[requiredRule]"
                      />
                    </v-flex>
                    <v-flex xs6>
                      <v-text-field
                        label="longitude"
                        outlined
                        readonly
                        v-model="longitude"
                        type="address"
                        :rules="[requiredRule]"
                      />
                    </v-flex>
                  </v-layout>
                  <div ref="mapElement" style="height: 400px"></div>
                </v-flex>
              </v-layout>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
    <file-getter ref="fileGetter" />
  </v-container>
</template>

<script src="./OrganizationDetails.ts"></script>

<style>
</style>