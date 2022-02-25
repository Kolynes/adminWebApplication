<template>
  <v-skeleton-loader
    type="list-item-avatar, article@3, heading, list-item-avatar-three-line@3 "
    style="width: 600px"
    v-if="loading"
  />
  <v-container grid-list-xl v-else>
    <v-row class="mb-3 mx-1" align="center">
      <v-btn icon @click="$router.back()">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <h1 class="display-1 font-weight-bold primary--text ml-2 mr-3">
        {{ admin.firstName }} {{ admin.lastName }}
      </h1>
      <span class="caption" v-if="admin.active">
        <v-icon color="green">mdi-check</v-icon>
        <span>Active</span>
      </span>
      <span class="caption" v-else>
        <v-icon color="red">mdi-close</v-icon>
        <span>Not Active</span>
      </span>
    </v-row>
    <v-layout>
      <v-flex>
        <v-card>
          <v-card-text>
            <p class="body-1">
              <v-icon class="mr-3" color="red">mdi-email</v-icon>
              {{ admin.email }}
            </p>
            <p class="body-1">
              <v-icon class="mr-3" color="blue">mdi-phone</v-icon>
              {{ admin.phoneNumber }}
            </p>
            <template v-if="admin.role">
              <p class="font-weight-bold caption mb-0">Role</p>
              <p class="body-1">{{ getRoleText(admin.role.name) }}</p>
            </template>
            <v-list class="transparent">
              <p class="font-weight-bold caption">Permissions</p>
              <template v-for="(permission, index) in admin.permissions">
                <v-list-item :key="`item-${index}`" dense>
                  <v-list-item-icon>
                    <v-avatar color="primary white--text" size="30">
                      <span class="font-weight-bold">
                        {{ permission.name[0].toUpperCase() }}
                      </span>
                    </v-avatar>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ permission.name }}</v-list-item-title>
                    <v-list-item-subtitle>{{
                      permission.description
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-divider :key="`divider-${index}`" inset />
              </template>
            </v-list>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6>
        <v-card>
          <v-card-text>
            <p class="mb-2">Actions:</p>
            <v-btn
              rounded
              text
              color="primary"
              elevation="0"
              class="font-weight-bold text-capitalize mb-2"
              @click="adminEditor.beginEditAdmin(admin)"
            >
              <v-icon class="mr-2">mdi-lead-pencil</v-icon>
              Edit Admin
            </v-btn>
            <br />
            <v-btn
              rounded
              text
              :color="admin.active ? 'red' : 'green'"
              elevation="0"
              class="font-weight-bold text-capitalize mb-2 white--text"
              @click="admin.active ? disableAdmin(admin) : enableAdmin(admin)"
            >
              <v-icon class="mr-2" v-if="admin.active">mdi-close</v-icon>
              <v-icon class="mr-2" v-else>mdi-check</v-icon>
              <span v-if="admin.active">Disable Admin</span>
              <span v-else>Enable Admin</span>
            </v-btn>
            <br />
            <v-btn
              rounded
              text
              color="red white--text"
              elevation="0"
              class="font-weight-bold text-capitalize mb-2"
              @click="deleteAdmin(admin)"
            >
              <v-icon class="mr-2">mdi-delete</v-icon>
              Delete Admin
            </v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <admin-editor ref="adminEditor" @saved="getAdmin" />
  </v-container>
</template>

<script src="./AdminDetails.ts"></script>

<style>
</style>