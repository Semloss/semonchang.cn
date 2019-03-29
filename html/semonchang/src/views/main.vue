<template>
  <div class="container">
    <div class="nav">
      <img src="../../../../../../../Desktop/logo.png" alt="" class="logo" />
      <p class="login" @click="dialogFormVisible = true">Login</p>
    </div>
    <div class="body"></div>
    <el-dialog
      title="登录"
      :visible.sync="dialogFormVisible"
      width="30%"
      center="true"
    >
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="passwd" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "mainpage",
  data() {
    return {
      dialogFormVisible: false,
      username: "",
      passwd: "",
      formLabelWidth: "60px"
    };
  }
};
</script>

<style lang="scss" rel="stylesheet/scss">
.container {
  height: 100vh;
  width: 100vw;
  background: #ffffff url("../../../../../../../Desktop/raquel-unsplash.jpg")
    center no-repeat;
  /* background-size: 100%; */

  .nav {
    height: 60px;
    background-color: rgba(0, 0, 0, 0.5);
    position: relative;

    .logo {
      width: 10%;
      height: 100%;
      position: absolute;
      left: 2%;
    }
    .login {
      color: #ffffff;
      font-size: 1.3rem;
      position: absolute;
      right: 5%;
      top: 25%;
    }
    .login:hover {
      color: #c0c4cc;
    }
  }
}
</style>
