<template>
  <v-skeleton-loader
    type="list-item-avatar, article@3, heading, list-item-avatar-three-line@3"
    style="width: 600px"
    v-if="loading"
  />
  <v-container grid-list-xl v-else>
    <v-row class="mb-3 mx-1" align="center">
      <v-btn icon @click="$router.back()">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <h1 class="display-1 font-weight-bold primary--text ml-2 mr-3">
        {{agent.firstName}} {{agent.lastName}} 
      </h1>
    </v-row>
    <v-layout>
      <v-flex xs7>
        <v-card style="overflow: hidden">
          <v-layout>
            <profile-photo :src="agent.profilePhoto" empty-state-icon="mdi-account" width="300" @click="changeProfilePhoto(agent.id)"/>
            <v-card-text>
              <p class="font-weight-bold caption mb-0 mt-2">Email</p>
              <p class="body-1">{{ agent.email }}</p>
              <p class="font-weight-bold caption mb-0">Phone Number</p>
              <p class="body-1">{{ agent.phoneNumber }}</p>
              <p class="font-weight-bold caption mb-0">Ride</p>
              <p class="body-1">
                <router-link :to="`/dashboard/rides/details?id=${agent.ride.id}`">
                  {{ agent.ride.name }}
                </router-link>
              </p>
              <v-checkbox label="Available" readonly v-model="agent.available"/>
            </v-card-text>
          </v-layout>
        </v-card>
      </v-flex>
      <v-flex xs5>
        <v-card>
          <v-card-text>
            <p>Actions:</p>
            <v-btn
              rounded
              text
              color="primary"
              elevation="0"
              class="font-weight-bold text-capitalize mb-2"
              @click="agentEditor.beginEditAgent(agent)"
            >
              <v-icon class="mr-2">mdi-lead-pencil</v-icon>
              Edit Agent
            </v-btn>
            <br>
            <v-btn
              rounded
              text
              color="primary"
              elevation="0"
              class="font-weight-bold text-capitalize mb-2"
              @click="agentCredentialsEditor.beginEditAgent(agent)"
            >
              <v-icon class="mr-2">mdi-lock</v-icon>
              Edit Agent Credentials
            </v-btn>
            <br>
            <v-btn
              rounded
              text
              color="red white--text"
              elevation="0"
              class="font-weight-bold text-capitalize mb-2"
              @click="deleteAgent(agent)"
            >
              <v-icon class="mr-2">mdi-delete</v-icon>
              Delete Agent
            </v-btn>
            <br>
            <v-btn
              rounded
              text
              :color="agent.available? 'red' : 'green'"
              elevation="0"
              class="font-weight-bold text-capitalize"
              @click="toggleAgentAvailability(agent)"
            >
              <v-icon class="mr-2" :color="agent.available? 'red' : 'green'">{{ agent.available? 'mdi-close' : 'mdi-check' }}</v-icon>
              Make Agent {{ agent.available? 'Unavailable' : 'Available' }}
            </v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <agent-editor ref="agentEditor" @saved="getAgent"/>
    <agent-credentials-editor ref="agentCredentialsEditor" @saved="getAgent"/>
    <file-getter ref="fileGetter"/>
  </v-container>
</template>

<script src="./AgentDetails.ts"></script>

<style>
</style>