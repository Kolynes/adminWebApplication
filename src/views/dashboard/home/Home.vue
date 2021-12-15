<template>
  <div class="px-5">
    <h1 class="display-1 font-weight-bold primary--text">Dashboard</h1>
    <p class="caption">
      {{ new Date().toDateString() }}
    </p>
    
    <orders-info/>
    <v-container grid-list-xl>
      <v-layout>
        <v-flex xs5>
          <orders-overview/>
        </v-flex>
        <v-flex>
          <latest-orders/>
        </v-flex>
      </v-layout>
    </v-container>
    <sales/>
    <customer-statistics/>
  </div>
</template>

<script src="./Home.ts"></script>