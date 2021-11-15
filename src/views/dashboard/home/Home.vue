<template>
  <v-container class="px-5">
    <h1 class="display-1 font-weight-bold primary--text">Dashboard</h1>
    <p class="caption">
      {{ new Date().toDateString() }}
    </p>
    <v-tabs>
      <v-tab class="text-capitalize font-weight-bold">Overview</v-tab>
      <v-tab class="text-capitalize font-weight-bold">Sales</v-tab>
    </v-tabs>
    <v-card class="my-5">
      <v-list>
        <v-list-item>
          <v-list-item-avatar color="primary">
            <v-icon color="white">mdi-check-all</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Orders</v-list-item-title>
            <v-list-item-subtitle
              >You have 3 Orders to attend to</v-list-item-subtitle
            >
          </v-list-item-content>
          <v-icon>mdi-arrow-right</v-icon>
        </v-list-item>
      </v-list>
    </v-card>
    <br />
    <v-layout class="my-5">
      <v-flex xs4>
        <v-card>
          <v-card-text>
            <v-layout>
              <v-avatar color="primary" large>
                <v-icon color="white">mdi-check-all</v-icon>
              </v-avatar>
              <v-flex class="ml-3">
                <span class="grey--text font-weight-bold">Orders</span><br />
                <span class="title">30982</span>
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
            >
              Orders
              <v-icon class="ml-3">mdi-arrow-right</v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <br />
    <v-container grid-list-xl>
      <v-layout class="my-5">
        <v-flex xs6>
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
                    Last 7 days
                    <v-icon class="ml-4">mdi-chevron-down</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item>
                    <v-list-item-content>Last month</v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>Last quarter</v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>Last year</v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-card-title>
            <v-divider />
            <v-card-text>
              <p class="font-weight-bold">
                <span>Total</span>
                <span style="float: right">100</span>
              </p>
              <v-divider/>
              <p class="mt-2">
                <span class="green--text">Completed</span>
                <span style="float: right">100</span>
              </p>
              <v-divider/>
              <p class="mt-2">
                <span class="primary--text">Processing</span>
                <span style="float: right">100</span>
              </p>
              <v-divider/>
              <p class="mt-2">
                <span class="red--text">Cancelled</span>
                <span style="float: right">100</span>
              </p>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex>
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
              >
                Go to orders
              </v-btn>
            </v-card-title>
            <v-divider />
            <v-card-text>
              
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script src="./Home.ts"></script>