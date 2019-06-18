<template>
  <ul class="tags">
    <li class="tag" v-for="tag in tags" :key="tag">
      <router-link :to="`/snippets/tags/${encodeURI(tag)}`">{{
        tag
      }}</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: "tags",
  props: {
    tags: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.tags {
  list-style: none;
  margin: 0 1em;
  overflow: hidden;
  padding: 0;
  font-size: 0.72em;

  li {
    display: inline-block;
  }

  .tag a {
    background: #eee;
    border-radius: 3px 0 0 3px;
    color: #999;
    height: 26px;
    line-height: 26px;
    display: inline-block;
    padding: 0 20px 0 23px;
    position: relative;
    margin: 0 10px 10px 0;
    text-decoration: none;
  }

  .tag a::before {
    background: #fff;
    border-radius: 10px;
    box-shadow: inset 0 1px rgba(0, 0, 0, 0.25);
    content: "";
    height: 6px;
    left: 10px;
    position: absolute;
    width: 6px;
    top: 10px;
  }

  .tag a::after {
    background: #fff;
    border-bottom: 13px solid transparent;
    border-left: 10px solid #eee;
    border-top: 13px solid transparent;
    content: "";
    position: absolute;
    right: 0;
    top: 0;
  }

  .tag a:hover {
    background-color: #50fa7b;
    color: rgb(48, 48, 48);
  }

  .tag a:hover::after {
    border-left-color: #50fa7b;
  }
}
</style>
