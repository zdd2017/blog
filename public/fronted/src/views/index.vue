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
      <el-menu-item index="3"><a @click="logout">登出</a></el-menu-item>
      <el-menu-item index="4"
        ><router-link to="register">注册</router-link></el-menu-item
      >
    </el-menu>
    <div class="blog-container">
      <div class="blog-item" v-for="blog in blogs" :key="blog.index">
        <h1 class="blog-title">{{ blog.title }}</h1>
        <div class="blog-content" v-html="blog.content"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiGetBlogList } from "/src/api/index.js";

export default {
  data() {
    return {
      activeIndex: "1",
      blogs: [],
    };
  },
  created() {
    this.getBlogList();
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    logout() {
      this.$store.dispatch("Logout").then(() => {
        this.$router.push({ name: "index" });
      });
    },
    getBlogList() {
      apiGetBlogList().then((res) => {
        this.blogs = res.value.blogs;
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
}
</style>