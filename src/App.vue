<template>
  <v-app>
    <v-scroll-x-transition leave-absolute>
      <router-view/>
    </v-scroll-x-transition>
    <v-toast/>
    <v-confirmation/>
    <v-alert/>
  </v-app>
</template>

<script>
  import VToast from "./vuetify-extensions/VToast.vue"
  import VConfirmation from "./vuetify-extensions/VConfirmation.vue"
  import VAlert from "./vuetify-extensions/VAlert.vue"

  export default {
    components: {
      VToast,
      VConfirmation,
      VAlert
    }
  }
</script>
