<template>
  <main>
    <!-- Music Header -->
    <section class="relative w-full mb-8 text-center text-white py-14">
      <div
        class="box-border absolute inset-0 w-full h-full bg-contain music-bg"
        style="background-image: url(/assets/img/song-header.png)"
      ></div>
      <div class="container flex items-center mx-auto">
        <!-- Play/Pause Button -->
        <button
          @click.prevent="newSong(song)"
          type="button"
          class="z-50 w-24 h-24 text-3xl text-black bg-white rounded-full focus:outline-none"
        >
          <i
            class="fas"
            :class="{ 'fa-play': !playing, 'fa-pause': playing }"
          ></i>
        </button>
        <div class="z-50 ml-8 text-left">
          <!-- Song Info -->
          <div class="text-3xl font-bold">{{ song.modified_name }}</div>
          <div>{{ song.genre }}</div>
        </div>
      </div>
    </section>
    <!-- Form -->
    <section class="container mx-auto mt-6" id="#comments">
      <div
        class="relative flex flex-col bg-white border border-gray-200 rounded"
      >
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
          <!-- Comment Count -->
          <span class="card-title">Comments ({{ song.comment_count }}) </span>
          <i class="float-right text-2xl text-green-400 fa fa-comments"></i>
        </div>
        <div class="p-6">
          <div
            class="p-4 mb-4 font-bold text-center text-white rounded"
            v-if="comment_show_alert"
            :class="comment_alert_variant"
          >
            {{ comment_alert_msg }}
          </div>
          <vee-form
            :validation-schema="commentSchema"
            @submit="submitComment"
            v-if="userLoggedIn"
          >
            <vee-field
              as="textarea"
              type="text"
              name="comment"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded mb-4"
              placeholder="Your comment here..."
            ></vee-field>
            <ErrorMessage class="text-red-600" name="comment" />
            <button
              type="submit"
              class="py-1.5 px-3 rounded text-white bg-green-600 block"
              :disabled="comment_in_submission"
            >
              Submit
            </button>
          </vee-form>
          <!-- Sort Comments -->
          <select
            v-model="sort"
            class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          >
            <option value="1">Latest</option>
            <option value="2">Oldest</option>
          </select>
        </div>
      </div>
    </section>
    <!-- Comments -->
    <ul class="container mx-auto">
      <li
        class="p-6 border border-gray-200 bg-gray-50"
        v-for="comment in sortedComments"
        :key="comment.docID"
      >
        <!-- Comment Author -->
        <div class="mb-5">
          <div class="font-bold">{{ comment.name }}</div>
          <time>{{ comment.datePosted }}</time>
        </div>

        <p>
          {{ comment.content }}
        </p>
      </li>
    </ul>
  </main>
</template>

<script>
import { mapState, mapActions } from "pinia";
import useUserStore from "@/stores/user";
import usePlayerStore from "@/stores/player";
import { songsCollection, auth, commentsCollection } from "@/includes/firebase";

export default {
  name: "Song",
  data() {
    return {
      song: {},
      commentSchema: {
        comment: "required|min:9|max:200",
      },
      comment_in_submission: false,
      comment_show_alert: false,
      comment_alert_variant: "bg-blue-500",
      comment_alert_msg: "Please wait! We are logging you in.",
      comments: [],
      sort: "1",
      // comment_count: [],
    };
  },
  methods: {
    ...mapActions(usePlayerStore, ["newSong"]),
    async submitComment(values, { resetForm }) {
      this.comment_in_submission = true;
      this.comment_show_alert = true;
      this.comment_alert_variant = "bg-blue-500";
      this.comment_alert_msg = "Please wait! Your comment is being processed.";

      const comment = {
        content: values.comment,
        datePosted: new Date().toISOString().slice(0, 16).split("T").join(" "),
        sid: this.$route.params.id,
        name: auth.currentUser.displayName,
        uid: auth.currentUser.uid,
      };

      try {
        await commentsCollection.add(comment);
      } catch (error) {
        this.comment_in_submission = false;
        this.comment_alert_variant = "bg-red-500";
        this.comment_alert_msg = "Some error occured. Please try again.";
        return;
      }

      this.song.comment_count += 1;
      await songsCollection.doc(this.$route.params.id).update({
        comment_count: this.song.comment_count,
      });

      this.getComments();

      this.comment_alert_variant = "bg-green-500";
      this.comment_alert_msg = "Comment added!";

      resetForm();
    },
    async getComments() {
      const snapshots = await commentsCollection
        .where("sid", "==", this.$route.params.id)
        .get();

      this.comments = [];

      snapshots.forEach((doc) => [
        this.comments.push({
          docID: doc.id,
          ...doc.data(),
        }),
      ]);
    },
  },
  computed: {
    ...mapState(usePlayerStore, ["playing"]),
    ...mapState(useUserStore, ["userLoggedIn"]),
    sortedComments() {
      return this.comments.slice().sort((a, b) => {
        if (this.sort === "1") {
          return new Date(b.datePosted) - new Date(a.datePosted);
        } else {
          return new Date(a.datePosted) - new Date(b.datePosted);
        }
      });
    },
  },
  watch: {
    sort(newVal) {
      if (newVal === this.$route.query.sort) {
        return;
      }

      this.$router.push({
        query: {
          sort: newVal,
        },
      });
    },
  },
  async beforeRouteEnter(to, from, next) {
    const docSnapshots = await songsCollection.doc(to.params.id).get();

    next((vm) => {
      if (!docSnapshots.exists) {
        vm.$router.push({ name: "home" });
        return;
      }

      const { sort } = vm.$route.query;

      vm.sort = sort === "1" || sort === "2" ? sort : "1";

      vm.song = docSnapshots.data();
      vm.getComments();
    });
  },
};
</script>
