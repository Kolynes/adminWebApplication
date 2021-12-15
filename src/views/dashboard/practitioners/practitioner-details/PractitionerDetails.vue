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
        {{ practitioner.name }}
      </h1>
    </v-row>
    <v-layout>
      <v-flex>
        <div class="ml-4">
          <v-img :src="practitioner.profilePhoto" width="300" class="mb-5" />
          <p class="font-weight-bold caption mb-0">Email</p>
          <p class="body-1">{{ practitioner.email }}</p>
          <p class="font-weight-bold caption mb-0">Phone Number</p>
          <p class="body-1">{{ practitioner.phoneNumber }}</p>
          <p class="font-weight-bold caption mb-0">Address</p>
          <p class="body-1">{{ practitioner.address }}</p>
        </div>
      </v-flex>
      <v-flex xs12 sm6>
        <p>Actions:</p>
        <v-btn
          rounded
          text
          color="red white--text"
          elevation="0"
          class="font-weight-bold text-capitalize"
          @click="deletePractitioner(practitioner)"
        >
          <v-icon class="mr-2">mdi-delete</v-icon>
          Delete {{ typeText }}
        </v-btn>
        <p class="font-weight-bold caption mb-0 mt-5">Description</p>
        <p class="body-1">{{ practitioner.description }}</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script src="./PractitionerDetails.ts"></script>

<style>
</style>