<template>
  <div>
    <table-view
      title="Delivery Agents"
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
          rounded
          color="primary"
          elevation="0"
          @click="agentEditor.toggleCreateAgentDialog()"
        >
          <v-icon>mdi-account-plus</v-icon>
          <span class="font-weight-bold text-capitalize ml-3">
            create Agent
          </span>
        </v-btn>
      </template>

      <template #item:id="{ item }"> #{{ item.id }} </template>
      <template #item:name="{ item }"> 
        <v-avatar class="my-1 mr-1">
          <img :src="item.profilePhoto"/>
        </v-avatar>
        {{item.firstName}} {{item.lastName}}
      </template>

      <template #item:available="{ item }">
        <v-icon color="green" v-if="item.available">mdi-check</v-icon>
        <v-icon color="red" v-else>mdi-close</v-icon>
      </template>

      <template #actions="{ item }">
        <v-list-item @click="deleteAgent(item)">
          <v-list-item-icon>
            <v-icon color="red"> mdi-delete </v-icon>
          </v-list-item-icon>
          <v-list-item-title> Delete </v-list-item-title>
        </v-list-item>
        <v-list-item @click="agentEditor.beginEditAgent(item)">
          <v-list-item-icon>
            <v-icon color="primary"> mdi-lead-pencil </v-icon>
          </v-list-item-icon>
          <v-list-item-title> Edit </v-list-item-title>
        </v-list-item>
        <v-list-item @click="toggleAgentAvailability(item)">
          <v-list-item-icon>
            <v-icon :color="item.available? 'red' : 'green'"> {{ item.available? 'mdi-close' : 'mdi-check' }} </v-icon>
          </v-list-item-icon>
          <v-list-item-title> Make {{ item.available? 'Unavailable' : 'Available' }} </v-list-item-title>
        </v-list-item>
      </template>

      <template #empty-state>
        <v-empty-state title="No Agents Found" icon="mdi-account" />
      </template>
    </table-view>
    <agent-editor ref="agentEditor" @saved="search"/>
  </div>
</template>

<script src="./Agents.ts"></script>

<style>
</style>