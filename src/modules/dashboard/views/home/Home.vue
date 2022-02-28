<template>
  <div class="px-5">
    <v-layout>
      <v-flex>
        <h1 class="display-1 font-weight-bold primary--text">Dashboard</h1>
        <p class="caption">
          {{ new Date().toDateString() }}
        </p>
      </v-flex>
      <v-btn
        color="primary"
        class="font-weight-bold text-capitalize"
        rounded
        @click="logout"
        elevation="0"
      >
        <v-icon class="mr-3">mdi-power</v-icon>
        logout
      </v-btn>
    </v-layout>

    <v-container grid-list-xl>
      <p class="title mb-0">Overview</p>
      <v-divider class="mt-3" />
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
    <v-container grid-list-xl>
      <v-layout>
        <v-flex xs5>
          <orders-overview />
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
                to="/dashboard/orders"
              >
                Go to orders
              </v-btn>
            </v-card-title>
            <v-divider />
            <v-card-text>
              <v-list>
                <template v-for="(order, index) in latestOrders">
                  <v-list-item :key="index" class="py-3" :to="`/dashboard/orders/details?id=${order.id}`">
                    <center class="grey--text">
                      <span class="title"> {{ getDate(order) }} </span>
                      <br />
                      <span class="caption">
                        {{ getMonthAndYear(order) }}
                      </span>
                    </center>
                    <v-list-item-content class="ml-5">
                      <v-list-item-title>
                        {{ order.transaction.user.firstName }}
                        {{ order.transaction.user.lastName }}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        #{{ order.id }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                    <v-chip
                      class="text-capitalize"
                      :class="
                        orderTypes.find((elem) => elem.name == order.status)
                          .className
                      "
                    >
                      <span class="text-capitalize">
                        {{ order.status.toLowerCase() }}
                      </span>
                    </v-chip>
                  </v-list-item>
                  <v-divider :key="`divider-${index}`"/>
                </template>
              </v-list>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <sales />
    <customer-statistics />
  </div>
</template>

<script src="./Home.ts"></script>