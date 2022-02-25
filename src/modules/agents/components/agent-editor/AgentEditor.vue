<template>
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
            @submit.prevent="
              selectedAgent == null ? createAgent() : editAgent()
            "
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
              :rules="[requiredLengthRule(2)]"
            />
            <v-text-field
              label="Email"
              outlined
              prepend-inner-icon="mdi-email"
              v-model="email"
              :rules="[requiredRule]"
            />
            <v-text-field
              label="City"
              outlined
              prepend-inner-icon="mdi-city"
              v-model="city"
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
              v-model="profilePhoto"
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
    <select-ride ref="selectRide" />
  </v-dialog>
</template>

<script src="./AgentEditor.ts"></script>

<style>
</style>