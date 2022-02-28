<template>
  <v-app>
    <v-app-bar app flat color="white">
      <v-btn icon @click="$router.back()">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <span>Sign up as a Practitioner</span>
    </v-app-bar>
    <v-main>
      <v-container grid-list-xl>
        <img src="@/assets/images/logoAndName.svg" />
        <h1 class="display-2 mt-4">Become a Practitioner on Buymedix</h1>
        <h2 class="mt-5 mb-16 grey--text">
          Fill the form below with the necessary information
        </h2>
        <v-form
          ref="practitionerEditorForm"
          @submit.prevent="createPractitioner"
        >
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field
                label="Name"
                outlined
                v-model="name"
                :rules="[requiredRule]"
                :error-messages="errors.name"
              />
              <v-text-field
                label="Email"
                outlined
                prepend-inner-icon="mdi-email"
                v-model="email"
                type="email"
                :rules="[emailRule]"
                :error-messages="errors.email"
              />
              <v-textarea
                label="Description"
                outlined
                prepend-inner-icon="mdi-note-text"
                v-model="description"
                type="phone"
                :rules="[requiredRule]"
                :error-messages="errors.description"
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
                    :error-messages="errors.identificationPhoto"
                  />
                  <v-file-field
                    label="Verification Photo"
                    outlined
                    v-model="verificationPhoto"
                    :rules="[requiredRule]"
                    :error-messages="errors.verificationPhoto"
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
                :error-messages="errors.phoneNumber"
              />
              <v-file-field
                label="Profile Photo"
                outlined
                v-model="profilePhoto"
                :rules="[requiredRule]"
                v-if="!selectedPractitioner"
                :error-messages="errors.profilePhoto"
              />
              <v-password-field
                label="Password"
                outlined
                prepend-inner-icon="mdi-lock"
                v-model="password"
                :rules="[requiredLengthRule(6)]"
                v-if="!selectedPractitioner"
              />
            </v-flex>
            <v-flex xs12>
              <v-layout>
                <v-flex>
                  <v-select
                    label="Practitioner Type"
                    prepend-inner-icon="mdi-account"
                    :items="practitionerTypeOptions"
                    item-text="value"
                    item-value="key"
                    v-model="practitionerType"
                    :rules="[requiredRule]"
                    outlined
                  />
                  <v-textarea
                    label="Specialties"
                    outlined
                    prepend-inner-icon="mdi-note-text"
                    v-model="specialties"
                    type="phone"
                    :rules="[requiredRule]"
                    :error-messages="errors.specialties"
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
                    :error-messages="errors.yearsOfExperience"
                  />
                  <v-text-field
                    label="Company Name"
                    outlined
                    prepend-inner-icon="mdi-city"
                    v-model="companyName"
                    :rules="[requiredRule]"
                    :error-messages="errors.companyName"
                  />
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex xs12 sm6>
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
                    :loading="loadingCities"
                    @focus="getCities"
                    outlined
                  />
                  <v-btn
                    class="text-capitalize font-weight-bold"
                    color="primary"
                    rounded
                    elevation="0"
                    type="submit"
                    :loading="creatingPractitioner"
                  >
                    {{ selectedPractitioner != null ? "Edit" : "Create" }}
                    Practitioner
                  </v-btn>
                </v-flex>
                <v-flex xs12 sm6>
                  <div ref="mapElement" style="height: 400px"></div>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-form>
      </v-container>
    </v-main>
  </v-app>
</template>

<script src="./PractitionerSignUp.ts"></script>
 
<style>
</style>