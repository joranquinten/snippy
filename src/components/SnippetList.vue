<template>
  <div class="snippet-list">
    <snippet
      :key="snippet.id"
      v-for="snippet in snippets"
      :id="snippet._id"
      :title="snippet.title"
      :content="snippet.content"
      :description="snippet.description"
      :languages="snippet.languages"
      :tags="snippet.tags"
    >
    </snippet>
  </div>
</template>

<script>
import snippet from "./Snippet";

export default {
  name: "snippet-list",
  components: { snippet },
  props: {
    snippets: {
      type: Array,
      required: true,
      defaultValue: () => []
    }
  }
};
</script>

<style lang="scss" scoped></style>
