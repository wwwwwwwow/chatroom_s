<template>
  <v-layout justify-center>
    <v-dialog v-model="openDialog" persistent max-width="320">
      <v-card>
        <v-card-title class="headline">Logout?</v-card-title>
        <v-card-text>Are you sure you want to logout ChatApp?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="grey darken-1" @click="closeDialog">Close</v-btn>
          <v-btn text color="green darken-1" @click="logout">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "DialogLogout",
  data: () => ({
    // openDialog: false
  }),
  components: {
    // HelloWorld
  },
  methods: {
    logout() {
      console.log("logout");
      this.$store.dispatch("logout");
    },
    closeDialog() {
      this.$store.commit("switchLogoutDialog", false);
    }
  },
  computed: {
    ...mapState(["openDialog"])
  }
};
</script>
