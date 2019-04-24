<template>
  <div class="container">
    <div class="board">
      <h1 class="title">login</h1>
      <div class="input">
        <el-input
          placeholder="这里输入账号"
          v-model="account"
          class="accountinput"
          clearable
        ></el-input>
        <el-input
          placeholder="这里输入密码"
          v-model="passwd"
          class="passwdinput"
          show-password
        ></el-input>
        <el-button plain class="loginbutton">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      account: "",
      passwd: ""
    };
  }
};
</script>

<style lang="scss">
.container {
  height: 100vh;
  width: 100vw;
  background: #ffffff
    url("https://img.hellobyebye.com/9e2a6d4b9a6345e17889c19ee2002935.jpg")
    center no-repeat;
  position: relative;

  .board {
    height: 40%;
    width: 30%;
    position: absolute;
    top: 30%;
    left: 35%;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 10px;
    .title {
      padding-top: 10px;
      height: 20%;
      font-size: 3rem;
    }

    .input {
      position: relative;
      width: 100%;
      height: 80%;

      .el-input__inner {
        width: 80%;
        position: absolute;
        right: 10px;
      }

      .passwdinput {
        position: absolute;
        left: -7%;
        top: 36%;
      }
      .accountinput {
        position: absolute;
        top: 10%;
        left: -7%;
      }
      .loginbutton {
        position: absolute;
        left: 11%;
        width: 80%;
        bottom: 10%;
      }
    }
  }
}
</style>
