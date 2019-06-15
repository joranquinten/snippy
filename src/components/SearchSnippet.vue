<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <div class="snippet-list">
        <div v-if="loading">Loading snippets&hellip;</div>
        <div v-if="errored && feedbackMsg">{{ feedbackMsg }}</div>
        <div v-if="snippets && snippets.length === 0">
          No results found for search query
          <strong>{{ $route.params.query }}</strong
          >.
        </div>
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
        <v-pagination
          circle
          dark
          v-model="currentPage"
          :length="pageCount"
          v-if="snippets && pageCount > 1"
        ></v-pagination>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";
import snippet from "./Snippet";

const searchSnippets = (vm, query, page = 1) => {
  return axios
    .get(`${process.env.VUE_APP_SNIPPY_API}/snippets/search/${query}/${page}/`)
    .then(response => {
      vm.snippets = response.data.snippets;
      vm.snippetCount = response.data.count;
    })
    .catch(error => {
      vm.feedbackMsg = error;
      vm.errored = true;
    })
    .finally(() => (vm.loading = false));
};

export default {
  name: "search-snippet",
  components: { snippet },
  computed: {
    pageCount() {
      return Math.ceil(this.snippetCount / 15);
    }
  },
  data() {
    return {
      currentPage: 1,
      snippets: null,
      snippetCount: 0,
      loading: true,
      errored: false,
      feedbackMsg: ""
    };
  },
  mounted() {
    searchSnippets(this, this.$route.params.query);
  },
  watch: {
    $route(to, from) {
      if (to.params.query && to.params.query !== from.params.query) {
        searchSnippets(this, to.params.query);
      }
    },
    currentPage: function(newVal) {
      searchSnippets(this, this.$route.params.query, newVal);
    }
  }
};
</script>

<style lang="scss" scoped></style>
