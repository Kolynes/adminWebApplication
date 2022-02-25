<template>
  <v-simple-table fixed-header :height="height" v-if="items.length > 0">
    <thead>
      <tr>
        <th v-for="(header, index) in headers" :key="`header-${index}`">
          <slot
            :name="`header:${header.value}`"
            :header="header"
            :index="index"
          >
            <p class="text-left">
              {{ header.text }}
            </p>
          </slot>
        </th>
        <th>
          <p class="text-left">Actions</p>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, index) in items"
        :key="`item-${index}`"
        @click="clickItem(item, index)"
        style="cursor: pointer"
      >
        <td v-for="(header, index2) in headers" :key="`col-${index2}`">
          <slot :name="`item:${header.value}`" :item="item" :index="index2">
            {{ item[header.value] }}
          </slot>
        </td>
        <td style="width: 0px">
          <v-menu offset-y>
            <template #activator="{ on, attrs }">
              <v-btn icon v-on="on" v-bind="attrs">
                <v-icon> mdi-dots-vertical </v-icon>
              </v-btn>
            </template>
            <v-list>
              <slot name="actions" :item="item">
                <v-list-item>
                  <p class="text-center caption">No Actions</p>
                </v-list-item>
              </slot>
            </v-list>
          </v-menu>
        </td>
      </tr>
    </tbody>
  </v-simple-table>
  <v-container v-else-if="loading">
    <v-skeleton-loader type="table" />
  </v-container>
  <v-container v-else :style="{ height }">
    <v-layout align-center justify-center style="height: 100%">
      <slot name="empty-state">
        <v-empty-state title="No Items Found" />
      </slot>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import VEmptyState from "../vuetify-extensions/VEmptyState.vue";

@Component({
  components: {
    VEmptyState,
  },
})
export default class CustomTable extends Vue {
  @Prop({
    default: () => [],
  })
  readonly items!: any[];

  @Prop()
  readonly headers!: any[];

  @Prop({
    default: "60vh",
    type: String,
  })
  readonly height!: string;

  @Prop({
    default: false,
    type: Boolean,
  })
  loading!: boolean;

  clickItem(item: any) {
    this.$emit("click-item", item);
  }
}
</script>

<style>
</style>