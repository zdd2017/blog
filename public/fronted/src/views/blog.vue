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
      article: null,
      username: "",
    };
  },
  components: {
    Header,
    Article,
  },
  created() {
    this.getArticle();
  },
  methods: {
    getArticle() {
      let id = this.$route.params.id;
      apiViewArticle(id).then((res) => {
        this.article = res.value.article;
        this.article.time = res.value.article.time.second;
        console.log(this.article);
      });
    },
  },
};
</script>
