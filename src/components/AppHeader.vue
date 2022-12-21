<template>
  <!-- Header -->
  <header id="header" class="bg-gray-700">
    <nav class="container flex items-center justify-start px-4 py-5 mx-auto">
      <!-- App Name -->
      <router-link
        class="mr-4 text-2xl font-bold text-white uppercase"
        :to="{ name: 'home' }"
        exact-active-class="no-active"
        >HAŪZ</router-link
      >

      <div class="flex items-center flex-grow">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li>
            <router-link class="px-2 text-white" :to="{ name: 'about' }"
              >We are...</router-link
            >
          </li>
          <li v-if="!userStore.userLoggedIn">
            <a class="px-2 text-white" href="#" @click.prevent="toggleAuthModal"
              >Login / Register</a
            >
          </li>
          <template v-else>
            <li>
              <router-link class="px-2 text-white" :to="{ name: 'manage' }"
                >Manage</router-link
              >
            </li>
            <li>
              <a class="px-2 text-white" href="#" @click.prevent="signOut()"
                >Sign Out</a
              >
            </li>
          </template>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapStores } from "pinia";
import useUserStore from "@/stores/user";
import useModalStore from "@/stores/modal";

export default {
  name: "AppHeader",
  computed: {
    ...mapStores(useModalStore, useUserStore),
  },
  methods: {
    toggleAuthModal() {
      this.modalStore.isOpen = !this.modalStore.isOpen;
    },

    signOut() {
      this.userStore.signOut();

      if (this.$route.meta.requiresAuth) {
        this.$router.push({ name: "home" });
      }
    },
  },
};
</script>
