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
      @refresh="search"
    >
      <template #subtitle>
        <v-btn
          rounded
          color="primary"
          elevation="0"
          @click="rideEditor.toggleCreateRideDialog()"
        >
          <v-icon>mdi-motorbike</v-icon>
          <span class="font-weight-bold text-capitalize ml-3">
            Create Ride
          </span>
        </v-btn>
      </template>
      <template #item:id="{ item }"> #{{ item.id }} </template>
      <template #item:name="{ item }">
        <v-avatar class="my-1 mr-1">
          <img :src="item.photo"/>
        </v-avatar>
        {{item.name}}
      </template>

      <template #actions="{ item }">
        <v-list-item @click="deleteRide(item)">
          <v-list-item-icon>
            <v-icon color="red"> mdi-delete </v-icon>
          </v-list-item-icon>
          <v-list-item-title> Delete </v-list-item-title>
        </v-list-item>
        <v-list-item @click="rideEditor.beginEditRide(item)">
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
    <ride-editor ref="rideEditor" @saved="search" />
  </div>
</template>

<script src="./Rides.ts"></script>

<style>
</style>