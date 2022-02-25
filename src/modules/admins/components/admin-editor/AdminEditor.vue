<template>
  <v-dialog v-model="createAdminDialogVisible" persistent width="600">
    <v-card v-if="createAdminDialogVisible">
      <v-card-title>
        <span class="body-1" v-if="selectedAdmin == null">
          Create New Admin
        </span>
        <span class="body-1" v-else>Edit Admin</span>
        <v-spacer />
        <v-btn icon @click="toggleCreateAdminDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-xl>
          <v-form
            ref="createAdminForm"
            @submit.prevent="
              selectedAdmin == null ? createAdmin() : editAdmin()
            "
          >
            <v-layout>
              <v-flex>
                <v-text-field
                  label="First Name"
                  outlined
                  v-model="firstName"
                  :rules="[requiredLengthRule(4)]"
                  :error-messages="errors.firstName"
                />
              </v-flex>
              <v-flex>
                <v-text-field
                  label="Last Name"
                  outlined
                  v-model="lastName"
                  :rules="[requiredLengthRule(4)]"
                  :error-messages="errors.lastName"
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
              :error-messages="errors.email"
            />
            <v-text-field
              label="Phone Number"
              outlined
              prepend-inner-icon="mdi-phone"
              v-model="phoneNumber"
              type="phone"
              :rules="[requiredLengthRule(10)]"
              :error-messages="errors.phoneNumber"
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
              :error-messages="errors.role"
              :items="roles"
            >
              <template #selection="{ item }">
                {{ getRoleText(item) }}
              </template>
              <template #item="{ item }">
                {{ getRoleText(item) }}
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
              :item-text="(item) => item.name"
              :item-value="(item) => item"
              :error-messages="errors.permissions"
            >
              <template #selection="{ item }">
                <v-chip class="primary caption">
                  <span class="caption">{{ item.name }}</span>
                  <v-btn xsmall icon @click="removePermission(item)">
                    <v-icon color="white">mdi-close</v-icon>
                  </v-btn>
                </v-chip>
              </template>
              <template #item="{ item, attrs, on }">
                <v-list-item v-on="on" v-bind="attrs" :key="item.name">
                  <v-list-item-action>
                    <v-checkbox :value="isSelected(item)" readonly />
                  </v-list-item-action>
                  <v-list-item-content>
                    <span class="caption">{{ item.name }}</span> <br />
                    <span class="caption">{{ item.description }}</span>
                  </v-list-item-content>
                </v-list-item>
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
              {{ selectedAdmin != null ? "Edit" : "Create" }} Admin
            </v-btn>
          </v-form>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script src="./AdminEditor.ts"></script>

<style>
</style>