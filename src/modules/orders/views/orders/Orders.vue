<template>
  <div>
    <table-view
      title="Orders"
      :loading="loading.getSearchResults"
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
      @refresh="search"
    >
      <template #subtitle>
        <v-chip 
          @click="setOrderType(null)" 
          class="text-capitalize font-weight-bold mx-1"
          :class="{primary: selectedOrderType == null}"
        >
          All
        </v-chip>
        <v-chip 
          v-for="(orderType, index) in orderTypes"
          :key="index"
          @click="setOrderType(orderType.name)" 
          class="text-capitalize font-weight-bold mx-1 lighten-5 grey"
          :class="{[orderType.className]: selectedOrderType == orderType.name}"
        >
          {{orderType.name.toLowerCase()}}
        </v-chip>
      </template>

      <template #item:id="{ item }">
        #{{item.id}}
      </template>

      <template #item:deliveryAddress="{ item }">
        {{item.destination.address}}
      </template>

      <template #item:createdOnDate="{ item }">
        {{datetime(item.createdOnDate)}}
      </template>

      <template #item:customerId="{ item }">
        <router-link :to="`/dashboard/customers/details?id=${getUser(item).id}`">
          {{getUser(item).fullName}}
        </router-link>
      </template>

      <template #item:status="{ item }">
        <v-chip
          class="text-capitalize"
          :class="orderTypes.find(elem => elem.name == item.status).className"
        >
          <span class="text-capitalize">{{item.status.toLowerCase()}}</span>
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