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
      <p class="subheading">Total: ₦{{ order.totalPrice.toLocaleString() }}</p>
      <v-chip
        class="mb-2 text-capitalize"
        :class="getSelectedOrderTypeClassName()"
      >
        {{ order.status.toLowerCase() }}
      </v-chip>
      <br />
      <v-layout>
        <v-flex xs12 sm6>
          <v-hover v-for="(item, index) in order.orderItems" :key="index">
            <template #default="{ hover }">
              <v-layout
                :class="{
                  'grey lighten-4': hover,
                  'hoverable clickable': true,
                }"
                @click="goToProduct(item.product)"
              >
                <v-flex xs3>
                  <v-img :src="item.product.productImage" height="100"/>
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
                  <p class="caption mb-0">
                    ₦{{ parseInt(item.price).toLocaleString() }}/piece
                  </p>
                  <p class="caption mb-0 font-weight-bold">
                    Total: ₦{{ (item.price * item.quantity).toLocaleString() }}
                  </p>
                  <v-divider class="mt-5"/>
                </v-flex>
              </v-layout>
            </template>
          </v-hover>
        </v-flex>
        <v-flex>
          <v-card>
            <v-card-text>
              <p class="subheading mb-2">Actions:</p>
              <v-btn
                big
                text
                color="green"
                class="white--text font-weight-bold text-capitalize mb-1 mr-2"
                rounded
                elevation="0"
                @click="assignAgent"
              >
                <v-icon class="mr-2">mdi-motorbike</v-icon>
                Assign to agent
              </v-btn>
              <br />
              <v-btn
                big
                text
                color="red"
                class="white--text font-weight-bold text-capitalize mb-1"
                rounded
                elevation="0"
                @click="deleteOrder"
                :loading="deleting"
              >
                <v-icon class="mr-2">mdi-delete</v-icon>
                Delete
              </v-btn>
            </v-card-text>
          </v-card>
          <v-card class="my-5">
            <v-card-text v-if="agent != null">
              <p class="subheading">Delivery:</p>
              <p class="caption mb-1">Agent:</p>
              <v-layout>
                <v-avatar
                  color="green"
                  class="font-weight-bold white--text ml-3"
                  size="30"
                >
                  <span>{{ agent.firstName[0].toUpperCase() }}</span>
                </v-avatar>
                <span class="title font-weight-bold ml-2">
                  {{ agent.firstName }} {{ agent.lastName }}
                </span>
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
  transition: background 0.4s ease-out;
}

.clickable {
  cursor: pointer;
}
</style>