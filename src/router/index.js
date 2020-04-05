import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
import HelloWorld from "../components/HelloWorld";
// import Chatroom from "../components/Chatroom";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "HelloWorld",
    component: HelloWorld
  },
  {
    path: "/chat",
    name: "Chatroom",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/Chatroom.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
