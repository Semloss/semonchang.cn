<template>
  <div class="container">
    <div class="content">
      <div class="nav">
        <!-- 网页的名字和登录按钮 -->
        <div class="name"><p class="banner">Semon</p></div>
        <div class="login" @click="jumpto()">
          <p class="logintext">Login</p>
        </div>
      </div>
      <div class="section">
        <div class="art" v-for="(item, index) in artlist" :key="index">
          <h1 class="title">{{ item.title }}</h1>
          <p class="text">{{ item.content }}</p>
          <div class="div"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "mainPageNew",
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
  width: 100vw;
  height: 100vh;
  text-align: center;
  background: #ffffff
    url("https://img.hellobyebye.com/9e2a6d4b9a6345e17889c19ee2002935.jpg")
    center no-repeat;

  .content {
    width: 70vw;
    height: 100vh;
    margin: 0 auto;

    .nav {
      height: 60px;
      width: 100%;
      background-color: rgba(255, 255, 255, 0.9);
      position: relative;
      margin-bottom: 5px;
      border-radius: 5px;
      .name {
        position: absolute;
        left: 10%;
        line-height: 60px;
        font-size: 1.5rem;
      }

      .login {
        background-color: #c21f5b;
        height: 40px;
        width: 80px;
        position: absolute;
        right: 5%;
        top: 25%;
        border-radius: 25px;
        line-height: 40px;
        right: 10%;
        top: 15%;
        .logintext {
          font-size: 1.3rem;
          color: #ffffff;
        }

        .login:hover {
          cursor: pointer;
        }
      }
    }

    .section {
      background-color: rgba(255, 255, 255, 0.9);

      .art {
        height: 200px;
        position: relative;
        background-color: red;

        .title {
          position: absolute;
          left: 10%;
        }

        // .div {
        //   height: 1px;
        //   border-bottom: 2px rgba(0, 0, 0, 0.2) solid;
        // }
      }
    }
  }
}
</style>
