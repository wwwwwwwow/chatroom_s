<template>
  <v-app>
    <Navbar />
    <v-content>
      <HelloWorld />
      <Chatroom />
    </v-content>
    <DialogLogout />
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar";
import HelloWorld from "./components/HelloWorld";
import DialogLogout from "./components/DialogLogout";
import Chatroom from "./components/Chatroom";

export default {
  name: "App",

  components: {
    Navbar,
    HelloWorld,
    DialogLogout,
    Chatroom
  },

  data: () => ({
    //
  })
};
</script>
