<template>
  <div class="container">
    <div class="nav">
      <img
        src="https://img.hellobyebye.com/fd48916c4b133a983116f1a693fa01e2.jpg"
        alt=""
        class="logo"
      />
      <p class="login" @click="dialogFormVisible = true">LOGIN</p>
    </div>
    <div class="body"></div>
    <el-dialog title="登录" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.passwd" autocomplete="off"></el-input>
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
      form: {
        username: "",
        passwd: ""
      },
      formLabelWidth: "60px"
    };
  }
};
</script>

<style lang="scss" rel="stylesheet/scss">
.container {
  height: 100vh;
  width: 100vw;
  background: #ffffff
    url("https://img.hellobyebye.com/54268b7fab123bd05303bf21a773b3a0.jpg")
    center no-repeat;
  /* background-size: 100%; */

  .nav {
    height: 60px;
    background-color: rgba(0, 0, 0, 0.1);
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
      cursor: pointer;
    }
  }
}
</style>
