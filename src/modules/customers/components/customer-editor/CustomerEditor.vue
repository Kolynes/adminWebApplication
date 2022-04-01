<template>
  <v-dialog v-model="createCustomerDialogVisible" persistent :width="!selectedCustomer? 900 : 600">
    <v-card>
      <v-card-title>
        <span class="body-1" v-if="selectedCustomer == null">
          Create New Customer
        </span>
        <span class="body-1" v-else>Edit Customer</span>
        <v-spacer />
        <v-btn icon @click="toggleCreateCustomerDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-xl>
          <v-form
            ref="createCustomerForm"
            @submit.prevent="
              selectedCustomer == null ? createCustomer() : editCustomer()
            "
          >
            <v-layout>
              <v-flex :xs6="!selectedCustomer" :xs12="!selectedCustomer">
                <v-layout>
                  <v-flex class="pb-0">
                    <v-text-field
                      label="First Name"
                      outlined
                      v-model="firstName"
                      :error-messages="errorFields.firstName"
                      :rules="[requiredLengthRule(2)]"
                    />
                  </v-flex>
                  <v-flex class="pb-0">
                    <v-text-field
                      label="Last Name"
                      outlined
                      v-model="lastName"
                      :error-messages="errorFields.lastName"
                      :rules="[requiredLengthRule(2)]"
                    />
                  </v-flex>
                </v-layout>
                <v-text-field
                  label="Email"
                  outlined
                  prepend-inner-icon="mdi-email"
                  v-model="email"
                  :error-messages="errorFields.email"
                  type="email"
                  v-if="!selectedCustomer"
                  :rules="[emailRule]"
                />
                <v-text-field
                  label="Phone Number"
                  outlined
                  prepend-inner-icon="mdi-phone"
                  v-model="phoneNumber"
                  :error-messages="errorFields.phoneNumber"
                  type="phone"
                  :rules="[requiredLengthRule(10)]"
                />
                <v-text-field
                  label="Address"
                  outlined
                  prepend-inner-icon="mdi-map-marker"
                  v-model="address"
                  :error-messages="errorFields.address"
                  v-if="!selectedCustomer"
                  type="address"
                  :rules="[requiredLengthRule(2)]"
                />
              </v-flex>
              <v-flex xs6 v-if="!selectedCustomer">
                <v-text-field
                  label="City"
                  outlined
                  prepend-inner-icon="mdi-city"
                  v-model="city"
                  :error-messages="errorFields.city"
                  type="city"
                />
                <v-text-field
                  label="State"
                  outlined
                  prepend-inner-icon="mdi-map"
                  v-model="state"
                  :error-messages="errorFields.state"
                  type="address"
                />
                <v-layout>
                  <v-flex xs6 class="py-0">
                    <v-select
                      label="Gender"
                      outlined
                      prepend-inner-icon="mdi-gender-male-female"
                      v-model="gender"
                      :error-messages="errorFields.gender"
                      type="address"
                      :items="['Male', 'Female']"
                      :rules="[requiredRule]"
                    />
                  </v-flex>
                  <v-flex class="py-0">
                    <v-text-field
                      label="Age"
                      outlined
                      prepend-inner-icon="mdi-calendar"
                      v-model="age"
                      :error-messages="errorFields.age"
                      type="number"
                      :rules="[requiredRule]"
                    />
                  </v-flex>
                </v-layout>
                <v-password-field
                  label="Password"
                  outlined
                  prepend-inner-icon="mdi-lock"
                  v-model="password"
                  :rules="[requiredLengthRule(6)]"
                />
              </v-flex>
            </v-layout>
            <v-btn
              class="text-capitalize font-weight-bold"
              color="primary"
              rounded
              elevation="0"
              type="submit"
              :loading="loading.createCustomer || loading.editCustomer"
            >
              {{ selectedCustomer != null ? "Edit" : "Create" }} Customer
            </v-btn>
          </v-form>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script src="./CustomerEditor.ts"></script>

<style>
</style>