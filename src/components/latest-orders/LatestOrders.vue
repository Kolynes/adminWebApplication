<template>
  <v-card>
    <v-card-title>
      <span class="body-1">Latest Orders</span>
      <v-spacer />
      <v-btn
        elevation="0"
        color="primary"
        text
        class="text-capitalize font-weight-bold"
        v-on="on"
        v-bind="attrs"
        to="/dashboard/orders"
      >
        Go to orders
      </v-btn>
    </v-card-title>
    <v-divider />
    <v-card-text>
      <v-list>
        <v-list-item v-for="(order, index) in latestOrders" :key="index">
          <center class="grey--text">
            <span class="title">{{ getDate(order) }}</span
            ><br />
            <span class="caption">
              {{ getMonthAndYear(order) }}
            </span>
          </center>
          <v-list-item-content class="ml-5">
            <v-list-item-title>
              {{ order.customerName }}
            </v-list-item-title>
            <v-list-item-subtitle> #{{ order.id }} </v-list-item-subtitle>
          </v-list-item-content>
          <v-chip
            :class="{
              'primary primary--text lighten-4': orders.status == 'Processing',
              'green green--text lighten-4': orders.status == 'Completed',
              'red red--text lighten-4': orders.status == 'Cancelled',
            }"
          >
            {{ orders.status }}
          </v-chip>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script src="./LatestOrders.ts"></script>

<style>
</style>