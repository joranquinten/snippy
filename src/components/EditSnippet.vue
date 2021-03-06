<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-alert v-model="errored" icon outline type="error">
        {{ feedbackMsg }}
      </v-alert>
      <v-form v-on:submit.prevent="onSubmit">
        <v-text-field
          label="Title"
          outline
          v-model="snippet.title"
          @focus="$event.target.select()"
        ></v-text-field>

        <v-select
          v-model="snippet.languages"
          :items="languages"
          outline
          chips
          label="Languages"
          multiple
        ></v-select>

        <v-text-field
          label="Tags"
          outline
          v-model="snippet.tags"
          @focus="$event.target.select()"
        ></v-text-field>

        <v-textarea
          label="Description"
          outline
          auto-grow
          rows="1"
          v-model="snippet.description"
          @focus="$event.target.select()"
        ></v-textarea>

        <v-textarea
          label="Snippet"
          outline
          auto-grow
          rows="1"
          v-model="snippet.content"
          @focus="$event.target.select()"
        ></v-textarea>

        <v-btn flat outline @click.stop="saveSnippet">Save snippet</v-btn>
        <v-btn
          v-if="id"
          color="warning"
          flat
          outline
          @click.stop="deleteDialog = true"
          >Delete snippet</v-btn
        >
      </v-form>
    </v-flex>
    <v-snackbar v-model="snackbar" top :timeout="2000">
      {{ feedbackMsg }}
      <v-btn color="pink" flat @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>

    <v-dialog v-model="deleteDialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Are you sure?</v-card-title>
        <v-card-text>
          Deleting the snippet cannot be undone!
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green" flat="flat" @click.stop="deleteDialog = false">
            🙈 Cancel
          </v-btn>
          <v-btn color="red" flat="flat" @click.stop="deleteSnippet">
            🗑 Trash it!
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
// https://vuejsdevelopers.com/2018/08/27/vue-js-form-handling-vuelidate/

import axios from "axios";

const getSnippet = (vm, id) => {
  return axios
    .get(`${process.env.VUE_APP_SNIPPY_API}/snippets/snippet/${id}`)
    .then(response => {
      vm.snippet = response.data;
    })
    .catch(error => {
      vm.feedbackMsg = error;
      vm.errored = true;
    })
    .finally(() => (vm.loading = false));
};

const stringToArray = input => {
  if (Array.isArray(input)) return input;

  return (input || "").split(",").map(tag => tag.trim());
};

const prepareSnippet = snippet => {
  const preparedSnippet = {
    ...snippet,
    tags: stringToArray(snippet.tags)
  };

  return preparedSnippet;
};

export default {
  name: "edit-snippet",
  data() {
    return {
      snackbar: false,
      deleteDialog: false,
      errored: false,
      feedbackMsg: "",
      languages: [
        "bash",
        "css",
        "git",
        "js",
        "node",
        "scss",
        "OS specific",
        "other"
      ],
      snippet: {
        title: null,
        description: null,
        content: null,
        languages: null,
        tags: null
      },
      id: this.$route.params.id || null
    };
  },
  mounted() {
    if (this.$route.params.id) {
      getSnippet(this, this.$route.params.id);
    }
  },
  methods: {
    saveSnippet() {
      // UPDATE A SNIPPET
      if (this.$route.params.id) {
        return axios
          .put(
            `${process.env.VUE_APP_SNIPPY_API}/snippets/snippet/${
              this.$route.params.id
            }/update`,
            prepareSnippet(this.snippet)
          )
          .then(response => {
            this.feedbackMsg = response.data;
            this.snackbar = true;
          })
          .catch(error => {
            this.feedbackMsg = error;
            this.errored = true;
          });
      } else {
        // CREATE A NEW SNIPPET
        return axios
          .post(
            `${process.env.VUE_APP_SNIPPY_API}/snippets/snippet/create`,
            prepareSnippet(this.snippet)
          )
          .then(response => {
            this.feedbackMsg = response.data;
            this.snackbar = true;
            this.$router.push("/");
          })
          .catch(error => {
            this.feedbackMsg = error;
            this.errored = true;
          });
      }
    },
    deleteSnippet() {
      if (this.$route.params.id) {
        return axios
          .delete(
            `${process.env.VUE_APP_SNIPPY_API}/snippets/snippet/${
              this.$route.params.id
            }/delete`
          )
          .then(response => {
            this.feedbackMsg = response.data;
            this.snackbar = true;
            this.$router.push("/");
          })
          .catch(error => {
            this.feedbackMsg = error;
            this.errored = true;
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
