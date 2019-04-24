<template>
  <div class="container">
    <div class="board">
      <h1>login</h1>
      <div class="input">
        <p class="account">账号</p>
        <el-input
          placeholder="请输入账号"
          v-model="account"
          clearable
        ></el-input>
        <p class="passwd">密码</p>
        <el-input
          placeholder="请输入密码"
          v-model="passwd"
          show-password
        ></el-input>
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
    height: 50%;
    width: 30%;
    position: absolute;
    top: 25%;
    left: 35%;
    background-color: #ffffff;
    border-radius: 10px;
    .input {
      position: relative;
    }
  }
}
</style>
