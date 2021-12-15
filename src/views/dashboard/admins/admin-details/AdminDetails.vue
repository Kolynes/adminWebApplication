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
        {{admin.firstName}} {{admin.lastName}} 
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
        <div class="ml-4">
          <p class="font-weight-bold caption mb-0">Email</p>
          <p class="body-1">{{admin.email}}</p>
          <p class="font-weight-bold caption mb-0">Phone Number</p>
          <p class="body-1">{{admin.phoneNumber}}</p>
          <p class="font-weight-bold caption mb-0">Role</p>
          <p class="body-1">{{getRoleText(admin.role.name)}}</p>
          <v-list class="transparent">
            <p class="font-weight-bold caption">Permissions</p>
            <template v-for="(permission, index) in admin.permissions">
              <v-list-item :key="`item-${index}`" dense>
                <v-list-item-icon>
                  <v-avatar color="primary white--text" size="30">
                    <span class="font-weight-bold">{{permission.name[0].toUpperCase()}}</span>
                  </v-avatar>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{permission.name}}</v-list-item-title>
                  <v-list-item-subtitle>{{permission.description}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-divider :key="`divider-${index}`" inset/>
            </template>
          </v-list>
        </div>
      </v-flex>
      <v-flex xs12 sm6>
        <p class="mb-2">Actions:</p>
        <v-btn
          rounded
          text
          color="primary"
          elevation="0"
          class="font-weight-bold text-capitalize mb-2"
          @click="beginEditAdmin(admin)"
        >
          <v-icon class="mr-2">mdi-lead-pencil</v-icon>
          Edit Admin
        </v-btn>
        <br>
        <v-btn
          rounded
          text
          :color="admin.active? 'red' : 'green'"
          elevation="0"
          class="font-weight-bold text-capitalize mb-2 white--text"
          @click="admin.active? disableAdmin(admin) : enableAdmin(admin)"
        >
          <v-icon class="mr-2" v-if="admin.active">mdi-close</v-icon>
          <v-icon class="mr-2" v-else>mdi-check</v-icon>
          <span v-if="admin.active">Disable Admin</span>
          <span v-else>Enable Admin</span>
        </v-btn>
        <br>
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
      </v-flex>
    </v-layout>
    <v-dialog v-model="createAdminDialogVisible" persistent width="600">
      <v-card v-if="createAdminDialogVisible">
        <v-card-title>
          <span class="body-1" v-if="selectedAdmin == null">Create New Admin</span>
          <span class="body-1" v-else>Edit Admin</span>
          <v-spacer/>
          <v-btn icon @click="toggleCreateAdminDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-xl>
            <v-form ref="createAdminForm" @submit.prevent="selectedAdmin == null? createAdmin() : editAdmin()">
              <v-layout>
                <v-flex>
                  <v-text-field 
                    label="First Name"
                    outlined
                    v-model="firstName"
                    :rules="[requiredLengthRule(4)]"
                  />
                </v-flex>
                <v-flex>
                  <v-text-field 
                    label="Last Name"
                    outlined
                    v-model="lastName"
                    :rules="[requiredLengthRule(4)]"
                  />
                </v-flex>
              </v-layout>
              <v-text-field 
                label="Email"
                outlined
                prepend-inner-icon="mdi-email"
                v-model="email"
                type="email"
                :rules="[emailRule]"
              />
              <v-text-field 
                label="Phone Number"
                outlined
                prepend-inner-icon="mdi-phone"
                v-model="phoneNumber"
                type="phone"
                :rules="[requiredLengthRule(10)]"
              />
              <v-password-field 
                label="Password"
                outlined
                prepend-inner-icon="mdi-lock"
                v-model="password"
                :rules="[requiredLengthRule(6)]"
                v-if="!selectedAdmin"
              />
              <v-select 
                label="Role"
                outlined
                prepend-inner-icon="mdi-account-star"
                v-model="role"
                :rules="[requiredRule]"
                :items="roles"
              >
                <template #selection="{ item }">
                  {{getRoleText(item)}}
                </template>
                <template #item="{ item }">
                  {{getRoleText(item)}}
                </template>
              </v-select>
              <v-select 
                label="Permissions"
                outlined
                prepend-inner-icon="mdi-account-star"
                v-model="permissions"
                :rules="[requiredRule]"
                :items="allPermissions"
                multiple
              >
                <template #selection="{ item }">
                  <v-chip>
                    {{item.name}}
                  </v-chip>
                </template>
                <template #item="{ item }">
                  <div>
                    <span class="text-capitalize">{{item.name}}</span><br>
                    <span class="caption">{{item.description}}</span>
                  </div>
                </template>
              </v-select>
              <v-btn
                class="text-capitalize font-weight-bold"
                color="primary"
                rounded
                elevation="0"
                type="submit"
                :loading="creatingAdmin"
              >
                {{selectedAdmin != null? "Edit" : "Create"}} Admin
              </v-btn>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script src="./AdminDetails.ts"></script>

<style>

</style>