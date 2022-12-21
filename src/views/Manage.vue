<template>
  <!-- Main Content -->
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <app-upload :addSong="addSong" />
      <div class="col-span-2">
        <div
          class="relative flex flex-col bg-white border border-gray-200 rounded"
        >
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">My SONGS</span>
            <i
              class="float-right text-2xl text-green-400 fa fa-compact-disc"
            ></i>
          </div>
          <div class="p-6">
            <!-- Composition Items -->
            <composition-item
              v-for="(song, i) in songs"
              :key="song.docID"
              :song="song"
              :updateSong="updateSong"
              :index="i"
              :removeSong="removeSong"
              :updateUnsavedFlag="updateUnsavedFlag"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// import useUserStore from "@/stores/user";
import Upload from "@/components/upload.vue";
import { songsCollection, auth } from "@/includes/firebase";
import CompositionItem from "@/components/CompositionItem.vue";

export default {
  name: "manage",
  components: {
    Upload,
    CompositionItem,
  },
  data() {
    return {
      songs: [],
      unsavedFlag: false,
    };
  },

  async created() {
    const snapshot = await songsCollection
      .where("uid", "==", auth.currentUser.uid)
      .get();

    snapshot.forEach(this.addSong);
  },

  methods: {
    updateSong(i, values) {
      this.songs[i].modified_name = values.modified_name;
      this.songs[i].genre = values.genre;
    },
    removeSong(i) {
      this.songs.splice(i, 1);
    },
    addSong(document) {
      const song = {
        ...document.data(),
        docID: document.id,
      };

      this.songs.push(song);
    },
    updateUnsavedFlag(value) {
      this.unsavedFlag = value;
    },
  },
  beforeRouteLeave(to, from, next) {
    if (!this.unsavedFlag) {
      next();
    } else {
      const leave = window.confirm(
        "You have unsaved changes. Are you sure you want to leave this page?"
      );
      next(leave);
    }
  },

  // one way for canceling upload when leave the component
  /*beforeMountLeave(to, from, next) {
    this.$refs.upload.cancelUploads();
    next;
  },*/

  ////////////////////////////////
  // This solution works for smaller apps:
  // beforeRouteEnter(to, from, next) {
  //   console.log("guard Manage");
  //   const store = useUserStore();

  //   if (store.userLoggedIn) {
  //     next();
  //   } else {
  //     next({ name: "home" });
  //   }
  // },
};
</script>
