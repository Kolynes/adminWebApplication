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
        {{ ride.name }}
      </h1>
    </v-row>
    <v-layout>
      <v-flex xs7>
        <v-card style="overflow: hidden">
          <v-layout align-center>
            <profile-photo :src="ride.photo" empty-state-icon="mdi-motorbike" width="300" @click="changeRidePhoto(ride.id)"/>
            <v-card-text>
              <p class="font-weight-bold caption mb-0">Brand</p>
              <p class="body-1">{{ ride.brand }}</p>
              <p class="font-weight-bold caption mb-0">Model</p>
              <p class="body-1">{{ ride.model }}</p>
              <p class="font-weight-bold caption mb-0">License Plate</p>
              <p class="body-1">{{ ride.licensePlate }}</p>
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
              color="red white--text"
              elevation="0"
              class="font-weight-bold text-capitalize mb-2"
              @click="deleteRide(ride)"
            >
              <v-icon class="mr-2">mdi-delete</v-icon>
              Delete Ride
            </v-btn>
            <br>
            <v-btn
              rounded
              text
              color="primary white--text"
              elevation="0"
              class="font-weight-bold text-capitalize"
              @click="rideEditor.beginEditRide(ride)"
            >
              <v-icon class="mr-2">mdi-lead-pencil</v-icon>
              Edit Ride
            </v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <ride-editor ref="rideEditor" @saved="getRide" />
    <file-getter ref="fileGetter"/>
  </v-container>
</template>

<script src="./RideDetails.ts"></script>

<style>
</style>