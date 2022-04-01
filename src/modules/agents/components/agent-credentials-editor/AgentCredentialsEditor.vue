<template>
  <v-dialog v-model="dialogVisible" width="600" persistent>
    <v-card>
      <v-card-title>
        <span class="body-1">Edit Agent Credentials</span>
        <v-spacer />
        <v-btn @click="toggleDialog" icon>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-form
          ref="agentCredentialsForm"
          @submit.prevent="updateAgentCredentials"
        >
          <v-text-field
            label="Email"
            prepend-inner-icon="mdi-email"
            v-model="email"
            :rules="[emailRule]"
            :error-messages="errorFields.email"
            outlined
          />
          <v-password-field
            label="Password"
            prepend-inner-icon="mdi-lock"
            v-model="password"
            :error-messages="errorFields.password"
            outlined
          />
          <v-btn
            class="text-capitalize font-weight-bold"
            color="primary"
            rounded
            elevation="0"
            :loading="loading.updateAgentCredentials"
            type="submit"
          >
            update Agent
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script src="./AgentCredentialsEditor.ts"></script>

<style>
</style>