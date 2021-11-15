 <template>
  <div>
    <table-view
      title="Rides"
      :loading="loading"
      :searchString.sync="searchString"
      :items="items"
      :headers="headers"
      :itemClicked="itemClicked"
      :pages="pages"
      :numberOfPages="numberOfPages"
      :nextPage="nextPage"
      :previousPage="previousPage"
      :pageSize.sync="pageSize"
      :page.sync="page"
    >
      <template #subtitle>
        <v-btn
          rounded
          color="primary"
          elevation="0"
          @click="toggleCreateRideDialog"
        >
          <v-icon>mdi-motorbike</v-icon>
          <span class="font-weight-bold text-capitalize ml-3">
            Create Ride
          </span>
        </v-btn>
      </template>
      <template #item:id="{ item }"> #{{ item.id }} </template>

      <template #actions="{ item }">
        <v-list-item @click="deleteRide(item)">
          <v-list-item-icon>
            <v-icon color="red"> mdi-delete </v-icon>
          </v-list-item-icon>
          <v-list-item-title> Delete </v-list-item-title>
        </v-list-item>
        <v-list-item @click="beginEditRide(item)">
          <v-list-item-icon>
            <v-icon color="primary"> mdi-lead-pencil </v-icon>
          </v-list-item-icon>
          <v-list-item-title> Edit </v-list-item-title>
        </v-list-item>
      </template>

      <template #empty-state>
        <v-empty-state
          :title="`No Rides Found`"
          icon="mdi-motorbike"
        />
      </template>
    </table-view>
    <v-dialog v-model="createRideDialogVisible" persistent width="600">
      <v-card v-if="createRideDialogVisible">
        <v-card-title>
          <span class="body-1" v-if="selectedRide == null">
            Create New Ride
          </span>
          <span class="body-1" v-else>Edit Ride</span>
          <v-spacer />
          <v-btn icon @click="toggleCreateRideDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-xl>
            <v-form
              ref="createRideForm"
              @submit.prevent="
                selectedRide == null ? createRide() : editRide()
              "
            >
              <v-text-field
                label="Name"
                outlined
                v-model="name"
                :rules="[requiredLengthRule(2)]"
              />
              <v-text-field
                label="Model"
                outlined
                v-model="model"
                :rules="[requiredRule]"
              />
              <v-text-field
                label="Brand"
                outlined
                v-model="brand"
                :rules="[requiredRule]"
              />
              <v-text-field
                label="License Plate"
                outlined
                v-model="licensePlate"
                :rules="[requiredRule]"
              />
              <v-file-field
                v-if="!selectedRide"
                label="Photo"
                outlined
                v-model="photo"
                :rules="[requiredRule]"
              />
              <v-btn
                class="text-capitalize font-weight-bold"
                color="primary"
                rounded
                elevation="0"
                type="submit"
                :loading="creatingRide"
              >
                {{ selectedRide != null ? "Edit" : "Create" }}
                Ride
              </v-btn>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script src="./Rides.ts"></script>

<style>
</style>