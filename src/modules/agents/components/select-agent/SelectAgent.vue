<template>
  <v-dialog v-model="showDialog" persistent width="600" >
    <v-card v-if="showDialog">
      <v-card-title>
        <span class="body-1"> Select Agent </span>
        <v-spacer/>
        <v-btn icon @click="agentResolve(null)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card height="600" flat style="overflow-y: auto">
        <v-card-text>
          <v-layout class="mb-1">
            <v-btn
              elevation="0"
              rounded
              color="primary"
              class="text-capitalize font-weight-bold"
              @click="agentEditor.toggleCreateAgentDialog()"
            >
              <v-icon class="mr-3">mdi-motorbike</v-icon>
              Create Agent
            </v-btn>
            <v-spacer/>
            <v-text-field 
              outlined
              rounded
              dense
              hide-details
              prepend-inner-icon="mdi-magnify"
              placeholder="Search by name or location"
              clearable
              :loading="searching"
              v-model="searchString"
            />
          </v-layout>
          <v-scroll-view 
            :loader="loadAgents"
            :refresh.sync="refresh"
            baseComponent="v-list"
          >
            <template #default="{ item }">
              <v-list-item @click="agentResolve(item)">
                <v-list-item-icon>
                  <v-avatar 
                    color="primary white--text" 
                    class="font-weight-bold"
                  >
                    <img :src="item.profilePhoto" v-if="item.profilePhoto"/>
                    <span v-else>{{item.name[0].toUpperCase()}}</span>
                  </v-avatar>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{item.name}}</v-list-item-title>
                  <v-list-item-subtitle v-if="item.location.address">
                    <v-icon size="15">mdi-map-marker</v-icon>
                    {{item.location.address}}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    <v-icon size="15">mdi-phone</v-icon>
                    {{item.phoneNumber}}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-divider inset/>
            </template>
          </v-scroll-view>
        </v-card-text>
      </v-card>
    </v-card>
    <agent-editor ref="agentEditor" @saved="refresh = true" />
  </v-dialog>
</template>

<script src="./SelectAgent.ts"></script>

<style>

</style>