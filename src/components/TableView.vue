<template>
  <v-container class="px-5">
    <v-layout>
      <v-btn icon @click="$router.back()" v-if="showBack">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-flex>
        <h1 class="display-1 font-weight-bold primary--text">
          {{title}} 
        </h1>
        <p class="caption"> 
          {{ new Date().toDateString() }} 
        </p>
      </v-flex>
    </v-layout>

    <slot name="subtitle" />
    <v-card class="mt-4">
      <v-card-title>
        <v-layout>
          <v-spacer/>
          <v-flex xs4>
            <v-text-field 
              outlined 
              rounded
              dense 
              hide-details
              :placeholder="searchPlaceholder"
              prepend-inner-icon="mdi-magnify"
              :loading="loading"
              v-model="searchStringSynced"
            />
          </v-flex>
          <v-btn icon @click="refresh" class="ml-3">
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </v-layout>
      </v-card-title>
      <v-card-text style="position: relative">
        <custom-table 
          :items="items" 
          :headers="headers"
          @click-item="itemClicked"
          :loading="loading"
          height="53vh"
        >
          <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
            <slot :name="name" v-bind="data"/>
          </template>
        </custom-table>
      </v-card-text>
      <v-card-title class="caption my-0 pt-0">
        <v-spacer/>
        <div class="mx-5">
          <v-select 
            label="Items per page"
            outlined
            dense
            hide-details
            style="width: 130px"
            :items="[10, 15, 20, 30]" 
            v-model="pageSizeSynced" 
          />
        </div>
        <div class="mx-5">
          <v-select 
            label="Page"
            outlined
            dense
            hide-details
            style="width: 100px"
            :items="pages" 
            v-model="pageSynced" 
          />
        </div>
        <div class="mr-3"> of {{numberOfPages}} Pages </div>
        <v-btn icon @click="previousPage">
          <v-icon> mdi-arrow-left </v-icon>
        </v-btn>
        <v-btn icon @click="nextPage">
          <v-icon> mdi-arrow-right </v-icon>
        </v-btn>
      </v-card-title>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Prop, PropSync } from "vue-property-decorator";
import CustomTable from "./CustomTable.vue";

@Component({
  components: {
    CustomTable
  }
})
export default class TableView extends Vue {
  @Prop({
    type: String,
    required: true
  })
  title!: string;

  @Prop({
    type: String,
    default: "Search"
  })
  searchPlaceholder!: string;

  @Prop({
    type: Boolean,
    required: true
  })
  loading!: boolean;

  @Prop({
    type: Array,
    required: true
  })
  items!: any[];

  @Prop({
    type: Array,
    required: true
  })
  headers!: any[];

  @Prop({
    type: Function,
    required: true
  })
  itemClicked!: Function;

  @Prop({
    type: Array,
    required: true
  })
  pages!: number[];

  @Prop({
    type: Number,
    required: true
  })
  numberOfPages!: number;

  @Prop({
    type: Function,
    required: true
  })
  nextPage!: Function;

  @Prop({
    type: Function,
    required: true
  })
  previousPage!: Function;

  @Prop({
    type: Boolean,
    default: false
  })
  showBack!: boolean;

  @PropSync("pageSize", {
    type: Number,
    required: true
  })
  pageSizeSynced!: number;

  @PropSync("page", {
    type: Number,
    required: true
  })
  pageSynced!: number;

  @PropSync("searchString", {
    type: String,
    required: true
  })
  searchStringSynced!: string;  

  refresh() {
    this.$emit("refresh");
  }
}
</script>