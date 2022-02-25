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
      <template #subtitle>
        <v-btn
          rounded
          color="primary"
          elevation="0"
          @click="productEditor.toggleCreateProductDialog(organization.id)"
        >
          <v-icon>mdi-plus</v-icon>
          <span class="font-weight-bold text-capitalize ml-3">
            create {{ typeText }}
          </span>
        </v-btn>
      </template>
      <template #item:id="{ item }"> #{{ item.id }} </template>
      <template #item:name="{ item }">
        <v-avatar class="my-1 mr-1" tile>
          <img :src="item.productImage"/>
        </v-avatar>
        {{item.name}}
      </template>

      <template #empty-state>
        <v-empty-state
          :title="`No ${typeTextPlural} Found`"
        />
      </template>
    </table-view>
    <product-editor ref="productEditor" @saved="search" />
  </div>
</template>

<script src="./OrganizationProducts.ts"></script>

<style>
</style>