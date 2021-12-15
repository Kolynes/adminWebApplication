<template>
  <div>
    <table-view
      title="Admins"
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
      @refresh="search"
    >
      <template #subtitle>
        <v-btn
          class="text-capitalize font-weight-bold"
          color="primary"
          rounded
          elevation="0"
          @click="toggleCreateAdminDialog"
        >
          <v-icon class="mr-2">mdi-account-plus</v-icon>
          Create Admin
        </v-btn>
      </template>

      <template #item:id="{ item }"> #{{ item.id }} </template>

      <template #item:active="{ item }">
        <v-icon color="green" v-if="item.active">mdi-check</v-icon>
        <v-icon color="red" v-else>mdi-close</v-icon>
      </template>

      <template #actions="{ item }">
        <v-list-item @click="deleteAdmin(item)">
          <v-list-item-icon>
            <v-icon color="red"> mdi-delete </v-icon>
          </v-list-item-icon>
          <v-list-item-title> Delete </v-list-item-title>
        </v-list-item>
        <v-list-item @click="item.active? disableAdmin(item) : enableAdmin(item)">
          <v-list-item-icon>
            <v-icon :color="item.active? 'red' : 'green'">{{item.active? "mdi-close" : "mdi-check"}}</v-icon>
          </v-list-item-icon>
          <v-list-item-title> {{item.active? "Disable" : "Enable"}} </v-list-item-title>
        </v-list-item>
        <v-list-item @click="beginEditAdmin(item)">
          <v-list-item-icon>
            <v-icon color="primary">mdi-lead-pencil</v-icon>
          </v-list-item-icon>
          <v-list-item-title> Edit </v-list-item-title>
        </v-list-item>
      </template>

      <template #empty-state>
        <v-empty-state title="No Admins Found" icon="mdi-account-star" />
      </template>
    </table-view>
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
  </div>
</template>

<script src="./Admins.ts"></script>