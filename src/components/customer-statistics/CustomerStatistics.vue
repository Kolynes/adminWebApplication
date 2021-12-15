<template>
  <v-container grid-list-xl>
    <p class="title mb-0 mt-5">Customer Statistics</p>
    <v-divider class="mt-3"/>
    <v-layout>
      <v-flex xs6>
        <v-card>
          <v-card-title>
            <span class="font-weight-bold grey--text body-1">
              Customer Demographics
            </span>
            <v-spacer />
            <v-menu>
              <template #activator="{ on, attrs }">
                <v-btn
                  elevation="0"
                  color="primary"
                  text
                  class="text-capitalize font-weight-bold"
                  v-on="on"
                  v-bind="attrs"
                >
                  {{ timespan }}
                  <v-icon class="ml-4">mdi-chevron-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(oot, index) in timespans"
                  :key="index"
                  @click="timespanValue = oot.value"
                >
                  <v-list-item-content
                    :class="{
                      'primary--text': timespanValue == oot.value,
                    }"
                  >
                    {{ oot.text }}
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card-title>
          <v-card-text>
            <canvas ref="demographicsGraphCanvas" />
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs6>
        <v-card class="mb-4">
          <v-card-title>
            <span class="font-weight-bold grey--text body-1">
              Customer Registrations
            </span>
            <v-spacer />
            <v-menu>
              <template #activator="{ on, attrs }">
                <v-btn
                  elevation="0"
                  color="primary"
                  text
                  class="text-capitalize font-weight-bold"
                  v-on="on"
                  v-bind="attrs"
                >
                  {{ timespan }}
                  <v-icon class="ml-4">mdi-chevron-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(oot, index) in timespans"
                  :key="index"
                  @click="timespanValue = oot.value"
                >
                  <v-list-item-content
                    :class="{
                      'primary--text': timespanValue == oot.value,
                    }"
                  >
                    {{ oot.text }}
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card-title>
          <v-card-text>
            <canvas ref="registrationGraphCanvas" />
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script src="./CustomerStatistics.ts"></script>

<style>
</style>