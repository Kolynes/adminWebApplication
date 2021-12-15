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
      <v-flex>
        <div class="ml-4">
          <profile-photo :src="ride.photo" width="300" @click="changeRidePhoto(ride.id)"/>
          <p class="font-weight-bold caption mb-0">Brand</p>
          <p class="body-1">{{ ride.brand }}</p>
          <p class="font-weight-bold caption mb-0">Model</p>
          <p class="body-1">{{ ride.model }}</p>
          <p class="font-weight-bold caption mb-0">License Plate</p>
          <p class="body-1">{{ ride.licensePlate }}</p>
        </div>
      </v-flex>
      <v-flex xs12 sm6>
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
          @click="beginEditRide(ride)"
        >
          <v-icon class="mr-2">mdi-lead-pencil</v-icon>
          Edit Ride
        </v-btn>
      </v-flex>
    </v-layout>
    <v-dialog v-model="createRideDialogVisible" persistent width="600">
      <v-card v-if="createRideDialogVisible">
        <v-card-title>
          <span class="body-1" v-if="selectedRide == null">
            Create New Ride
          </span>
          <span class="body-1" v-else>Edit Ride</span>
          <v-spacer />
          <v-btn icon @click="toggleCreateRideDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-xl>
            <v-form
              ref="createRideForm"
              @submit.prevent="
                selectedRide == null ? createRide() : editRide()
              "
            >
              <v-text-field
                label="Name"
                outlined
                v-model="name"
                :rules="[requiredLengthRule(2)]"
              />
              <v-text-field
                label="Model"
                outlined
                v-model="model"
                :rules="[requiredRule]"
              />
              <v-text-field
                label="Brand"
                outlined
                v-model="brand"
                :rules="[requiredRule]"
              />
              <v-text-field
                label="License Plate"
                outlined
                v-model="licensePlate"
                :rules="[requiredRule]"
              />
              <v-file-field
                v-if="!selectedRide"
                label="Photo"
                outlined
                v-model="photo"
                :rules="[requiredRule]"
              />
              <v-btn
                class="text-capitalize font-weight-bold"
                color="primary"
                rounded
                elevation="0"
                type="submit"
                :loading="creatingRide"
              >
                {{ selectedRide != null ? "Edit" : "Create" }}
                Ride
              </v-btn>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
    <file-getter ref="fileGetter"/>
  </v-container>
</template>

<script src="./RideDetails.ts"></script>

<style>
</style>