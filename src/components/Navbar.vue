<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center">
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
        transition="scale-transition"
        width="40"
      />
      <v-toolbar-title v-if="isAuth" class="hidden-xs-only"
        >ChatApp</v-toolbar-title
      >
    </div>
    <v-spacer></v-spacer>
    <v-toolbar-items class="align-center" v-if="isAuth">
      <div class="mr-5">
        <v-avatar class="elevation-6" size="32" color="grey darken-3">
          <v-img class="" :src="user.photoURL"></v-img>
        </v-avatar>

        <span class=""> {{ user.displayName }} </span>
      </div>
      <v-btn text @click="openAlertDialog">
        <v-icon>mdi-logout-variant</v-icon> Logout
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
// // @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import { mapState } from "vuex";

export default {
  name: "Navbar",
  components: {
    // HelloWorld
  },
  data: () => ({
    // isAuth: true
  }),
  methods: {
    openAlertDialog() {
      console.log("openAlertDialog");
      this.$store.commit("switchLogoutDialog", true);
    }
  },
  computed: {
    ...mapState(["user", "isAuth", "openDialog", "isLoading"])
  },
  created() {
    this.$store.dispatch("checkAuth");
  }
};
</script>
