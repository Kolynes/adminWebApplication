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
    >
      <template #item:id="{ item }"> #{{ item.id }} </template>

      <template #actions="{ item }">
        <v-list-item @click="deletePractitioner(item)">
          <v-list-item-icon>
            <v-icon color="red"> mdi-delete </v-icon>
          </v-list-item-icon>
          <v-list-item-title> Delete </v-list-item-title>
        </v-list-item>
      </template>

      <template #empty-state>
        <v-empty-state :title="`No ${typeTextPlural} Found`" icon="mdi-account" />
      </template>
    </table-view>
  </div>
</template>

<script src="./Practitioners.ts"></script>

<style>

</style>