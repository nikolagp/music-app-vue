<template>
  <!-- Login Form -->
  <div
    class="p-4 mb-4 font-bold text-center text-white rounded"
    v-if="log_show_alert"
    :class="log_alert_variant"
  >
    {{ log_alert_msg }}
  </div>
  <vee-form :validation-schema="loginSchema" @submit="login">
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field
        type="email"
        name="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <ErrorMessage class="text-red-600" name="email" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field name="password" :bails="false" v-slot="{ field, errors }">
        <input
          type="password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Password"
          v-bind="field"
        />
        <div class="text-red-600" v-for="error in errors" :key="error">
          {{ error }}
        </div>
      </vee-field>
    </div>
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      :disabled="log_in_submission"
    >
      Submit
    </button>
  </vee-form>
</template>

<script>
import { mapActions } from "pinia";
import useUserStore from "@/stores/user.js";

export default {
  name: "LoginForm",
  data() {
    return {
      loginSchema: {
        email: "required|email",
        password: "required|min:9|max:50",
      },
      log_in_submission: false,
      log_show_alert: false,
      log_alert_variant: "bg-blue-500",
      log_alert_msg: "Please wait! We are logging you in.",
    };
  },
  methods: {
    ...mapActions(useUserStore, ["authenticate"]),
    async login(values) {
      this.log_in_submission = true;
      this.log_show_alert = true;
      this.log_alert_variant = "bg-blue-500";
      this.log_alert_msg = "Please wait! We are logging you in.";

      try {
        await this.authenticate(values);
      } catch (error) {
        this.log_in_submission = false;
        this.log_alert_variant = "bg-red-500";
        this.log_alert_msg = "Invalid login details. Please try again!";
        return;
      }

      this.log_alert_variant = "bg-green-500";
      this.log_alert_msg = "Success! You are logged in.";
      window.location.reload();
    },
  },
};
</script>
