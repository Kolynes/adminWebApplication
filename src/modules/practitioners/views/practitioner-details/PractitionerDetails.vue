<template>
  <v-skeleton-loader
    type="list-item-avatar, article@3, heading, list-item-avatar-three-line@3 "
    style="width: 600px"
    v-if="loading.getPractitioner"
  />
  <v-container grid-list-xl v-else>
    <v-row class="mb-3 mx-1" align="center">
      <v-btn icon @click="$router.back()">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <h1 class="display-1 font-weight-bold primary--text ml-2 mr-3">
        {{ practitioner.name }}
      </h1>
    </v-row>
    <v-layout>
      <v-flex xs6>
        <v-card style="overflow: hidden">
          <v-layout align-center>
            <profile-photo
              :src="practitioner.profilePhoto"
              width="300"
              @click="changeProfilePhoto(practitioner.id)"
            />
            <v-card-text>
              <p class="font-weight-bold caption mb-0">Email</p>
              <p class="body-1">{{ practitioner.email }}</p>
              <p class="font-weight-bold caption mb-0">Phone Number</p>
              <p class="body-1">{{ practitioner.phoneNumber }}</p>
              <p class="font-weight-bold caption mb-0">Address</p>
              <p class="body-1">{{ practitioner.address }}</p>
            </v-card-text>
          </v-layout>
        </v-card>
        <v-card class="mt-5">
          <v-card-title>
            <span class="body-1">Subscription</span>
          </v-card-title>
          <v-empty-state
            v-if="!practitioner.subscription"
            title="No active subscription"
            icon="mdi-credit-card"
          />
          <v-card-text v-else>
            <p class="title text-capitalize">
              {{ practitioner.subscription.subscriptionType }}
            </p>
          </v-card-text>
        </v-card>
        <v-card class="mt-5">
          <v-card-title>
            <span class="body-1">Identification</span>
            <v-spacer />
            <v-chip>
              {{ practitioner.identification.identificationType }}
            </v-chip>
          </v-card-title>
          <v-card-text>
            <span class="caption">
              {{ datetime(practitioner.identification.identificationDate) }}
            </span>
          </v-card-text>
          <v-img
            :src="practitioner.identification.identificationPhoto"
            max-height="300"
          />
        </v-card>
      </v-flex>
      <v-flex xs6>
        <v-card>
          <v-card-text>
            <p>Actions:</p>
            <v-btn
              rounded
              text
              color="blue white--text"
              elevation="0"
              class="font-weight-bold text-capitalize"
              @click="practitionerEditor.beginEditPractitioner(practitioner)"
            >
              <v-icon class="mr-2">mdi-lead-pencil</v-icon>
              Edit {{ typeText }}
            </v-btn>
            <br />
            <v-btn
              rounded
              text
              color="orange white--text"
              elevation="0"
              class="font-weight-bold text-capitalize"
              @click="completeIdentification"
              v-if="!practitioner.identified"
            >
              <v-icon class="mr-2">mdi-check</v-icon>
              Complete {{ typeText }} Identification
            </v-btn>
            <br />
            <v-btn
              rounded
              text
              color="green white--text"
              elevation="0"
              class="font-weight-bold text-capitalize"
              @click="verifyPractitioner"
              v-if="!practitioner.verified"
            >
              <v-icon class="mr-2">mdi-check-all</v-icon>
              Verify {{ typeText }}
            </v-btn>
            <br />
            <v-btn
              rounded
              text
              color="red white--text"
              elevation="0"
              class="font-weight-bold text-capitalize"
              @click="deletePractitioner(practitioner)"
            >
              <v-icon class="mr-2">mdi-delete</v-icon>
              Delete {{ typeText }}
            </v-btn>
          </v-card-text>
        </v-card>
        <v-card class="mt-5">
          <v-card-text>
            <p class="font-weight-bold caption mb-0">Description</p>
            <p class="body-1">{{ practitioner.description }}</p>
            <p class="font-weight-bold caption mb-0">Specialties</p>
            <p class="body-1">{{ practitioner.specialties }}</p>
            <p class="font-weight-bold caption mb-0">Years of Experience</p>
            <p class="title">{{ practitioner.yearsOfExperience }}</p>
          </v-card-text>
        </v-card>
        <v-card class="mt-5">
          <v-card-title>
            <span class="body-1">Verification</span>
            <v-spacer />
            <v-chip>{{ practitioner.verification.verificationType }}</v-chip>
          </v-card-title>
          <v-card-title>
            <span class="caption">
              {{ datetime(practitioner.verification.verificationDate) }}
            </span>
            <v-spacer />
            <v-chip
              class="lighten-5"
              :class="{
                'orange orange--text': !practitioner.verified,
                'green green--text': practitioner.verified,
              }"
            >
              {{ practitioner.verified ? "verified" : "not verified" }}
            </v-chip>
          </v-card-title>
          <v-img
            :src="practitioner.verification.verificationPhoto"
            max-height="300"
          />
        </v-card>
      </v-flex>
    </v-layout>
    <practitioner-editor
      ref="practitionerEditor"
      @saved="getPractitioner"
      :type="type"
    />
    <file-getter ref="fileGetter" />
  </v-container>
</template>

<script src="./PractitionerDetails.ts"></script>

<style>
</style>