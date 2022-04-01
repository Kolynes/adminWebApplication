<template>
  <v-app>
    <v-content>
      <v-container fill-height align-center justify-center>
        <div class="text-center">
          <img src="@/assets/images/logoAndName.svg" />
          <h3 class="title my-5">Sign In</h3>
          <v-form ref="loginForm" @submit.prevent="login" class="text-left">
            <v-text-field
              outlined
              dense
              :rules="[emailRule]"
              label="Email Address"
              prepend-inner-icon="mdi-email"
              class="mb-1"
              v-model="email"
            />
            <v-password-field
              outlined
              dense
              label="Password"
              prepend-inner-icon="mdi-lock"
              :rules="[requiredRule]"
              v-model="password"
            />
            <v-btn
              block
              color="primary"
              :loading="loading.login"
              type="submit"
              class="font-weight-bold text-capitalize mt-3"
              elevation="0"
            >
              Sign In
            </v-btn>
            <v-btn
              block
              color="primary"
              to="/signup"
              class="font-weight-bold text-capitalize mt-3"
              elevation="0"
              outlined
            >
              Sign up as a Practitioner
            </v-btn>
            <v-btn
              block
              text
              color="primary"
              class="font-weight-bold text-capitalize mt-3"
              elevation="0"
              to="/forgot_password"
            >
              Forgot Password
            </v-btn>
          </v-form>
        </div>
      </v-container>
    </v-content>
  </v-app>
</template>

<script src="./Login.ts"></script>