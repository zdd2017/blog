<template>
  <div id="post">
    <el-input class="title" v-model="title" placeholder="标题"></el-input>
    <div class="editor" ref="editorElem" style="text-align: left"></div>
    <el-button class="btn" type="primary" @click="release">发布</el-button>
  </div>
</template>

<script>
import E from "wangeditor";
import store from "../store";
import { apiPost, apiModify } from "/src/api/post";

export default {
  name: "Post",
  data() {
    return {
      title: "",
      editor: null,
      editorContent: "",
    };
  },
  // catchData是一个类似回调函数，来自父组件，当然也可以自己写一个函数，主要是用来获取富文本编辑器中的html内容用来传递给服务端
  props: ["catchData"], // 接收父组件的方法
  created() {},
  mounted() {
    this.editor = new E(this.$refs.editorElem);
    // 编辑器的事件，每次改变会获取其html内容
    this.editor.config.onchange = (html) => {
      this.editorContent = html;
      console.log(this.editorContent);
    };
    this.editor.create(); // 创建富文本实例
    if (this.$route.params) {
      this.title = this.$route.params.title;
      let content = this.$route.params.content;
      this.editor.txt.html(content);
    }
  },
  methods: {
    release() {
      if (this.title && this.editorContent) {
        let temp = {
          username: store.getters.userInfo.name,
          title: this.title,
          content: this.editorContent,
        };
        // 修改
        let id = this.$route.params.id;
        if (id) {
          apiModify(id, temp).then(() => {
            this.$message({
              message: "修改成功！",
              type: "success",
            });
            this.$router.push({ name: "home" });
          });
        } else {
          // 新增
          apiPost(temp).then(() => {
            this.$message({
              message: "发布成功！",
              type: "success",
            });
            this.$router.push({ name: "home" });
          });
        }
      }
    },
  },
};
</script>

<style lang="scss">
#post {
  margin: 0 auto;
  width: 80%;
  text-align: left;
  .title {
    font-size: 20px;
  }
  .editor {
    margin: 10px 0;
  }
}
</style>