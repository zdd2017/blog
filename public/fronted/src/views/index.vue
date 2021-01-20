<template>
  <div id="index">
    <el-menu
      :default-active="activeIndex"
      class="index-menu el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1"
        ><router-link to="index">主页</router-link></el-menu-item
      >
      <el-menu-item index="2"
        ><router-link to="login">登录</router-link></el-menu-item
      >
      <el-menu-item index="3"
        ><router-link to="register">注册</router-link></el-menu-item
      >
    </el-menu>
    主页
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="scss">
#index {
  .index-menu {
    display: flex;
    justify-content: flex-end;
  }
}
</style>