<template>
  <div class="p-3 mb-4 border border-gray-200 rounded">
    <div v-show="!showEdit">
      <h4 class="inline-block text-2xl font-bold">{{ song.modified_name }}</h4>
      <button
        class="float-right px-2 py-1 ml-1 text-sm text-white bg-red-600 rounded"
        @click.prevent="deleteSong"
      >
        <i class="fa fa-times"></i>
      </button>
      <button
        class="float-right px-2 py-1 ml-1 text-sm text-white bg-blue-600 rounded"
        @click.prevent="showEdit = !showEdit"
      >
        <i class="fa fa-pencil-alt"></i>
      </button>
    </div>
    <div v-show="showEdit">
      <div
        class="p-4 mb-4 font-bold text-center text-white"
        v-if="show_alert"
        :class="alert_variant"
      >
        {{ alert_msg }}
      </div>
      <vee-form
        :validation-schema="compositionSchema"
        @submit="submitEdit"
        :initial-values="songData"
      >
        <div class="mb-3">
          <label class="inline-block mb-2">Song Title</label>
          <vee-field
            name="modified_name"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Song Title"
            @input="updateUnsavedFlag(true)"
          />
          <ErrorMessage class="text-red-600" name="modified_name" />
        </div>
        <div class="mb-3">
          <label class="inline-block mb-2">Genre</label>
          <vee-field
            name="genre"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Genre"
            @input="updateUnsavedFlag(true)"
          />
          <ErrorMessage class="text-red-600" name="genre" />
        </div>
        <button
          type="submit"
          class="py-1.5 px-3 rounded text-white bg-green-600"
          :disabled="in_submission"
        >
          Submit
        </button>
        <button
          type="button"
          class="py-1.5 px-3 rounded text-white bg-gray-600"
          :disabled="in_submission"
          @click.prevent="showEdit = false"
        >
          Go Back
        </button>
      </vee-form>
    </div>
  </div>
</template>

<script>
import { songsCollection, storage } from "@/includes/firebase";

export default {
  name: "CompositionItem",
  props: {
    song: {
      type: Object,
      required: true,
    },

    updateSong: {
      type: Function,
      required: true,
    },

    index: {
      type: Number,
      required: true,
    },

    removeSong: {
      type: Function,
      required: true,
    },

    updateUnsavedFlag: {
      type: Function,
    },
  },

  data() {
    return {
      showEdit: false,
      compositionSchema: {
        modified_name: "required",
        genre: "alpha_spaces",
      },
      songData: {
        modified_name: this.song.original_name,
        genre: this.song.genre,
      },
      in_submission: false,
      show_alert: false,
      alert_variant: "bg-blue-500",
      alert_msg: "Please wait! Updating song info.",
    };
  },
  methods: {
    async submitEdit(values) {
      this.show_alert = true;
      this.in_submission = true;
      this.alert_variant = "bg-blue-500";
      this.alert_msg = "Please wait! Updating song info.";

      try {
        await songsCollection.doc(this.song.docID).update(values);
      } catch (error) {
        this.in_submission = false;
        this.alert_variant = "bg-red-500";
        this.alert_msg = "An unexpected error occured. Please try again later.";
        return;
      }

      this.updateSong(this.index, values);
      this.updateUnsavedFlag(false);

      this.in_submission = false;
      this.alert_variant = "bg-green-500";
      this.alert_msg = "Success!";
    },
    async deleteSong() {
      const storageRef = storage.ref();
      const songRef = storageRef.child(`songs/${this.song.original_name}`);

      await songRef.delete();

      await songsCollection.doc(this.song.docID).delete();

      this.removeSong(this.index);
    },
  },
};
</script>
