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
          <v-img
            class=""
            src="https://lh3.googleusercontent.com/a-/AOh14Gi9s5BYwTn0ozCdin99GoacDCji8smwNCbHKS6-"
          ></v-img>
        </v-avatar>

        <span class=""> User Name </span>
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

export default {
  name: "Navbar",
  components: {
    // HelloWorld
  },
  data: () => ({
    isAuth: true
  }),
  methods: {
    openAlertDialog() {
      console.log("openAlertDialog");
    }
  }
};
</script>
