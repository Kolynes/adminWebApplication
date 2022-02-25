<template>
  <v-dialog v-model="showDialog" persistent width="600" >
    <v-card v-if="showDialog">
      <v-card-title>
        <span class="body-1"> Select {{type}} </span>
        <v-spacer/>
        <v-btn icon @click="organizationResolve(null)">
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
              @click="organizationEditor.toggleCreateOrganizationDialog()"
            >
              <v-icon class="mr-3">{{icon}}</v-icon>
              create {{type}}
            </v-btn>
            <v-spacer/>
            <v-text-field 
              outlined
              dense
              rounded
              hide-details
              prepend-inner-icon="mdi-magnify"
              placeholder="Search by name"
              clearable
              :loading="searching"
              v-model="searchString"
            />
          </v-layout>
          <v-scroll-view 
            :loader="loadOrganizations"
            :refresh.sync="refresh"
            baseComponent="v-list"
          >
            <template #default="{ item }">
              <v-list-item @click="organizationResolve(item)">
                <v-list-item-icon>
                  <v-avatar 
                    color="primary white--text" 
                    class="font-weight-bold"
                  >
                    <v-img :src="item.profilePhoto"/>
                  </v-avatar>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{item.name}}</v-list-item-title>
                  <v-list-item-subtitle>
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
    <organization-editor ref="organizationEditor" @saved="refresh = true" :type="type" />
  </v-dialog>
</template>

<script src="./SelectOrganization.ts"></script>

<style>

</style>