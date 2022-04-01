<template>
  <div>
    <table-view
      :title="organizationTypeTextPlural"
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
        <v-btn
          class="text-capitalize font-weight-bold"
          color="primary"
          rounded
          elevation="0"
          @click="organizationEditor.toggleCreateOrganizationDialog()"
        >
          <v-icon class="mr-2">{{ icon }}</v-icon>
          Create {{ organizationTypeText }}
        </v-btn>
      </template>

      <template #item:id="{ item }"> #{{ item.id }} </template>

      <template #item:name="{ item }">
        <v-avatar class="my-1 mr-1">
          <img :src="item.profilePhoto" />
        </v-avatar>
        {{ item.name }}
      </template>

      <template #item:address="{ item }">{{ item.location.address }}</template>

      <template #actions="{ item }">
        <v-list-item @click="deleteOrganization(item)">
          <v-list-item-icon>
            <v-icon color="red"> mdi-delete </v-icon>
          </v-list-item-icon>
          <v-list-item-title> Delete </v-list-item-title>
        </v-list-item>
        <v-list-item @click="organizationEditor.beginEditOrganization(item)">
          <v-list-item-icon>
            <v-icon color="primary">mdi-lead-pencil</v-icon>
          </v-list-item-icon>
          <v-list-item-title> Edit </v-list-item-title>
        </v-list-item>
      </template>

      <template #empty-state>
        <v-empty-state :title="`No ${organizationTypeTextPlural} Found`" :icon="icon" />
      </template>
    </table-view>
    <organization-editor ref="organizationEditor" @saved="search" :type="type" />
  </div>
</template>

<script src="./Organizations.ts"></script>

<style>
</style>