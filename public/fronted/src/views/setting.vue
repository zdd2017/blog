<template>
  <div id="setting">
    <Header activeIndex="2"></Header>
    <el-form
      class="setting-form"
      :model="form"
      status-icon
      :rules="rules"
      ref="form"
      label-width="100px"
    >
      <el-form-item label="昵称" prop="nickName">
        <el-input
          class="nick-name-input"
          v-model="form.nickName"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="头像" prop="avatar">
        <el-upload
          class="avatar-uploader"
          action=""
          :on-change="handleAvatarChange"
          :show-file-list="false"
        >
          <img v-if="avatarUrl" :src="avatarUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="性别">
        <el-radio-group v-model="form.gender">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label-width="0">
        <el-button class="save-btn" type="primary" @click="submitForm('form')"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Header from "../components/header.vue";
import { apiUpload, apiSetting } from "/src/api/setting.js";
import store from "../store";

export default {
  components: { Header },
  data() {
    return {
      avatarUrl:
        "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
      image: "",
      form: {
        nickName: "",
        avatar: "",
        gender: "",
      },
      rules: {
        nickName: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "昵称长度在6到15个字符",
            trigger: "blur",
          },
          {
            pattern: /^[\w\u4e00-\u9fa5]{3,15}$/g,
            message: "仅能包含字母/汉字/数字/下划线",
          },
        ],
        avatar: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm() {
      let name = store.getters.userInfo.name;
      // 先上传图片
      let data = new FormData();
      data.append("file", this.image);
      console.log(data.get("file"), "data");
      apiUpload(data).then((res) => {
        // 缓存图片地址
        this.form.avatar = res.url;
        // 保存设置
        apiSetting(name, this.form).then((res) => {
          // 更新用户信息
          let userInfo = res.value.userInfo;
          this.$store.commit("SET_USER", userInfo);
          this.$message({
            message: "保存成功！",
            type: "success",
          });
          this.$router.push({ name: "index" });
        });
      });
    },
    handleAvatarChange(file) {
      // 图片预览
      this.avatarUrl = URL.createObjectURL(file.raw);
      // 缓存图片(blob)
      this.image = file.raw;
      //   this.form.avatar = this.avatarUrl;
      //   this.form.avatar = res.url;
    },
    // handleAvatarSuccess(res, file) {
    //   this.avatarUrl = URL.createObjectURL(file.raw);
    //   //   this.form.avatar = this.avatarUrl;
    //   this.form.avatar = res.url;
    // },
  },
};
</script>

<style lang="scss">
#setting {
  .setting-form {
    margin: 10px auto;
    width: 50%;
    text-align: left;
    .nick-name-input {
      width: 150px;
    }
    .avatar {
      width: 64px;
      height: 64px;
      border-radius: 32px;
    }
  }
}
</style>