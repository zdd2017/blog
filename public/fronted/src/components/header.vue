<template>
  <div id="index">
    <el-menu
      :default-active="activeIndex"
      class="index-menu el-menu-demo"
      mode="horizontal"
    >
      <el-menu-item index="1"
        ><router-link to="index">主页</router-link></el-menu-item
      >
      <el-menu-item v-if="isLoggedIn" index="2"
        ><router-link to="home">{{ userInfo.name }}</router-link></el-menu-item
      >
      <el-menu-item v-if="isLoggedIn" index="3"
        ><a @click="logout">登出</a></el-menu-item
      >
      <el-menu-item v-if="!isLoggedIn" index="2"
        ><router-link to="login">登录</router-link></el-menu-item
      >
      <el-menu-item v-if="!isLoggedIn" index="3"
        ><router-link to="register">注册</router-link></el-menu-item
      >
    </el-menu>
  </div>
</template>

<script>
import store from "../store";

export default {
  data() {
    return {
      activeIndex: "1",
      isLoggedIn: false,
      userInfo: {
        name: "",
      },
    };
  },
  created() {
    this.isLoggedIn = store.getters.isLoggedIn;
    // 已登录
    if (this.isLoggedIn) {
      this.userInfo = store.getters.userInfo;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("Logout").then(() => {
        this.$router.push({ name: "index" });
      });
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
  a {
    text-decoration: none;
  }
}
</style>