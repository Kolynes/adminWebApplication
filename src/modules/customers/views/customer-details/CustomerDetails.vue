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
      <v-flex xs7>
        <v-card>
          <v-layout>
            <v-avatar size="250">
              <v-img :src="customer.profilePhoto" width="250" v-if="customer.profilePicture"/>
              <v-icon size="250" v-else>mdi-account</v-icon>
            </v-avatar>
            <v-card-text>
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
            </v-card-text>
          </v-layout>
        </v-card>
      </v-flex>
      <v-flex xs5> 
        <v-card>
          <v-card-text>
            <p>Actions:</p>
            <v-btn
              rounded
              text
              color="primary"
              elevation="0"
              class="font-weight-bold text-capitalize mb-2"
              @click="customerEditor.beginEditCustomer(customer)"
            >
              <v-icon class="mr-2">mdi-lead-pencil</v-icon>
              Edit Customer
            </v-btn>
            <br>
            <v-btn
              rounded
              text
              color="red white--text"
              elevation="0"
              class="font-weight-bold text-capitalize"
              @click="deleteCustomer(customer)"
            >
              <v-icon class="mr-2">mdi-delete</v-icon>
              Delete Customer
            </v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <customer-editor ref="customerEditor" @saved="getCustomer" />
  </v-container>
</template>

<script src="./CustomerDetails.ts"></script>

<style>

</style>