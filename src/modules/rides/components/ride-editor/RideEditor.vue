<template>
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
            @submit.prevent="selectedRide == null ? createRide() : editRide()"
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
              :loading="loading.createRide || loading.editRide"
            >
              {{ selectedRide != null ? "Edit" : "Create" }}
              Ride
            </v-btn>
          </v-form>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script src="./RideEditor.ts"></script>

<style>
</style>