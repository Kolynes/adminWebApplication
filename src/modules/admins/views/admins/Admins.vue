<template>
  <div>
    <table-view
      title="Admins"
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
          @click="adminEditor.toggleCreateAdminDialog()"
        >
          <v-icon class="mr-2">mdi-account-plus</v-icon>
          Create Admin
        </v-btn>
      </template>

      <template #item:id="{ item }"> #{{ item.id }} </template>

      <template #item:active="{ item }">
        <v-icon color="green" v-if="item.active">mdi-check</v-icon>
        <v-icon color="red" v-else>mdi-close</v-icon>
      </template>

      <template #actions="{ item }">
        <v-list-item @click="deleteAdmin(item)">
          <v-list-item-icon>
            <v-icon color="red"> mdi-delete </v-icon>
          </v-list-item-icon>
          <v-list-item-title> Delete </v-list-item-title>
        </v-list-item>
        <v-list-item @click="item.active? disableAdmin(item) : enableAdmin(item)">
          <v-list-item-icon>
            <v-icon :color="item.active? 'red' : 'green'">{{item.active? "mdi-close" : "mdi-check"}}</v-icon>
          </v-list-item-icon>
          <v-list-item-title> {{item.active? "Disable" : "Enable"}} </v-list-item-title>
        </v-list-item>
        <v-list-item @click="adminEditor.beginEditAdmin(item)">
          <v-list-item-icon>
            <v-icon color="primary">mdi-lead-pencil</v-icon>
          </v-list-item-icon>
          <v-list-item-title> Edit </v-list-item-title>
        </v-list-item>
      </template>

      <template #empty-state>
        <v-empty-state title="No Admins Found" icon="mdi-account-star" />
      </template>
    </table-view>
    <admin-editor ref="adminEditor" @saved="search" />
  </div>
</template>

<script src="./Admins.ts"></script>