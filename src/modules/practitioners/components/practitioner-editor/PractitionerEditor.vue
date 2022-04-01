<template>
  <v-dialog v-model="dialogVisible" persistent fullscreen>
    <v-card>
      <v-card-title>
        <span v-if="!selectedPractitioner">Create {{ typeText }}</span>
        <span v-else>Edit {{ typeText }}</span>
        <v-spacer />
        <v-btn icon @click="toggleCreatePractitionerDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-xl>
          <v-form
            ref="practitionerEditorForm"
            @submit.prevent="
              selectedPractitioner ? updatePractitioner() : createPractitioner()
            "
          >
            <v-layout>
              <v-flex xs6>
                <v-text-field
                  label="Name"
                  outlined
                  v-model="name"
                  :rules="[requiredRule]"
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
                <v-layout v-if="!selectedPractitioner">
                  <v-flex xs4>
                    <v-select
                      label="Identification Type"
                      :items="identificationTypeOptions"
                      item-value="key"
                      item-text="value"
                      :rules="[requiredRule]"
                      v-model="identificationType"
                      outlined
                    />
                    <v-select
                      label="Verification Type"
                      :items="verificationTypeOptions"
                      item-value="key"
                      item-text="value"
                      outlined
                      :rules="[requiredRule]"
                      v-model="verificationType"
                    />
                  </v-flex>
                  <v-flex xs8>
                    <v-file-field
                      label="Identification Photo"
                      outlined
                      v-model="identificationPhoto"
                      :rules="[requiredRule]"
                      :error-messages="errorFields.identificationPhoto"
                    />
                    <v-file-field
                      label="Verification Photo"
                      outlined
                      v-model="verificationPhoto"
                      :rules="[requiredRule]"
                      :error-messages="errorFields.verificationPhoto"
                    />
                  </v-flex>
                </v-layout>
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
                  v-if="!selectedPractitioner"
                  :error-messages="errorFields.profilePhoto"
                />
                <v-password-field
                  label="Password"
                  outlined
                  prepend-inner-icon="mdi-lock"
                  v-model="password"
                  :rules="[requiredLengthRule(6)]"
                  v-if="!selectedPractitioner"
                />
                <v-btn
                  class="text-capitalize font-weight-bold"
                  color="primary"
                  rounded
                  elevation="0"
                  type="submit"
                  :loading="
                    loading.createPractitioner || loading.updatePractitioner
                  "
                >
                  {{ selectedPractitioner != null ? "Edit" : "Create" }}
                  {{ typeText }}
                </v-btn>
              </v-flex>
              <v-flex xs6>
                <v-layout>
                  <v-flex>
                    <v-textarea
                      label="Specialties"
                      outlined
                      prepend-inner-icon="mdi-note-text"
                      v-model="specialties"
                      type="phone"
                      :rules="[requiredRule]"
                      :error-messages="errorFields.specialties"
                    />
                  </v-flex>
                  <v-flex>
                    <v-text-field
                      label="Years Of Experience"
                      outlined
                      prepend-inner-icon="mdi-clock"
                      v-model="yearsOfExperience"
                      type="number"
                      :rules="[requiredRule]"
                      :error-messages="errorFields.yearsOfExperience"
                    />
                    <v-text-field
                      label="Company Name"
                      outlined
                      prepend-inner-icon="mdi-city"
                      v-model="companyName"
                      :rules="[requiredRule]"
                      :error-messages="errorFields.companyName"
                    />
                  </v-flex>
                </v-layout>
                <v-autocomplete
                  label="Address"
                  outlined
                  prepend-inner-icon="mdi-map-marker"
                  v-model="prediction"
                  :items="predictions"
                  item-text="description"
                  :item-value="(item) => item"
                  no-filter
                  :search-input.sync="addressSearchString"
                  type="address"
                  :rules="[requiredLengthRule(2)]"
                  clearable
                  :hint="address"
                  persistent-hint
                >
                  <template #item="{ item }">
                    <span>{{ item.description }}</span>
                  </template>
                  <template #selection="{ item }">
                    <span>{{ item.description }}</span>
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
          </v-form>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script src="./PractitionerEditor.ts"></script>

<style>
</style>