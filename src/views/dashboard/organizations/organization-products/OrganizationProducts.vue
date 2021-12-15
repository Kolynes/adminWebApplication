 <template>
  <div>
    <table-view
      :title="`${organizationName} ${typeTextPlural}`"
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
      show-back
      @refresh="search"
    >
      <template #item:id="{ item }"> #{{ item.id }} </template>
      <template #item:name="{ item }">
        <v-avatar class="my-1 mr-1">
          <img :src="item.image"/>
        </v-avatar>
        {{item.name}}
      </template>

      <template #empty-state>
        <v-empty-state
          :title="`No ${typeTextPlural} Found`"
        />
      </template>
    </table-view>
  </div>
</template>

<script src="./OrganizationProducts.ts"></script>

<style>
</style>