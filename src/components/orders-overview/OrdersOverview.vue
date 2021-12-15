<template>
  <v-card>
    <v-card-title>
      <span class="body-1">Orders Overview</span>
      <v-spacer />
      <v-menu>
        <template #activator="{ on, attrs }">
          <v-btn
            elevation="0"
            color="primary"
            text
            class="text-capitalize font-weight-bold"
            v-on="on"
            v-bind="attrs"
          >
            {{ timespan }}
            <v-icon class="ml-4">mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(oot, index) in timespans"
            :key="index"
            @click="timespanValue = oot.value"
          >
            <v-list-item-content
              :class="{
                'primary--text': timespanValue == oot.value,
              }"
            >
              {{ oot.text }}
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-title>
    <v-divider />
    <canvas ref="doughnut" />
    <v-card-text>
      <p class="font-weight-bold">
        <span>Total</span>
        <span style="float: right">{{ totalOrders }}</span>
      </p>
      <v-divider />
      <p class="mt-2">
        <span class="green--text">Completed</span>
        <span style="float: right">{{ completedOrders }}</span>
      </p>
      <v-divider />
      <p class="mt-2">
        <span class="primary--text">Processing</span>
        <span style="float: right">{{ processingOrders }}</span>
      </p>
      <v-divider />
      <p class="mt-2">
        <span class="red--text">Cancelled</span>
        <span style="float: right">{{ cancelledOrders }}</span>
      </p>
    </v-card-text>
  </v-card>
</template>

<script src="./OrdersOverview.ts"></script>

<style>
</style>