<template>
  <div class="blog">
    <Header></Header>
    <Article :article="article"></Article>
  </div>
</template>

<script>
import Header from "/src/components/header";
import Article from "/src/components/article";
import { apiViewArticle } from "/src/api/index.js";

export default {
  data() {
    return {
      article: {
        username: "",
        time: "",
        title: "",
        content: "",
        _id: "",
      },
      username: "",
    };
  },
  components: {
    Header,
    Article,
  },
  created() {
    console.log("wtf??");
    this.getArticle();
  },
  methods: {
    getArticle() {
      let id = this.$route.params.id;
      if (id) {
        apiViewArticle(id).then((res) => {
          this.article = res.value.article;
          this.article.time = res.value.article.time.second;
        });
      }
    },
  },
};
</script>
