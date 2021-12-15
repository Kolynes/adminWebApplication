<template>
  <v-container grid-list-xl>
    <v-layout align-center>
      <v-flex>
        <p class="title mb-0 mt-5">Sales</p>
      </v-flex>
      <v-spacer/>
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
    </v-layout>
    <v-divider/>
    <v-layout>
      <v-flex xs4>
        <v-card v-for="(number, index) in numbers" :key="index" class="mb-4">
          <v-card-text>
            <v-layout align-center justify-center>
              <v-avatar color="primary" large class="ml-2">
                <v-icon color="white">{{ number.icon }}</v-icon>
              </v-avatar>
              <v-flex class="ml-1">
                <span class="grey--text font-weight-bold">
                  {{ number.name }}
                </span>
                <br />
                <span class="title">{{ number.value }} sold</span>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-divider />
          <v-card-text>
            <v-btn
              elevation="0"
              color="primary"
              text
              class="text-capitalize font-weight-bold"
              :to="number.link"
            >
              {{ number.name }}
              <v-icon class="ml-3">mdi-arrow-right</v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs8>
        <v-card>
          <v-card-text>
            <canvas ref="lineGraphCanvas" />
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script src="./Sales.ts"></script>

<style>
</style>