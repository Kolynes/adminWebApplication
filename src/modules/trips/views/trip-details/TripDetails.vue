<template>
  <v-skeleton-loader
    type="list-item-avatar, article@3, heading, list-item-avatar-three-line@3 "
    style="width: 600px"
    v-if="loading.getTrip"
  />
  <v-container grid-list-xl v-else>
    <v-row class="mb-3 mx-1" align="center">
      <v-btn icon @click="$router.back()">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <h1 class="display-1 font-weight-bold primary--text ml-2 mr-3">
        Trip #{{ trip.id }}
      </h1>
      <v-chip
        class="text-capitalize lighten-5 mx-1 font-weight-bold"
        :class="statusChipClasses[trip.tripStatus]"
      >
        {{ trip.tripStatus.toLowerCase() }}
      </v-chip>
    </v-row>
    <v-layout>
      <v-flex xs6>
        <v-card class="mb-4">
          <v-card-title>
            <span class="body-1">Trip Info</span>
            <v-spacer />
            <span class="caption">
              {{ datetime(trip.createdOnDate) }}
            </span>
          </v-card-title>
          <v-card-text>
            <v-layout>
              <v-flex xs6>
                <span class="caption d-block font-weight-bold">
                  <v-icon size="17">mdi-check-all</v-icon> Order</span
                >
                <router-link
                  :to="`/dashboard/orders/details?id=${trip.order.id}`"
                >
                  Order #{{ trip.order.id }}
                </router-link>
                <span class="caption d-block font-weight-bold mt-3">
                  <v-icon size="17">mdi-account</v-icon> Customer
                </span>
                <router-link
                  :to="`/dashboard/orders/details?id=${trip.order.id}`"
                >
                  {{ trip.customer.firstName }} {{ trip.customer.lastName }}
                </router-link>
                <span class="caption d-block font-weight-bold mt-3">
                  <v-icon size="17">mdi-account-outline</v-icon> Delivery Agent
                </span>
                <router-link
                  :to="`/dashboard/orders/details?id=${trip.order.id}`"
                >
                  {{ trip.deliveryAgent.firstName }}
                  {{ trip.deliveryAgent.lastName }}
                </router-link>
              </v-flex>
              <v-flex xs6>
                <span class="d-block font-weight-bold">Trip Price</span>
                <p class="title">{{ trip.tripPrice.toLocaleString() }} NGN</p>
                <span class="d-block font-weight-bold">Delivery Location</span>
                <p class="">{{ trip.endLocation.address }}</p>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
        <v-card class="mt-5 red lighten-4" v-if="trip.cancelReason">
          <v-card-title>This trip was cancelled</v-card-title>
          <v-card-text>{{ trip.cancelReason }}</v-card-text>
        </v-card>
        <v-card class="mt-5">
          <v-card-title>
            <span class="body-1">Organizations</span>
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item
                v-for="(item, index) in trip.organizations"
                :key="index"
              >
                <v-list-item-icon>
                  <v-avatar
                    color="primary white--text"
                    class="font-weight-bold"
                  >
                    <v-img :src="item.profilePhoto" />
                  </v-avatar>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ item.name }}</v-list-item-title>
                  <v-list-item-subtitle>
                    <v-icon size="15">mdi-map-marker</v-icon>
                    {{ item.location.address }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    <v-icon size="15">mdi-phone</v-icon>
                    {{ item.phoneNumber }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs6>
        <v-card>
          <v-card-text>
            <p>Actions:</p>
            <v-btn
              rounded
              elevation="0"
              color="red"
              text
              class="text-capitalize font-weight-bold"
            >
              <v-icon class="mr-3">mdi-delete</v-icon>
              Delete Trip
            </v-btn>
          </v-card-text>
        </v-card>
        <v-card class="mt-5">
          <v-card-title class="body-1">Trip Progress</v-card-title>
          <v-card-text>
            <v-timeline dense>
              <v-timeline-item
                :color="step.isCompleted ? 'green' : 'primary'"
                small
                v-for="(step, index) in trip.tripSteps"
                :key="index"
              >
                <v-card
                  :color="step.isCompleted ? 'green' : 'primary'"
                  class="white--text"
                  elevation="0"
                  style="border-radius: 20px"
                >
                  <v-card-title class="font-weight-bold body-1">
                    {{ step.title }}
                  </v-card-title>
                  <v-card-text>
                    <p class="body-2 white--text">{{ step.description }}</p>
                    <v-chip
                      color="white"
                      class="font-weight-bold caption"
                      small
                      :class="
                        step.isCompleted ? 'green--text' : 'primary--text'
                      "
                    >
                      {{ step.isCompleted ? "Completed" : "Pending" }}
                    </v-chip>
                  </v-card-text>
                </v-card>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script src="./TripDetails.ts"></script>

<style>
</style>