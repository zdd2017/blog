<template>
  <div class="article">
    <Header activeIndex="2"></Header>
    <article-list :blogs="blogs"></article-list>
  </div>
</template>

<script>
import Header from "/src/components/header";
import { apiViewMyArticle } from "/src/api/home.js";
import store from "/src/store";
import ArticleList from "../components/articleList.vue";

export default {
  data() {
    return {
      blogs: [],
    };
  },
  components: {
    Header,
    ArticleList,
  },
  created() {
    this.getMyArticle();
  },
  methods: {
    getMyArticle() {
      let username = store.getters.userInfo.name;
      if (username) {
        apiViewMyArticle(username).then((res) => {
          this.blogs = res.value.article;
        });
      }
    },
  },
};
</script>
