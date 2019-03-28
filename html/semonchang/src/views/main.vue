<template>
  <div class="container">
    <div class="nav"></div>
    <div class="body"></div>
  </div>
</template>

<script>
export default {
  name: "mainpage",
  data() {
    return {};
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
    height: 6%;
    background-color: rgba(0, 0, 0, 0.5);
  }
}
</style>
