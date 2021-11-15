<template>
  <v-app>
    <v-app-bar app flat color="white">
      <v-spacer />
      <v-btn icon @click="toggleNotifications">
        <v-icon>mdi-bell-outline</v-icon>
      </v-btn>
      <v-menu offset-y="30">
        <template #activator="{ on, attrs }">
          <v-chip v-on="on" v-bind="attrs">
            <v-avatar color="primary white--text text-capitalize">
              {{ admin.firstName[0] }}
            </v-avatar>
            <span class="ml-2 font-weight-bold text-capitalize">
              {{ admin.firstName }} {{ admin.lastName }}
            </span>
          </v-chip>
        </template>
        <v-list rounded>
          <v-list-item dense color="primary" to="/dashboard/account">
            <v-list-item-icon>
              <v-icon> mdi-account </v-icon>
            </v-list-item-icon>
            <v-list-item-subtitle> My Account </v-list-item-subtitle>
          </v-list-item>
          <v-list-item dense color="primary" @click="showLogoutDialog">
            <v-list-item-icon>
              <v-icon> mdi-power </v-icon>
            </v-list-item-icon>
            <v-list-item-subtitle> Logout </v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer app v-model="notificationsVisible" right>
      <notifications v-if="notificationsVisible" />
    </v-navigation-drawer>
    <v-navigation-drawer app :value="true">
      <v-container class="mx-auto px-0">
        <center>
          <img src="../../assets/images/logoAndName.svg" style="width: 200px" />
        </center>
        <v-list shaped>
          <template v-for="(routeHeading, x) in routes">
            <v-layout
              :key="`subheader-${x}`"
              justify-space-between
              @click="toggleRouteHeading(routeHeading)"
              style="cursor: pointer;"
            >
              <v-subheader :class="routeHeading.active ? 'primary--text' : null" >{{ routeHeading.name }}</v-subheader>
              <v-icon
                :class="{ rotate: routeHeading.show, rotatable: true }"
                :color="routeHeading.active ? 'primary' : null"
              >
                mdi-chevron-right
              </v-icon>
            </v-layout>
            <v-scroll-y-transition :key="`items-${x}`" leave-absolute>
              <div v-if="routeHeading.show">
                <template v-for="(route, y) in routeHeading.routes">
                  <v-list-item
                    :key="`list-item-${x}-${y}`"
                    dense
                    color="primary"
                    :to="route.path"
                  >
                    <v-list-item-icon>
                      <v-icon>{{ route.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>
                      {{ route.name }}
                    </v-list-item-title>
                  </v-list-item>
                </template>
              </div>
            </v-scroll-y-transition>
          </template>
        </v-list>
      </v-container>
    </v-navigation-drawer>
    <v-content>
      <v-scroll-x-transition leave-absolute>
        <router-view />
      </v-scroll-x-transition>
    </v-content>
  </v-app>
</template>

<script src="./Dashboard.ts"></script>

<style>
.rotatable {
  transition: transform .4s ease-out;
}

.rotate {
  transform: rotateZ(90deg);
}
</style>