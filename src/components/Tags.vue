<template>
  <ul class="tags">
    <li class="tag" v-for="tag in tags" :key="tag">{{ tag }}</li>
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
  margin: 0;
  overflow: hidden;
  padding: 0;

  .tag {
    background: #eee;
    border-radius: 3px 0 0 3px;
    color: #999;
    display: inline-block;
    height: 26px;
    line-height: 26px;
    padding: 0 20px 0 23px;
    position: relative;
    margin: 0 10px 10px 0;
    text-decoration: none;
  }

  .tag::before {
    background: #fafafa;
    border-radius: 10px;
    box-shadow: inset 0 1px rgba(0, 0, 0, 0.25);
    content: "";
    height: 6px;
    left: 10px;
    position: absolute;
    width: 6px;
    top: 10px;
  }

  .tag::after {
    background: #fafafa;
    border-bottom: 13px solid transparent;
    border-left: 10px solid #eee;
    border-top: 13px solid transparent;
    content: "";
    position: absolute;
    right: 0;
    top: 0;
  }

  .tag:hover {
    background-color: #50fa7b;
    color: rgb(48, 48, 48);
  }

  .tag:hover::after {
    border-left-color: #50fa7b;
  }
}
</style>
