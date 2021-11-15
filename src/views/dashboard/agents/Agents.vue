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
    >
      <template #subtitle>
        <v-btn
          rounded
          color="primary"
          elevation="0"
          @click="toggleCreateAgentDialog"
        >
          <v-icon>mdi-motorbike</v-icon>
          <span class="font-weight-bold text-capitalize ml-3">
            create Agent
          </span>
        </v-btn>
      </template>

      <template #item:id="{ item }"> #{{ item.id }} </template>

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
        <v-list-item @click="beginEditAgent(item)">
          <v-list-item-icon>
            <v-icon color="primary"> mdi-lead-pencil </v-icon>
          </v-list-item-icon>
          <v-list-item-title> Edit </v-list-item-title>
        </v-list-item>
      </template>

      <template #empty-state>
        <v-empty-state title="No Agents Found" icon="mdi-motorbike" />
      </template>
    </table-view>
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
  </div>
</template>

<script src="./Agents.ts"></script>

<style>
</style>