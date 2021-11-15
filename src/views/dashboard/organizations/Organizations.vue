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
      <template #subtitle>
        <v-btn
          class="text-capitalize font-weight-bold"
          color="primary"
          rounded
          elevation="0"
          @click="toggleCreateOrganizationDialog"
        >
          <v-icon class="mr-2">{{icon}}</v-icon>
          Create {{typeText}}
        </v-btn>
      </template>

      <template #item:id="{ item }"> #{{ item.id }} </template>

      <template #actions="{ item }">
        <v-list-item @click="deleteOrganization(item)">
          <v-list-item-icon>
            <v-icon color="red"> mdi-delete </v-icon>
          </v-list-item-icon>
          <v-list-item-title> Delete </v-list-item-title>
        </v-list-item>
        <v-list-item @click="beginEditOrganization(item)">
          <v-list-item-icon>
            <v-icon color="primary">mdi-lead-pencil</v-icon>
          </v-list-item-icon>
          <v-list-item-title> Edit </v-list-item-title>
        </v-list-item>
      </template>

      <template #empty-state>
        <v-empty-state :title="`No ${typeTextPlural} Found`" :icon="icon" />
      </template>
    </table-view>
    <v-dialog v-model="createOrganizationDialogVisible" persistent fullscreen>
      <v-card v-if="toggleCreateOrganizationDialog">
        <v-card-title>
          <span class="body-1" v-if="selectedOrganization == null"
            >Create New {{typeText}}</span
          >
          <span class="body-1" v-else>Edit {{typeText}}</span>
          <v-spacer />
          <v-btn icon @click="toggleCreateOrganizationDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-xl>
            <v-form
              ref="createOrganizationForm"
              @submit.prevent="
                selectedOrganization == null
                  ? createOrganization()
                  : editOrganization()
              "
            >
              <v-layout>
                <v-flex xs6>
                  <v-text-field
                    label="Name"
                    outlined
                    v-model="name"
                    :rules="[requiredLengthRule(6)]"
                  />
                  <v-text-field
                    label="Email"
                    outlined
                    prepend-inner-icon="mdi-email"
                    v-model="email"
                    type="email"
                    :rules="[emailRule]"
                  />
                  <v-textarea
                    label="Description"
                    outlined
                    prepend-inner-icon="mdi-note-text"
                    v-model="description"
                    type="phone"
                    :rules="[requiredLengthRule(50, 150)]"
                  />
                  <v-text-field
                    label="Phone Number"
                    outlined
                    prepend-inner-icon="mdi-phone"
                    v-model="phoneNumber"
                    type="phone"
                    :rules="[requiredLengthRule(10)]"
                  />
                  <v-text-field
                    label="Address"
                    outlined
                    prepend-inner-icon="mdi-map-marker"
                    v-model="address"
                    type="address"
                    :rules="[requiredLengthRule(2)]"
                  />
                 
                  <v-password-field
                    label="Password"
                    outlined
                    prepend-inner-icon="mdi-lock"
                    v-model="password"
                    :rules="[requiredLengthRule(6)]"
                    v-if="!selectedOrganization"
                  />
                  <v-btn
                    class="text-capitalize font-weight-bold"
                    color="primary"
                    rounded
                    elevation="0"
                    type="submit"
                    :loading="creatingOrganization"
                  >
                    {{ selectedOrganization != null ? "Edit" : "Create" }}
                    {{typeText}}
                  </v-btn>
                </v-flex>
                <v-flex xs6>
                   <v-file-field
                    label="Profile Photo"
                    outlined
                    v-model="profilePhoto"
                    :rules="[requiredRule]"
                    v-if="!selectedOrganization"
                  />
                  <p class="title">
                    <v-icon>mdi-map</v-icon>
                    Select location on map
                  </p>
                  <v-layout>
                    <v-flex xs6>
                      <v-text-field
                        label="latitude"
                        outlined
                        readonly
                        v-model="latitude"
                        type="address"
                        :rules="[requiredRule]"
                      />
                    </v-flex>
                    <v-flex xs6>
                      <v-text-field
                        label="longitude"
                        outlined
                        readonly
                        v-model="longitude"
                        type="address"
                        :rules="[requiredRule]"
                      />
                    </v-flex>
                  </v-layout>
                  <div ref="mapElement" style="height: 400px"></div>
                </v-flex>
              </v-layout>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script src="./Organizations.ts"></script>

<style>
</style>