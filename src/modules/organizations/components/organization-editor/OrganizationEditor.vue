<template>
  <v-dialog v-model="createOrganizationDialogVisible" persistent fullscreen>
    <v-card v-if="toggleCreateOrganizationDialog">
      <v-card-title>
        <span class="body-1" v-if="selectedOrganization == null">
          Create New {{ organizationTypeText }}
        </span>
        <span class="body-1" v-else>Edit {{ organizationTypeText }}</span>
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
                : editOrganization()
            "
          >
            <v-layout>
              <v-flex xs6>
                <v-text-field
                  label="Name"
                  outlined
                  v-model="name"
                  :rules="[requiredLengthRule(6)]"
                  :error-messages="errorFields.name"
                />
                <v-text-field
                  label="Email"
                  outlined
                  prepend-inner-icon="mdi-email"
                  v-model="email"
                  type="email"
                  :rules="[emailRule]"
                  :error-messages="errorFields.email"
                />
                <v-textarea
                  label="Description"
                  outlined
                  prepend-inner-icon="mdi-note-text"
                  v-model="description"
                  type="phone"
                  :rules="[requiredRule]"
                  :error-messages="errorFields.description"
                />
                <v-text-field
                  label="Phone Number"
                  outlined
                  prepend-inner-icon="mdi-phone"
                  v-model="phoneNumber"
                  type="phone"
                  :rules="[requiredLengthRule(10)]"
                  :error-messages="errorFields.phoneNumber"
                />
                <v-file-field
                  label="Profile Photo"
                  outlined
                  v-model="profilePhoto"
                  :rules="[requiredRule]"
                  v-if="!selectedOrganization"
                  :error-messages="errorFields.profilePhoto"
                />
                <v-password-field
                  label="Password"
                  outlined
                  prepend-inner-icon="mdi-lock"
                  v-model="password"
                  :rules="[requiredLengthRule(6)]"
                  v-if="!selectedOrganization"
                />
              </v-flex>
              <v-flex xs6>
                <v-autocomplete
                  label="Address"
                  outlined
                  prepend-inner-icon="mdi-map-marker"
                  v-model="prediction"
                  :items="predictions"
                  item-text="description"
                  :item-value="item => item"
                  no-filter
                  :search-input.sync="addressSearchString"
                  type="address"
                  :rules="[requiredLengthRule(2)]"
                  clearable
                  :hint="address"
                  persistent-hint
                >
                  <template #item="{ item }">
                    <span>{{item.description}}</span>
                  </template>
                  <template #selection="{ item }">
                    <span>{{item.description}}</span>
                  </template>
                </v-autocomplete>
                <v-select
                  label="City"
                  prepend-inner-icon="mdi-city"
                  :items="cities"
                  v-model="city"
                  :rules="[requiredRule]"
                  :loading="loading.getCities"
                  @focus="getCities"
                  outlined
                />
                <div ref="mapElement" style="height: 400px"></div>
              </v-flex>
            </v-layout>
            <v-btn
              class="text-capitalize font-weight-bold"
              color="primary"
              rounded
              elevation="0"
              type="submit"
              :loading="loading.createOrganization ||  loading.editOrganization"
            >
              {{ selectedOrganization != null ? "Edit" : "Create" }}
              {{ organizationTypeText }}
            </v-btn>
          </v-form>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script src="./OrganizationEditor.ts"></script>

<style>
</style>