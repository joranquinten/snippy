<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-alert v-model="errored" icon outline type="error">
        {{ feedbackMsg }}
      </v-alert>
      <add-snippet></add-snippet>

      <div
        v-if="
          $route.params.query || $route.params.tag || $route.params.language
        "
      >
        <p>
          You've been looking for
          <strong
            >{{ $route.params.query }}{{ $route.params.tag
            }}{{ $route.params.language }}</strong
          >. Here are the results ({{ snippetCount }}):
        </p>
      </div>

      <snippet-list :snippets="snippets"></snippet-list>
      <v-pagination
        circle
        dark
        v-model="currentPage"
        :length="pageCount"
        v-if="snippets && pageCount > 1"
      ></v-pagination>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";
import snippetList from "./SnippetList";
import addSnippet from "./AddSnippet";

const searchSnippets = (vm, endpoint, page = 1) => {
  return axios
    .get(`${process.env.VUE_APP_SNIPPY_API}/snippets/${endpoint}/${page}/`)
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
  name: "snippets-overview",
  components: { snippetList, addSnippet },
  computed: {
    pageCount() {
      return Math.ceil(this.snippetCount / 15);
    }
  },
  data() {
    return {
      currentPage: 1,
      snippets: [],
      snippetCount: 0,
      loading: true,
      errored: false,
      feedbackMsg: ""
    };
  },
  mounted() {
    if (this.$route.params.tag) {
      searchSnippets(this, `tags/${this.$route.params.tag}`);
    } else if (this.$route.params.language) {
      searchSnippets(this, `language/${this.$route.params.language}`);
    } else if (this.$route.params.query) {
      searchSnippets(this, `search/${this.$route.params.query}`);
    } else {
      getSnippets(this);
    }
  },
  watch: {
    $route(to, from) {
      if (to.params.tag && to.params.tag !== from.params.tag) {
        searchSnippets(this, `tags/${this.$route.params.tag}`);
      }
      if (to.params.language && to.params.language !== from.params.language) {
        searchSnippets(this, `language/${this.$route.params.language}`);
      }

      if (to.params.query && to.params.query !== from.params.query) {
        searchSnippets(this, `search/${this.$route.params.query}`);
      }

      if (from.path !== "/" && to.path === "/") {
        getSnippets(this);
      }
    },
    currentPage: function(newPage) {
      if (this.$route.params.tag) {
        searchSnippets(this, `tags/${this.$route.params.tag}`, newPage);
      } else if (this.$route.params.language) {
        searchSnippets(
          this,
          `language/${this.$route.params.language}`,
          newPage
        );
      } else if (this.$route.params.query) {
        searchSnippets(this, `search/${this.$route.params.query}`, newPage);
      } else {
        getSnippets(this, newPage);
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
