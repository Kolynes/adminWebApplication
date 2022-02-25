<template>
  <div>
    <table-view
      title="Customers"
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
      @refresh="search"
    >
      <template #subtitle>
        <v-btn
          class="text-capitalize font-weight-bold"
          color="primary"
          rounded
          elevation="0"
          @click="customerEditor.toggleCreateCustomerDialog()"
        >
          <v-icon class="mr-2">mdi-account-plus</v-icon>
          Create Customer
        </v-btn>
      </template>

      <template #item:id="{ item }"> #{{ item.id }} </template>

      <template #actions="{ item }">
        <v-list-item @click="deleteCustomer(item)">
          <v-list-item-icon>
            <v-icon color="red"> mdi-delete </v-icon>
          </v-list-item-icon>
          <v-list-item-title> Delete </v-list-item-title>
        </v-list-item>
        <v-list-item @click="customerEditor.beginEditCustomer(item)">
          <v-list-item-icon>
            <v-icon color="primary">mdi-lead-pencil</v-icon>
          </v-list-item-icon>
          <v-list-item-title> Edit </v-list-item-title>
        </v-list-item>
      </template>

      <template #empty-state>
        <v-empty-state title="No Customers Found" icon="mdi-account" />
      </template>
    </table-view>
    <customer-editor ref="customerEditor" @saved="search"/>
  </div>
</template>

<script src="./Customers.ts"></script>