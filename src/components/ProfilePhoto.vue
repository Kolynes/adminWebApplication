<template>
  <div class="profilePhoto" @click="onClick">
    <v-img :src="src" width="300" height="300" class="image" v-if="src"/>
    <v-icon size="300" v-else>{{ emptyStateIcon }}</v-icon>
    <div class="overlay">
      <v-icon color="white" size="100">camera</v-icon>
      <p>Click to change photo</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ProfilePhoto extends Vue {
  @Prop({
    type: String,
    required: true
  })
  src!: string;

  @Prop({
    type: String
  })
  emptyStateIcon!: string;

  onClick(event: any) {
    this.$emit("click");
  }
}
</script>

<style scoped>
.profilePhoto{
  position: relative;
  cursor: pointer;
}

.profilePhoto .image {
  position: relative;
}

.profilePhoto .overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 300px;
  height: 300px;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  opacity: 0;
  transition: opacity .4s ease-out;
  z-index: 1;
}

.profilePhoto .overlay:hover {
  opacity: 1;
}
</style>