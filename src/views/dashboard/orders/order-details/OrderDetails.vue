<template>
  <v-container grid-list-xl>
    <v-row class="mb-3 mx-1">
      <v-btn icon @click="$router.back()">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <h1 class="display-1 font-weight-bold primary--text ml-2">
        Order #{{ id }}
      </h1>
    </v-row>
    <v-layout v-if="loading">
      <v-flex xs12 sm6 md8>
        <v-layout v-for="i in 3" :key="i">
          <v-flex xs3>
            <v-skeleton-loader type="image" />
          </v-flex>
          <v-flex>
            <v-skeleton-loader type="article, actions" />
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex>
        <v-skeleton-loader type="article, article, article" />
      </v-flex>
    </v-layout>
    <div v-else>
      <p class="title mb-0">
        Order by:
        <router-link :to="`/dashboard/customers/details?id=${customer.id}`">
          {{ customer.firstName }} {{ customer.lastName }}
        </router-link>
      </p>
      <p class="subheading">Total: ₦{{ order.totalPrice }}</p>
      <v-chip
        class="white--text mb-2"
        :class="{
          'primary primary--text lighten-4': order.status == 'Processing',
          'green green--text lighten-4': order.status == 'Completed',
          'red red--text lighten-4': order.status == 'Cancelled',
        }"
      >
        {{ order.status }}
      </v-chip>
      <br />
      <v-layout>
        <v-flex xs12 sm6 md8>
          <v-hover v-for="(item, index) in order.orderItems" :key="index">
            <template #default="{ hover }">
              <v-layout :class="{ 'grey lighten-4': hover, 'hoverable clickable': true }" @click="goToProduct(item)">
                <v-flex xs3>
                  <v-img :src="item.image" />
                </v-flex>
                <v-flex>
                  <p class="title font-weight-bold mb-0">
                    {{ item.name }}
                    <img
                      src="../../../../assets/icons/pomIcon.svg"
                      v-if="item.drugType == 'POM'"
                    />
                  </p>
                  <p class="caption">{{ item.organizationName }}</p>
                  <p class="caption mb-0">{{ item.quantity }} pieces</p>
                  <p class="caption mb-0">₦{{ item.price }}/piece</p>
                  <p class="caption mb-0 font-weight-bold">Total: ₦{{ item.price * item.quantity }}</p>
                </v-flex>
              </v-layout>
            </template>
          </v-hover>
        </v-flex>
        <v-flex>
          <p class="subheading mb-0">Actions:</p>
          <v-btn
            big
            color="green"
            class="white--text font-weight-bold text-capitalize mb-5 mr-2"
            rounded
            elevation="0"
            @click="assignAgent"
          >
            <v-icon class="mr-2">mdi-motorbike</v-icon>
            Assign to agent
          </v-btn>
          <v-btn
            big
            color="red"
            class="white--text font-weight-bold text-capitalize mb-5"
            rounded
            elevation="0"
            @click="deleteOrder"
            :loading="deleting"
          >
            <v-icon class="mr-2">mdi-delete</v-icon>
            Delete
          </v-btn>
          <v-card class="mb-5">
            <v-card-title class="body-1">Delivery</v-card-title>
            <v-card-text>
              <p class="caption mb-1">Agent:</p>
              <v-layout>
                <v-avatar
                  color="green"
                  class="font-weight-bold white--text ml-3"
                  size="30"
                >
                  <span>{{ agent.firstName[0].toUpperCase() }}</span>
                </v-avatar>
                <span class="title font-weight-bold ml-2"
                  >{{ agent.firstName }} {{ agent.lastName }}</span
                >
              </v-layout>
            </v-card-text>
          </v-card>
          <div v-if="order.prescriptionUrl">
            <p class="title">Prescription:</p>
            <v-img :src="order.prescriptionUrl" />
          </div>
        </v-flex>
      </v-layout>
    </div>
    <select-agent ref="selectAgent" />
  </v-container>
</template>

<script src="./OrderDetails.ts"></script>

<style>
.hoverable {
  transition: background .4s ease-out;
}

.clickable {
  cursor: pointer;
}
</style>