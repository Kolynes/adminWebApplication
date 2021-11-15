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
        {{customer.firstName}} {{customer.lastName}} 
      </h1>
    </v-row>
    <v-layout>
      <v-flex>
        <div class="ml-4">
          <v-img :src="customer.profilePhoto" width="300" class="mb-5"/>
          <p class="font-weight-bold caption mb-0">Email</p>
          <p class="body-1">{{customer.email}}</p>
          <p class="font-weight-bold caption mb-0">Phone Number</p>
          <p class="body-1">{{customer.phoneNumber}}</p>
          <p class="font-weight-bold caption mb-0">Address</p>
          <p class="body-1">{{customer.address}}</p>
          <p class="font-weight-bold caption mb-0">Age</p>
          <p class="body-1">{{customer.age}}</p>
          <p class="font-weight-bold caption mb-0">Gender</p>
          <p class="body-1">{{customer.gender}}</p>
        </div>
      </v-flex>
      <v-flex xs12 sm6> 
        <p>Actions:</p>
        <v-btn
          rounded
          color="primary"
          elevation="0"
          class="font-weight-bold text-capitalize"
          @click="beginEditCustomer(customer)"
        >
          <v-icon class="mr-2">mdi-lead-pencil</v-icon>
          Edit Customer
        </v-btn>
        <v-btn
          rounded
          color="red white--text"
          elevation="0"
          class="font-weight-bold text-capitalize ml-3"
          @click="deleteCustomer(customer)"
        >
          <v-icon class="mr-2">mdi-delete</v-icon>
          Delete Customer
        </v-btn>
      </v-flex>
    </v-layout>
        <v-dialog v-model="createCustomerDialogVisible" persistent width="600">
      <v-card v-if="toggleCreateCustomerDialog">
        <v-card-title>
          <span class="body-1" v-if="selectedCustomer == null">Create New Customer</span>
          <span class="body-1" v-else>Edit Customer</span>
          <v-spacer/>
          <v-btn icon @click="toggleCreateCustomerDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-xl>
            <v-form ref="createCustomerForm" @submit.prevent="selectedCustomer == null? createCustomer() : editCustomer()">
              <v-layout>
                <v-flex>
                  <v-text-field 
                    label="First Name"
                    outlined
                    v-model="firstName"
                    :rules="[requiredLengthRule(2)]"
                  />
                </v-flex>
                <v-flex>
                  <v-text-field 
                    label="Last Name"
                    outlined
                    v-model="lastName"
                    :rules="[requiredLengthRule(2)]"
                  />
                </v-flex>
              </v-layout>
              <v-text-field 
                label="Email"
                outlined
                prepend-inner-icon="mdi-email"
                v-model="email"
                type="email"
                :rules="[emailRule]"
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
              <v-file-field
                label="Profile Photo"
                outlined
                v-model="profilePhoto"
                :rules="[requiredRule]"
              />
              <v-layout>
                <v-flex xs6>
                  <v-select 
                    label="Gender"
                    outlined
                    prepend-inner-icon="mdi-gender-male-female"
                    v-model="gender"
                    type="address"
                    :items="['Male', 'Female']"
                    :rules="[requiredRule]"
                  />
                </v-flex>
                <v-flex>
                  <v-text-field 
                    label="Age"
                    outlined
                    prepend-inner-icon="mdi-calendar"
                    v-model="age"
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
                v-if="!selectedCustomer"
              />
              <v-btn
                class="text-capitalize font-weight-bold"
                color="primary"
                rounded
                elevation="0"
                type="submit"
                :loading="creatingCustomer"
              >
                {{selectedCustomer != null? "Edit" : "Create"}} Customer
              </v-btn>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script src="./CustomerDetails.ts"></script>

<style>

</style>