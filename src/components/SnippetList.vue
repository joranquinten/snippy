<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <div class="snippet-list">
        <add-snippet></add-snippet>
        <div v-if="loading">Loading snippets&hellip;</div>
        <div v-if="errored && feedbackMsg">{{ feedbackMsg }}</div>
        <snippet
          :key="snippet.id"
          v-for="snippet in snippets"
          :id="snippet._id"
          :title="snippet.title"
          :content="snippet.content"
          :description="snippet.description"
          :language="snippet.language"
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
import addSnippet from "./AddSnippet";

const getSnippets = (vm, page = 1) => {
  return axios
    .get(`${process.env.VUE_APP_SNIPPY_API}/snippets/${page}/`)
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
  name: "snippet-list",
  components: { snippet, addSnippet },
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
    getSnippets(this);
  },
  watch: {
    currentPage: function(newVal) {
      getSnippets(this, newVal);
    }
  },
  methods: {
    nextPage() {
      this.currentPage++;
    },
    prevPage() {
      this.currentPage--;
    }
  }
};
</script>

<style lang="scss" scoped></style>
