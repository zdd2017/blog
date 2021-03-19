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
      <el-submenu v-if="isLoggedIn" index="2"
        ><template slot="title"
          ><img
            style="width: 48px; height: 48px; border-radius: 24px"
            :src="imgSrc"
        /></template>
        <el-menu-item index="2-1" @click="goToHome">我的主页</el-menu-item>
        <el-menu-item index="2-2" @click="goToSetting">个人资料</el-menu-item>
        <el-menu-item index="2-3">修改密码</el-menu-item>
        <el-menu-item index="2-4" @click="logout">退出登录</el-menu-item>
      </el-submenu>
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
import imgSrc from "../assets/images/default-avatar.png";

export default {
  props: {
    activeIndex: {
      default: "1",
    },
  },
  data() {
    return {
      isLoggedIn: false,
      imgSrc: imgSrc,
      userInfo: {
        name: "",
      },
    };
  },
  created() {
    console.log("header");
    this.isLoggedIn = store.getters.isLoggedIn;
    // 已登录
    if (this.isLoggedIn) {
      this.userInfo = store.getters.userInfo;
      this.imgSrc = this.userInfo.avatar;
      console.log(this.imgSrc, "userInfo");
      // const blob = new Blob([this.userInfo.avatar]);
      // this.imgSrc = this.userInfo.avatar;
      // this.blobToBase64(blob).then((res) => {
      //   // let imgSrc = res.replace("data:application/octet-stream;base64,", "");
      //   console.log(imgSrc, "blob");
      //   this.imgSrc = res;
      // });
    }
  },
  methods: {
    goToHome() {
      this.$router.push({ name: "home" });
    },
    goToSetting() {
      this.$router.push({ name: "setting" });
    },
    logout() {
      this.$store.dispatch("Logout").then(() => {
        this.$router.push({ name: "index" });
      });
    },
    blobToBase64(blob) {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(blob);
        fileReader.onload = (e) => {
          resolve(e.target.result);
        };
        fileReader.onerror = () => {
          reject(new Error("文件流异常"));
        };
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