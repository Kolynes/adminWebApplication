<template>
  <v-app>
    <v-navigation-drawer app :value="true">
      <v-container class="mx-auto px-0">
        <center>
          <img src="@/assets/images/logoAndName.svg" style="width: 200px" />
        </center>
        <v-list shaped>
          <template v-for="(routeHeading, x) in routesFiltered">
            <v-layout
              :key="`subheader-${x}`"
              justify-space-between
              @click="toggleRouteHeading(routeHeading)"
              style="cursor: pointer"
            >
              <v-subheader
                :class="routeHeading.active ? 'primary--text' : null"
              >
                {{ routeHeading.name }}
              </v-subheader>
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
    <v-main class="mt-5">
      <v-scroll-x-transition leave-absolute>
        <router-view />
      </v-scroll-x-transition>
    </v-main>
  </v-app>
</template>

<script src="./Dashboard.ts"></script>

<style>
.rotatable {
  transition: transform 0.4s ease-out;
}

.rotate {
  transform: rotateZ(90deg);
}
</style>