<template>
  <div>
    <table-view
      title="Customers"
      :loading="loading"
      :searchString.sync="searchString"
      :items="items"
      :headers="headers"
      :itemClicked="itemClicked"
      :pages="pages"
      :numberOfPages="numberOfPages"
      :nextPage="nextPage"
      :previousPage="previousPage"
      :pageSize.sync="pageSize"
      :page.sync="page"
      @refresh="search"
    >
      <template #subtitle>
        <v-btn
          class="text-capitalize font-weight-bold"
          color="primary"
          rounded
          elevation="0"
          @click="toggleCreateCustomerDialog"
        >
          <v-icon class="mr-2">mdi-account-plus</v-icon>
          Create Customer
        </v-btn>
      </template>

      <template #item:id="{ item }"> #{{ item.id }} </template>

      <template #actions="{ item }">
        <v-list-item @click="deleteCustomer(item)">
          <v-list-item-icon>
            <v-icon color="red"> mdi-delete </v-icon>
          </v-list-item-icon>
          <v-list-item-title> Delete </v-list-item-title>
        </v-list-item>
        <v-list-item @click="beginEditCustomer(item)">
          <v-list-item-icon>
            <v-icon color="primary">mdi-lead-pencil</v-icon>
          </v-list-item-icon>
          <v-list-item-title> Edit </v-list-item-title>
        </v-list-item>
      </template>

      <template #empty-state>
        <v-empty-state title="No Customers Found" icon="mdi-account" />
      </template>
    </table-view>
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
  </div>
</template>

<script src="./Customers.ts"></script>