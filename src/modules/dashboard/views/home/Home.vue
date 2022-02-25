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

    <orders-info />
    <v-container grid-list-xl>
      <v-layout>
        <v-flex xs5>
          <orders-overview />
        </v-flex>
        <v-flex>
          <latest-orders />
        </v-flex>
      </v-layout>
    </v-container>
    <sales />
    <customer-statistics />
  </div>
</template>

<script src="./Home.ts"></script>