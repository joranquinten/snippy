<template>
  <v-card class="snippet">
    <v-card-title>
      <h3 class="title">{{ title }}</h3>
      <span class="language">{{ language }}</span>
    </v-card-title>
    <v-card-text>
      <pre>{{ content }}</pre>
    </v-card-text>
    <v-textarea
      v-show="false"
      id="content"
      background-color="#BD93F9"
      outline
      auto-grow
      rows="1"
      name="content"
      browser-autocomplete="false"
      label="This is where the snippet goes"
      v-model="content"
      persistent-hint
      hint="Select and copy the snippet"
      @focus="$event.target.select()"
    ></v-textarea>

    <tags v-if="tags" :tags="tags"></tags>

    <v-card-actions>
      <router-link :to="`/snippet/${id}/edit`"
        ><v-btn flat>Edit</v-btn></router-link
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import tags from "./Tags";

export default {
  name: "snippet",
  components: {
    tags
  },
  props: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String
    },
    content: {
      type: String
    },
    language: {
      type: String,
      default: "plaintext"
    },
    tags: {
      type: Array
    }
  }
};
</script>

<style lang="scss" scoped>
.snippet {
  .title {
    font-weight: 400;
    margin: 0;
    color: #2c3e50;

    .language {
      font-size: 0.72em;
    }
  }
}
</style>
