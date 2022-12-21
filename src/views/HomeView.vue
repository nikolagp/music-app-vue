<template>
  <main>
    <!-- Introduction -->
    <section class="relative min-h-full py-20 mb-8 text-white center">
      <div
        class="absolute inset-0 w-full h-full bg-center bg-cover center introduction-bg"
        style="background-image: url('/assets/img/hauz_party.jpg')"
      ></div>

      <img
        class="relative block w-auto mx-auto opacity-80 rotating"
        src="/assets/img/hauz-vynil.webp"
      />
    </section>

    <!-- Main Content -->
    <section class="container mx-auto">
      <div
        class="relative flex flex-col bg-white border border-gray-200 rounded"
      >
        <div
          class="px-6 pt-6 pb-5 font-bold border-b border-gray-200"
          v-icon.right.black="'headphones-alt'"
        >
          <span class="card-title">Songs</span>
          <!-- Icon -->
        </div>
        <!-- Playlist -->
        <ol id="playlist">
          <song-item
            v-for="song in songs"
            :key="song.docID"
            :song="song"
          ></song-item>
        </ol>
        <!-- .. end Playlist -->
      </div>
    </section>
  </main>
</template>

<script>
import { songsCollection } from "@/includes/firebase";
import SongItem from "@/components/SongItem.vue";

export default {
  name: "Home",
  components: {
    SongItem,
  },

  data() {
    return {
      songs: [],
      maxPerPage: 3,
      pendingRequest: false,
    };
  },

  async created() {
    this.getSongs();

    window.addEventListener("scroll", this.handleScroll);
  },

  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },

  methods: {
    handleScroll() {
      const { scrollTop, offsetHeight } = document.documentElement;
      const { innerHeight } = window;
      const bottomOfWindow =
        Math.round(scrollTop) + innerHeight === offsetHeight;

      if (bottomOfWindow) {
        this.getSongs();
      }
    },
    async getSongs() {
      if (this.pendingRequest) {
        return;
      }

      this.pendingRequest = true;

      let snapshots;
      if (this.songs.length) {
        const lastDoc = await songsCollection
          .doc(this.songs[this.songs.length - 1].docID)
          .get();
        snapshots = await songsCollection
          .startAfter(lastDoc)
          .limit(this.maxPerPage)
          .get();
      } else {
        snapshots = await songsCollection.limit(this.maxPerPage).get();
      }

      snapshots.forEach((document) => {
        this.songs.push({
          docID: document.id,
          ...document.data(),
        });
      });

      this.pendingRequest = false;
    },
  },
};
</script>
