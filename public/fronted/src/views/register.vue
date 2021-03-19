<template>
  <div id="register">
    <el-form
      class="register-form"
      :model="form"
      status-icon
      :rules="rules"
      ref="form"
      label-width="100px"
    >
      <el-form-item label-width="0" prop="name">
        <el-input
          placeholder="用户名"
          v-model="form.name"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label-width="0" prop="pass">
        <el-input
          placeholder="密码"
          type="password"
          v-model="form.pass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label-width="0" prop="checkPass">
        <el-input
          placeholder="确认密码"
          type="password"
          v-model="form.checkPass"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item label-width="0">
        <el-button
          class="register-btn"
          type="primary"
          @click="submitForm('form')"
          >注册</el-button
        >
      </el-form-item>
      <router-link class="toLogin" to="login">已有账号？立即登录</router-link>
    </el-form>
  </div>
</template>

<script>
import { apiRegister } from "/src/api/register.js";

export default {
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      form: {
        name: "",
        pass: "",
        checkPass: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "用户名长度在3到15个字符",
            trigger: "blur",
          },
          {
            pattern: /^[\w\u4e00-\u9fa5]{3,15}$/g,
            message: "用户名仅能包含字母/汉字/数字/下划线",
          },
        ],
        pass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 18, message: "密码长度在6到18位", trigger: "blur" },
          { pattern: /^[a-z0-9]{6,18}$/g, message: "密码仅能包含字母/数字" },
        ],
        checkPass: [
          {
            validator: validatePass,
            trigger: blur,
          },
        ],
      },
    };
  },
  methods: {
    submitForm() {
      apiRegister(this.form).then(() => {
        this.$message({
          message: "注册成功！",
          type: "success",
        });
        this.$router.push({ name: "login" });
      });
    },
  },
};
</script>

<style lang="scss">
#register {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .register-form {
    padding: 30px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 20rem;
    .register-btn {
      width: 100%;
    }
    .toLogin {
      float: right;
      color: #999;
      font-size: 0.9rem;
    }
  }
}
</style>