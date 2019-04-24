<template>
  <div class="container">
    <div class="login" @click="jumpto()">
      <p class="logintext">Login</p>
    </div>
  </div>
</template>

<script>
import * as api from "../api/login";
// import axios from "axios";
export default {
  name: "mainPage",
  data() {
    return {};
  },
  methods: {
    async login() {
      try {
        const res = await api.login({
          id: this.form.username,
          passwd: this.form.username.passwd
        });
        this.dialogFormVisible = false;
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    },
    jumpto() {
      this.$router.push({ path: "/login" });
      console.log(this.$router);
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss">
.container {
  height: 100vh;
  width: 100vw;
  background: #ffffff
    url("https://img.hellobyebye.com/9e2a6d4b9a6345e17889c19ee2002935.jpg")
    center no-repeat;
  position: relative;

  .login {
    background-color: #c21f5b;
    height: 50px;
    width: 100px;
    position: absolute;
    right: 5%;
    top: 25%;
    border-radius: 25px;
    line-height: 50px;
    right: 15%;
    top: 5%;
    .logintext {
      font-size: 1.3rem;
      color: #ffffff;
    }
  }
  .login:hover {
    cursor: pointer;
  }
}
</style>
