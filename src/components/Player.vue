<template>
  <!-- Player -->
  <div class="fixed bottom-0 left-0 w-full px-4 py-2 bg-white">
    <!-- Track Info -->
    <div class="text-center" v-if="current_song.modified_name">
      <span class="font-bold song-title">{{
        this.current_song.modified_name
      }}</span>
      by
      <span class="song-artist">{{ this.current_song.display_name }}</span>
    </div>
    <div class="flex items-center gap-4 flex-nowrap">
      <!-- Play/Pause Button -->
      <button @click.prevent="toggleAudio" type="button">
        <i
          class="text-xl text-gray-500 fa"
          :class="{ 'fa-play': !playing, 'fa-pause': playing }"
        ></i>
      </button>
      <!-- Current Position -->
      <div class="player-currenttime">{{ seek }}</div>
      <!-- Scrub Container  -->
      <div
        class="relative w-full h-2 bg-gray-200 rounded cursor-pointer"
        @click.prevent="updateSeek"
      >
        <!-- Player Ball -->
        <span
          class="absolute -top-2.5 -ml-2.5 text-gray-800 text-lg"
          :style="{ left: playerProgress }"
        >
          <i class="fas fa-circle"></i>
        </span>
        <!-- Player Progress Bar-->
        <span
          class="block h-2 rounded bg-gradient-to-r from-green-500 to-green-400"
          :style="{ width: playerProgress }"
        ></span>
      </div>
      <!-- Duration -->
      <div class="player-duration">{{ duration }}</div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import usePlayerStore from "@/stores/player";

export default {
  name: "AppPlayer",
  methods: {
    ...mapActions(usePlayerStore, ["toggleAudio", "updateSeek"]),
  },
  computed: {
    ...mapState(usePlayerStore, [
      "playing",
      "duration",
      "seek",
      "playerProgress",
      "current_song",
    ]),
  },
};
</script>
