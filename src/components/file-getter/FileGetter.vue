<template>
  <v-dialog v-model="dialogVisible" width="600" persistent>
    <v-card>
      <v-card-title>
        <span class="title">Select File{{multiple? "s" : ""}}</span>
        <v-spacer />
        <v-btn icon @click="toggleDialogVisible">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-sheet height="400" @dragover="onDragOver" @drop.prevent="onFileFieldChange($event.dataTransfer.files)">
          <v-layout
            align-center
            justify-center
            style="height: 400px; border: 5px #00adef dashed"
            column
          >
            <v-icon color="grey" size="100">mdi-file-plus</v-icon>
            <span class="caption primary--text font-weight-bold">
              Drop file{{multiple? "s" : ""}} here
            </span>
          </v-layout>
        </v-sheet>
        <v-card-text>
          <v-tooltip bottom v-for="(file, index) in files" :key="index">
            <template #activator="{ on, attrs }">
              <v-chip
                :class="{ 'red white--text': errorForFile(file) }"
                v-on="errorForFile(file)? on : null"
                v-bind="attrs"
              >
                {{ file.name }} ({{ fileSize(file.size) }})
                <v-icon
                  class="ml-3"
                  @click="removeFile(index)"
                  :color="errorForFile(file) ? 'white' : ''"
                  >mdi-close</v-icon
                >
              </v-chip>
            </template>
            <span>{{ errorForFile(file) }}</span>
          </v-tooltip>
        </v-card-text>
        <v-card-actions class="mt-3">
          <v-btn
            class="text-capitalize font-weight-bold"
            rounded
            elevation="0"
            color="accent"
            @click="openFromComputer"
          >
            Open from files
          </v-btn>
          <v-btn
            class="text-capitalize font-weight-bold"
            rounded
            elevation="0"
            color="primary"
            :disabled="files.length == 0"
            @click="resolve"
          >
            Continue
          </v-btn>
        </v-card-actions>
      </v-card-text>
      <input
        type="file"
        ref="fileField"
        style="display: none"
        @change="onFileFieldChange($event.target.files)"
        :multiple="multiple"
        :accept="accept"
      />
    </v-card>
  </v-dialog>
</template>

<script src="./FileGetter.ts"></script>

<style>
.dotted {
  border: 2px blue solid !important;
  border-radius: 15px;
}
</style>