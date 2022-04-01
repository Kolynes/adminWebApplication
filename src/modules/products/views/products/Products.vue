 <template>
  <div>
    <table-view
      :title="typeTextPlural"
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
        <v-btn
          rounded
          color="primary"
          elevation="0"
          @click="productEditor.toggleCreateProductDialog()"
        >
          <v-icon>mdi-plus</v-icon>
          <span class="font-weight-bold text-capitalize ml-3">
            create {{ typeText }}
          </span>
        </v-btn>
      </template>

      <template #item:id="{ item }"> #{{ item.id }} </template>

      <template #item:vendor="{ item }">
        <router-link
          :to="`${organizationTypeRoute}/details?id=${item.organization.id}`"
        >
          {{ item.organization.name }}
        </router-link>
      </template>

      <template #item:name="{ item }">
        <v-avatar tile class="my-1 mr-1">
          <img :src="item.productImage" />
        </v-avatar>
        {{ item.name }}
      </template>
      
      <template #item:price="{ item }">
        <p>{{ parseInt(item.price).toLocaleString() }}</p>
      </template>

      <template #item:quantityInStock="{ item }">
        <p>{{ parseInt(item.quantityInStock).toLocaleString() }}</p>
      </template>

      <template #actions="{ item }">
        <v-list-item @click="deleteProduct(item)">
          <v-list-item-icon>
            <v-icon color="red"> mdi-delete </v-icon>
          </v-list-item-icon>
          <v-list-item-title> Delete </v-list-item-title>
        </v-list-item>
        <v-list-item @click="productEditor.beginEditProduct(item)">
          <v-list-item-icon>
            <v-icon color="primary"> mdi-lead-pencil </v-icon>
          </v-list-item-icon>
          <v-list-item-title> Edit </v-list-item-title>
        </v-list-item>
      </template>

      <template #empty-state>
        <v-empty-state
          :title="`No ${typeTextPlural} Found`"
          icon="mdi-account"
        />
      </template>
    </table-view>
    <product-editor ref="productEditor" @saved="search" />
  </div>
</template>

<script src="./Products.ts"></script>

<style>
</style>