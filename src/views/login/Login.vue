<template>
  <v-app>
    <v-content>
      <v-container 
        fill-height 
        align-center 
        justify-center
      >
        <div class="text-center">
          <img src="../../assets/images/logoAndName.svg" />
          <h3 class="title my-5">
            Admin Sign In
          </h3>
          <v-form 
            ref="loginForm" 
            @submit.prevent="login" 
            class="text-left"
          >
            <p class="subheading mb-0">
              Email Address
            </p>
            <v-text-field 
              outlined 
              dense
              :rules="[emailRule]"
              class="mb-1" 
            />
            <v-layout justify-space-between>
              <p class="subheading mb-0">
                Password
              </p>
              <router-link to="/forgot_password">
                Forgot Password 
              </router-link>
            </v-layout>
            <v-password-field 
              outlined 
              dense
              :rules="[requiredRule]"
              class="mb-5" 
            />
            <v-btn 
              block 
              color="primary"
              :loading="signingIn"
              type="submit"
              class="font-weight-bold text-capitalize"
              elevation="0"
            > 
              Sign In 
            </v-btn>
          </v-form>
        </div>
      </v-container>
    </v-content>
  </v-app>
</template>

<script src="./Login.ts"></script>