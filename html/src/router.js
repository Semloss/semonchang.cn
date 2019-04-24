import Vue from "vue";
import Router from "vue-router";

const mainPage = r => import("./views/main.vue").then(r);

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "main",
      component: mainPage
    }
  ]
});
