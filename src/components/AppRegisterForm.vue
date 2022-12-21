<template>
  <div>
    <div
      class="p-4 mb-4 font-bold text-center text-white rounded"
      v-if="reg_show_alert"
      :class="reg_alert_variant"
    >
      {{ reg_alert_msg }}
    </div>
    <vee-form
      :validation-schema="schema"
      @submit="register"
      :initial-values="userData"
    >
      <!-- Name -->
      <div class="mb-3">
        <label class="inline-block mb-2">Name</label>
        <vee-field
          type="text"
          name="name"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Enter Name"
        />
        <ErrorMessage class="text-red-600" name="name" />
      </div>
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
      <!-- Age -->
      <div class="mb-3">
        <label class="inline-block mb-2">Age</label>
        <vee-field
          type="number"
          name="age"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        />
        <ErrorMessage class="text-red-600" name="age" />
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
      <!-- Confirm Password -->
      <div class="mb-3">
        <label class="inline-block mb-2">Confirm Password</label>
        <vee-field
          type="password"
          name="confirm_password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Confirm Password"
        />
        <ErrorMessage class="text-red-600" name="confirm_password" />
      </div>
      <!-- Country -->
      <div class="mb-3">
        <label class="inline-block mb-2">Country</label>
        <vee-field
          as="select"
          name="country"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        >
          <option value="USA">USA</option>
          <option value="Mexico">Mexico</option>
          <option value="Germany">Germany</option>
          <option value="Antarctica">Antarctica</option>
        </vee-field>
        <ErrorMessage class="text-red-600" name="country" />
      </div>
      <!-- User Type -->
      <div class="mb-3">
        <label class="inline-block mb-2">User Type</label>
        <vee-field
          as="select"
          name="type"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        >
          <option value="Listener">Listener</option>
          <option value="Artist">Artist</option>
        </vee-field>
        <ErrorMessage class="text-red-600" name="type" />
      </div>
      <!-- TOS -->
      <div class="pl-6 mb-3">
        <vee-field
          type="checkbox"
          name="tos"
          value="1"
          class="float-left w-4 h-4 mt-1 -ml-6 rounded"
        />
        <label class="inline-block">Accept terms of service</label>
      </div>
      <ErrorMessage class="text-red-600" name="tos" />
      <button
        type="submit"
        class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
        :disabled="reg_in_submission"
      >
        Submit
      </button>
    </vee-form>
  </div>
</template>

<script>
import useUserStore from "@/stores/user";
import { mapActions } from "pinia";

export default {
  name: "RegisterForm",
  data() {
    return {
      schema: {
        name: "required|min:3|max:100|alpha_spaces",
        email: "required|min:3|max:100|email",
        age: "required|min_value:18|max_value:100",
        password: "required|min:9|max:50|excluded:password",
        confirm_password: "password_missmatch:@password",
        country: "required|country_excluded:Antarctica",
        tos: "tos",
        type: "required",
      },
      userData: {
        country: "USA",
        type: "Listener",
      },
      reg_in_submission: false,
      reg_show_alert: false,
      reg_alert_variant: "bg-blue-500",
      reg_alert_msg: "Please wait. Your account is being created.",
    };
  },
  methods: {
    ...mapActions(useUserStore, {
      createUser: "register",
    }),
    async register(values) {
      this.reg_show_alert = true;
      this.reg_in_submission = true;
      this.reg_alert_variant = "bg-blue-500";
      this.reg_alert_msg = "Please wait. Your account is being created.";

      try {
        await this.createUser(values);
      } catch (error) {
        this.reg_in_submission = false;
        this.reg_alert_variant = "bg-red-500";
        this.reg_alert_msg =
          "An unexpected error occured. Please try again later.";
        return;
      }

      this.reg_alert_variant = "bg-green-500";
      this.reg_alert_msg = "Success! Your account has been created.";
      window.location.reload();
    },
  },
  computed: {},
};
</script>
