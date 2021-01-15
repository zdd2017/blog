<template>
  <div id="index">
    <el-menu
      :default-active="activeIndex"
      class="index-menu el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1">主页</el-menu-item>
      <el-menu-item index="2">登录</el-menu-item>
      <el-menu-item index="3">注册</el-menu-item>
    </el-menu>
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

<style>
#index {
}
</style>