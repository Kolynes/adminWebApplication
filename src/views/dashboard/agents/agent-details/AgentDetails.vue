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
      <v-flex>
        <div class="ml-4">
          <profile-photo :src="agent.profilePhoto" width="300" @click="changeProfilePhoto(agent.id)"/>
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
        </div>
      </v-flex>
      <v-flex xs12 sm6>
        <p>Actions:</p>
        <v-btn
          rounded
          text
          color="primary"
          elevation="0"
          class="font-weight-bold text-capitalize mb-2"
          @click="beginEditAgent(agent)"
        >
          <v-icon class="mr-2">mdi-lead-pencil</v-icon>
          Edit Agent
        </v-btn>
        <br>
        <v-btn
          rounded
          text
          color="red white--text"
          elevation="0"
          class="font-weight-bold text-capitalize"
          @click="deleteAgent(agent)"
        >
          <v-icon class="mr-2">mdi-delete</v-icon>
          Delete Agent
        </v-btn>
      </v-flex>
    </v-layout>
    <v-dialog v-model="createAgentDialogVisible" persistent width="600">
      <v-card v-if="createAgentDialogVisible">
        <v-card-title>
          <span class="body-1" v-if="selectedAgent == null">
            Create New Agent
          </span>
          <span class="body-1" v-else>Edit Agent</span>
          <v-spacer />
          <v-btn icon @click="toggleCreateAgentDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-xl>
            <v-form
              ref="createAgentForm"
              @submit.prevent="selectedAgent == null ? createAgent() : editAgent()"
            >
              <v-text-field
                label="First Name"
                outlined
                v-model="firstName"
                :rules="[requiredLengthRule(2)]"
              />
              <v-text-field
                label="Last Name"
                outlined
                v-model="lastName"
                :rules="[requiredRule]"
              />
              <v-text-field
                label="Email"
                outlined
                prepend-inner-icon="mdi-email"
                v-model="email"
                :rules="[requiredRule]"
              />
              <v-text-field
                label="Phone Number"
                outlined
                prepend-inner-icon="mdi-phone"
                v-model="phoneNumber"
                :rules="[requiredRule]"
              />
              <v-password-field
                label="Password"
                outlined
                prepend-inner-icon="mdi-lock"
                v-if="!selectedAgent"
                v-model="password"
                :rules="[requiredRule]"
              />
              <v-switch
                label="Available"
                prepend-inner-icon="mdi-check"
                v-else
                v-model="availability"
              />
              <v-file-field
                v-if="!selectedAgent"
                label="Profile Picture"
                outlined
                v-model="photo"
                :rules="[requiredRule]"
              />
              <v-btn
                class="text-capitalize font-weight-bold"
                color="primary"
                rounded
                elevation="0"
                type="submit"
                :loading="creatingAgent"
              >
                {{ selectedAgent != null ? "Edit" : "Create" }}
                Agent
              </v-btn>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
    <select-ride ref="selectRide"/>
    <file-getter ref="fileGetter"/>
  </v-container>
</template>

<script src="./AgentDetails.ts"></script>

<style>
</style>