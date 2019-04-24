<template>
  <div class="container">
    <div class="login" @click="jumpto()">
      <p class="logintext">Login</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "mainPage",
  data() {
    return {
      artlist: [
        {
          title: "aaa",
          content:
            "dasdasdasdasdasdasdasdddddasfdgdfgdfgdfgdfggdfgdfgdfgdfgdfgdfgdfgdfgdfgdfg",
          authr: "semon",
          date: "2019-01-01"
        },
        {
          title: "aaa",
          content:
            "dasdasdasdasdasdasdasdddddasfdgdfgdfgdfgdfggdfgdfgdfgdfgdfgdfgdfgdfgdfgdfg",
          authr: "semon",
          date: "2019-01-01"
        }
      ]
    };
  },
  methods: {
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
    height: 40px;
    width: 80px;
    position: absolute;
    right: 5%;
    top: 25%;
    border-radius: 25px;
    line-height: 40px;
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
