<template>
  <v-dialog v-model="showDialog" persistent width="600" >
    <v-card v-if="showDialog">
      <v-card-title>
        <span class="body-1"> Select Ride </span>
        <v-spacer/>
        <v-btn icon @click="rideResolve(null)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card height="600" flat style="overflow-y: auto">
        <v-card-text>
          <v-layout class="mb-1">
            <v-spacer/>
            <v-text-field 
              outlined
              dense
              hide-details
              prepend-inner-icon="mdi-magnify"
              placeholder="Search by name or location"
              clearable
              :loading="searching"
              v-model="searchString"
            />
          </v-layout>
          <v-scroll-view 
            :loader="loadRides"
            :refresh.sync="refresh"
            baseComponent="v-list"
          >
            <template #default="{ item }">
              <v-list-item @click="rideResolve(item)" :disabled="item.assigned">
                <v-list-item-icon>
                  <v-avatar 
                    color="primary white--text" 
                    class="font-weight-bold"
                  >
                    {{item.name[0].toUpperCase()}}
                  </v-avatar>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{item.name}}</v-list-item-title>
                  <v-list-item-subtitle>
                    Brand: {{item.brand}}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    Model: {{item.model}}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    License Plate: {{item.licensePlate}}
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-chip
                  class="green lighten-5 green--text"
                  v-if="item.assigned"
                >
                  Assigned
                </v-chip>
              </v-list-item>
              <v-divider inset/>
            </template>
          </v-scroll-view>
        </v-card-text>
      </v-card>
    </v-card>
  </v-dialog>
</template>

<script src="./SelectRide.ts"></script>

<style>

</style>