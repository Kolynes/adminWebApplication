<template>
  <div>
    <table-view
      title="Orders"
      :loading="loading"
      :searchString.sync="searchString"
      :items="items"
      :headers="headers"
      :itemClicked="itemClicked"
      :pages="pages"
      :numberOfPages="numberOfPages"
      :nextPage="nextPage"
      :previousPage="previousPage"
      :pageSize.sync="pageSize"
      :page.sync="page"
    >
      <template #subtitle>
        <v-chip 
          @click="setOrderType('Processing')" 
          class="text-capitalize font-weight-bold mx-1"
          :class="{'primary primary--text lighten-4': orderType == 'Processing'}"
        >
          Processing
        </v-chip>
        <v-chip 
          @click="setOrderType('Cancelled')" 
          class="text-capitalize font-weight-bold mx-1"
          :class="{'red red--text lighten-4': orderType == 'Cancelled'}"
        >
          Cancelled
        </v-chip>
        <v-chip 
          @click="setOrderType('Completed')" 
          class="text-capitalize font-weight-bold mx-1"
          :class="{'green green--text lighten-4': orderType == 'Completed'}"
        >
          Completed
        </v-chip>
      </template>

      <template #item:id="{ item }">
        #{{item.id}}
      </template>

      <template #item:customerId="{ item }">
        <router-link :to="`/dashboard/customers/details?id=${item.customerId}`">
          #{{item.customerId}}
        </router-link>
      </template>

      <template #item:status="{ item }">
        <v-chip
          :class="{
            'primary primary--text lighten-4': item.status == 'Processing',
            'green green--text lighten-4': item.status == 'Completed',
            'red red--text lighten-4': item.status == 'Cancelled',
          }"
        >
          {{item.status}}
        </v-chip>
      </template>

      <template #actions="{ item }">
        <v-list-item @click="assignAgent(item)">
          <v-list-item-icon>
            <v-icon color="green"> mdi-motorbike </v-icon>
          </v-list-item-icon>
          <v-list-item-title> Assign Agent </v-list-item-title>
        </v-list-item>
        <v-list-item @click="deleteOrder(item)">
          <v-list-item-icon>
            <v-icon color="red"> mdi-delete </v-icon>
          </v-list-item-icon>
          <v-list-item-title> Delete </v-list-item-title>
        </v-list-item>
      </template>

      <template #empty-state>
        <v-empty-state title="No Orders Found" icon="mdi-check-all"/>
      </template>

    </table-view>
    <select-agent ref="selectAgent"/>
  </div>
</template>

<script src="./Orders.ts"></script>

<style>
</style>