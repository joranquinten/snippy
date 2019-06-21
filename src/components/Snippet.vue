<template>
  <v-card class="snippet">
    <v-card-title>
      <v-layout align-start justify-start row>
        <ul class="languages" v-if="languages">
          <li :key="language" v-for="language in languages">
            <router-link :to="`/snippets/languages/${encodeURI(language)}`">{{
              language
            }}</router-link>
          </li>
        </ul>
        <h3 class="title">{{ title }}</h3>
      </v-layout>
    </v-card-title>
    <v-card-text>
      {{ description }}
    </v-card-text>

    <v-card-actions>
      <v-layout align-start>
        <v-btn color="pink" center flat @click="detailDialog = true">
          View 👀
        </v-btn>
        <tags v-if="tags" :tags="tags"></tags>
      </v-layout>
    </v-card-actions>

    <v-snackbar v-model="snackbar" top :timeout="2000">
      Snippet copied to clipboard
      <v-btn color="pink" flat @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>

    <v-dialog dark v-model="detailDialog" max-width="490">
      <v-card>
        <v-card-title class="headline">{{ title }}</v-card-title>
        <v-card-text>
          <prism-editor :code="content" lineNumbers readonly></prism-editor>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat v-if="$auth.isAuthenticated()" :to="`/snippet/${id}/edit`"
            >Edit</v-btn
          >
          <v-btn
            flat="flat"
            v-clipboard:success="onCopy"
            v-clipboard:copy="content"
          >
            Copy &amp; close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import tags from "./Tags";

export default {
  name: "snippet",
  components: {
    tags
  },
  data() {
    return {
      detailDialog: false,
      snackbar: false
    };
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
    description: {
      type: String
    },
    languages: {
      type: Array
    },
    tags: {
      type: Array
    }
  },
  methods: {
    onCopy() {
      this.snackbar = true;
      this.detailDialog = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.snippet {
  .languages {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: inline-flex;

    &::before,
    &::after {
      padding: 0 0.4em;
      font-weight: 700;
      z-index: 1;
    }
    &::before {
      content: "{";
    }

    &::after {
      content: "}";
    }

    li {
      position: relative;
      z-index: 0;
      vertical-align: middle;

      a {
        text-decoration: none;
        color: #2c3e50;

        &:hover {
          color: #f8f8f8;
        }

        &::before {
          content: "";
          z-index: -1;
          display: inline-block;
          width: calc(100% + 4px);
          height: 80%;
          position: absolute;
          left: -2px;
          bottom: 12%;
          background-image: linear-gradient(
            to right,
            rgba(241, 250, 140, 0) 0%,
            yellow 50%
          );
          background-position: -99.99% 0;
          background-size: 200% 10px;
          transform: skew(0deg, -3deg);
        }

        &:hover::before {
          background-image: linear-gradient(
            to right,
            rgba(241, 250, 140, 0) 0%,
            #e91e63 50%
          );
        }
      }
    }

    li:not(:last-of-type)::after {
      content: ", ";
    }
  }

  .title {
    font-weight: 400;
    margin: 0;
    color: #2c3e50;

    .language {
      font-size: 0.72em;
    }

    .snippet-code {
      font-size: 1em;
      padding: 1em;
    }
  }
}
</style>
