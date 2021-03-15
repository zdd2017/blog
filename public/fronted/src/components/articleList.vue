<template>
  <div id="article-list">
    <div class="blog-container">
      <div class="blog-item" v-for="blog in blogs" :key="blog.index">
        <h2 class="blog-title" @click="view(blog._id)">{{ blog.title }}</h2>
        <div class="blog-content" v-html="blog.content"></div>
        <div class="info-container">
          <span class="authour">{{ blog.username }}</span>
          <span class="date">{{ blog.time.second }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    blogs: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  methods: {
    view(id) {
      this.$router.push({ name: "blog", params: { id: id } });
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