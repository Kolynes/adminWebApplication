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
    >
      <template #item:id="{ item }"> #{{ item.id }} </template>

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