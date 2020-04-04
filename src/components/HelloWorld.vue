<template>
  <v-container>
    <v-row class="text-center mt-10">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to ChatApp
        </h1>

        <p class="subheading font-weight-regular">
          Using Vue.js and Firebase to create a simple App which can deliver
          message and access by Google account.
          <br />To find more information, please visit
          <a href="https://github.com/wwwwwwwow/chatroom_s" target="_blank"
            >Github</a
          >
        </p>
      </v-col>
    </v-row>
    <v-row class="text-center mt-4">
      <v-col>
        <v-btn
          href="https://github.com/vuetifyjs/vuetify/releases/latest"
          target="_blank"
          color="primary"
          @click.prevent="login"
        >
          <span class="mr-2">Login With Google</span>
          <v-icon>mdi-login-variant</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "HelloWorld",

  data: () => ({}),
  methods: {
    login() {
      console.log("login");
    }
  }
};
</script>
