 <template>
  <div>
    <table-view
      title="Trips"
      :loading="loading.getSearchResults"
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
        <v-chip
          @click="status = ''"
          class="text-capitalize mx-1 font-weight-bold"
          :class="status == '' ? 'primary' : null"
        >
          All
        </v-chip>
        <v-chip
          v-for="(classes, prop) in statusChipClasses"
          :key="prop"
          class="text-capitalize lighten-5 mx-1 font-weight-bold"
          :class="status == prop ? classes : null"
          @click="status = prop"
        >
          {{ prop.toLowerCase() }}
        </v-chip>
      </template>

      <template #item:id="{ item }"> #{{ item.id }} </template>

      <template #item:createdOnDate="{ item }">
        {{ datetime(item.createdOnDate) }}
      </template>

      <template #item:customer="{ item }">
        <router-link
          :to="`/dashboard/customers/details?id=${item.customer.id}`"
        >
          {{ item.customer.firstName }} {{ item.customer.lastName }}
        </router-link>
      </template>

      <template #item:deliveryAgent="{ item }">
        <router-link
          :to="`/dashboard/agents/details?id=${item.deliveryAgent.id}`"
        >
          {{ item.deliveryAgent.firstName }} {{ item.deliveryAgent.lastName }}
        </router-link>
      </template>

      <template #item:tripStatus="{ item }">
        <v-chip
          class="text-capitalize lighten-5"
          :class="statusChipClasses[item.tripStatus]"
        >
          {{ item.tripStatus.toLowerCase() }}
        </v-chip>
      </template>

      <template #item:percentage="{ item }">
        {{ item.percentage.toFixed(2) }}%
      </template>

      <template #actions="{ item }">
        <v-list-item @click="deleteTrip(item)">
          <v-list-item-icon>
            <v-icon color="red"> mdi-delete </v-icon>
          </v-list-item-icon>
          <v-list-item-title> Delete </v-list-item-title>
        </v-list-item>
      </template>

      <template #empty-state>
        <v-empty-state :title="`No Trips Found`" icon="mdi-map" />
      </template>
    </table-view>
  </div>
</template>

<script src="./Trips.ts"></script>

<style>
</style>