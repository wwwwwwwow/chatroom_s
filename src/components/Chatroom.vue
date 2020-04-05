<template>
  <div dark>
    <v-container fluid>
      <v-row justify="center" class="mt-12">
        <v-col cols="12" md="8" lg="6" xl="4" class="pr-8 pl-8">
          <v-card v-if="!isLoading" class="chatbox elevation-6 "
            ><v-container id="msgBox" class="overflow-y">
              <v-layout v-for="(msg, index) in messages" :key="index"
                ><!-- me -->
                <v-flex v-if="msg.author.uid == user.uid" class="Messages me">
                  <div class="Message ">
                    <p>
                      <!-- <span class="author">ada</span> -->
                      <span class="timestamp">
                        @ {{ getTime(msg.createTime) }}</span
                      >
                    </p>
                    <span class="content elevation-6">{{ msg.content }}</span>
                  </div>
                </v-flex>

                <!-- them -->
                <v-flex v-else class="Messages them">
                  <v-avatar
                    class="avatar elevation-6"
                    size="40"
                    color="grey darken-3"
                  >
                    <v-img
                      class=""
                      :src="msg.author.photoURL ? msg.author.photoURL : ''"
                      alt="avatar"
                    ></v-img>
                  </v-avatar>
                  <div class="Message ">
                    <p>
                      <span class="author">{{ msg.author.name }}</span>
                      <span class="timestamp">
                        @ {{ getTime(msg.createTime) }}</span
                      >
                    </p>
                    <span class="content elevation-6">{{ msg.content }}</span>
                  </div>
                </v-flex>
              </v-layout>
            </v-container>
            <div class="box_footer" dark>
              <v-flex>
                <v-form @submit.prevent="addMessage">
                  <v-text-field
                    v-model.trim="inputMessage"
                    dark
                    color="white"
                    placeholder="Write a message"
                    append-icon="mdi-send"
                    @click:append="addMessage"
                    class="pr-3 pl-3"
                  >
                  </v-text-field>
                </v-form>
              </v-flex></div
          ></v-card>
          <v-progress-linear
            indeterminate
            color="primary"
            class="mb-0"
            v-if="isLoading"
          ></v-progress-linear>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import firebase from "firebase/app";
import { db } from "../db.js";
import { mapState } from "vuex";

const fStore = db.firestore();

export default {
  name: "Chatroom",
  components: {},
  data: () => ({
    messages: [],
    inputMessage: ""
  }),
  computed: {
    ...mapState(["user", "isAuth", "isLoading"])
  },
  watch: {
    isAuth() {
      if (this.isAuth) {
        this.setupMessages();
      } else {
        this.messages = [];
        this.$router.push({ path: "/" });
      }
    }
  },
  methods: {
    addMessage() {
      // console.log("send");
      if (this.inputMessage === "" || !this.isAuth) return;

      const newMsg = {
        author: {
          uid: this.user.uid,
          name: this.user.displayName,
          photoURL: this.user.photoURL,
          email: this.user.email
        },
        content: this.inputMessage,
        createTime: firebase.firestore.Timestamp.fromDate(new Date())
      };

      // clean inout first
      this.inputMessage = "";

      // Add message to firestore
      fStore
        .collection("Message")
        .add(newMsg)
        .then(() => {
          this.inputMessage = "";
        })
        .catch(() => {
          // rollback input if message isn't sent
          this.inputMessage = newMsg.content;
        });
    },
    setupMessages() {
      this.$bind(
        "messages",
        fStore.collection("Message").orderBy("createTime")
      ).then(() => {
        this.$store.commit("switchLoading", false);
      });
    },
    getTime(firebaseTS) {
      let dateObj = new Date(firebaseTS.seconds * 1000); // date object
      let date = dateObj.toISOString().substring(0, 10);
      let hours = dateObj.getHours();
      let minutes = dateObj.getMinutes();
      // let seconds = dateObj.getSeconds();
      let ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours > 0 ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? "0" + minutes : minutes;
      // seconds = seconds < 10 ? "0" + seconds : seconds;
      let strTime = `${date} ${hours}:${minutes} ${ampm}`;
      return strTime;
    }
  },

  mounted: function() {
    if (this.isAuth) {
      this.setupMessages();
    } else {
      this.messages = [];
    }
  },
  updated() {
    const objDiv = document.getElementById("msgBox");
    if (objDiv) {
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  }
};
</script>
<style lang="scss">
$light: #fdfbfb;
$med: #ea6982;
$med1: #bbbbc8;
$med2: #1976d2;
$dark: #1976d2;
$dark1: #c43a30;

$border-radius: 1rem;
$box-shadow: 0 0.8rem 3rem rgba($dark, 0.6);

* {
  box-sizing: border-box;
}
.chatbox {
  .overflow-y {
    height: 75vh;
    overflow-y: auto;
  }
}
.Messages {
  width: 100%;
  display: flex;
  align-items: flex-start;
  .avatar {
    margin: 1.5rem 0.8rem 0.5rem 0.8rem;
  }
  .timestamp {
    opacity: 0;
    transition: opacity 0.3s;
  }
  &:hover .timestamp {
    opacity: 1;
  }
  .Message {
    margin: 1.5rem 0.8rem 0.5rem 0.8rem;
    max-width: 70%;
    display: inline-flex;
    flex-direction: column;

    span.content {
      padding: 1rem;
      overflow-wrap: break-word;
      word-wrap: break-word;
      word-break: break-word;
      hyphens: auto;
    }
    p {
      display: inline-block;
      color: $med2;
      margin-bottom: 0.2rem;
      span.timestamp {
        display: inline-block;
        color: $med1;
        margin-top: 0.2rem;
      }
    }
  }
  &.me {
    flex-direction: column;
  }
  &.me .Message {
    align-self: flex-end;
  }
  &.me .Message .content {
    border-radius: $border-radius 0rem $border-radius $border-radius;
    background: $dark;
    color: $light;
  }
  &.them .Message .content {
    border-radius: 0 $border-radius $border-radius $border-radius;
    background: $light;
  }
  &:last-child {
    margin-bottom: 1rem;
  }
}
.layout:last-child {
  margin-bottom: 5rem;
}
.box_footer {
  z-index: 1;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  line-height: 4rem;
  background-color: $dark;
  text-align: center;
  align-items: baseline;
}
</style>
