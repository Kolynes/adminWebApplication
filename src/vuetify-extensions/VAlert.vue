<template>
    <v-dialog v-model="show" width="300" persistent>
        <v-dialog-content>
            <v-card :dark="dark" :light="light">
                <v-card-title>
                    <v-icon class="mr-2">mdi-exlcamation-thick</v-icon> <span>Alert</span>
                </v-card-title>
                <v-card-text>
                    <p class="font-weight-bold">{{message}}</p>
                    <v-card-actions>
                        <v-btn depressed rounded class="primary font-weight-bold text-capitalize" :small="small" @click="runOk(true)">{{ok}}</v-btn>
                    </v-card-actions>
                </v-card-text>
            </v-card>
        </v-dialog-content>
    </v-dialog>
</template>

<script>
export default {
  name: 'VConfirmation',
  props: {
    dark: Boolean,
    light: Boolean,
    small: Boolean
  },
  data () {
    return {
      show: false,
      message: '',
      ok: 'ok',
      title: 'Alert'
    }
  },
  methods: {
    close () {
      this.show = false
      this.message = "";
      this.ok = "ok";
      this.title = "Alert";
      this.$emit('close')
    },
    alert (setup = {}) {
      this.message = setup.message || this.message
      this.ok = setup.ok || this.ok
      this.show = true
      this.$emit('show')
    },
    runOk () {
      this.show = false
      this.$emit('close')
    }
  },
  mounted () {
    window.alert = this.alert;
  }
}
</script>
