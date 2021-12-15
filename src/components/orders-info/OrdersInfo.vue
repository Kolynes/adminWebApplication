<template>
  <v-container grid-list-xl>
    <p class="title mb-0">Overview</p>
    <v-divider class="mt-3"/>
    <v-card class="my-3" @click="goToOrders" style="cursor: pointer">
      <v-list>
        <v-list-item>
          <v-list-item-avatar color="primary">
            <v-icon color="white">mdi-check-all</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Orders</v-list-item-title>
            <v-list-item-subtitle v-if="numberOfOrdersToAttend > 0">
              You have {{ numberOfOrdersToAttend }} orders to attend to
            </v-list-item-subtitle>
            <v-list-item-subtitle v-else>
              You do not have any orders to attend to
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-icon>mdi-arrow-right</v-icon>
        </v-list-item>
      </v-list>
    </v-card>
    <v-layout>
      <v-flex xs4 v-for="(number, index) in numbers" :key="index">
        <v-card>
          <v-card-text>
            <v-layout align-center justify-center>
              <v-avatar color="primary" large class="ml-2">
                <v-icon color="white">{{ number.icon }}</v-icon>
              </v-avatar>
              <v-flex class="ml-1">
                <span class="grey--text font-weight-bold">
                  {{ number.name }}
                </span>
                <br />
                <span class="title">{{ number.value }}</span>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-divider />
          <v-card-text>
            <v-btn
              elevation="0"
              color="primary"
              text
              class="text-capitalize font-weight-bold"
              :to="number.link"
            >
              {{ number.name }}
              <v-icon class="ml-3">mdi-arrow-right</v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script src="./OrdersInfo.ts"></script>

<style>
</style>