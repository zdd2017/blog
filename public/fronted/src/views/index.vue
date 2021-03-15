<template>
  <div id="index">
    <Header></Header>
    <article-list :blogs="blogs"></article-list>
  </div>
</template>

<script>
import Header from "../components/header.vue";
import { apiGetBlogList } from "/src/api/index.js";
import ArticleList from "../components/articleList.vue";

export default {
  components: { Header, ArticleList },
  data() {
    return {
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
    view(id) {
      this.$router.push({ name: "article", params: { id: id } });
    },
  },
};
</script>

<style lang="scss">
#index {
  .blog-container {
    margin: 0 auto;
    width: 60%;
    text-align: left;
    .blog-item {
      border-bottom: 1px solid #ccc;
      padding: 10px;
      .info-container {
        text-align: right;
        .authour {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>