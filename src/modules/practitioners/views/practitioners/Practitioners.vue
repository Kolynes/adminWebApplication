<template>
  <div>
    <table-view
      :title="typeTextPlural"
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
          color="primary"
          class="text-capitalize font-weight-bold"
          rounded
          elevation="0"
          @click="practitionerEditor.toggleCreatePractitionerDialog()"
        >
          <v-icon>mdi-hospital</v-icon>
          Create {{ typeText }}
        </v-btn>
      </template>

      <template #item:id="{ item }"> #{{ item.id }} </template>

      <template #item:name="{ item }">
        <v-avatar class="my-1 mr-1">
          <img :src="item.profilePhoto" />
        </v-avatar>
        {{ item.name }}
      </template>

      <template #item:address="{ item }">
        {{ item.location && item.location.address }}
      </template>

      <template #actions="{ item }">
        <v-list-item @click="practitionerEditor.beginEditPractitioner(item)">
          <v-list-item-icon>
            <v-icon color="blue"> mdi-lead-pencil </v-icon>
          </v-list-item-icon>
          <v-list-item-title> Edit </v-list-item-title>
        </v-list-item>
        <v-list-item @click="deletePractitioner(item)">
          <v-list-item-icon>
            <v-icon color="red"> mdi-delete </v-icon>
          </v-list-item-icon>
          <v-list-item-title> Delete </v-list-item-title>
        </v-list-item>
      </template>

      <template #empty-state>
        <v-empty-state
          :title="`No ${typeTextPlural} Found`"
          icon="mdi-account"
        />
      </template>
    </table-view>
    <practitioner-editor ref="practitionerEditor" @saved="search" :type="type"/>
  </div>
</template>

<script src="./Practitioners.ts"></script>

<style>
</style>