<template>
  <div class="article">
    <div class="article-container">
      <h2 class="blog-title">{{ article.title }}</h2>
      <div class="info-container">
        <div class="user-container">
          <div class="avatar"></div>
          <div class="authour-container">
            <div class="authour">{{ article.username }}</div>
            <div class="date">{{ article.time }}</div>
          </div>
        </div>
        <div class="edit" v-if="username === article.username" @click="edit">
          编辑文章
        </div>
      </div>
      <div class="blog-content" v-html="article.content"></div>
    </div>
  </div>
</template>

<script>
import store from "/src/store";

export default {
  props: {
    article: {
      type: Object,
      default: () => {
        return {
          _id: "",
          username: "",
          time: "",
          title: "",
          content: "",
        };
      },
    },
  },
  data() {
    return {
      username: "",
    };
  },
  created() {
    this.username = store.getters.userInfo.name;
  },
  methods: {
    edit() {
      this.$router.push({
        name: "post",
        params: {
          title: this.article.title,
          content: this.article.content,
          id: this.article._id,
        },
      });
    },
  },
};
</script>

<style lang="scss">
.article {
  margin: 0 auto;
  width: 50%;
  .article-container {
    .blog-title {
      cursor: pointer;
    }
    .info-container {
      position: relative;
      .user-container {
        display: flex;
        .avatar {
          width: 50px;
          height: 50px;
          border-radius: 25px;
        }
        .authour-container {
        }
      }
      .edit {
        position: absolute;
        bottom: 10px;
        right: 10px;
        cursor: pointer;
      }
    }
  }
}
</style>
